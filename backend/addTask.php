<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Connect to DB
$conn = new mysqli("localhost", "root", "", "taskly"); // Change DB name if needed

if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Read JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData);

// Validate
if (
    isset($data->title) && isset($data->dueDate) && isset($data->description) &&
    isset($data->priority) && isset($data->status) && isset($data->assignee)
) {
    $title = $conn->real_escape_string($data->title);
    $dueDate = $conn->real_escape_string($data->dueDate);
    $description = $conn->real_escape_string($data->description);
    $priority = $conn->real_escape_string($data->priority);
    $status = $conn->real_escape_string($data->status);
    $assignee = $conn->real_escape_string($data->assignee);
    $isFavorite = isset($data['isFavorite']) ? $data['isFavorite'] : 0; // Default to 0 if not provided

    $sql = "INSERT INTO tasks (title, dueDate, description, priority, status, assignee)
            VALUES ('$title', '$dueDate', '$description', '$priority', '$status', '$assignee', '$isFavorite')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Task added successfully."]);
    } else {
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Invalid task data."]);
}

$conn->close();
?>