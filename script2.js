// Fungsi untuk mengirim order
function sendOrder() {
    let totalCost = 0;
    let orderDetails = '';
    let orderValid = true;
    let menuSelected = false;
    let errorMessages = [];

    // Ambil nama pelanggan
    const name = document.getElementById('name').value.trim();

    // Validasi nama
    if (!name) {
        errorMessages.push('Nama Anda wajib diisi!');
        orderValid = false;
    }

    // Daftar menu items dan harga
    const menuItems = [
        { id: 'burgerBeef', price: 9000, name: 'Burger Beef', qtyId: 'qtyBurgerBeef' },
        { id: 'burgerChicken', price: 9000, name: 'Burger Chicken', qtyId: 'qtyBurgerChicken' },
        { id: 'hotdog', price: 7000, name: 'Hotdog', qtyId: 'qtyHotdog' }
    ];

    // Proses setiap item menu yang dipilih
    menuItems.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const qtyInput = document.getElementById(item.qtyId);
        const quantity = parseInt(qtyInput.value) || 0;

        // Cek apakah item dipilih dan jumlah lebih dari 0
        if (checkbox.checked && quantity > 0) {
            totalCost += item.price * quantity;
            orderDetails += `${item.name}: ${quantity} x Rp.${item.price.toLocaleString()} = Rp.${(item.price * quantity).toLocaleString()}\n`;
            menuSelected = true;
        } else if (checkbox.checked && quantity === 0) {
            errorMessages.push(`Jumlah pesanan untuk ${item.name} tidak boleh 0!`);
            orderValid = false;
        }

        // Proses topping sayuran dan saus
        ['sayuran', 'saus'].forEach(type => {
            const toppings = document.querySelectorAll(`input[class="${type}${item.name.replace(' ', '')}"]:checked`);
            if (toppings.length > 0) {
                orderDetails += `Topping ${type.charAt(0).toUpperCase() + type.slice(1)} untuk ${item.name}:\n`;
                toppings.forEach(topping => {
                    orderDetails += `- ${topping.value}\n`;
                });
            }
        });
    });

    // Validasi apakah menu dipilih
    if (!menuSelected) {
        errorMessages.push('Pilih menu dan topping yang ingin Anda pesan.');
        orderValid = false;
    }

    // Jika ada error, tampilkan pesan error
    if (!orderValid) {
        alert(errorMessages.join('\n'));
        return;
    }

    // Kirim pesan ke WhatsApp
    const whatsappMessage = encodeURIComponent(`Pesanan baru dari: ${name}\n\n${orderDetails}\nTotal: Rp.${totalCost.toLocaleString()}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    // Update total harga di layar
    document.getElementById('totalCost').innerHTML = `Total: Rp.${totalCost.toLocaleString()}`;

    // Kirim pesan order dan beri notifikasi sukses
    alert(`Pesanan Anda berhasil dikirim!\n\nNama: ${name}\n${orderDetails}\nTotal: Rp.${totalCost.toLocaleString()}`);

    // Redirect ke halaman utama setelah 0.1 detik
    setTimeout(() => {
        window.location.href = "index.html";  // Ganti dengan URL halaman Home Anda
    }, 100);
}

// Fungsi untuk menghitung total harga secara dinamis saat ada perubahan
function updateTotalCost() {
    let totalCost = 0;

    // Daftar menu items dan harga
    const menuItems = [
        { id: 'burgerBeef', price: 9000, qtyId: 'qtyBurgerBeef' },
        { id: 'burgerChicken', price: 9000, qtyId: 'qtyBurgerChicken' },
        { id: 'hotdog', price: 7000, qtyId: 'qtyHotdog' }
    ];

    // Hitung total untuk menu items
    menuItems.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const qtyInput = document.getElementById(item.qtyId);
        const quantity = parseInt(qtyInput.value) || 0;

        if (checkbox.checked && quantity > 0) {
            totalCost += item.price * quantity;
        }
    });

    // Update harga total di layar
    document.getElementById('totalCost').innerHTML = `Total: Rp.${totalCost.toLocaleString()}`;
}

// Event listener untuk memperbarui total harga setiap kali ada perubahan input
document.querySelectorAll('input[type="checkbox"], input[type="number"]').forEach(input => {
    input.addEventListener('change', updateTotalCost);
});

// JavaScript untuk menampilkan topping hanya jika menu dicentang
document.addEventListener('DOMContentLoaded', function() {
    const burgerBeefCheckbox = document.getElementById('burgerBeef');
    const burgerBeefTopping = document.querySelector('.topping-section');

    // Menampilkan atau menyembunyikan topping berdasarkan status checkbox
    burgerBeefCheckbox.addEventListener('change', function() {
        burgerBeefTopping.style.display = burgerBeefCheckbox.checked ? 'block' : 'none';
    });
});

// Menyembunyikan tombol kembali saat scroll ke bawah dan menampilkannya saat scroll ke atas
const backButton = document.querySelector('.back-button');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scroll ke bawah, sembunyikan tombol
        backButton.style.opacity = 0;
    } else {
        // Scroll ke atas, tampilkan tombol
        backButton.style.opacity = 1;
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
