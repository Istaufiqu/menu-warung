<?php
include('db.php');  // Menghubungkan ke file koneksi database

// Ambil data dari form
$name = $_POST['name'];  // Nama pelanggan
$item = $_POST['item'];  // Item yang dipilih
$quantity = $_POST['quantity'];  // Jumlah item
$total = $_POST['total'];  // Total harga

// SQL untuk memasukkan data ke tabel
$sql = "INSERT INTO orders (name, item, quantity, total) VALUES ('$name', '$item', '$quantity', '$total')";

if ($conn->query($sql) === TRUE) {
    echo "Pesanan berhasil disimpan!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();  // Menutup koneksi
?>
