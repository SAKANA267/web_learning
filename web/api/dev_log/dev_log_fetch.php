<?php
$dsn = "mysql:host=localhost;dbname=auiqu2k8a;charset=utf8";
$servername = "localhost";
$username = "auiqu2k8a";
$password = "5g66zc6b";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT timestamp,change_description FROM devLog ORDER BY timestamp DESC");
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($logs);
} catch(PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

?>
