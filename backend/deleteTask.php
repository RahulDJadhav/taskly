<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'] ?? null;

if (!$id) {
    echo json_encode(['message' => 'Task ID is required']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM todotasks WHERE id=?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Task deleted successfully']);
} else {
    echo json_encode(['message' => 'Failed to delete task']);
}
$stmt->close();
?>