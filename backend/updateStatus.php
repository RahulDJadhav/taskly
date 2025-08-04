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
$is_done = isset($data['is_done']) ? intval($data['is_done']) : 0;
$status = isset($data['status']) ? $conn->real_escape_string($data['status']) : '';
$user_id = isset($data['user_id']) ? intval($data['user_id']) : 0;
if ($id === 0 || $user_id === 0) {
    echo json_encode(["message" => "Missing id or user_id"]);
    exit;
}

$sql = "UPDATE todotasks SET is_done = $is_done, status = '$status' WHERE id = $id AND user_id = $user_id";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["message" => "Done status and/or status updated"]);
} else {
    echo json_encode(["message" => "Error updating status"]);
}
$conn->close();
?>
