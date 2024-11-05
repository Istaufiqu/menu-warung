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
