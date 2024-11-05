// Fungsi untuk mengirim order
function sendOrder() {
    let totalCost = 0;
    let orderDetails = '';
    let orderValid = true;
    let menuSelected = false;
    let errorMessages = [];  // Untuk menyimpan pesan error

    // Ambil nama pelanggan
    const name = document.getElementById('name').value.trim();

    // Cek apakah nama sudah diisi
    if (!name) {
        errorMessages.push('Nama Anda wajib diisi!');
        orderValid = false;
    }

    // Daftar menu items dan harga
    const menuItems = [
        { id: 'burgerBeef', price: 9000, name: 'Burger Beef', qtyId: 'qtyBurgerBeef' },
        { id: 'burgerChicken', price: 9000, name: 'Burger Chicken', qtyId: 'qtyBurgerChicken' },
        { id: 'hotdog', price: 7000, name: 'Hotdog', qtyId: 'qtyHotdog' },
    ];

    // Proses setiap item menu yang dipilih
    menuItems.forEach(item => {
        const checkbox = document.getElementById(item.id);
        const qtyInput = document.getElementById(item.qtyId);
        const quantity = parseInt(qtyInput.value) || 0; // Jika input kosong, default ke 0

        if (checkbox.checked && quantity > 0) {
            totalCost += item.price * quantity;
            orderDetails += `${item.name}: ${quantity} x Rp.${item.price.toLocaleString()} = Rp.${(item.price * quantity).toLocaleString()}\n`;
            menuSelected = true;
        } else if (checkbox.checked && quantity === 0) {
            // Jika menu dicentang tetapi jumlahnya 0
            errorMessages.push(`Jumlah pesanan untuk ${item.name} tidak boleh 0!`);
            orderValid = false;
        }
    });

    // Validasi jika menu belum dicentang atau tidak ada yang dipilih
    if (!menuSelected) {
        errorMessages.push('Pilih menu dan topping yang ingin Anda pesan.');
        orderValid = false;
    }

    // Proses topping sayuran yang dipilih (tanpa biaya tambahan)
    const toppingsSayuran = document.querySelectorAll('input[name="sayuranTopping"]:checked');
    if (toppingsSayuran.length > 0) {
        orderDetails += 'Topping Sayuran:\n';
        toppingsSayuran.forEach(topping => {
            orderDetails += `- ${topping.value}\n`;
        });
    }

    // Proses topping saus yang dipilih (tanpa biaya tambahan)
    const toppingsSaus = document.querySelectorAll('input[name="sausTopping"]:checked');
    if (toppingsSaus.length > 0) {
        orderDetails += 'Topping Saus:\n';
        toppingsSaus.forEach(topping => {
            orderDetails += `- ${topping.value}\n`;
        });
    }

    // Jika ada error, tampilkan semua pesan error
    if (!orderValid) {
        alert(errorMessages.join('\n'));  // Gabungkan semua pesan error menjadi satu string dan tampilkan
        return;  // Jangan lanjutkan ke pengiriman pesan jika ada error
    }

    // Kirim pesan ke WhatsApp (gunakan API WhatsApp untuk mengirim pesan)
    const whatsappMessage = encodeURIComponent(`Pesanan baru dari: ${name}\n\n${orderDetails}\nTotal: Rp.${totalCost.toLocaleString()}`);
    const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');

    // Update total harga di layar
    document.getElementById('totalCost').innerHTML = `Total: Rp.${totalCost.toLocaleString()}`;

    // Kirim pesan order (bisa ditambahkan logika pengiriman ke server atau email di sini)
    alert(`Pesanan Anda berhasil dikirim!\n\nNama: ${name}\n${orderDetails}\nTotal: Rp.${totalCost.toLocaleString()}`);
    
    setTimeout(() => {
        window.location.href = "home.html";  // Ganti dengan URL halaman Home Anda
        }, 100);  // Redirect setelah 3 detik
}

// Fungsi untuk menghitung total harga secara dinamis saat ada perubahan
function updateTotalCost() {
    let totalCost = 0;

    // Daftar menu items dan harga
    const menuItems = [
        { id: 'burgerBeef', price: 9000, qtyId: 'qtyBurgerBeef' },
        { id: 'burgerChicken', price: 9000, qtyId: 'qtyBurgerChicken' },
        { id: 'hotdog', price: 7000, qtyId: 'qtyHotdog' },
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

    // Update harga total di layar (topping sayuran dan saus tidak menambah biaya)
    document.getElementById('totalCost').innerHTML = `Total: Rp.${totalCost.toLocaleString()}`;
}

// Event listener untuk memperbarui total harga setiap kali ada perubahan input
document.querySelectorAll('input[type="checkbox"], input[type="number"]').forEach(input => {
    input.addEventListener('change', updateTotalCost);
});
