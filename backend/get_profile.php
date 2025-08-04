<?php
// Prevent any HTML or whitespace from breaking the JSON output
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection
$conn = new mysqli("localhost", "root", "", "taskly");
if ($conn->connect_error) {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

// Get email from query
$email = $_GET['email'] ?? '';
if (!$email) {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "No email provided"]);
    exit;
}

// Prepare and execute query
$stmt = $conn->prepare("SELECT name, email, profile_pic FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Handle result
if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    ob_end_clean(); // clear buffer before sending response
    echo json_encode([
        "success" => true,
        "name" => $row['name'],
        "email" => $row['email'],
        "profile_pic" => $row['profile_pic']
    ]);
} else {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "User not found"]);
}

$stmt->close();
$conn->close();
