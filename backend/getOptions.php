<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "taskly");

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Fetch priorities
$priorities = [];
$result = $conn->query("SELECT id, name FROM priorities");
while ($row = $result->fetch_assoc()) {
    $priorities[] = $row;
}

// Fetch statuses
$statuses = [];
$result = $conn->query("SELECT id, name FROM statuses");
while ($row = $result->fetch_assoc()) {
    $statuses[] = $row;
}

// Fetch users (assignees)
$users = [];
$result = $conn->query("SELECT id, name FROM users");
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode([
    "priorities" => $priorities,
    "statuses" => $statuses,
    "users" => $users
]);

$conn->close();
?>