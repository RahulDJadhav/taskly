<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
include 'db.php';
$result = $conn->query("SELECT * FROM tasks");
$tasks = [];

while ($row = $result->fetch_assoc()) {
  $tasks[] = $row;
}
echo json_encode($tasks);
?>