// Obfuscator specific functions and event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Reset form on page load
    resetObfuscatorForm();
    
    // Obfuscator form submission
    document.getElementById('obfuscatorForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const code = document.getElementById('phpCode').value;
        
        if (!code.trim()) {
            showAlert('Kode PHP tidak boleh kosong!', 'error');
            return;
        }

        showLoading(true, 'loading');
        hideAlert();

        try {
            const response = await fetch('/encrypt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, level: currentLevel })
            });

            const result = await response.json();

            if (result.success) {
                displayResult(result.data);
                currentLevel = result.data.level;
                lastEncryptedCode = result.data.encryptedCode;
                updateStats(result.data);
                updateValidationInfo(result.data);
                showAlert('Kode berhasil dienkripsi!', 'success');
            } else {
                showAlert(result.error || 'Terjadi kesalahan', 'error');
                if (result.validation) {
                    updateValidationInfo({ validation: result.validation });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Terjadi kesalahan koneksi', 'error');
        } finally {
            showLoading(false, 'loading');
        }
    });

    // Clear button
    document.getElementById('clearBtn').addEventListener('click', function() {
        resetObfuscatorForm();
    });

    // Copy button
    document.getElementById('copyBtn').addEventListener('click', function() {
        if (lastEncryptedCode) {
            copyToClipboard(lastEncryptedCode, 'Kode berhasil disalin ke clipboard!');
        }
    });
});

function resetObfuscatorForm() {
    currentLevel = 0;
    lastEncryptedCode = '';
    document.getElementById('phpCode').value = '';
    document.getElementById('result').innerHTML = '';
    
    const statsElement = document.getElementById('stats');
    if (statsElement) {
        statsElement.style.display = 'none';
    }
    
    const levelInfoElement = document.getElementById('levelInfo');
    if (levelInfoElement) {
        levelInfoElement.style.display = 'none';
    }
    
    const validationPanelElement = document.getElementById('validationPanel');
    if (validationPanelElement) {
        validationPanelElement.style.display = 'none';
    }
    
    const copyBtnElement = document.getElementById('copyBtn');
    if (copyBtnElement) {
        copyBtnElement.style.display = 'none';
    }
    
    const encryptBtnElement = document.getElementById('encryptBtn');
    if (encryptBtnElement) {
        encryptBtnElement.innerHTML = '🔒 Enkripsi Kode';
        encryptBtnElement.disabled = false;
    }
    
    hideAlert();
}

function displayResult(data) {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = `
        <div class="form-group">
            <label for="encryptedCode">Kode Terenkripsi (Level ${data.level}):</label>
            <textarea id="encryptedCode" readonly>${data.encryptedCode}</textarea>
        </div>
    `;
    
    // Update form untuk enkripsi level berikutnya
    document.getElementById('phpCode').value = data.encryptedCode;
    
    const levelInfoElement = document.getElementById('levelInfo');
    if (levelInfoElement) {
        levelInfoElement.style.display = 'block';
    }
    
    const currentLevelElement = document.getElementById('currentLevel');
    if (currentLevelElement) {
        currentLevelElement.textContent = data.level;
    }
    
    // Update progress bar
    updateProgressBar(data.level);
    
    // Update button text
    const encryptBtnElement = document.getElementById('encryptBtn');
    if (encryptBtnElement) {
        if (data.level >= (appLimits.maxLevel || 10)) {
            encryptBtnElement.innerHTML = `🚫 Batas Maksimal Tercapai`;
            encryptBtnElement.disabled = true;
        } else {
            encryptBtnElement.innerHTML = `🔒 Enkripsi ke Level ${data.level + 1}`;
            encryptBtnElement.disabled = false;
        }
    }
    
    const copyBtnElement = document.getElementById('copyBtn');
    if (copyBtnElement) {
        copyBtnElement.style.display = 'inline-block';
    }
}
