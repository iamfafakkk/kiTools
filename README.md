# 🔐 kiTools Suite

Suite lengkap untuk enkripsi dan dekripsi kode PHP menggunakan algoritma AES-256-CBC. Aplikasi ini menyediakan tools untuk obfuscation dan deobfuscation kode PHP dengan antarmuka web yang modern dan user-friendly.

## ✨ Fitur Utama

### 🔒 PHP Obfuscator
- **Enkripsi AES-256-CBC**: Menggunakan algoritma enkripsi yang kuat dan aman
- **Multi-level Encryption**: Enkripsi berlapis hingga 10 level untuk keamanan maksimal
- **Smart Validation**: Validasi ukuran file dan level enkripsi secara otomatis
- **Size Estimation**: Estimasi ukuran file setelah enkripsi
- **Recommendations**: Rekomendasi level enkripsi berdasarkan kebutuhan
- **Real-time Processing**: Enkripsi kode secara real-time

### 🔓 PHP Deobfuscator  
- **Decryption Support**: Mendekripsi kode yang dienkripsi oleh obfuscator ini
- **Key Validation**: Validasi kunci dekripsi yang diperlukan
- **Format Detection**: Deteksi otomatis format kode terenkripsi
- **Statistics**: Menampilkan statistik dekripsi dan perbandingan ukuran
- **Error Handling**: Penanganan error yang informatif

### 🌐 Web Interface
- **Responsive Design**: Interface yang responsif untuk desktop dan mobile
- **Modern UI**: Antarmuka pengguna yang modern dan intuitif
- **Single Page Application**: Navigasi yang smooth tanpa reload halaman
- **Copy to Clipboard**: Fitur salin hasil dengan satu klik
- **Progress Indicators**: Indikator progress untuk operasi yang berjalan
- **Dark/Light Theme**: Tema yang dapat disesuaikan

### 📊 Advanced Features
- **File Size Limits**: Pembatasan ukuran file untuk performa optimal (max 1MB)
- **Compression Ratio**: Perhitungan rasio kompresi dan ekspansi file
- **API Endpoints**: RESTful API untuk integrasi dengan aplikasi lain
- **Configuration Management**: Konfigurasi yang dapat disesuaikan
- **Error Reporting**: Sistem pelaporan error yang detail

## 📋 Prasyarat Sistem

Sebelum menginstal aplikasi, pastikan sistem Anda memenuhi persyaratan berikut:

### Requirements Minimum
- **Node.js**: Versi 14.0.0 atau lebih baru
- **npm**: Versi 6.0.0 atau lebih baru (biasanya sudah termasuk dengan Node.js)
- **Operating System**: Windows 10+, macOS 10.14+, atau Linux Ubuntu 18.04+
- **RAM**: Minimum 512MB RAM tersedia
- **Storage**: Minimum 100MB ruang disk kosong

### Requirements yang Direkomendasikan
- **Node.js**: Versi 18.0.0 atau lebih baru (LTS)
- **npm**: Versi 8.0.0 atau lebih baru
- **RAM**: 1GB RAM atau lebih
- **Storage**: 500MB ruang disk kosong

## � Instalasi

### Metode 1: Clone dari Repository

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd encrypToolsPhp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verifikasi instalasi**
   ```bash
   npm run test-install
   ```

### Metode 2: Download ZIP

1. **Download** file ZIP dari repository
2. **Extract** file ZIP ke direktori yang diinginkan
3. **Buka terminal** di direktori tersebut
4. **Install dependencies**
   ```bash
   npm install
   ```

### Metode 3: Instalasi Global (Opsional)

Untuk menggunakan aplikasi dari mana saja:

```bash
npm install -g .
```

## 🛠️ Konfigurasi

### Konfigurasi Default
Aplikasi sudah dikonfigurasi dengan pengaturan default yang optimal. Namun, Anda dapat menyesuaikan konfigurasi di file `config.js`:

```javascript
// config.js
module.exports = {
    MAX_ENCRYPTION_LEVEL: 10,        // Level enkripsi maksimal
    RECOMMENDED_MAX_LEVEL: 5,        // Level yang direkomendasikan
    MAX_FILE_SIZE: 1024 * 1024,      // Ukuran file maksimal (1MB)
    // ... konfigurasi lainnya
};
```

### Environment Variables
Anda dapat mengatur port aplikasi menggunakan environment variable:

```bash
# Untuk Linux/macOS
export PORT=3000

# Untuk Windows
set PORT=3000
```

