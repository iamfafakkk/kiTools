const express = require('express');
const crypto = require('crypto');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Import konfigurasi
const {
    MAX_ENCRYPTION_LEVEL,
    RECOMMENDED_MAX_LEVEL,
    MAX_FILE_SIZE,
    FILE_SIZE_WARNING_THRESHOLD,
    LEVEL_RECOMMENDATIONS,
    SIZE_INCREASE_FACTOR,
    CIPHER_CONFIG
} = config;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fungsi untuk memvalidasi input
function validateEncryptionInput(code, level) {
    const errors = [];
    const warnings = [];
    
    // Validasi ukuran file
    const codeSize = Buffer.byteLength(code, 'utf8');
    if (codeSize > MAX_FILE_SIZE) {
        errors.push(`Ukuran kode terlalu besar (${Math.round(codeSize / 1024)}KB). Maksimal ${Math.round(MAX_FILE_SIZE / 1024)}KB`);
    }
    
    // Validasi level enkripsi
    if (level >= MAX_ENCRYPTION_LEVEL) {
        errors.push(`Level enkripsi maksimal adalah ${MAX_ENCRYPTION_LEVEL}. Level saat ini: ${level}`);
    }
    
    // Warning untuk level tinggi
    if (level >= RECOMMENDED_MAX_LEVEL && level < MAX_ENCRYPTION_LEVEL) {
        warnings.push(`Level enkripsi ${level} cukup tinggi. Level yang direkomendasikan adalah maksimal ${RECOMMENDED_MAX_LEVEL} untuk keseimbangan keamanan dan performa.`);
    }
    
    // Estimasi ukuran file setelah enkripsi
    const estimatedSize = Math.round(codeSize * SIZE_INCREASE_FACTOR.base * Math.pow(SIZE_INCREASE_FACTOR.perLevel, level));
    if (estimatedSize > FILE_SIZE_WARNING_THRESHOLD) {
        warnings.push(`Estimasi ukuran file setelah enkripsi: ${Math.round(estimatedSize / 1024)}KB. File mungkin akan menjadi sangat besar.`);
    }
    
    return { errors, warnings, codeSize, estimatedSize };
}

// Fungsi untuk mengenkripsi kode PHP
function encryptPHPCode(code, level = 0) {
    // Generate random key menggunakan konfigurasi
    const randomKey = Math.floor(Math.random() * (CIPHER_CONFIG.keyRange.max - CIPHER_CONFIG.keyRange.min + 1)) + CIPHER_CONFIG.keyRange.min;
    const key = randomKey.toString();
    const cipher = CIPHER_CONFIG.algorithm;
    const iv = CIPHER_CONFIG.iv;
    
    // Remove PHP tags
    const cleanCode = code.replace(/<\?(php)?|\?>/gi, '');
    
    // Create cipher menggunakan createCipheriv (recommended)
    const encrypt = crypto.createCipheriv(cipher, crypto.scryptSync(key, 'salt', 32), iv);
    let encrypted = encrypt.update(cleanCode, 'utf8', 'base64');
    encrypted += encrypt.final('base64');
    
    // Generate obfuscated PHP code dengan variabel yang lebih kompleks untuk level tinggi
    let variableName = '$encData';
    let methodCall = 'eval';
    
    if (level > 3) {
        // Gunakan nama variabel yang lebih rumit untuk level tinggi
        const randomVar = Math.random().toString(36).substring(2, 8);
        variableName = `$${randomVar}`;
        
        if (level > 6) {
            // Tambahkan obfuscation tambahan untuk level sangat tinggi
            methodCall = `${'eval'.split('').reverse().join('')}`;
            methodCall = 'eval'; // Tetap gunakan eval karena reverse tidak akan bekerja di PHP
        }
    }
    
    const obfuscatedCode = `<?php ${variableName} = '${encrypted}'; ${methodCall}(openssl_decrypt(${variableName}, '${cipher}', '${key}', 0, '${iv}')); ?>`;
    
    return {
        originalCode: code,
        encryptedCode: obfuscatedCode,
        level: level + 1,
        key: key,
        cipher: cipher,
        variableName: variableName
    };
}

