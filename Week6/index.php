<?php
// Kết nối đến cơ sở dữ liệu
$host = 'localhost';
$dbname = 'cnWeb1';
$username = 'root';
$password = '';

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    die();
}

// Xử lý khi form được gửi đi
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Nhận dữ liệu từ form
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];

    // Lưu dữ liệu vào cơ sở dữ liệu
    $stmt = $db->prepare("INSERT INTO users (full_name, email) VALUES (:full_name, :email)");
    $stmt->bindParam(':full_name', $full_name);
    $stmt->bindParam(':email', $email);

    $stmt->execute();
}

// Lấy toàn bộ thông tin từ CSDL
$stmt = $db->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý người dùng</title>
</head>
<body>
    <h2>Nhập thông tin người dùng</h2>
    <form method="post" action="">
        <label for="full_name">Họ và tên:</label>
        <input type="text" name="full_name" id="full_name" required><br>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required><br>
        <input type="submit" value="Lưu">
    </form>

    <h2>Danh sách người dùng</h2>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Email</th>
        </tr>
        <?php foreach ($users as $user): ?>
        <tr>
            <td><?php echo $user['id']; ?></td>
            <td><?php echo $user['full_name']; ?></td>
            <td><?php echo $user['email']; ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
