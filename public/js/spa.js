// Single Page Application Manager
class SPAManager {
    constructor() {
        this.currentPage = 'home';
        this.pages = {};
        this.init();
    }

    init() {
        // Initialize page templates
        this.definePages();
        
        // Handle navigation clicks
        this.setupNavigation();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            const page = event.state?.page || this.getPageFromHash();
            this.loadPage(page, false);
        });
        
        // Load initial page
        const initialPage = this.getPageFromHash();
        this.loadPage(initialPage, true);
    }

    getPageFromHash() {
        const hash = window.location.hash.substring(1);
        return hash || 'home';
    }

    setupNavigation() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link');
            if (link) {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page, true);
            }
        });
    }

    loadPage(page, updateHistory = true) {
        if (!this.pages[page]) {
            console.error(`Page "${page}" not found`);
            return;
        }

        // Show loading indicator
        this.showLoading();

        // Simulate loading delay for better UX
        setTimeout(() => {
            // Update active navigation
            this.updateActiveNav(page);
            
            // Load page content
            const appContainer = document.getElementById('app');
            appContainer.innerHTML = this.pages[page];
            
            // Update browser history
            if (updateHistory) {
                const url = page === 'home' ? '#home' : `#${page}`;
                history.pushState({ page }, '', url);
            }
            
            // Update page title
            this.updatePageTitle(page);
            
            // Initialize page-specific functionality
            this.initPageFunctionality(page);
            
            // Hide loading indicator
            this.hideLoading();
            
            this.currentPage = page;
        }, 300);
    }

    updateActiveNav(page) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page nav link
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updatePageTitle(page) {
        const titles = {
            home: 'PHP Tools - Beranda',
            obfuscator: 'PHP Tools - Obfuscator',
            deobfuscator: 'PHP Tools - Deobfuscator'
        };
        document.title = titles[page] || 'PHP Tools';
    }

    showLoading() {
        const loading = document.getElementById('loading');
        loading.classList.remove('hidden');
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
    }

    initPageFunctionality(page) {
        switch (page) {
            case 'obfuscator':
                this.initObfuscator();
                break;
            case 'deobfuscator':
                this.initDeobfuscator();
                break;
            case 'home':
                this.initHome();
                break;
        }
    }

    initHome() {
        // Add click handlers for feature cards
        const featureButtons = document.querySelectorAll('.feature-button');
        featureButtons.forEach(button => {
            const card = button.closest('.feature-card');
            const title = card.querySelector('.feature-title').textContent;
            
            if (title.includes('Obfuscator')) {
                button.onclick = () => this.loadPage('obfuscator', true);
            } else if (title.includes('Deobfuscator')) {
                button.onclick = () => this.loadPage('deobfuscator', true);
            }
        });
    }

    initObfuscator() {
        // Initialize obfuscator functionality
        const fileInput = document.getElementById('phpFile');
        const levelSelect = document.getElementById('obfuscationLevel');
        const processBtn = document.getElementById('processBtn');
        const outputTextarea = document.getElementById('outputCode');

        if (processBtn) {
            processBtn.addEventListener('click', () => {
                this.processObfuscation();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', () => {
                this.handleFileSelection();
            });
        }
    }

    initDeobfuscator() {
        // Initialize deobfuscator functionality
        const fileInput = document.getElementById('encryptedFile');
        const processBtn = document.getElementById('deobfuscateBtn');
        const outputTextarea = document.getElementById('outputCode');

        if (processBtn) {
            processBtn.addEventListener('click', () => {
                this.processDeobfuscation();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', () => {
                this.handleEncryptedFileSelection();
            });
        }
    }

    async processObfuscation() {
        const fileInput = document.getElementById('phpFile');
        const levelSelect = document.getElementById('obfuscationLevel');
        const outputTextarea = document.getElementById('outputCode');

        if (!fileInput.files[0]) {
            showAlert('Silakan pilih file PHP terlebih dahulu!', 'error');
            return;
        }

        const file = fileInput.files[0];
        const level = parseInt(levelSelect.value);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('level', level);

            const response = await fetch('/api/obfuscate', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.text();
                outputTextarea.value = result;
                showAlert('File berhasil diobfuscated!', 'success');
            } else {
                throw new Error('Gagal memproses file');
            }
        } catch (error) {
            showAlert('Error: ' + error.message, 'error');
        }
    }

    async processDeobfuscation() {
        const fileInput = document.getElementById('encryptedFile');
        const outputTextarea = document.getElementById('outputCode');

        if (!fileInput.files[0]) {
            showAlert('Silakan pilih file terenkripsi terlebih dahulu!', 'error');
            return;
        }

        const file = fileInput.files[0];

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/deobfuscate', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.text();
                outputTextarea.value = result;
                showAlert('File berhasil didekripsi!', 'success');
            } else {
                throw new Error('Gagal memproses file');
            }
        } catch (error) {
            showAlert('Error: ' + error.message, 'error');
        }
    }

    handleFileSelection() {
        const fileInput = document.getElementById('phpFile');
        const file = fileInput.files[0];
        
        if (file) {
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            if (file.size > 1024 * 1024) { // 1MB limit
                showAlert('Ukuran file terlalu besar! Maksimal 1MB.', 'error');
                fileInput.value = '';
                return;
            }
            showAlert(`File "${file.name}" (${fileSize}MB) berhasil dipilih.`, 'success');
        }
    }

    handleEncryptedFileSelection() {
        const fileInput = document.getElementById('encryptedFile');
        const file = fileInput.files[0];
        
        if (file) {
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            showAlert(`File "${file.name}" (${fileSize}MB) berhasil dipilih.`, 'success');
        }
    }

    definePages() {
        // Define page templates
        this.pages.home = `
            <div class="header">
                <div class="header-content">
                    <h1>🔐 PHP Code Tools</h1>
                    <p>Suite lengkap untuk enkripsi dan dekripsi kode PHP</p>
                </div>
            </div>

            <div class="content">
                <div class="home-grid">
                    <div class="feature-card">
                        <span class="feature-icon">🔒</span>
                        <h3 class="feature-title">PHP Obfuscator</h3>
                        <p class="feature-description">
                            Enkripsi kode PHP Anda menggunakan algoritma AES-256-CBC. 
                            Melindungi kode dari reverse engineering dengan multiple level enkripsi.
                        </p>
                        <button class="feature-button">
                            Mulai Enkripsi
                        </button>
                    </div>

                    <div class="feature-card">
                        <span class="feature-icon">🔓</span>
                        <h3 class="feature-title">PHP Deobfuscator</h3>
                        <p class="feature-description">
                            Dekripsi kode PHP yang telah dienkripsi sebelumnya. 
                            Mengembalikan kode ke bentuk aslinya untuk editing atau debugging.
                        </p>
                        <button class="feature-button">
                            Mulai Dekripsi
                        </button>
                    </div>

                    <div class="feature-card">
                        <span class="feature-icon">📊</span>
                        <h3 class="feature-title">Fitur Advanced</h3>
                        <p class="feature-description">
                            • Multi-level encryption<br>
                            • Validasi ukuran file<br>
                            • Rekomendasi keamanan<br>
                            • Progress tracking
                        </p>
                        <button class="feature-button" onclick="showAlert('Fitur advanced tersedia di semua tools!', 'info')">
                            Pelajari Lebih Lanjut
                        </button>
                    </div>
                </div>

                <div class="stats">
                    <div class="stat-card">
                        <div class="stat-number">10</div>
                        <div class="stat-label">Level Maksimal</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">5</div>
                        <div class="stat-label">Level Direkomendasikan</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">1MB</div>
                        <div class="stat-label">Ukuran File Maksimal</div>
                    </div>
                </div>
            </div>
        `;

        this.pages.obfuscator = `
            <div class="header">
                <div class="header-content">
                    <h1>🔒 PHP Obfuscator</h1>
                    <p>Enkripsi kode PHP Anda dengan algoritma AES-256-CBC</p>
                </div>
            </div>

            <div class="content">
                <div class="form-group">
                    <label for="phpFile">📁 Pilih File PHP:</label>
                    <input type="file" id="phpFile" accept=".php" class="file-input">
                    <small class="file-info">Format yang didukung: .php (Maksimal 1MB)</small>
                </div>

                <div class="form-group">
                    <label for="obfuscationLevel">🔢 Level Obfuscation:</label>
                    <select id="obfuscationLevel" class="form-select">
                        <option value="1">Level 1 - Basic</option>
                        <option value="2">Level 2 - Standard</option>
                        <option value="3">Level 3 - Advanced</option>
                        <option value="4">Level 4 - Professional</option>
                        <option value="5" selected>Level 5 - Recommended</option>
                        <option value="6">Level 6 - High Security</option>
                        <option value="7">Level 7 - Maximum</option>
                        <option value="8">Level 8 - Extreme</option>
                        <option value="9">Level 9 - Ultimate</option>
                        <option value="10">Level 10 - Paranoid</option>
                    </select>
                    <small class="level-info">Level tinggi = enkripsi lebih kuat, tapi proses lebih lambat</small>
                </div>

                <button id="processBtn" class="action-button">
                    🔒 Mulai Obfuscation
                </button>

                <div class="output-section">
                    <h3>📝 Hasil Obfuscation:</h3>
                    <textarea id="outputCode" class="output-textarea" readonly placeholder="Hasil obfuscation akan muncul di sini..."></textarea>
                    <div class="output-actions">
                        <button onclick="copyOutput()" class="copy-button">📋 Copy</button>
                        <button onclick="downloadOutput('obfuscated')" class="download-button">💾 Download</button>
                    </div>
                </div>
            </div>
        `;

        this.pages.deobfuscator = `
            <div class="header">
                <div class="header-content">
                    <h1>🔓 PHP Deobfuscator</h1>
                    <p>Dekripsi kode PHP yang telah dienkripsi</p>
                </div>
            </div>

            <div class="content">
                <div class="form-group">
                    <label for="encryptedFile">📁 Pilih File Terenkripsi:</label>
                    <input type="file" id="encryptedFile" accept=".php" class="file-input">
                    <small class="file-info">Format yang didukung: .php (File yang sudah diobfuscated)</small>
                </div>

                <button id="deobfuscateBtn" class="action-button">
                    🔓 Mulai Deobfuscation
                </button>

                <div class="output-section">
                    <h3>📝 Hasil Deobfuscation:</h3>
                    <textarea id="outputCode" class="output-textarea" readonly placeholder="Hasil deobfuscation akan muncul di sini..."></textarea>
                    <div class="output-actions">
                        <button onclick="copyOutput()" class="copy-button">📋 Copy</button>
                        <button onclick="downloadOutput('deobfuscated')" class="download-button">💾 Download</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize SPA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.spa = new SPAManager();
});
