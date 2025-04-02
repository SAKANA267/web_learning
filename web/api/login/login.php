<?php
session_start();

// 数据库连接参数
$dsn = "mysql:host=localhost;dbname=auiqu2k8a;charset=utf8";
$username = "auiqu2k8a";
$password = "5g66zc6b";

try {
    // 创建数据库连接
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $input_username = $_POST['username'];
        $input_password = $_POST['password'];

        // 准备SQL查询语句
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(':username', $input_username);
        $stmt->execute();

        // 获取查询结果
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($input_password, $user['password'])) {
            // 登录成功，存储用户信息到会话
            $_SESSION['username'] = $input_username;
            header('Location: welcome.php');
            exit();
        } else {
            // 登录失败，显示错误信息
            $error = 'Invalid username or password';
            header('Location: login.html?error=' . urlencode($error));
            exit();
        }
    }
} catch (PDOException $e) {
    // 数据库连接失败，显示错误信息
    echo "Connection failed: " . $e->getMessage();
}
?>