## 🚀 Menjalankan Aplikasi

### Mode Production (Direkomendasikan)
```bash
npm start
```

### Mode Development (dengan auto-reload)
```bash
npm run dev
```

### Menjalankan di Port Tertentu
```bash
PORT=8080 npm start
```

### Menjalankan di Background (Linux/macOS)
```bash
nohup npm start > app.log 2>&1 &
```

### Menjalankan sebagai Service (Linux)
```bash
# Menggunakan PM2 (install terlebih dahulu: npm install -g pm2)
pm2 start index.js --name "php-tools"
pm2 startup
pm2 save
```

## 🌐 Mengakses Aplikasi

Setelah aplikasi berjalan, akses melalui browser:
- **Local**: `http://localhost:3000`
- **Network**: `http://[IP-ADDRESS]:3000`

### Halaman yang Tersedia
- **Beranda**: `/` - Overview dan navigasi utama
- **Obfuscator**: `/obfuscator.html` - Tool untuk enkripsi kode PHP
- **Deobfuscator**: `/deobfuscator.html` - Tool untuk dekripsi kode PHP

## 📖 Cara Penggunaan

### 🔒 Menggunakan PHP Obfuscator

1. **Akses halaman obfuscator**
   - Buka browser dan navigasi ke `http://localhost:3000`
   - Klik menu "PHP Obfuscator" atau akses langsung `/obfuscator.html`

2. **Input kode PHP**
   - Masukkan atau paste kode PHP yang ingin dienkripsi di textarea
   - Pastikan kode menggunakan format PHP yang valid

3. **Pilih level enkripsi**
   - Level 1-3: Proteksi dasar, cocok untuk penggunaan umum
   - Level 4-5: Keamanan menengah, masih mudah maintenance
   - Level 6-10: Keamanan tinggi, sulit untuk di-reverse

4. **Lakukan enkripsi**
   - Klik tombol "Enkripsi Kode"
   - Sistem akan memvalidasi input dan memberikan rekomendasi
   - Hasil enkripsi akan ditampilkan di panel hasil

5. **Enkripsi berlapis (opsional)**
   - Untuk keamanan ekstra, Anda dapat melakukan enkripsi berlapis
   - Copy hasil enkripsi dan paste kembali ke input
   - Ulangi proses enkripsi untuk level yang lebih tinggi

6. **Salin hasil**
   - Gunakan tombol "Salin Hasil" untuk copy ke clipboard
   - Paste kode terenkripsi ke file PHP Anda

### 🔓 Menggunakan PHP Deobfuscator

1. **Akses halaman deobfuscator**
   - Navigasi ke menu "PHP Deobfuscator" atau akses `/deobfuscator.html`

2. **Input kode terenkripsi**
   - Paste kode PHP yang telah dienkripsi di textarea
   - Pastikan kode dalam format yang benar

3. **Masukkan kunci dekripsi**
   - Input kunci yang digunakan saat enkripsi
   - Kunci wajib diisi dan harus tepat

4. **Lakukan dekripsi**
   - Klik tombol "Dekripsi Kode"
   - Sistem akan memvalidasi format dan mencoba dekripsi

5. **Lihat hasil**
   - Kode PHP asli akan ditampilkan jika dekripsi berhasil
   - Statistik dekripsi akan ditampilkan (ukuran file, rasio, dll)

### 💡 Tips Penggunaan

- **Backup**: Selalu backup kode asli sebelum enkripsi
- **Key Management**: Simpan kunci dekripsi di tempat yang aman
- **Testing**: Test kode terenkripsi di environment development dulu
- **Level Selection**: Gunakan level sesuai kebutuhan keamanan
- **File Size**: Perhatikan ukuran file, level tinggi akan memperbesar ukuran

## 🔧 API Documentation

### Endpoint Overview
Aplikasi menyediakan RESTful API untuk integrasi dengan aplikasi lain:

### POST /encrypt
Mengenkripsi kode PHP

**Request:**
```bash
curl -X POST http://localhost:3000/encrypt \
  -H "Content-Type: application/json" \
  -d '{
    "code": "<?php echo \"Hello World\"; ?>",
    "level": 0
  }'
```

