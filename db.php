<?php
// Koneksi ke database MySQL
$servername = "localhost";
$username = "root";      // Username default untuk XAMPP
$password = "";          // Password default untuk XAMPP (kosong)
$dbname = "warung_db";   // Nama database yang Anda buat

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Mengecek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
