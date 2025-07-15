<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));
$id = intval($data->id);
$isFavorite = $data->isFavorite ? 1 : 0;

$query = "UPDATE tasks SET isFavorite = $isFavorite WHERE id = $id";

if (mysqli_query($conn, $query)) {
  echo json_encode(["message" => "Favorite status updated"]);
} else {
  echo json_encode(["message" => "Error updating favorite status"]);
}
?>