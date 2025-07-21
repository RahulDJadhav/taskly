<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Read and decode input
$data = json_decode(file_get_contents("php://input"));

// Debug: Log raw input
file_put_contents('debug.txt', print_r($data, true));

if (!isset($data->id) || !isset($data->isFavorite)) {
    echo json_encode(["message" => "Invalid request"]);
    exit;
}

$id = intval($data->id);
$isFavorite = $data->isFavorite ? 1 : 0;

// Use prepared statement to avoid SQL injection
$stmt = $conn->prepare("UPDATE tasks SET isFavorite = ? WHERE id = ?");
$stmt->bind_param("ii", $isFavorite, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Favorite status updated"]);
} else {
    echo json_encode(["message" => "Error updating favorite status"]);
}

$stmt->close();
$conn->close();
?>