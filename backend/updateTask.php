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
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "taskly");

if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) && isset($data->title) && isset($data->startDate) && isset($data->dueDate) &&
    isset($data->description) && isset($data->priority) 
    // &&
    // isset($data->status) && isset($data->assignee)
) {
    $user_id = isset($data->user_id) ? intval($data->user_id) : 0;
if (!$user_id) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}
    $title = $conn->real_escape_string($data->title);
    $startDate = $conn->real_escape_string($data->startDate);
    $dueDate = $conn->real_escape_string($data->dueDate);
    $description = $conn->real_escape_string($data->description);
    $priority = $conn->real_escape_string($data->priority);
    $status = $conn->real_escape_string($data->status);
    // $assignee = $conn->real_escape_string($data->assignee);

    $sql = "UPDATE todotasks SET 
              title='$title', 
              start_date='$startDate', 
              due_date='$dueDate', 
              description='$description', 
              priority='$priority', 
              status='$status'
            --   assignee='$assignee' 
            WHERE id=$id AND user_id=$user_id";

    if ($conn->query($sql)) {
        echo json_encode(["message" => "Task updated successfully."]);
    } else {
        echo json_encode(["message" => "Error updating task: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Invalid input data."]);
}

$conn->close();
?>