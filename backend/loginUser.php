<?php
session_start();
// CORS headers
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

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// DB connection
$conn = new mysqli("localhost", "root", "", "taskly");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

// Get raw POST data
$data = json_decode(file_get_contents("php://input"));

$email = $conn->real_escape_string($data->email ?? '');
$password = $data->password ?? '';

// Find user by email
$query = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($query);

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $user_id = $user['id'];
$_SESSION['user_id'] = $user_id;
    // Verify password
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "user" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "name" => $user['name'],
                // "username" => $user['user'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}

$conn->close();
?>
