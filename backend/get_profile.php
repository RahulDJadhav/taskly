<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include 'db.php';

// Get data from query (if applicable)
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null; // Get user_id if needed

// Assuming a generic profile fetch or based on a default user/first user
$stmt = $conn->prepare("SELECT id, name, email, role FROM users LIMIT 1"); // Fetch first user as example
$stmt->execute();
$result = $stmt->get_result();

$profile = null;
if ($row = $result->fetch_assoc()) {
    $profile = $row;
}

echo json_encode($profile);

$conn->close();
?>
