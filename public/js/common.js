// Variables
let currentLevel = 0;
let lastEncryptedCode = '';
let appLimits = {};

// Navigation Functions
function showPage(pageId) {
    // Redirect to the appropriate page
    const pages = {
        'home': 'index.html',
        'obfuscator': 'obfuscator.html',
        'deobfuscator': 'deobfuscator.html'
    };
    
    if (pages[pageId] && pages[pageId] !== getCurrentPageName()) {
        window.location.href = pages[pageId];
    }
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename || 'index.html';
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('show');
    }
}

// Utility Functions
function showAlert(message, type) {
    hideAlert();
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = message;
    alertDiv.id = 'alertMessage';
    
    const content = document.querySelector('.content');
    if (content) {
        content.insertBefore(alertDiv, content.firstChild);
        
        // Auto hide success messages
        if (type === 'success') {
            setTimeout(hideAlert, 3000);
        }
    }
}

function hideAlert() {
    const alertDiv = document.getElementById('alertMessage');
    if (alertDiv) {
        alertDiv.remove();
    }
}

function showLoading(show, loadingId = 'loading') {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}

function updateStats(data, statsId = 'stats') {
    const statsElement = document.getElementById(statsId);
    if (!statsElement) return;
    
    const originalSizeElement = document.getElementById('originalSize');
    const encryptedSizeElement = document.getElementById('encryptedSize');
    const encryptionLevelElement = document.getElementById('encryptionLevel');
    
    if (originalSizeElement) {
        originalSizeElement.textContent = new Blob([data.originalCode]).size;
    }
    if (encryptedSizeElement) {
        encryptedSizeElement.textContent = new Blob([data.encryptedCode]).size;
    }
    if (encryptionLevelElement) {
        encryptionLevelElement.textContent = data.level;
    }
    
    statsElement.style.display = 'grid';
}

function updateProgressBar(level) {
    const progressFill = document.getElementById('progressFill');
    if (!progressFill) return;
    
    const maxLevel = appLimits.maxLevel || 10;
    const percentage = Math.min((level / maxLevel) * 100, 100);
    progressFill.style.width = percentage + '%';
}

function updateLevelWarning(level) {
    const levelWarning = document.getElementById('levelWarning');
    if (!levelWarning) return;
    
    const recommendedMax = appLimits.recommendedMaxLevel || 5;
    const maxLevel = appLimits.maxLevel || 10;
    
    if (level >= maxLevel - 1) {
        levelWarning.innerHTML = '<div class="level-danger">🚨 <strong>Peringatan:</strong> Anda hampir mencapai batas maksimal enkripsi!</div>';
        levelWarning.style.display = 'block';
    } else if (level >= recommendedMax) {
        levelWarning.innerHTML = '<div class="level-warning">⚠️ <strong>Perhatian:</strong> Level enkripsi sudah cukup tinggi. Pertimbangkan untuk berhenti di sini.</div>';
        levelWarning.style.display = 'block';
    } else {
        levelWarning.style.display = 'none';
    }
}

function updateValidationInfo(data) {
    const validationPanel = document.getElementById('validationPanel');
    const validationContent = document.getElementById('validationContent');
    
    if (!validationPanel || !validationContent) return;
    
    if (!data.validation && !data.recommendations) {
        validationPanel.style.display = 'none';
        return;
    }
    
    let content = '';
    
    // Tampilkan warnings jika ada
    if (data.validation && data.validation.warnings && data.validation.warnings.length > 0) {
        content += '<div class="alert alert-warning"><strong>⚠️ Peringatan:</strong><ul>';
        data.validation.warnings.forEach(warning => {
            content += `<li>${warning}</li>`;
        });
        content += '</ul></div>';
    }
    
    // Tampilkan rekomendasi
    if (data.recommendations && data.recommendations.length > 0) {
        content += '<div class="recommendations"><h4>💡 Rekomendasi:</h4><ul>';
        data.recommendations.forEach(rec => {
            content += `<li>${rec}</li>`;
        });
        content += '</ul></div>';
    }
    
    // Tampilkan informasi ukuran file
    if (data.validation) {
        content += `
            <div class="alert alert-info">
                <strong>📊 Informasi File:</strong><br>
                Ukuran saat ini: ${Math.round(data.validation.codeSize / 1024)} KB<br>
                Estimasi setelah enkripsi: ${Math.round(data.validation.estimatedSize / 1024)} KB
            </div>
        `;
    }
    
    validationContent.innerHTML = content;
    validationPanel.style.display = content ? 'block' : 'none';
    
    // Update level warning
    updateLevelWarning(data.level || currentLevel);
}

// Copy to clipboard function
function copyToClipboard(text, successMessage = 'Berhasil disalin ke clipboard!') {
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(text).then(() => {
            showAlert(successMessage, 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text, successMessage);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(text, successMessage);
    }
}

function fallbackCopyToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showAlert(successMessage, 'success');
    } catch (err) {
        showAlert('Gagal menyalin ke clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Load app limits and info
async function loadAppInfo() {
    try {
        // Load app limits
        const limitsResponse = await fetch('/api/limits');
        if (limitsResponse.ok) {
            appLimits = await limitsResponse.json();
        }
        
        // Load app info
        const response = await fetch('/api/info');
        if (response.ok) {
            const info = await response.json();
            console.log('PHP Code Tools loaded:', info);
            console.log('App limits:', appLimits);
        }
        
    } catch (error) {
        console.warn('Warning: Could not load app info from server:', error.message);
        // Set default limits if server is not available
        appLimits = {
            maxLevel: 10,
            recommendedMaxLevel: 5,
            maxFileSize: 1048576, // 1MB
            maxFileSizeFormatted: '1MB'
        };
    }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load app info
    loadAppInfo();
    
    // Set active navigation based on current page
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (
            (currentPage === 'index.html' && page === 'home') ||
            (currentPage === 'obfuscator.html' && page === 'obfuscator') ||
            (currentPage === 'deobfuscator.html' && page === 'deobfuscator')
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Add click event listener
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
});