**Request Body:**
```json
{
  "code": "<?php echo 'Hello World'; ?>",
  "level": 0
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "originalCode": "<?php echo 'Hello World'; ?>",
    "encryptedCode": "<?php $encData = 'base64_encrypted_data'; eval(openssl_decrypt($encData, 'aes-256-cbc', 'key', 0, 'ABCDEF0123456789')); ?>",
    "level": 1,
    "key": "123456",
    "cipher": "aes-256-cbc",
    "variableName": "encData",
    "validation": {
      "errors": [],
      "warnings": [],
      "codeSize": 28,
      "estimatedSize": 156
    },
    "recommendations": [
      "Level 1-3: Cocok untuk proteksi dasar"
    ]
  }
}
```

### POST /decrypt
Mendekripsi kode PHP

**Request:**
```bash
curl -X POST http://localhost:3000/decrypt \
  -H "Content-Type: application/json" \
  -d '{
    "encryptedCode": "<?php $encData = \"...\"; eval(openssl_decrypt($encData, \"aes-256-cbc\", \"123456\", 0, \"ABCDEF0123456789\")); ?>",
    "key": "123456"
  }'
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "success": true,
    "originalCode": "<?php $encData = '...'; eval(...); ?>",
    "decryptedCode": "<?php\necho 'Hello World';\n?>",
    "extractedInfo": {
      "cipher": "aes-256-cbc",
      "keyUsed": "123456",
      "iv": "ABCDEF0123456789",
      "variableName": "encData"
    },
    "validation": {
      "errors": [],
      "warnings": [],
      "codeSize": 156
    },
    "stats": {
      "originalSize": 156,
      "decryptedSize": 28,
      "compressionRatio": 18
    }
  }
}
```

### GET /api/info
Mendapatkan informasi aplikasi

**Response:**
```json
{
  "name": "PHP Code Tools Suite",
  "version": "1.0.0",
  "description": "Node.js suite for PHP code obfuscation and deobfuscation using AES-256-CBC encryption",
  "features": ["obfuscator", "deobfuscator", "multi-level-encryption", "validation"]
}
```

### GET /api/limits
Mendapatkan informasi batasan sistem

**Response:**
```json
{
  "maxLevel": 10,
  "recommendedMaxLevel": 5,
  "maxFileSize": 1048576,
  "maxFileSizeFormatted": "1024KB"
}
```

### Error Responses
**400 Bad Request:**
```json
{
  "error": "Kode PHP tidak boleh kosong",
  "validation": {
    "errors": ["Kode PHP tidak boleh kosong"],
    "warnings": []
  }
}
```

**500 Internal Server Error:**
```json
{
  "error": "Terjadi kesalahan saat mengenkripsi kode"
}
```

## 🔐 Cara Kerja Enkripsi

### Algoritma Enkripsi
Aplikasi menggunakan **AES-256-CBC** (Advanced Encryption Standard) dengan konfigurasi berikut:
- **Algorithm**: AES-256-CBC
- **Key Size**: 256-bit (32 bytes)
- **IV (Initialization Vector)**: 16 bytes fixed untuk kompatibilitas PHP
- **Key Range**: 9999 - 999999 (generated secara random)

### Proses Enkripsi Step-by-Step

1. **Input Validation**
   - Validasi ukuran file (maksimal 1MB)
   - Validasi level enkripsi (maksimal 10)
   - Validasi format kode PHP

2. **Pembersihan Kode**
   - Menghapus tag PHP pembuka (`<?php`) dan penutup (`?>`)
   - Normalisasi whitespace dan formatting

3. **Key Generation**
   - Generate random key dalam rentang 9999-999999
   - Convert key ke string untuk proses enkripsi

4. **Enkripsi AES**
   - Menggunakan `crypto.createCipheriv()` dengan AES-256-CBC
   - Key derivation menggunakan `scryptSync()` dengan salt 'salt'
   - IV tetap `ABCDEF0123456789` untuk kompatibilitas

5. **Generate Wrapper Code**
   - Buat kode PHP yang berisi data terenkripsi
   - Include instruksi dekripsi dengan `openssl_decrypt()`
   - Gunakan `eval()` untuk eksekusi kode terdekripsi

### Proses Dekripsi

1. **Pattern Recognition**
   - Deteksi format kode terenkripsi dengan regex patterns
   - Extract komponen: variableName, encryptedData, cipher, key, IV

2. **Key Validation**
   - Validasi kunci yang diinput user (wajib diisi)
   - Cross-check dengan parameter enkripsi

3. **Dekripsi AES**
   - Menggunakan `crypto.createDecipheriv()`
   - Key derivation sama dengan proses enkripsi
   - Restore kode PHP asli

