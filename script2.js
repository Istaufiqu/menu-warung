// Fungsi untuk mengirim order
function sendOrder() {
    let totalCost = 0;
    let orderDetails = '';
    let toppingDetails = ''; // Menyimpan informasi topping
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
            orderDetails += `- ${item.name} x ${quantity} = Rp.${(item.price * quantity).toLocaleString()}\n`;
            menuSelected = true;

            // Proses topping sayuran dan saus
            ['sayuran', 'saus'].forEach(type => {
                const toppings = document.querySelectorAll(`input[class="${type}${item.name.replace(' ', '')}"]:checked`);
                if (toppings.length > 0) {
                    toppingDetails += `${capitalizeFirstLetter(type)} untuk ${item.name}:\n`;
                    toppings.forEach(topping => {
                        toppingDetails += `- ${topping.value}\n`;
                    });
                    toppingDetails += '\n';  // Menambahkan jarak setelah setiap topping
                }
            });
        } else if (checkbox.checked && quantity === 0) {
            errorMessages.push(`Jumlah pesanan untuk ${item.name} tidak boleh 0!`);
            orderValid = false;
        }
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

    // Mendapatkan waktu saat ini
    const currentDate = new Date();
    const day = currentDate.toLocaleDateString('id-ID', { weekday: 'long' });
    const time = currentDate.toLocaleTimeString('id-ID');

    // Format output pesan untuk WhatsApp
    const formattedMessage = `
Pesanan oleh: ${name}

Tanggal: ${day}, ${currentDate.toLocaleDateString('id-ID')} | Jam: ${time}

Menu:
${orderDetails}

Topping:
${toppingDetails}

Total: Rp. ${totalCost.toLocaleString()}
    `;

    // Kirim pesan ke WhatsApp
    const whatsappMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    // Update total harga di layar
    document.getElementById('totalCost').innerHTML = `Total: Rp.${totalCost.toLocaleString()}`;

    // Kirim pesan order dan beri notifikasi sukses
    alert(`Pesanan Anda berhasil dikirim!\n\n${formattedMessage}`);

    // Redirect ke halaman utama setelah 0.1 detik
    setTimeout(() => {
        window.location.href = "index.html";  // Ganti dengan URL halaman Home Anda
    }, 100);
}

// Fungsi untuk mengkapitalisasi huruf pertama pada string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

// Menyimpan posisi scroll saat halaman di-scroll
window.addEventListener("scroll", function() {
    localStorage.setItem("scrollPosition", window.scrollY);
});

// Mengembalikan posisi scroll saat halaman dimuat
window.addEventListener("load", function() {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
        window.scrollTo(0, scrollPosition); // Mengembalikan posisi scroll
    }
});
