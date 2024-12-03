<?php
include('db_config.php');
$conn = new mysqli('localhost', 'root', '', 'registracia');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Required fields
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  $birth_year = filter_input(INPUT_POST, 'birth_year', FILTER_VALIDATE_INT);
  $country = filter_input(INPUT_POST, 'country', FILTER_SANITIZE_STRING);
  $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

  // Optional fields
  $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING) ?? null;
  $notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_STRING) ?? null;

  // Validate required fields
  if (!$name || !$birth_year || !$country || !$email) {
      echo "Please fill all required fields correctly.";
  } else {
      // Find the lowest available ID
      $result = $conn->query("SELECT id FROM users ORDER BY id ASC");
      $current_id = 1; // Start from 1
      while ($row = $result->fetch_assoc()) {
          if ($row['id'] != $current_id) {
              break; // Found a gap
          }
          $current_id++;
      }

      // Insert the new user with the calculated ID
      $stmt = $conn->prepare("INSERT INTO users (id, name, birth_year, country, email, phone, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->bind_param("isissss", $current_id, $name, $birth_year, $country, $email, $phone, $notes);

      if ($stmt->execute()) {
          echo "User registered successfully with ID $current_id!";
      } else {
          echo "Error: " . $stmt->error;
      }
      $stmt->close();
  }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register Users</title>
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="index.html">GPU Comparison</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="sub.html">Compare GPUs</a></li>
        <li class="nav-item"><a class="nav-link" href="changes.html">Changes</a></li>
        <li class="nav-item"><a class="nav-link" href="register.php">Register Users</a></li>
        <li class="nav-item"><a class="nav-link" href="manager.php">Manage Users</a></li>
      </ul>
    </div>
  </div>
</nav>

  <div class="container mt-5">
    <h1>Register Users</h1>
    <form method="POST" action="">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" id="name" name="name" required>
      </div>
      <div class="mb-3">
        <label for="birth_year" class="form-label">Year of Birth:</label>
        <input type="number" class="form-control" id="birth_year" name="birth_year" required>
      </div>
      <div class="mb-3">
        <label for="country" class="form-label">Country:</label>
        <input type="text" class="form-control" id="country" name="country" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="email" name="email" required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone (optional):</label>
        <input type="text" class="form-control" id="phone" name="phone">
      </div>
      <div class="mb-3">
        <label for="notes" class="form-label">Notes (optional):</label>
        <textarea class="form-control" id="notes" name="notes"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</body>
</html>
