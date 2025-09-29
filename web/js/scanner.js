/**
 * SKY Port Scanner - Web Interface JavaScript
 * Funcionalidades dinâmicas para a interface web
 */

class SkyPortScanner {
    constructor() {
        this.isScanning = false;
        this.currentScan = null;
        this.portTemplates = {
            basic: '21,22,23,25,53,80,135,443,445,3389',
            common: '21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080',
            web: '80,443,8000,8080,8081,8443,8888,9000,9001,9090',
            database: '1433,1434,3306,5432,6379,27017,1521,5984',
            remote: '22,23,3389,5900,5901',
            security: '21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080',
            email: '25,110,143,465,587,993,995',
            development: '3000,3001,4000,5000,5001,8000,8080,8081,9000,9001,9090'
        };

        this.knownServices = {
            21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',
            80: 'HTTP', 110: 'POP3', 135: 'RPC', 139: 'NetBIOS', 143: 'IMAP',
            443: 'HTTPS', 445: 'SMB', 465: 'SMTP Secure', 587: 'SMTP Alternative',
            993: 'IMAPS', 995: 'POP3S', 1433: 'MSSQL', 1434: 'MSSQL Monitor',
            1521: 'Oracle DB', 3000: 'Node.js', 3001: 'Node.js Alt', 3306: 'MySQL',
            3389: 'RDP', 4000: 'Ruby on Rails', 5000: 'Flask/Python', 5432: 'PostgreSQL',
            5900: 'VNC', 5901: 'VNC Web', 6379: 'Redis', 8000: 'Django/Python',
            8080: 'HTTP-Proxy', 8081: 'HTTP Alt', 8443: 'HTTPS Alt', 8888: 'HTTP Alt',
            9000: 'Development', 9001: 'Development Alt', 27017: 'MongoDB'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.validateInputs();
    }

    setupEventListeners() {
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const templateName = this.getTemplateNameFromCard(card);
                this.useTemplate(templateName);
            });
        });

        // Form validation em tempo real
        const hostInput = document.getElementById('target-host');
        const portsInput = document.getElementById('target-ports');

        hostInput?.addEventListener('input', () => this.validateHost());
        portsInput?.addEventListener('input', () => this.validatePorts());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.startScan();
            } else if (e.key === 'Escape' && this.isScanning) {
                this.stopScan();
            }
        });
    }

    setupAnimations() {
        // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .template-card, .scanner-section').forEach(el => {
            observer.observe(el);
        });
    }

    validateHost() {
        const hostInput = document.getElementById('target-host');
        const host = hostInput.value.trim();

        if (!host) return;

        // Regex para validar IP ou DNS
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const dnsRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;

        if (ipRegex.test(host) || dnsRegex.test(host)) {
            hostInput.style.borderColor = '#28a745';
            this.showValidationMessage('host-validation', '✅ Host válido', 'success');
        } else {
            hostInput.style.borderColor = '#dc3545';
            this.showValidationMessage('host-validation', '❌ Formato inválido', 'error');
        }
    }

    validatePorts() {
        const portsInput = document.getElementById('target-ports');
        const ports = portsInput.value.trim();

        if (!ports) return;

        try {
            const portList = ports.split(',').map(p => {
                const port = parseInt(p.trim());
                if (isNaN(port) || port < 1 || port > 65535) {
                    throw new Error('Porta inválida');
                }
                return port;
            });

            portsInput.style.borderColor = '#28a745';
            this.showValidationMessage('ports-validation', `✅ ${portList.length} portas válidas`, 'success');
        } catch (error) {
            portsInput.style.borderColor = '#dc3545';
            this.showValidationMessage('ports-validation', '❌ Formato inválido', 'error');
        }
    }

    showValidationMessage(id, message, type) {
        let msgEl = document.getElementById(id);
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.id = id;
            msgEl.style.fontSize = '0.8rem';
            msgEl.style.marginTop = '5px';

            const input = type === 'success' ?
                (id.includes('host') ? document.getElementById('target-host') : document.getElementById('target-ports')) :
                (id.includes('host') ? document.getElementById('target-host') : document.getElementById('target-ports'));

            input.parentNode.appendChild(msgEl);
        }

        msgEl.textContent = message;
        msgEl.style.color = type === 'success' ? '#28a745' : '#dc3545';
    }

    getTemplateNameFromCard(card) {
        const title = card.querySelector('h4').textContent;
        if (title.includes('TOP 10')) return 'basic';
        if (title.includes('TOP 20')) return 'common';
        if (title.includes('Web')) return 'web';
        if (title.includes('Bancos')) return 'database';
        if (title.includes('Remoto')) return 'remote';
        if (title.includes('Segurança')) return 'security';
        if (title.includes('Email')) return 'email';
        if (title.includes('Development')) return 'development';
        return 'basic';
    }

    useTemplate(templateName) {
        const ports = this.portTemplates[templateName];
        const portsInput = document.getElementById('target-ports');

        // Animação de preenchimento
        portsInput.style.transform = 'scale(1.05)';
        portsInput.style.borderColor = '#55c2d6';

        setTimeout(() => {
            portsInput.value = ports;
            portsInput.style.transform = 'scale(1)';
            this.validatePorts();
        }, 150);

        // Feedback visual no card
        const cards = document.querySelectorAll('.template-card');
        cards.forEach(card => card.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
    }

    async startScan() {
        if (this.isScanning) return;

        const host = document.getElementById('target-host').value.trim();
        const ports = document.getElementById('target-ports').value.trim();

        if (!host || !ports) {
            this.showNotification('⚠️ Por favor, preencha o host e as portas!', 'warning');
            return;
        }

        this.isScanning = true;
        this.showLoading();

        try {
            // Em uma implementação real, aqui faria a chamada para o backend
            const results = await this.simulateScan(host, ports);
            this.displayResults(results);
        } catch (error) {
            this.showNotification('❌ Erro durante o scan: ' + error.message, 'error');
        } finally {
            this.isScanning = false;
            this.hideLoading();
        }
    }

    async quickScan() {
        const host = document.getElementById('target-host').value.trim();

        if (!host) {
            this.showNotification('⚠️ Por favor, preencha o host!', 'warning');
            return;
        }

        document.getElementById('target-ports').value = this.portTemplates.common;
        await this.startScan();
    }

    async pingTest() {
        const host = document.getElementById('target-host').value.trim();

        if (!host) {
            this.showNotification('⚠️ Por favor, preencha o host!', 'warning');
            return;
        }

        this.showLoading();

        try {
            const result = await this.simulatePing(host);
            this.displayPingResults(result);
        } catch (error) {
            this.showNotification('❌ Erro no ping: ' + error.message, 'error');
        } finally {
            this.hideLoading();
        }
    }

    stopScan() {
        if (this.currentScan) {
            this.currentScan.abort();
        }
        this.isScanning = false;
        this.hideLoading();
        this.showNotification('🛑 Scan cancelado', 'info');
    }

    async simulateScan(host, ports) {
        const portList = ports.split(',').map(p => parseInt(p.trim()));
        const results = {
            host,
            timestamp: new Date(),
            os: this.detectOS(),
            ttl: Math.floor(Math.random() * 64) + 64,
            ports: []
        };

        // Simula o tempo de scan
        for (let i = 0; i < portList.length; i++) {
            await this.delay(200); // Simula tempo de verificação por porta

            const port = portList[i];
            const isOpen = Math.random() > 0.7; // 30% chance de estar aberta
            const service = this.knownServices[port] || 'Desconhecido';

            results.ports.push({
                port,
                status: isOpen ? 'open' : 'closed',
                service
            });

            // Atualiza progresso
            this.updateProgress((i + 1) / portList.length * 100);
        }

        return results;
    }

    async simulatePing(host) {
        await this.delay(1500);

        return {
            host,
            success: Math.random() > 0.2, // 80% de sucesso
            time: Math.floor(Math.random() * 100) + 10,
            os: this.detectOS(),
            ttl: Math.floor(Math.random() * 64) + 64
        };
    }

    detectOS() {
        const oses = [
            { name: '🐧 Linux/Unix', ttl: '≤ 64' },
            { name: '🪟 Windows', ttl: '≤ 128' },
            { name: '🍎 Cisco/Network Device', ttl: '≤ 255' }
        ];

        return oses[Math.floor(Math.random() * oses.length)];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateProgress(percentage) {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        const results = document.getElementById('results');

        if (loading) loading.classList.add('active');
        if (results) results.classList.remove('active');

        // Adiciona barra de progresso
        const loadingContent = loading.querySelector('p');
        if (loadingContent && !loading.querySelector('.progress-container')) {
            const progressHTML = `
                <div class="progress-container" style="width: 200px; height: 6px; background: #f0f0f0; border-radius: 3px; margin: 10px auto;">
                    <div class="progress-bar" style="height: 100%; background: #55c2d6; border-radius: 3px; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            `;
            loadingContent.insertAdjacentHTML('afterend', progressHTML);
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.remove('active');
    }

    displayResults(results) {
        const resultsDiv = document.getElementById('results-content');
        const showClosed = document.getElementById('show-closed').checked;

        let html = `
            <div class="result-item">
                <strong>🎯 Host:</strong> ${results.host}<br>
                <strong>📅 Data:</strong> ${results.timestamp.toLocaleString()}<br>
                <strong>🔍 SO Detectado:</strong> ${results.os.name} (TTL ${results.os.ttl})<br>
                <strong>📊 TTL:</strong> ${results.ttl}
            </div>
        `;

        const openPorts = results.ports.filter(p => p.status === 'open');
        const closedPorts = results.ports.filter(p => p.status === 'closed');

        results.ports.forEach(portResult => {
            if (portResult.status === 'open' || showClosed) {
                const statusClass = portResult.status === 'open' ? 'result-open' : 'result-closed';
                const icon = portResult.status === 'open' ? '✅' : '❌';
                const status = portResult.status === 'open' ? 'ABERTA' : 'FECHADA';

                html += `
                    <div class="result-item ${statusClass}">
                        ${icon} <strong>Porta ${portResult.port}:</strong> ${status} - Serviço: ${portResult.service}
                    </div>
                `;
            }
        });

        html += `
            <div class="result-item">
                <strong>📊 Resumo:</strong> ${openPorts.length} abertas, ${closedPorts.length} fechadas
            </div>
        `;

        resultsDiv.innerHTML = html;
        document.getElementById('results').classList.add('active');

        // Scroll para resultados
        document.getElementById('results').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    displayPingResults(result) {
        const resultsDiv = document.getElementById('results-content');

        const status = result.success ? 'sucesso' : 'falha';
        const statusClass = result.success ? 'result-open' : 'result-closed';
        const icon = result.success ? '✅' : '❌';

        let html = `
            <div class="result-item ${statusClass}">
                <strong>🏓 Teste de Ping:</strong> ${result.host}<br>
                ${icon} ${result.success ? 'Host respondeu ao ping' : 'Host não respondeu ao ping'}
        `;

        if (result.success) {
            html += `
                <br><strong>🔍 SO Detectado:</strong> ${result.os.name} (TTL ${result.os.ttl})
                <br><strong>📊 TTL:</strong> ${result.ttl}
                <br><strong>⏱️ Tempo:</strong> ${result.time}ms
            `;
        }

        html += '</div>';

        resultsDiv.innerHTML = html;
        document.getElementById('results').classList.add('active');
    }

    showNotification(message, type = 'info') {
        // Remove notificação anterior se existir
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        // Cores por tipo
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };

        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    exportResults() {
        const resultsContent = document.getElementById('results-content');
        if (!resultsContent) return;

        const results = resultsContent.textContent;
        const blob = new Blob([results], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `sky-scan-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('📄 Resultados exportados com sucesso!', 'success');
    }
}

// Inicializa a aplicação quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    window.skyScanner = new SkyPortScanner();

    // Expõe funções globais para os botões HTML
    window.startScan = () => skyScanner.startScan();
    window.quickScan = () => skyScanner.quickScan();
    window.pingTest = () => skyScanner.pingTest();
    window.useTemplate = (template) => skyScanner.useTemplate(template);
    window.exportResults = () => skyScanner.exportResults();
});

// CSS adicional para animações
const additionalCSS = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .template-card.selected {
        border-color: #55c2d6 !important;
        background: linear-gradient(135deg, #55c2d6, #4a9fb5);
        color: white;
        transform: translateY(-5px);
    }

    .template-card.selected h4 {
        color: white !important;
    }

    .template-card.selected .template-ports {
        color: rgba(255,255,255,0.9) !important;
    }

    .notification {
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }

    .form-control:invalid {
        border-color: #dc3545;
    }

    .form-control:valid {
        border-color: #28a745;
    }
`;

// Adiciona CSS ao documento
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);