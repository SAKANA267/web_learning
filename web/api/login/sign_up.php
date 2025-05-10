<?php
// 数据库连接参数
$dsn = "mysql:host=localhost;dbname=auiqu2k8a;charset=utf8";
$username = "auiqu2k8a";
$password = "5g66zc6b";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $input_username = $_POST['username'];
        $input_password = $_POST['password'];

        // 使用password_hash函数创建密码的哈希版本
        $hashed_password = password_hash($input_password, PASSWORD_BCRYPT);

        // 准备SQL插入语句
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
        $stmt->bindParam(':username', $input_username);
        $stmt->bindParam(':password', $hashed_password);

        // 执行插入操作
        $stmt->execute();

        // 注册成功，重定向到登录页面
        header('Location: login.html');
        exit();
    }
} catch (PDOException $e) {
    // 数据库连接失败，显示错误信息
    echo "Connection failed: " . $e->getMessage();
}
?>