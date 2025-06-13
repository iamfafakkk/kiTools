// Deobfuscator specific functions and event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Reset form on page load
    resetDeobfuscatorForm();
    
    // Deobfuscator form submission
    document.getElementById('deobfuscatorForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const encryptedCode = document.getElementById('encryptedPhpCode').value;
        const key = document.getElementById('decryptionKey').value;
        
        if (!encryptedCode.trim()) {
            showAlert('Kode PHP terenkripsi tidak boleh kosong!', 'error');
            return;
        }
        
        if (!key.trim()) {
            showAlert('Kunci dekripsi wajib diisi dan tidak boleh kosong!', 'error');
            return;
        }

        showDecryptLoading(true);
        hideAlert();

        try {
            const response = await fetch('/decrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    encryptedCode: encryptedCode,
                    key: key
                })
            });

            const result = await response.json();

            if (result.success) {
                displayDecryptResult(result.data);
                showAlert('Kode berhasil didekripsi!', 'success');
            } else {
                throw new Error(result.error || 'Gagal mendekripsi kode');
            }
            
        } catch (error) {
            console.error('Error decrypting code:', error);
            showAlert(error.message || 'Terjadi kesalahan saat mendekripsi kode', 'error');
        } finally {
            showDecryptLoading(false);
        }
    });

    // Clear button
    document.getElementById('clearDecryptBtn').addEventListener('click', function() {
        resetDeobfuscatorForm();
    });

    // Copy button
    document.getElementById('copyDecryptBtn').addEventListener('click', function() {
        const decryptedCodeElement = document.getElementById('decryptedCodeOutput');
        if (decryptedCodeElement && decryptedCodeElement.textContent) {
            copyToClipboard(decryptedCodeElement.textContent, 'Kode terdekripsi berhasil disalin ke clipboard!');
        } else {
            showAlert('Tidak ada kode untuk disalin', 'error');
        }
    });
});

function resetDeobfuscatorForm() {
    document.getElementById('encryptedPhpCode').value = '';
    document.getElementById('decryptionKey').value = '';
    document.getElementById('decryptResult').innerHTML = '';
    
    const copyBtnElement = document.getElementById('copyDecryptBtn');
    if (copyBtnElement) {
        copyBtnElement.style.display = 'none';
    }
    
    hideAlert();
}

function displayDecryptResult(data) {
    const resultDiv = document.getElementById('decryptResult');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
        <div class="alert alert-success">
            <strong>✅ Dekripsi Berhasil!</strong>
        </div>
        
        <div class="form-group">
            <label>Kode PHP Terdekripsi:</label>
            <textarea id="decryptedCodeOutput" readonly style="min-height: 200px; background-color: #f8f9fa;">${data.decryptedCode}</textarea>
        </div>
        
        <div class="level-info">
            <h4>ℹ️ Informasi Dekripsi:</h4>
            <p><strong>Cipher yang digunakan:</strong> ${data.extractedInfo.cipher}</p>
            <p><strong>Key yang digunakan:</strong> ${data.extractedInfo.keyUsed}</p>
            <p><strong>IV:</strong> ${data.extractedInfo.iv}</p>
            <p><strong>Nama variabel:</strong> $${data.extractedInfo.variableName}</p>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${Math.round(data.stats.originalSize / 1024 * 100) / 100}KB</div>
                <div class="stat-label">Ukuran Terenkripsi</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${Math.round(data.stats.decryptedSize / 1024 * 100) / 100}KB</div>
                <div class="stat-label">Ukuran Terdekripsi</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.stats.compressionRatio}%</div>
                <div class="stat-label">Rasio Ukuran</div>
            </div>
        </div>
    `;
    
    const copyBtnElement = document.getElementById('copyDecryptBtn');
    if (copyBtnElement) {
        copyBtnElement.style.display = 'inline-block';
    }
}

function showDecryptLoading(show) {
    const loadingElement = document.getElementById('decryptLoading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
    
    const decryptBtnElement = document.getElementById('decryptBtn');
    if (decryptBtnElement) {
        decryptBtnElement.disabled = show;
    }
}
