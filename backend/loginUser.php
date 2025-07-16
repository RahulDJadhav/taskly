<?php
// Allow CORS
header("Access-Control-Allow-Origin: *"); // Allow all origins (for dev use only)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");



if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Missing email or password"
    ]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

// Connect to DB
$conn = new mysqli("localhost", "root", "", "taskly");

// Check DB connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);
    exit;
}

// Check user
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if ($user['password'] === $password) {
        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user['id'],
                "email" => $user['email'],
                "role" => $user['role']
            ]
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid password"
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
}

$conn->close();
?>