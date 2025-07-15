<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// DB Connection
$conn = new mysqli("localhost", "root", "", "taskly");

if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Get data from POST
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id) && isset($data->title) && isset($data->dueDate) &&
    isset($data->description) && isset($data->priority) &&
    isset($data->status) && isset($data->assignee)
) {
    $id = (int)$data->id;
    $title = $conn->real_escape_string($data->title);
    $dueDate = $conn->real_escape_string($data->dueDate);
    $description = $conn->real_escape_string($data->description);
    $priority = $conn->real_escape_string($data->priority);
    $status = $conn->real_escape_string($data->status);
    $assignee = $conn->real_escape_string($data->assignee);

    $sql = "UPDATE tasks SET 
              title='$title', 
              dueDate='$dueDate', 
              description='$description', 
              priority='$priority', 
              status='$status', 
              assignee='$assignee' 
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