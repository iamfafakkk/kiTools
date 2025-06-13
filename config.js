// Konfigurasi untuk PHP Code Obfuscator
module.exports = {
    // Batas maksimal level enkripsi
    MAX_ENCRYPTION_LEVEL: 10,
    
    // Level yang direkomendasikan untuk keseimbangan keamanan dan performa
    RECOMMENDED_MAX_LEVEL: 5,
    
    // Ukuran file maksimal yang diizinkan (dalam bytes)
    MAX_FILE_SIZE: 1024 * 1024, // 1MB
    
    // Warning threshold untuk ukuran file (dalam bytes)
    FILE_SIZE_WARNING_THRESHOLD: 500 * 1024, // 500KB
    
    // Pesan rekomendasi berdasarkan level
    LEVEL_RECOMMENDATIONS: {
        0: [
            "Level 1-3: Cocok untuk proteksi dasar",
            "Level 4-5: Keamanan menengah, masih mudah di-maintain",
            "Level 6+: Keamanan tinggi, sulit untuk di-reverse"
        ],
        3: [
            "Level ini sudah memberikan proteksi yang baik",
            "Cocok untuk sebagian besar kebutuhan keamanan"
        ],
        5: [
            "⚠️ Anda mendekati batas level yang direkomendasikan",
            "Level tinggi dapat menyebabkan file menjadi sangat besar",
            "Pertimbangkan untuk menggunakan metode keamanan tambahan lainnya"
        ],
        8: [
            "🚨 Peringatan: Anda hampir mencapai batas maksimal enkripsi",
            "Level ini mungkin menyebabkan masalah performa dan ukuran file"
        ]
    },
    
    // Estimasi peningkatan ukuran file per level
    SIZE_INCREASE_FACTOR: {
        base: 1.5,      // Faktor dasar peningkatan ukuran
        perLevel: 1.3   // Faktor tambahan per level
    },
    
    // Konfigurasi cipher
    CIPHER_CONFIG: {
        algorithm: 'aes-256-cbc',
        iv: 'ABCDEF0123456789', // 16 bytes IV untuk kompatibilitas dengan PHP
        keyRange: {
            min: 9999,
            max: 999999
        }
    }
};
