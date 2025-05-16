# Coffeely

Coffeely adalah dependencies low-level untuk menghubungkan WhatsApp Web menggunakan protokol asli tanpa QR code, dengan pairing berbasis session key. Dirancang untuk developer yang ingin kendali penuh dalam membuat bot, automasi, atau aplikasi WhatsApp custom.

---

## Fitur Utama

- Noise protocol handshake lengkap (X25519, HKDF, ChaCha20-Poly1305)
- WebSocket connection ke WhatsApp Web (`wss://web.whatsapp.com/ws/chat`)
- Pairing tanpa QR code, menggunakan session keys
- Sistem session management dan resume
- Modular dan extensible untuk menambahkan fitur chat, group, media, dll

---

## Instalasi

Clone repositori:

```
git clone https://github.com/aternals/Coffeely.git
cd Coffeely
npm install
```
Pastikan Node.js versi 16+ sudah terpasang.


---

## Cara Menggunakan

Buat file test.js di root folder Coffeely, contoh sederhana untuk pairing:
```
import Coffeely from './src/index.js';

(async () => {
  try {
    const session = await Coffeely.pair();
    console.log('Berhasil pair dengan session:', session);
  } catch (error) {
    console.error('Gagal pairing:', error);
  }
})();
```
Jalankan dengan:
```
node test.js
```

---

## Arsitektur

Handshake Layer: Mengelola enkripsi Noise protocol untuk koneksi aman.

WebSocket Layer: Menghubungkan dan mempertahankan koneksi WebSocket ke WhatsApp Web.

Protobuf Layer (rencana): Encoding/decoding pesan WhatsApp menggunakan file .proto.

Session Management: Menyimpan dan memulihkan sesi tanpa perlu QR code ulang.

Modular API: Dasar untuk membangun fitur pesan, grup, media, dll secara custom.



---

## Roadmap & Pengembangan

Integrasi parsing dan encoding .proto WhatsApp Web

Implementasi fitur pengiriman dan penerimaan pesan (chat)

Manajemen grup dan reaksi

Pengelolaan media (gambar, video, audio)

Dokumentasi API lengkap



---

## Kontribusi
Kontribusi sangat welcome!
Fork repo ini dan buat pull request dengan fitur baru, perbaikan bug, atau dokumentasi yang lebih baik.
