<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

// Use $_POST for form data, not file_get_contents for FormData
$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';

// For profile picture, if it was part of the original form submission with FormData
// $profile_pic_path = null;
// if (isset($_FILES['profilePic']) && $_FILES['profilePic']['error'] === UPLOAD_ERR_OK) {
//     $upload_dir = 'uploads/';
//     if (!is_dir($upload_dir)) {
//         mkdir($upload_dir, 0777, true);
//     }
//     $file_tmp_name = $_FILES['profilePic']['tmp_name'];
//     $file_extension = pathinfo($_FILES['profilePic']['name'], PATHINFO_EXTENSION);
//     $unique_id = uniqid('profile_');
//     $profile_pic_path = $upload_dir . $unique_id . '.' . $file_extension;
//     move_uploaded_file($file_tmp_name, $profile_pic_path);
// }

if ($id > 0 && !empty($name)) {
    $sql = "UPDATE users SET name = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $name, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating profile: " . $conn->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input data or user ID."]);
}

$conn->close();
?>
