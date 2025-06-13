# Struktur File PHP Tools

Aplikasi telah dipisahkan menjadi beberapa halaman terpisah untuk kemudahan maintenance dan navigasi.

## Struktur File

```
public/
├── index.html              # Halaman beranda/utama
├── obfuscator.html         # Halaman PHP Obfuscator
├── deobfuscator.html       # Halaman PHP Deobfuscator
├── css/
│   └── common.css          # Styling umum untuk semua halaman
├── js/
│   ├── common.js           # JavaScript umum (navigasi, utility functions)
│   ├── obfuscator.js       # JavaScript khusus halaman obfuscator
│   └── deobfuscator.js     # JavaScript khusus halaman deobfuscator
├── components/
│   └── nav.html            # Komponen navigasi (untuk referensi)
└── index_old.html          # Backup file index.html asli
```

## Halaman-halaman

### 1. index.html (Beranda)
- Halaman utama yang menampilkan overview aplikasi
- Menampilkan card feature untuk setiap tool
- Menampilkan statistik aplikasi
- Navigasi ke halaman lain

### 2. obfuscator.html (PHP Obfuscator)
- Form untuk input kode PHP
- Fitur enkripsi multi-level
- Progress bar dan validasi
- Statistik enkripsi

### 3. deobfuscator.html (PHP Deobfuscator)
- Form untuk input kode terenkripsi
- Input kunci dekripsi
- Hasil dekripsi dengan informasi detail
- Statistik dekripsi

## Komponen dan CSS

### CSS (common.css)
- Styling konsisten untuk semua halaman
- Responsive design
- CSS variables untuk tema
- Mobile-friendly navigation

### JavaScript

#### common.js
- Fungsi navigasi antar halaman
- Utility functions (showAlert, copyToClipboard, dll)
- Mobile menu toggle
- Loading dan progress management

#### obfuscator.js
- Event handlers untuk form obfuscator
- Fungsi enkripsi dan display hasil
- Reset form dan validasi

#### deobfuscator.js
- Event handlers untuk form deobfuscator
- Fungsi dekripsi dan display hasil
- Reset form dan validasi

## Fitur Navigasi

### Desktop Navigation
- Horizontal menu bar dengan links ke setiap halaman
- Active state highlighting
- Hover effects

### Mobile Navigation
- Hamburger menu toggle
- Collapsible navigation menu
- Touch-friendly buttons

## Keuntungan Struktur Baru

1. **Maintainability**: Setiap halaman memiliki file terpisah, mudah untuk di-maintain
2. **Performance**: Hanya load CSS dan JS yang diperlukan untuk setiap halaman
3. **Scalability**: Mudah menambahkan halaman atau fitur baru
4. **Code Organization**: Pemisahan yang jelas antara struktur, styling, dan functionality
5. **Reusability**: Komponen navigasi dan CSS dapat digunakan berulang
6. **SEO Friendly**: Setiap halaman memiliki URL dan title yang spesifik

## Cara Menambah Halaman Baru

1. Buat file HTML baru di folder `public/`
2. Include `common.css` dan `common.js`
3. Copy komponen navigasi dari file lain
4. Buat file JS khusus jika diperlukan
5. Update navigasi di semua file untuk menambahkan link baru

## Backup

File `index_old.html` berisi backup dari file index.html asli yang berisi semua halaman dalam satu file, untuk referensi jika diperlukan.
