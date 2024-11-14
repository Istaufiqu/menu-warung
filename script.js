// Fungsi untuk menampilkan konten menu yang sesuai
function showMenu(menuId) {
    // Sembunyikan semua menu konten
    const menus = document.querySelectorAll('.menu-content');
    menus.forEach(menu => {
        menu.style.display = 'none';
    });

    // Tampilkan konten menu yang dipilih
    const selectedMenu = document.getElementById(menuId);
    selectedMenu.style.display = 'block';
}

// Fungsi untuk membuka dan menutup menu
function toggleMenu() {
    var menu1 = document.getElementById("menu1-nav");
    var menu2 = document.getElementById("menu2-nav");
    var openMenuBtn = document.getElementById("openMenuBtn");

    // Menampilkan menu dan menyembunyikan tombol
    if (menu1.style.display === "block" || menu2.style.display === "block") {
        menu1.style.display = "none";
        menu2.style.display = "none";
    } else {
        menu1.style.display = "block";
        menu2.style.display = "block";
        openMenuBtn.style.display = "none"; // Menyembunyikan tombol "Buka Menu"
    }
}