4. **Post-processing**
   - Tambahkan kembali tag PHP (`<?php` dan `?>`)
   - Format output untuk readability

### Multi-Level Encryption

Enkripsi berlapis dilakukan dengan cara:
1. **Level 1**: Enkripsi kode PHP asli
2. **Level 2**: Enkripsi hasil dari Level 1
3. **Level N**: Enkripsi hasil dari Level N-1

Setiap level menggunakan key yang berbeda dan menambah kompleksitas wrapper code.

## ⚠️ Catatan Keamanan & Limitasi

### Keamanan
- **IV Tetap**: IV menggunakan nilai tetap (`ABCDEF0123456789`) untuk kompatibilitas dengan PHP. Ini trade-off antara keamanan dan kompatibilitas
- **Key Management**: Key enkripsi di-generate secara random setiap kali proses enkripsi
- **Multi-Level**: Semakin tinggi level enkripsi, semakin sulit untuk di-reverse engineer
- **Source Protection**: Melindungi kode dari analisis statis sederhana

### Limitasi Keamanan
- **Tidak 100% Aman**: Obfuscation ini tidak 100% aman dari reverse engineering yang canggih
- **Runtime Dependency**: Memerlukan extension `openssl` di PHP untuk dekripsi
- **Performance Impact**: Level enkripsi tinggi dapat mempengaruhi performa eksekusi
- **Debugging**: Kode terenkripsi sulit untuk di-debug jika terjadi error

### Limitasi Teknis
- **File Size**: Maksimal 1MB per file untuk menjaga performa
- **PHP Version**: Memerlukan PHP dengan extension openssl aktif
- **Encryption Level**: Maksimal 10 level enkripsi
- **Memory Usage**: Level tinggi memerlukan lebih banyak memory

### Best Practices
1. **Backup**: Selalu simpan kode asli sebelum enkripsi
2. **Key Storage**: Simpan kunci dekripsi di tempat yang aman dan terpisah
3. **Testing**: Test kode terenkripsi di environment yang sama dengan production
4. **Level Selection**: Gunakan level enkripsi sesuai kebutuhan
5. **Documentation**: Dokumentasikan kunci dan level enkripsi yang digunakan

### Rekomendasi Penggunaan
- **Level 1-3**: Proteksi dasar, cocok untuk aplikasi umum
- **Level 4-5**: Keamanan menengah, balance antara keamanan dan performa
- **Level 6-8**: Keamanan tinggi, untuk aplikasi sensitif
- **Level 9-10**: Keamanan maksimal, hanya jika benar-benar diperlukan

## 🚨 Troubleshooting

### Masalah Umum dan Solusi

#### Aplikasi tidak bisa dijalankan
```bash
# Periksa versi Node.js
node --version

# Install ulang dependencies
rm -rf node_modules package-lock.json
npm install

# Periksa port yang digunakan
lsof -i :3000  # Linux/macOS
netstat -ano | findstr :3000  # Windows
```

#### Error saat enkripsi
- **File terlalu besar**: Kurangi ukuran file atau pecah menjadi beberapa file
- **Level maksimal**: Gunakan level di bawah 10
- **Format PHP tidak valid**: Pastikan kode menggunakan format PHP yang benar

#### Error saat dekripsi
- **Key salah**: Pastikan menggunakan key yang sama saat enkripsi
- **Format tidak valid**: Pastikan kode berasal dari obfuscator ini
- **Extension openssl**: Pastikan PHP memiliki extension openssl

#### Masalah performa
- **File besar**: Hindari file > 500KB
- **Level tinggi**: Gunakan level sesuai kebutuhan
- **Memory**: Pastikan server memiliki RAM yang cukup

### Log dan Debugging
```bash
# Jalankan dengan logging
DEBUG=* npm start

# Lihat log aplikasi
tail -f app.log

# Monitoring resource
top -p $(pgrep node)  # Linux
htop  # Linux dengan htop
```

## 🏗️ Struktur Proyek

