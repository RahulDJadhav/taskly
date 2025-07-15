<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// DB Connection
$conn = new mysqli("localhost", "root", "", "taskly");

if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = (int)$data->id;

    $sql = "DELETE FROM tasks WHERE id = $id";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Task deleted successfully."]);
    } else {
        echo json_encode(["message" => "Error deleting task: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Invalid input. ID is required."]);
}

$conn->close();
?>