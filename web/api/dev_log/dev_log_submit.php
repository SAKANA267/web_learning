<?php
// 数据库配置
$servername = "localhost";
$username = "auiqu2k8a";
$password = "5g66zc6b";
$dbname = "auiqu2k8a";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 设置数据库连接的字符集为UTF-8
$conn->set_charset("utf8");

// 获取表单数据
$content = $_POST['content'];

// 防止SQL注入
$content = $conn->real_escape_string($content);

// 插入数据到数据库
$sql = "INSERT INTO devLog (change_description) VALUES ('$content') ";

if ($conn->query($sql) === TRUE) {
    echo "日志提交成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// 关闭数据库连接
$conn->close();
?>
