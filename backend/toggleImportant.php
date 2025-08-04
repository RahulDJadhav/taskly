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

require_once 'db.php';

// Check session user
$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? intval($data['id']) : 0;
$is_important = isset($data['is_important']) ? intval($data['is_important']) : 0;
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
if ($id === 0 || $user_id === 0) {
    echo json_encode(["message" => "Missing id or user_id"]);
    exit;
}

// Only update if the task belongs to the logged-in user
$sql = "UPDATE todotasks SET is_important = $is_important WHERE id = $id AND user_id = $user_id";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['message' => 'Database error: ' . $conn->error]);
    exit;
}
$stmt->bind_param('iii', $is_important, $id, $user_id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Important status updated']);
} else {
    echo json_encode(['message' => 'Error updating important status: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
?>