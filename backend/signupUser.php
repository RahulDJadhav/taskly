<?php
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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// Include DB connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "taskly"; // change if needed

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->email) ||
    !isset($data->password)
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $conn->real_escape_string($data->password);
$confirmPassword = isset($data->confirmPassword) ? $conn->real_escape_string($data->confirmPassword) : '';
$name = isset($data->name) ? $conn->real_escape_string($data->name) : '';
// $username = isset($data->username) ? $conn->real_escape_string($data->username) : '';
$role = 'user';
$profile_pic = NULL;

// Check if email already exists
$checkQuery = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($checkQuery);

if ($result && $result->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["success" => false, "message" => "Email already registered."]);
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$hashedConfirm = password_hash($confirmPassword, PASSWORD_DEFAULT); // not necessary, but for your schema

// Insert user
$insertQuery = "INSERT INTO users (name,  email, password, confirm_password, role, profile_pic)
                VALUES ('$name', '$email', '$hashedPassword', '$hashedConfirm', '$role', NULL)";

if ($conn->query($insertQuery) === TRUE) {
    echo json_encode(["success" => true, "message" => "Signup successful."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to register user."]);
}

$conn->close();
?>
