# 🔐 kiTools Suite

Tool sederhana untuk enkripsi dan dekripsi kode PHP menggunakan algoritma AES-256-CBC. Aplikasi web dengan antarmuka yang mudah digunakan.

## ✨ Fitur

- 🔒 **PHP Obfuscator** - Enkripsi kode PHP dengan berbagai level keamanan
- 🔓 **PHP Deobfuscator** - Dekripsi kode yang telah dienkripsi
- 🌐 **Web Interface** - Antarmuka web yang responsif dan mudah digunakan
- 🔑 **Multi-level Encryption** - Enkripsi berlapis hingga 10 level
- 📱 **Mobile Friendly** - Dapat digunakan di smartphone dan tablet

## 📋 Prasyarat

- **Node.js** versi 14 atau lebih baru
- **npm** (biasanya sudah termasuk dengan Node.js)

## 📦 Instalasi

1. **Clone atau download repository ini**
   ```bash
   git clone https://github.com/iamfafakkk/kiTools
   cd kiTools
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   ```

4. **Buka browser** dan akses `http://localhost:3000`

## 🚀 Cara Penggunaan

### Mengenkripsi Kode PHP

1. Buka halaman **PHP Obfuscator** di `http://localhost:3000/obfuscator.html`
2. Masukkan kode PHP Anda di textarea
3. Pilih level enkripsi (1-10)
4. Klik tombol **"Enkripsi Kode"**
5. Salin hasil enkripsi yang muncul

### Mendekripsi Kode PHP

1. Buka halaman **PHP Deobfuscator** di `http://localhost:3000/deobfuscator.html`
2. Masukkan kode PHP yang sudah dienkripsi
3. Masukkan kunci dekripsi yang benar
4. Klik tombol **"Dekripsi Kode"**
5. Lihat kode PHP asli yang telah didekripsi

### Tips Penggunaan

- 💾 **Backup kode asli** sebelum enkripsi
- 🔑 **Simpan kunci dekripsi** dengan aman
- 🧪 **Test kode terenkripsi** sebelum digunakan di production
- 📊 **Gunakan level sesuai kebutuhan** - level tinggi = keamanan tinggi tapi ukuran file lebih besar

## 🛠️ Konfigurasi

Anda dapat mengubah konfigurasi di file `config.js`:

```javascript
module.exports = {
    MAX_ENCRYPTION_LEVEL: 10,        // Maksimal level enkripsi
    RECOMMENDED_MAX_LEVEL: 5,        // Level yang direkomendasikan
    MAX_FILE_SIZE: 1024 * 1024,      // Ukuran file maksimal (1MB)
};
```

### Mengubah Port

```bash
# Jalankan di port yang berbeda
PORT=8080 npm start
```

## 🔧 API Endpoints

### POST /encrypt
Enkripsi kode PHP via API

```bash
curl -X POST http://localhost:3000/encrypt \
  -H "Content-Type: application/json" \
  -d '{
    "code": "<?php echo \"Hello World\"; ?>",
    "level": 3
  }'
```

### POST /decrypt
Dekripsi kode PHP via API

```bash
curl -X POST http://localhost:3000/decrypt \
  -H "Content-Type: application/json" \
  -d '{
    "encryptedCode": "<?php $encData = \"...\"; eval(...); ?>",
    "key": "123456"
  }'
```

### GET /api/info
Informasi aplikasi

```bash
curl http://localhost:3000/api/info
```

## 🤝 Cara Kontribusi

Kami sangat menghargai kontribusi dari komunitas! Berikut cara untuk berkontribusi:

### 1. Fork Repository

```bash
# Fork repository di GitHub, kemudian clone
git clone https://github.com/iamfafakkk/kiTools
cd kiTools
```

### 2. Setup Development

```bash
# Install dependencies
npm install

# Install nodemon untuk development
npm install -g nodemon

# Jalankan dalam mode development
npm run dev
```

### 3. Buat Branch Fitur

```bash
# Buat branch untuk fitur baru
git checkout -b feature/nama-fitur

# Atau untuk bug fix
git checkout -b bugfix/nama-bug
```

### 4. Commit Perubahan

```bash
# Add dan commit perubahan
git add .
git commit -m "feat: menambahkan fitur baru"
```

**Format Commit Message:**
- `feat:` untuk fitur baru
- `fix:` untuk bug fix
- `docs:` untuk update dokumentasi
- `style:` untuk formatting
- `refactor:` untuk refactor kode

### 5. Push dan Pull Request

```bash
# Push ke branch Anda
git push origin feature/nama-fitur

# Buat Pull Request di GitHub
```

### Area yang Membutuhkan Kontribusi

- 🆕 **Fitur Baru**: Batch processing, custom cipher, upload file
- 🐛 **Bug Fixes**: Error handling, optimasi performa
- 📖 **Dokumentasi**: Tutorial, API docs, deployment guides
- 🧪 **Testing**: Unit tests, integration tests
- 🎨 **UI/UX**: Desain yang lebih baik, tema dark/light

### Guidelines Kontribusi

- Gunakan JavaScript Standard Style
- Dokumentasikan fungsi dan method penting
- Test semua fitur sebelum submit PR
- Berikan deskripsi yang jelas pada PR

## 🔒 Keamanan & Limitasi

### ⚠️ Catatan Penting

- **Bukan keamanan 100%**: Tool ini untuk obfuscation, bukan enkripsi tingkat militer
- **Backup penting**: Selalu simpan kode asli sebelum enkripsi
- **Key management**: Simpan kunci dekripsi di tempat yang aman
- **Testing**: Test kode terenkripsi sebelum production

### Limitasi

- Maksimal ukuran file: 1MB
- Memerlukan PHP dengan extension `openssl`
- Level tinggi dapat mempengaruhi performa

## 🆘 Troubleshooting

### Aplikasi tidak bisa dijalankan

```bash
# Periksa versi Node.js
node --version

# Install ulang dependencies
rm -rf node_modules package-lock.json
npm install

# Periksa port yang digunakan
lsof -i :3000  # macOS/Linux
```

### Error saat enkripsi/dekripsi

- **File terlalu besar**: Kurangi ukuran file
- **Key salah**: Pastikan menggunakan key yang benar
- **Format tidak valid**: Pastikan format kode PHP benar

## 📞 Support

- **Repository**: [GitHub Repository](https://github.com/iamfafakkk/kiTools)
- **Issues**: [GitHub Issues](https://github.com/iamfafakkk/kiTools/issues)
- **Email**: support@example.com

## 📄 License

Proyek ini menggunakan **ISC License**. Lihat file `LICENSE` untuk detail lengkap.

---

**🚀 Dibuat dengan ❤️ menggunakan Node.js dan Express.js**

*Happy Coding! 🎉*