// Route untuk enkripsi
app.post('/encrypt', (req, res) => {
    try {
        const { code, level = 0 } = req.body;
        
        if (!code || code.trim() === '') {
            return res.status(400).json({ 
                error: 'Kode PHP tidak boleh kosong' 
            });
        }
        
        // Validasi input
        const validation = validateEncryptionInput(code, level);
        
        // Jika ada error, kembalikan error
        if (validation.errors.length > 0) {
            return res.status(400).json({ 
                error: validation.errors.join('. '),
                validation: validation
            });
        }
        
        const result = encryptPHPCode(code, parseInt(level));
        
        // Tambahkan informasi validasi ke response
        result.validation = validation;
        result.recommendations = getEncryptionRecommendations(level, validation.codeSize);
        
        res.json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('Error encrypting code:', error);
        res.status(500).json({ 
            error: 'Terjadi kesalahan saat mengenkripsi kode' 
        });
    }
});

// Fungsi untuk memberikan rekomendasi enkripsi
function getEncryptionRecommendations(currentLevel, codeSize) {
    const recommendations = [];
    
    // Ambil rekomendasi dari konfigurasi berdasarkan level
    if (LEVEL_RECOMMENDATIONS[currentLevel]) {
        recommendations.push(...LEVEL_RECOMMENDATIONS[currentLevel]);
    } else if (currentLevel === 0) {
        recommendations.push(...LEVEL_RECOMMENDATIONS[0]);
    }
    
    // Rekomendasi berdasarkan level
    if (currentLevel >= RECOMMENDED_MAX_LEVEL) {
        recommendations.push("⚠️ Anda mendekati batas level yang direkomendasikan");
        recommendations.push("Level tinggi dapat menyebabkan file menjadi sangat besar");
        recommendations.push("Pertimbangkan untuk menggunakan metode keamanan tambahan lainnya");
    }
    
    // Rekomendasi berdasarkan ukuran file
    if (codeSize > 50 * 1024) { // 50KB
        recommendations.push("File berukuran besar. Pertimbangkan untuk memecah menjadi beberapa file kecil");
    }
    
    // Peringatan mendekati batas maksimal
    if (currentLevel >= MAX_ENCRYPTION_LEVEL - 2) {
        recommendations.push("🚨 Peringatan: Anda hampir mencapai batas maksimal enkripsi");
        recommendations.push("Level ini mungkin menyebabkan masalah performa dan ukuran file");
    }
    
    return recommendations;
}

// Route untuk mendapatkan informasi limit
app.get('/api/limits', (req, res) => {
    res.json({
        maxLevel: MAX_ENCRYPTION_LEVEL,
        recommendedMaxLevel: RECOMMENDED_MAX_LEVEL,
        maxFileSize: MAX_FILE_SIZE,
        maxFileSizeFormatted: `${Math.round(MAX_FILE_SIZE / 1024)}KB`
    });
});

// Route untuk API info
app.get('/api/info', (req, res) => {
    res.json({
        name: 'PHP Code Tools Suite',
        version: '1.0.0',
        description: 'Node.js suite for PHP code obfuscation and deobfuscation using AES-256-CBC encryption',
        features: ['obfuscator', 'deobfuscator', 'multi-level-encryption', 'validation']
    });
});

// Fungsi untuk mengekstrak data terenkripsi dari kode PHP
function extractEncryptedData(phpCode) {
    // Remove whitespace and normalize
    const cleanCode = phpCode.trim();
    
    // Pattern untuk mencocokkan kode yang diobfuscate
    // Mencari pattern: <?php $variableName = 'encryptedData'; eval(openssl_decrypt($variableName, 'cipher', 'key', 0, 'iv')); ?>
    const patterns = [
        // Pattern standar
        /\<\?php\s+\$(\w+)\s*=\s*'([^']+)';\s*eval\(openssl_decrypt\(\$\w+,\s*'([^']+)',\s*'([^']+)',\s*0,\s*'([^']+)'\)\);\s*\?\>/i,
        // Pattern dengan spasi ekstra
        /\<\?php\s+\$(\w+)\s*=\s*"([^"]+)";\s*eval\(openssl_decrypt\(\$\w+,\s*"([^"]+)",\s*"([^"]+)",\s*0,\s*"([^"]+)"\)\);\s*\?\>/i,
        // Pattern tanpa eval yang eksplisit
        /\$(\w+)\s*=\s*['"]([^'"]+)['"].*openssl_decrypt\(\$\w+,\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*0,\s*['"]([^'"]+)['"]\)/i
    ];
    
    for (const pattern of patterns) {
        const match = cleanCode.match(pattern);
        if (match) {
            return {
                variableName: match[1],
                encryptedData: match[2],
                cipher: match[3],
                key: match[4],
                iv: match[5]
            };
        }
    }
    
    return null;
}

