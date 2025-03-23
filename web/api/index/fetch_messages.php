<?php
$dsn = "mysql:host=localhost;dbname=auiqu2k8a;charset=utf8";
$servername = "localhost";
$username = "auiqu2k8a";
$password = "5g66zc6b";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT `name`, `message`,`timestamp` FROM messages WHERE `is_displayed` = 1 ORDER BY `id` DESC");
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
} catch(PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}

?>