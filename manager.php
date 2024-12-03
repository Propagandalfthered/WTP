<?php
include('db_config.php');

// Handle deletion
if (isset($_GET['delete'])) {
    $id_to_delete = intval($_GET['delete']);

    // Delete the user
    $conn->query("DELETE FROM users WHERE id = $id_to_delete");

    // Redirect to avoid re-executing the delete logic on page refresh
    header("Location: manager.php");
    exit;
}

// Query to fetch all users for display
$result = $conn->query("SELECT * FROM users ORDER BY id ASC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manage Users</title>
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
        <li class="nav-item"><a class="nav-link active" href="manager.php">Manage Users</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-5">
  <h1>Manage Users</h1>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Year of Birth</th>
        <th>Country</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Notes</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
          <td><?= $row['id'] ?></td>
          <td><?= $row['name'] ?></td>
          <td><?= $row['birth_year'] ?></td>
          <td><?= $row['country'] ?></td>
          <td><?= $row['email'] ?></td>
          <td><?= $row['phone'] ?></td>
          <td><?= $row['notes'] ?></td>
          <td>
            <a href="/WT/manager.php?delete=<?= $row['id'] ?>" class="btn btn-danger btn-sm">Delete</a>
          </td>
        </tr>
      <?php endwhile; ?>
    </tbody>
  </table>
</div>
</body>
</html>
