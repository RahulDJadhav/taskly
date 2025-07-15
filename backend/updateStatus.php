<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$status = $data->status;

$query = "UPDATE tasks SET status = '$status' WHERE id = $id";
if (mysqli_query($conn, $query)) {
  echo json_encode(["message" => "Status updated"]);
} else {
  echo json_encode(["message" => "Error updating status"]);
}
?>