// Mengambil elemen-elemen yang diperlukan 
const orderForm = document.querySelector('form');
const totalCostDisplay = document.getElementById('totalCost');
const nameInput = document.getElementById('name');
const menuItems = document.querySelectorAll('.menu-item input[type="checkbox"]');
const qtyInputs = document.querySelectorAll('.menu-item input[type="number"]');
const toppingInputs = document.querySelectorAll('.topping-selection input[type="checkbox"]');

// Fungsi untuk menghitung total biaya
function calculateTotal() {
    let total = 0;

    // Menambahkan harga menu yang dipilih
    menuItems.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const price = parseInt(checkbox.dataset.price); // Mengambil harga dari data-attribute
            const qty = parseInt(qtyInputs[index].value) || 1;  // Mengatasi jika quantity tidak diisi
            total += price * qty;  // Menjumlahkan total berdasarkan harga dan jumlah
        }
    });

    // Menampilkan total biaya di halaman
    totalCostDisplay.textContent = `Total: Rp.${total.toLocaleString()}`;
}

// Fungsi untuk mendapatkan waktu saat ini dalam format HH:MM:SS
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('currentTime').textContent = `Waktu Saat Ini: ${timeString}`;
}

// Fungsi untuk mendapatkan tanggal dan waktu dalam format yang diinginkan
function getFormattedDateTime() {
    const now = new Date();

    // Daftar nama hari
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const dayName = daysOfWeek[now.getDay()]; // Mengambil nama hari
    
    // Mengambil tanggal, bulan, tahun
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0
    const year = now.getFullYear();

    // Mengambil jam, menit, detik
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Format tanggal dan waktu: Hari, DD/MM/YYYY | Jam: HH.MM.SS
    return `${dayName}, ${day}/${month}/${year} | Jam: ${hours}.${minutes}.${seconds}`;
}

// Fungsi untuk mengirimkan pesanan
function sendOrder() {
    const name = nameInput.value.trim();

    let validationMessages = [];

    // Validasi untuk memastikan nama diisi
    if (!name) {
        validationMessages.push('Nama Anda wajib diisi!');
    }
    
    // Validasi untuk memastikan ada menu yang dipilih
    const selectedMenuItems = [...menuItems].filter(item => item.checked);
    if (selectedMenuItems.length === 0) {
        validationMessages.push("Anda harus memilih setidaknya satu menu!");
    }

    // Validasi untuk memastikan quantity lebih dari 0
    let validQuantity = true;
    qtyInputs.forEach((input, index) => {
        if (menuItems[index].checked && parseInt(input.value) <= 0) {
            validQuantity = false;
        }
    });

    if (!validQuantity) {
        validationMessages.push("Jumlah harus lebih dari 0 untuk setiap item yang dipilih!");
    }

    // Jika ada masalah, tampilkan pesan peringatan satu kali
    if (validationMessages.length > 0) {
        alert(validationMessages.join("\n"));
        return;  // Jangan lanjutkan pengiriman pesanan
    }

    let orderDetails = `Pesanan oleh: ${name}\n`;
    orderDetails += `Tanggal: ${getFormattedDateTime()}\n\n`;  // Menambahkan tanggal dan waktu saat ini
    orderDetails += `Menu:\n`;

    let total = 0;

    // Menyusun detail pesanan dan menghitung total
    menuItems.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const itemName = checkbox.parentElement.querySelector('h3').textContent;
            const price = parseInt(checkbox.dataset.price);
            const qty = parseInt(qtyInputs[index].value) || 1; // Menangani jumlah default 1
            const itemTotal = price * qty;
            orderDetails += `- ${itemName} x ${qty} = Rp.${itemTotal.toLocaleString()}\n`;  // Format item menu
            total += itemTotal;
        }
    });

    // Menyertakan topping yang dipilih, jika ada
    if (toppingInputs.length > 0) {
        orderDetails += "\nTopping:\n";
        toppingInputs.forEach(topping => {
            if (topping.checked) {
                const toppingName = topping.value;
                orderDetails += `- ${toppingName}\n`;  // Format topping yang dipilih
            }
        });
    }

    // Menampilkan total pembayaran
    orderDetails += `\nTotal Pembayaran: Rp.${total.toLocaleString()}`;

    // Nomor WhatsApp tujuan, misalnya +6281234567890
    const phoneNumber = '6283875538702';  // Gantilah dengan nomor tujuan Anda, tanpa tanda "+" dan spasi

    // Encode the order details for the WhatsApp URL
    const whatsappMessage = encodeURIComponent(orderDetails);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Setelah pesanan dikirim, reset form
    orderForm.reset();

    // Reset total display setelah form di-reset
    totalCostDisplay.textContent = `Total: Rp.0`;

    // Memanggil kembali calculateTotal untuk memastikan total dihitung ulang dengan benar
    calculateTotal();

    // Tampilkan notifikasi rincian pesanan setelah pengiriman
    alert(`Pesanan Anda telah terkirim!\n\nRincian Pesanan:\n${orderDetails}`);

    setTimeout(() => {
        window.location.href = "index.html";  // Ganti dengan URL halaman Home Anda
    }, 100);  // Redirect setelah 3 detik
}

// Menambahkan event listener untuk perubahan pada menu dan topping
menuItems.forEach(item => {
    item.addEventListener('change', calculateTotal); // Menghitung total saat checkbox menu berubah
});

qtyInputs.forEach(input => {
    input.addEventListener('input', calculateTotal); // Menghitung total saat quantity berubah
});

toppingInputs.forEach(topping => {
    topping.addEventListener('change', calculateTotal); // Menghitung total saat topping berubah
});

// Menambahkan event listener untuk pengiriman form
orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendOrder();
});

// Memanggil fungsi calculateTotal pada awal agar total harga tampil (0)
calculateTotal();

// Memanggil fungsi updateTime setiap detik untuk menampilkan waktu real-time
setInterval(updateTime, 1000);