```
encrypToolsPhp/
├── 📄 index.js                    # Server Express.js utama
├── 📄 config.js                   # Konfigurasi aplikasi
├── 📄 package.json                # Dependencies dan scripts npm
├── 📄 README.md                   # Dokumentasi (file ini)
├── 📄 example_code.php            # Contoh kode PHP untuk testing
├── 📄 example_decrypt.php         # Contoh kode dekripsi PHP
├── 📁 public/                     # Assets dan halaman web
│   ├── 📄 index.html              # Halaman beranda utama
│   ├── 📄 obfuscator.html         # Halaman PHP Obfuscator
│   ├── 📄 deobfuscator.html       # Halaman PHP Deobfuscator
│   ├── 📄 home.html               # Template halaman home
│   ├── 📄 STRUCTURE.md            # Dokumentasi struktur frontend
│   ├── 📁 css/
│   │   └── 📄 common.css          # Stylesheet utama (responsive)
│   ├── 📁 js/
│   │   ├── 📄 common.js           # JavaScript utilities dan navigasi
│   │   ├── 📄 spa.js              # Single Page Application logic
│   │   ├── 📄 obfuscator.js       # Logic halaman obfuscator
│   │   └── 📄 deobfuscator.js     # Logic halaman deobfuscator
│   └── 📁 components/
│       └── 📄 nav.html            # Komponen navigasi
└── 📁 backup_files/               # File backup untuk referensi
    ├── 📄 index_backup.html
    ├── 📄 index_fixed.html
    ├── 📄 index_new.html
    └── 📄 index_old.html
```

### Deskripsi File Utama

#### Backend
- **`index.js`**: Server utama Express.js dengan semua route dan logic enkripsi/dekripsi
- **`config.js`**: Konfigurasi aplikasi (level maksimal, ukuran file, rekomendasi, dll)
- **`package.json`**: Metadata proyek dan dependencies

#### Frontend
- **`public/index.html`**: Landing page dengan overview fitur dan navigasi
- **`public/obfuscator.html`**: Interface untuk enkripsi kode PHP
- **`public/deobfuscator.html`**: Interface untuk dekripsi kode PHP

#### Styling & Scripts
- **`public/css/common.css`**: Stylesheet responsif untuk semua halaman
- **`public/js/common.js`**: Utilities, navigasi, dan fungsi umum
- **`public/js/obfuscator.js`**: Logic khusus halaman obfuscator
- **`public/js/deobfuscator.js`**: Logic khusus halaman deobfuscator

#### File Contoh
- **`example_code.php`**: Contoh kode PHP untuk testing enkripsi
- **`example_decrypt.php`**: Template dekripsi untuk digunakan di aplikasi PHP

## 🔧 Konfigurasi Lanjutan

### Environment Variables
```bash
# .env file (opsional)
PORT=3000
NODE_ENV=production
MAX_FILE_SIZE=1048576
DEBUG_MODE=false
```

### Custom Configuration
Edit file `config.js` untuk menyesuaikan:
```javascript
module.exports = {
    MAX_ENCRYPTION_LEVEL: 10,        // Maksimal level enkripsi
    RECOMMENDED_MAX_LEVEL: 5,        // Level yang direkomendasikan
    MAX_FILE_SIZE: 1024 * 1024,      // Ukuran file maksimal (bytes)
    FILE_SIZE_WARNING_THRESHOLD: 500 * 1024,  // Threshold warning
    
    // Konfigurasi cipher
    CIPHER_CONFIG: {
        algorithm: 'aes-256-cbc',
        iv: 'ABCDEF0123456789',       // IV untuk kompatibilitas PHP
        keyRange: { min: 9999, max: 999999 }
    }
};
```

### Deployment Configuration

#### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### PM2 Ecosystem
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'php-tools',
    script: 'index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

## 🤝 Kontribusi

Kami sangat menghargai kontribusi dari komunitas! Berikut cara untuk berkontribusi:

### Cara Berkontribusi

1. **Fork Repository**
   ```bash
   # Fork repository di GitHub
   # Clone fork Anda
   git clone https://github.com/YOUR_USERNAME/encrypToolsPhp.git
   cd encrypToolsPhp
   ```

