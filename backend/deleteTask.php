<?php
session_start();

// STEP 1: Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    exit(0);
}

// STEP 2: Allow actual request
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

// Check session user
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? intval($data['id']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
if ($id === 0 || $user_id === 0) {
    echo json_encode(["message" => "Missing id or user_id"]);
    exit;
}
$sql = "DELETE FROM todotasks WHERE id = $id AND user_id = $user_id";

if ($stmt->execute()) {
    echo json_encode(['message' => 'Task deleted successfully']);
} else {
    echo json_encode(['message' => 'Failed to delete task']);
}
$stmt->close();
$conn->close();
?>