
<?php
session_start();

// STEP 1: Handle preflight CORS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// STEP 2: Allow actual request
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// STEP 3: Connect DB
$conn = new mysqli("localhost", "root", "", "taskly");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit;
}


// include 'db.php';

$rawData = file_get_contents("php://input");
file_put_contents("log.txt", $rawData); // 🔍 DEBUG: log request payload

$data = json_decode($rawData);

// Validate required fields
if (
    isset($data->title) && isset($data->dueDate) &&
    isset($data->priority) && isset($data->status) &&
    isset($data->assignee)
) {
    // Extract and sanitize fields as needed
    $title = $conn->real_escape_string($data->title);
    $description = $conn->real_escape_string($data->description ?? '');
    $startDate = $conn->real_escape_string($data->startDate);
    $dueDate = $conn->real_escape_string($data->dueDate);
    $priority = $conn->real_escape_string($data->priority);
    $status = $conn->real_escape_string($data->status);
    // $assignee = $conn->real_escape_string($data->assignee);
    $is_favorite = isset($data->is_favorite) ? intval($data->is_favorite) : 0;
    $is_important = isset($data->is_important) ? intval($data->is_important) : 0;
    $is_done = isset($data->is_done) ? intval($data->is_done) : 0;
    // $createdBy = 1;
    // Extract user_id from request
    $user_id = isset($data->user_id) ? intval($data->user_id) : 0;
if (!$user_id) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

    // $sql = "INSERT INTO todotasks 
    //     (title, description, start_date, due_date, priority, status, is_favorite, created)
    //     VALUES 
    //     ('$title', '$description', '$startDate', '$dueDate', '$priority', '$status', 0, $createdBy)";
    $sql = "INSERT INTO todotasks 
  (user_id, title, description, start_date, due_date, priority, status, is_favorite, is_important, is_done)
  VALUES 
  ($user_id, '$title', '$description', '$startDate', '$dueDate', '$priority', '$status', $is_favorite, $is_important, $is_done)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Task added successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => $conn->error, "query" => $sql]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields"]);
}

$conn->close();