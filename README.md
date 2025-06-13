# PHP Code Obfuscator - Node.js Version

Versi Node.js dari obfuscator PHP yang menggunakan enkripsi AES-256-CBC untuk mengamankan kode PHP Anda.

## 🚀 Fitur

- **Enkripsi AES-256-CBC**: Menggunakan algoritma enkripsi yang kuat
- **Multi-level Encryption**: Dapat melakukan enkripsi berlapis untuk keamanan ekstra
- **Web Interface**: Interface web yang modern dan responsif
- **Real-time Processing**: Enkripsi kode secara real-time
- **Copy to Clipboard**: Fitur salin hasil enkripsi dengan mudah
- **Statistics**: Menampilkan statistik ukuran file dan level enkripsi

## 📋 Prasyarat

- Node.js (versi 14 atau lebih baru)
- npm atau yarn

## 🛠️ Instalasi

1. Clone atau download repository ini
2. Masuk ke direktori proyek
3. Install dependencies:

```bash
npm install
```

## 🚀 Menjalankan Aplikasi

### Mode Production
```bash
npm start
```

### Mode Development (dengan auto-reload)
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📖 Cara Penggunaan

1. Buka browser dan akses `http://localhost:3000`
2. Masukkan kode PHP yang ingin dienkripsi
3. Klik tombol "Enkripsi Kode"
4. Hasil enkripsi akan ditampilkan
5. Anda dapat melakukan enkripsi berlapis dengan mengklik tombol enkripsi lagi
6. Gunakan tombol "Salin Hasil" untuk menyalin kode terenkripsi

## 🔧 API Endpoints

### POST /encrypt
Mengenkripsi kode PHP

**Request Body:**
```json
{
  "code": "<?php echo 'Hello World'; ?>",
  "level": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "originalCode": "<?php echo 'Hello World'; ?>",
    "encryptedCode": "<?php $encData = '...'; eval(openssl_decrypt($encData, 'aes-256-cbc', '...', 0, 'ABCDEF0123456789')); ?>",
    "level": 1,
    "key": "123456",
    "cipher": "aes-256-cbc"
  }
}
```

### GET /api/info
Mendapatkan informasi aplikasi

## 🔐 Cara Kerja Enkripsi

1. **Pembersihan Kode**: Menghapus tag PHP pembuka dan penutup
2. **Generate Key**: Membuat key acak antara 9999-999999
3. **Enkripsi AES**: Menggunakan AES-256-CBC dengan IV tetap
4. **Generate Wrapper**: Membuat kode PHP yang akan mendekripsi dan menjalankan kode asli

## ⚠️ Catatan Keamanan

- IV (Initialization Vector) menggunakan nilai tetap untuk kompatibilitas dengan PHP
- Key enkripsi di-generate secara acak setiap kali
- Semakin tinggi level enkripsi, semakin sulit untuk di-reverse
- Obfuscation ini tidak 100% aman dari reverse engineering yang canggih

## 🏗️ Struktur Proyek

```
encrypToolsPhp/
├── index.js              # Server Express.js utama
├── package.json           # Konfigurasi npm
├── example_code.php      # Kode PHP asli (referensi)
├── public/
│   └── index.html        # Interface web
└── README.md             # Dokumentasi
```

## 🤝 Kontribusi

Silakan berkontribusi dengan:
1. Fork repository ini
2. Buat branch fitur baru
3. Commit perubahan Anda
4. Push ke branch
5. Buat Pull Request

## 📝 License

ISC License

## 🐛 Bug Reports

Jika menemukan bug atau ingin request fitur, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan Node.js dan Express.js**
