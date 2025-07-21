<?php
// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Allow CORS for actual request
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


// DB Connection
include 'db.php';

$result = $conn->query("SELECT * FROM todotasks");
$tasks = [];

while ($row = $result->fetch_assoc()) {
  $tasks[] = $row;
}

echo json_encode($tasks);
?>