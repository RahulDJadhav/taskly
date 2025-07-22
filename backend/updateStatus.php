<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$is_done = $data->is_done; // 0 or 1

$query = "UPDATE todotasks SET is_done = $is_done WHERE id = $id";
if (mysqli_query($conn, $query)) {
  echo json_encode(["message" => "Done status updated"]);
} else {
  echo json_encode(["message" => "Error updating done status"]);
}
?>