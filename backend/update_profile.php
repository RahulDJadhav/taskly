<?php
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("localhost", "root", "", "taskly");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed"]);
    exit;
}

$name = $_POST['name'];
$email = $_POST['email'];
$profilePicPath = "";

// Check if a new profile picture was uploaded
if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['profile_pic']['tmp_name'];
    $fileName = basename($_FILES['profile_pic']['name']);
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (in_array($fileExt, $allowedExtensions)) {
        $newFileName = uniqid("profile_", true) . '.' . $fileExt;
        $uploadDir = 'uploads/';
        $destPath = $uploadDir . $newFileName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $profilePicPath = $destPath;
        } else {
            echo json_encode(["success" => false, "message" => "Failed to move uploaded file"]);
            exit;
        }
    } else {
        echo json_encode(["success" => false, "message" => "Unsupported file type"]);
        exit;
    }
}

// Prepare SQL with or without profile_pic update
if ($profilePicPath) {
    $stmt = $conn->prepare("UPDATE users SET name = ?, profile_pic = ? WHERE email = ?");
    $stmt->bind_param("sss", $name, $profilePicPath, $email);
} else {
    $stmt = $conn->prepare("UPDATE users SET name = ? WHERE email = ?");
    $stmt->bind_param("ss", $name, $email);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}

$stmt->close();
$conn->close();
?>
