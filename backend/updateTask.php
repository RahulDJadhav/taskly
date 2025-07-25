<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);
ini_set('error_log', __DIR__ . '/debug.log');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

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
    $id = (int)$data->id;
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
            WHERE id=$id";

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