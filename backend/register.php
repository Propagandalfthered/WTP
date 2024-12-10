<?php
// Zakáže zobrazovanie chýb v prehliadači (produkčné prostredie) a povolí ich logovanie.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// Funkcia na spracovanie chýb, ktorá zapisuje chyby do logu.
function handleError($errno, $errstr, $errfile, $errline) {
    error_log("PHP Error [$errno]: $errstr in $errfile on line $errline");
    return true;
}
set_error_handler("handleError");

// Nastavenie hlavičiek pre JSON odpovede a povolenie CORS.
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Odpoveď na preflight OPTIONS požiadavky (pre CORS).
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Načítanie konfigurácie databázy.
require_once('db_config.php');

// Overenie, či je metóda požiadavky POST.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Načítanie JSON údajov z požiadavky.
    $json = file_get_contents('php://input');
    if (!$json) {
        throw new Exception('No data received');
    }

    // Dekódovanie JSON údajov.
    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON format: ' . json_last_error_msg());
    }

    // Overenie, či sú prítomné všetky požadované polia.
    $required_fields = ['name', 'birth_year', 'country', 'email', 'password'];
    $missing_fields = [];
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            $missing_fields[] = $field;
        }
    }
    
    if (!empty($missing_fields)) {
        throw new Exception('Missing required fields: ' . implode(', ', $missing_fields));
    }

    // Validácia vstupných údajov.
    $validation_errors = [];

    // Overenie mena.
    if (!preg_match("/^[a-zA-Z\s]{2,100}$/", $data['name'])) {
        $validation_errors[] = 'Name should be 2-100 characters long and contain only letters and spaces';
    }

    // Overenie roku narodenia.
    $birth_year = filter_var($data['birth_year'], FILTER_VALIDATE_INT);
    $current_year = date('Y');
    if (!$birth_year) {
        $validation_errors[] = 'Birth year must be a valid number';
    } elseif ($birth_year < 1900) {
        $validation_errors[] = 'Birth year cannot be earlier than 1900';
    } elseif ($birth_year > $current_year) {
        $validation_errors[] = 'Birth year cannot be in the future';
    }

    // Overenie krajiny.
    if (!preg_match("/^[a-zA-Z\s]{2,100}$/", $data['country'])) {
        $validation_errors[] = 'Country should be 2-100 characters long and contain only letters and spaces';
    }

    // Overenie formátu e-mailu.
    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
    if (!$email) {
        $validation_errors[] = 'Invalid email format';
    }

    // Overenie hesla.
    if (strlen($data['password']) < 8) {
        $validation_errors[] = 'Password must be at least 8 characters long';
    }
    if (!preg_match("/[A-Z]/", $data['password'])) {
        $validation_errors[] = 'Password must contain at least one uppercase letter';
    }
    if (!preg_match("/[a-z]/", $data['password'])) {
        $validation_errors[] = 'Password must contain at least one lowercase letter';
    }
    if (!preg_match("/[0-9]/", $data['password'])) {
        $validation_errors[] = 'Password must contain at least one number';
    }

    // Overenie poznámok (voliteľné pole).
    if (!empty($data['notes']) && strlen($data['notes']) > 1000) {
        $validation_errors[] = 'Notes should not exceed 1000 characters';
    }

    if (!empty($validation_errors)) {
        throw new Exception(implode('; ', $validation_errors));
    }

    // Spustenie databázovej transakcie.
    $conn->begin_transaction();

    try {
        // Overenie, či e-mail už existuje.
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            throw new Exception('Email already registered');
        }
        $stmt->close();

        // Výpočet najbližšieho voľného ID.
        $result = $conn->query("SELECT id FROM users ORDER BY id ASC");
        $current_id = 1;
        while ($row = $result->fetch_assoc()) {
            if ($row['id'] != $current_id) {
                break;
            }
            $current_id++;
        }

        // Hashovanie hesla.
        $password_hash = password_hash($data['password'], PASSWORD_BCRYPT);

        // Vloženie používateľa do databázy.
        $stmt = $conn->prepare("
            INSERT INTO users (id, name, birth_year, country, email, password, phone, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $phone = $data['phone'] ?? null;
        $notes = $data['notes'] ?? null;

        $stmt->bind_param("isssssss", 
            $current_id,
            $data['name'],
            $birth_year,
            $data['country'],
            $email,
            $password_hash,
            $phone,
            $notes
        );

        if (!$stmt->execute()) {
            throw new Exception('Failed to insert user: ' . $stmt->error);
        }

        // Vloženie záznamu do auditu.
        $audit_stmt = $conn->prepare("
            INSERT INTO user_audit_log (user_id, action, details)
            VALUES (?, 'CREATE', ?)
        ");
        $details = json_encode([
            'name' => $data['name'],
            'email' => $email,
            'country' => $data['country']
        ]);
        $audit_stmt->bind_param("is", $current_id, $details);
        $audit_stmt->execute();

        // Potvrdenie transakcie.
        $conn->commit();

        // Odpoveď o úspešnej registrácii.
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully!',
            'id' => $current_id
        ]);

    } catch (Exception $e) {
        // Zrušenie transakcie pri chybe.
        $conn->rollback();
        throw $e;
    }

} catch (Exception $e) {
    // Zaznamenanie chyby a vrátenie odpovede s chybou.
    error_log("Registration error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

// Zatvorenie spojenia s databázou.
$conn->close();
?>