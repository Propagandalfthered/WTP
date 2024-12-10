<?php
// Nastavuje formát odpovede na JSON a povoľuje CORS (Cross-Origin Resource Sharing).
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Spracováva preflight OPTIONS požiadavky pre CORS.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Načítava konfiguráciu databázy.
require_once('db_config.php');

try {
    // Overenie, či je definovaný parameter na odstránenie používateľa.
    if (isset($_GET['delete'])) {
        $id_to_delete = filter_var($_GET['delete'], FILTER_VALIDATE_INT); // Validuje ID používateľa.
        if (!$id_to_delete) {
            throw new Exception('Invalid user ID'); // Chyba, ak je ID neplatné.
        }

        // Začína databázovú transakciu.
        $conn->begin_transaction();

        try {
            // Overenie, či používateľ s daným ID existuje.
            $check_stmt = $conn->prepare("SELECT id FROM users WHERE id = ?");
            $check_stmt->bind_param("i", $id_to_delete);
            $check_stmt->execute();
            if ($check_stmt->get_result()->num_rows === 0) {
                throw new Exception('User not found'); // Ak používateľ neexistuje.
            }
            $check_stmt->close();

            // Vkladá záznam o odstránení do audit logu.
            $audit_stmt = $conn->prepare("
                INSERT INTO user_audit_log (user_id, action, details)
                VALUES (?, 'DELETE', ?)
            ");
            $details = json_encode(['deleted_at' => date('Y-m-d H:i:s')]);
            $audit_stmt->bind_param("is", $id_to_delete, $details);
            $audit_stmt->execute();
            $audit_stmt->close();

            // Odstraňuje používateľa z tabuľky `users`.
            $delete_stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
            $delete_stmt->bind_param("i", $id_to_delete);
            if (!$delete_stmt->execute()) {
                throw new Exception('Failed to delete user'); // Chyba pri odstránení používateľa.
            }
            $delete_stmt->close();

            // Potvrdzuje transakciu.
            $conn->commit();
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
            exit;

        } catch (Exception $e) {
            // Ak nastane chyba, transakcia sa zruší.
            $conn->rollback();
            throw $e;
        }
    }

    // Nastavuje podmienky pre filtrovanie používateľov.
    $where_conditions = [];
    $params = [];
    $types = "";

    if (!empty($_GET['name'])) {
        $where_conditions[] = "name LIKE ?";
        $params[] = "%" . $_GET['name'] . "%"; // Vyhľadávanie podľa mena.
        $types .= "s";
    }

    if (!empty($_GET['country'])) {
        $where_conditions[] = "country LIKE ?";
        $params[] = "%" . $_GET['country'] . "%"; // Vyhľadávanie podľa krajiny.
        $types .= "s";
    }

    if (!empty($_GET['email'])) {
        $where_conditions[] = "email LIKE ?";
        $params[] = "%" . $_GET['email'] . "%"; // Vyhľadávanie podľa e-mailu.
        $types .= "s";
    }

    if (!empty($_GET['birth_year'])) {
        $where_conditions[] = "birth_year = ?";
        $params[] = filter_var($_GET['birth_year'], FILTER_VALIDATE_INT); // Vyhľadávanie podľa roku narodenia.
        $types .= "i";
    }

    // Vytvára SQL dotaz na výber používateľov.
    $query = "SELECT id, name, birth_year, country, email, phone, notes FROM users";
    if (!empty($where_conditions)) {
        $query .= " WHERE " . implode(" AND ", $where_conditions);
    }

    // Nastavuje zoradenie výsledkov podľa platných stĺpcov.
    $allowed_sort_columns = ['id', 'name', 'birth_year', 'country', 'email'];
    $sort_column = isset($_GET['sort']) && in_array($_GET['sort'], $allowed_sort_columns) 
        ? $_GET['sort'] 
        : 'id';
    $sort_direction = isset($_GET['direction']) && strtoupper($_GET['direction']) === 'DESC' 
        ? 'DESC' 
        : 'ASC';
    $query .= " ORDER BY $sort_column $sort_direction";

    // Pripravuje a vykonáva SQL dotaz.
    $stmt = $conn->prepare($query);
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();

    // Načítava výsledky a upravuje ich na bezpečné formátovanie.
    $users = [];
    while ($row = $result->fetch_assoc()) {
        unset($row['password']); // Odstraňuje heslo zo záznamu.
        $row['name'] = htmlspecialchars($row['name'] ?? '', ENT_QUOTES, 'UTF-8');
        $row['country'] = htmlspecialchars($row['country'] ?? '', ENT_QUOTES, 'UTF-8');
        $row['email'] = htmlspecialchars($row['email'] ?? '', ENT_QUOTES, 'UTF-8');
        $row['phone'] = htmlspecialchars($row['phone'] ?? '', ENT_QUOTES, 'UTF-8');
        $row['notes'] = htmlspecialchars($row['notes'] ?? '', ENT_QUOTES, 'UTF-8');
        $users[] = $row;
    }

    // Odošle JSON odpoveď s používateľmi.
    echo json_encode($users);

} catch (Exception $e) {
    // Zaznamenáva chybu a odošle odpoveď s chybou.
    error_log("Manager error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

// Zatvára spojenie s databázou.
$conn->close();
?>