// Fungsi untuk mendekripsi kode PHP
function decryptPHPCode(encryptedCode, providedKey = null) {
    try {
        // Validasi key terlebih dahulu - key wajib diisi
        if (!providedKey || providedKey.trim() === '') {
            throw new Error('Key dekripsi wajib diisi dan tidak boleh kosong');
        }
        
        // Ekstrak data dari kode PHP yang diobfuscate
        const extracted = extractEncryptedData(encryptedCode);
        
        if (!extracted) {
            throw new Error('Format kode PHP tidak valid atau tidak dapat dikenali. Pastikan kode tersebut dihasilkan oleh obfuscator ini.');
        }
        
        const { encryptedData, cipher, iv } = extracted;
        
        // Gunakan key yang diberikan user (tidak menggunakan key dari kode untuk keamanan)
        const decryptionKey = providedKey.trim();
        
        // Decrypt menggunakan crypto dengan createDecipheriv (recommended)
        const decipher = crypto.createDecipheriv(cipher, crypto.scryptSync(decryptionKey, 'salt', 32), iv);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        
        // Add PHP tags back
        const finalCode = `<?php\n${decrypted}\n?>`;
        
        return {
            success: true,
            originalCode: encryptedCode,
            decryptedCode: finalCode,
            extractedInfo: {
                cipher: cipher,
                keyUsed: decryptionKey,
                iv: iv,
                variableName: extracted.variableName
            }
        };
        
    } catch (error) {
        throw new Error(`Gagal mendekripsi: ${error.message}`);
    }
}

// Fungsi untuk memvalidasi input dekripsi
function validateDecryptionInput(encryptedCode, key) {
    const errors = [];
    const warnings = [];
    
    // Validasi kode terenkripsi
    if (!encryptedCode || encryptedCode.trim() === '') {
        errors.push('Kode PHP terenkripsi tidak boleh kosong');
    }
    
    // Validasi key - wajib diisi
    if (!key || key.trim() === '') {
        errors.push('Key dekripsi wajib diisi dan tidak boleh kosong');
        return { errors, warnings }; // Return early jika key kosong
    }
    
    // Cek apakah seperti kode PHP yang valid
    const cleanCode = encryptedCode.trim();
    if (!cleanCode.includes('<?php') && !cleanCode.includes('openssl_decrypt')) {
        warnings.push('Kode tidak terlihat seperti hasil dari obfuscator ini');
    }
    
    // Validasi ukuran
    const codeSize = Buffer.byteLength(encryptedCode, 'utf8');
    if (codeSize > MAX_FILE_SIZE) {
        errors.push(`Ukuran kode terlalu besar (${Math.round(codeSize / 1024)}KB). Maksimal ${Math.round(MAX_FILE_SIZE / 1024)}KB`);
    }
    
    return { errors, warnings, codeSize };
}

// Route untuk deobfuscator
app.post('/decrypt', (req, res) => {
    try {
        const { encryptedCode, key } = req.body;
        
        // Validasi input
        const validation = validateDecryptionInput(encryptedCode, key);
        
        // Jika ada error kritis, kembalikan error
        if (validation.errors.length > 0) {
            return res.status(400).json({
                error: validation.errors.join('. '),
                validation: validation
            });
        }
        
        // Lakukan dekripsi
        const result = decryptPHPCode(encryptedCode, key);
        
        // Tambahkan informasi validasi
        result.validation = validation;
        result.stats = {
            originalSize: Buffer.byteLength(encryptedCode, 'utf8'),
            decryptedSize: Buffer.byteLength(result.decryptedCode, 'utf8'),
            compressionRatio: Math.round((Buffer.byteLength(result.decryptedCode, 'utf8') / Buffer.byteLength(encryptedCode, 'utf8')) * 100)
        };
        
        res.json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('Error decrypting code:', error);
        res.status(500).json({ 
            error: error.message || 'Terjadi kesalahan saat mendekripsi kode',
            details: 'Pastikan kode dan key yang dimasukkan benar'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('PHP Code Obfuscator siap digunakan!');
});

module.exports = app;