2. **Setup Development Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Install development tools
   npm install -g nodemon eslint prettier
   
   # Run in development mode
   npm run dev
   ```

3. **Buat Branch Fitur Baru**
   ```bash
   git checkout -b feature/nama-fitur
   # atau
   git checkout -b bugfix/nama-bug
   ```

4. **Commit Perubahan**
   ```bash
   git add .
   git commit -m "feat: menambahkan fitur baru"
   # Gunakan conventional commits
   ```

5. **Push dan Buat Pull Request**
   ```bash
   git push origin feature/nama-fitur
   # Buat Pull Request di GitHub
   ```

### Aturan Kontribusi

#### Code Style
- Gunakan **ESLint** dan **Prettier** untuk formatting
- Ikuti JavaScript Standard Style
- Dokumentasikan fungsi dan method penting
- Gunakan nama variabel yang deskriptif

#### Commit Message Convention
```
feat: menambahkan fitur baru
fix: memperbaiki bug
docs: update dokumentasi
style: formatting code
refactor: refactor kode
test: menambahkan test
chore: maintenance task
```

#### Pull Request Guidelines
- Berikan deskripsi yang jelas tentang perubahan
- Include screenshot jika ada perubahan UI
- Pastikan tidak ada conflict dengan branch main
- Test semua fitur sebelum submit

### Area Kontribusi

Berikut area yang membutuhkan kontribusi:

#### 🆕 Fitur Baru
- **Batch Processing**: Enkripsi multiple file sekaligus
- **Custom Cipher**: Support untuk algoritma enkripsi lain
- **API Authentication**: Sistem autentikasi untuk API
- **Database Logging**: Log aktivitas enkripsi/dekripsi
- **File Upload**: Upload file untuk dienkripsi
- **Export/Import**: Export settings dan import konfigurasi

#### 🐛 Bug Fixes
- Error handling yang lebih baik
- Optimasi performa untuk file besar
- Cross-browser compatibility
- Mobile responsive improvements

#### 📖 Dokumentasi
- Tutorial video
- API documentation dengan Swagger
- Deployment guides
- Best practices guide

#### 🧪 Testing
- Unit tests untuk fungsi enkripsi
- Integration tests untuk API
- End-to-end tests untuk UI
- Performance testing

### Development Setup

#### Prerequisites untuk Development
```bash
# Node.js 18+ with npm
node --version
npm --version

# Git
git --version

# Optional: PM2 untuk production testing
npm install -g pm2
```

#### Useful Scripts
```bash
# Development dengan hot reload
npm run dev

# Linting
npm run lint
npm run lint:fix

# Testing (jika ada)
npm test

# Build production (jika ada)
npm run build

# Check outdated packages
npm outdated
```

## 📝 License & Legal

### License
Proyek ini menggunakan **ISC License** - lihat file `LICENSE` untuk detail lengkap.

```
ISC License

Copyright (c) 2024 PHP Code Tools Suite

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

### Disclaimer
- **Penggunaan Risiko Sendiri**: Software ini disediakan "as is" tanpa warranty
- **Keamanan**: Tidak ada jaminan 100% keamanan dari reverse engineering
- **Kompatibilitas**: Ditest pada Node.js 14+ dan browser modern
- **Support**: Community support melalui GitHub Issues

### Credits
- **Node.js & Express.js**: Framework utama
- **Crypto Module**: Native Node.js crypto untuk enkripsi
- **Frontend**: Vanilla JavaScript dengan CSS modern
- **Icons**: Emoji icons untuk UI yang friendly

## 🐛 Bug Reports & Feature Requests

### Melaporkan Bug
Jika menemukan bug, silakan buat issue dengan informasi:

1. **Langkah untuk reproduce bug**
2. **Expected behavior vs actual behavior**
3. **Environment**: OS, Node.js version, browser
4. **Screenshot atau log error** (jika ada)
5. **Code sample** yang menyebabkan error

### Request Fitur Baru
Untuk request fitur baru:

1. **Deskripsi fitur** yang diinginkan
2. **Use case** atau alasan mengapa fitur ini berguna
3. **Mockup atau contoh** implementasi (opsional)
4. **Priority level**: High, Medium, Low

### Template Issue
```markdown
## Bug Report / Feature Request

### Type
- [ ] Bug Report
- [ ] Feature Request

### Description
[Deskripsi detail]

### Environment
- OS: [e.g., macOS 12.0]
- Node.js: [e.g., 18.12.0]
- Browser: [e.g., Chrome 108]

### Steps to Reproduce (untuk bug)
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[Apa yang diharapkan terjadi]

### Actual Behavior
[Apa yang sebenarnya terjadi]

### Additional Context
[Screenshot, log, atau informasi tambahan]
```

---

## 📞 Contact & Support

- **Repository**: [GitHub Repository]
- **Issues**: [GitHub Issues]
- **Email**: [Support Email]
- **Documentation**: [Online Documentation]

**🚀 Dibuat dengan ❤️ menggunakan Node.js, Express.js, dan teknologi web modern**

---

*Happy Coding! 🎉*
