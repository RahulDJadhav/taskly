<?php
include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$taskId = $data['id'];
$isFavorite = $data['isFavorite'];

$sql = "UPDATE tasks SET isFavorite = $isFavorite WHERE id = $taskId";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Task updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>