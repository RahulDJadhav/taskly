<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);
ini_set('error_log', __DIR__ . '/debug.log');

header('Content-Type: application/json');

require_once 'db.php'; // Assumes db.php sets up $conn (mysqli)

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['is_important'])) {
    echo json_encode(['message' => 'Missing required parameters.']);
    exit;
}

$id = intval($data['id']);
$is_important = intval($data['is_important']); // 0 or 1
file_put_contents('debug.txt', print_r($data, true), FILE_APPEND);
$sql = "UPDATE todotasks SET is_important=? WHERE id=?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['message' => 'Database error: ' . $conn->error]);
    exit;
}
$stmt->bind_param('ii', $is_important, $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Important status updated']);
} else {
    echo json_encode(['message' => 'Error updating important status: ' . $stmt->error]);
}
$stmt->close();
$conn->close();
?>