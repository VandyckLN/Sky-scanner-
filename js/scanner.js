/**/**

 * SKY Port Scanner - Web Interface JavaScript * SKY Port Scanner - Web Interface JavaScript

    * Funcionalidades dinâmicas para a interface web * Funcionalidades dinâmicas para a interface web

 * / */



class SkyPortScanner {class SkyPortScanner {

    constructor() {
        constructor() {

            this.isScanning = false; this.isScanning = false;

            this.currentScan = null; this.currentScan = null;

            this.portTemplates = {
                this.portTemplates = {

                    basic: '21,22,23,25,53,80,135,443,445,3389', basic: '21,22,23,25,53,80,135,443,445,3389',

                    common: '21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080', common: '21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080',

                    web: '80,443,8000,8080,8081,8443,8888,9000,9001,9090', web: '80,443,8000,8080,8081,8443,8888,9000,9001,9090',

                    database: '1433,1434,3306,5432,6379,27017,1521,5984', database: '1433,1434,3306,5432,6379,27017,1521,5984',

                    remote: '22,23,3389,5900,5901', remote: '22,23,3389,5900,5901',

                    security: '21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080', security: '21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080',

                    email: '25,110,143,465,587,993,995', email: '25,110,143,465,587,993,995',

                    development: '3000,3001,4000,5000,5001,8000,8080,8081,9000,9001,9090'            development: '3000,3001,4000,5000,5001,8000,8080,8081,9000,9001,9090'

                };
            };



            this.knownServices = {
                this.knownServices = {

                    21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS', 21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',

                    80: 'HTTP', 110: 'POP3', 135: 'RPC', 139: 'NetBIOS', 143: 'IMAP', 80: 'HTTP', 110: 'POP3', 135: 'RPC', 139: 'NetBIOS', 143: 'IMAP',

                    443: 'HTTPS', 445: 'SMB', 465: 'SMTP Secure', 587: 'SMTP Alternative', 443: 'HTTPS', 445: 'SMB', 465: 'SMTP Secure', 587: 'SMTP Alternative',

                    993: 'IMAPS', 995: 'POP3S', 1433: 'MSSQL', 1434: 'MSSQL Monitor', 993: 'IMAPS', 995: 'POP3S', 1433: 'MSSQL', 1434: 'MSSQL Monitor',

                    1521: 'Oracle DB', 3000: 'Node.js', 3001: 'Node.js Alt', 3306: 'MySQL', 1521: 'Oracle DB', 3000: 'Node.js', 3001: 'Node.js Alt', 3306: 'MySQL',

                    3389: 'RDP', 4000: 'Ruby on Rails', 5000: 'Flask/Python', 5432: 'PostgreSQL', 3389: 'RDP', 4000: 'Ruby on Rails', 5000: 'Flask/Python', 5432: 'PostgreSQL',

                    5900: 'VNC', 5901: 'VNC Web', 6379: 'Redis', 8000: 'Django/Python', 5900: 'VNC', 5901: 'VNC Web', 6379: 'Redis', 8000: 'Django/Python',

                    8080: 'HTTP-Proxy', 8081: 'HTTP Alt', 8443: 'HTTPS Alt', 8888: 'HTTP Alt', 8080: 'HTTP-Proxy', 8081: 'HTTP Alt', 8443: 'HTTPS Alt', 8888: 'HTTP Alt',

                    9000: 'Development', 9001: 'Development Alt', 27017: 'MongoDB'            9000: 'Development', 9001: 'Development Alt', 27017: 'MongoDB'

                };
            };



            this.init(); this.init();

        }
    }

        this.currentScan = null;

init() {
    this.portTemplates = {

        this.setupEventListeners(); basic: '21,22,23,25,53,80,135,443,445,3389',

        this.setupAnimations(); common: '21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080',

        this.validateInputs(); web: '80,443,8000,8080,8081,8443,8888,9000,9001,9090',

    }            database: '1433,1434,3306,5432,6379,27017,1521,5984',

        remote: '22,23,3389,5900,5901',

            setupEventListeners() {
                security: '21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080',

                    // Template selection            email: '25,110,143,465,587,993,995',

                    document.querySelectorAll('.template-card').forEach(card => {
                        development: '3000,3001,4000,5000,5001,8000,8080,8081,9000,9001,9090'

                        card.addEventListener('click', (e) => { };

                        const templateName = this.getTemplateNameFromCard(card);

                        this.useTemplate(templateName); this.knownServices = {

                        }); 21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',

        }); 80: 'HTTP', 110: 'POP3', 135: 'RPC', 139: 'NetBIOS', 143: 'IMAP',

        443: 'HTTPS', 445: 'SMB', 465: 'SMTP Secure', 587: 'SMTP Alternative',

        // Form validation em tempo real            993: 'IMAPS', 995: 'POP3S', 1433: 'MSSQL', 1434: 'MSSQL Monitor',

        const hostInput = document.getElementById('target-host'); 1521: 'Oracle DB', 3000: 'Node.js', 3001: 'Node.js Alt', 3306: 'MySQL',

        const portsInput = document.getElementById('target-ports'); 3389: 'RDP', 4000: 'Ruby on Rails', 5000: 'Flask/Python', 5432: 'PostgreSQL',

        5900: 'VNC', 5901: 'VNC Web', 6379: 'Redis', 8000: 'Django/Python',

            hostInput?.addEventListener('input', () => this.validateHost()); 8080: 'HTTP-Proxy', 8081: 'HTTP Alt', 8443: 'HTTPS Alt', 8888: 'HTTP Alt',

                portsInput?.addEventListener('input', () => this.validatePorts()); 9000: 'Development', 9001: 'Development Alt', 27017: 'MongoDB'

};

// Keyboard shortcuts

document.addEventListener('keydown', (e) => {
    this.init();

    if (e.ctrlKey && e.key === 'Enter') { }

    this.startScan();

} else if (e.key === 'Escape' && this.isScanning) {
    init() {

        this.stopScan(); this.setupEventListeners();

    } this.setupAnimations();

}); this.validateInputs();

    }    }



setupAnimations() {
    setupEventListeners() {

        // Intersection Observer para animações        // Template selection

        const observerOptions = {
            document.querySelectorAll('.template-card').forEach(card => {

                threshold: 0.1, card.addEventListener('click', (e) => {

                    rootMargin: '0px 0px -50px 0px'                const templateName = this.getTemplateNameFromCard(card);

                }; this.useTemplate(templateName);

            });

            const observer = new IntersectionObserver((entries) => { });

            entries.forEach(entry => {

                if (entry.isIntersecting) {        // Form validation em tempo real

                    entry.target.classList.add('animate-in'); const hostInput = document.getElementById('target-host');

                } const portsInput = document.getElementById('target-ports');

            });

        }, observerOptions); hostInput?.addEventListener('input', () => this.validateHost());

        portsInput?.addEventListener('input', () => this.validatePorts());

        document.querySelectorAll('.feature-card, .template-card, .scanner-section').forEach(el => {

            observer.observe(el);        // Keyboard shortcuts

        }); document.addEventListener('keydown', (e) => {

        }            if (e.ctrlKey && e.key === 'Enter') {

            this.startScan();

            validateInputs() { } else if (e.key === 'Escape' && this.isScanning) {

                // Validação inicial se houver valores                this.stopScan();

                const hostInput = document.getElementById('target-host');
            }

            const portsInput = document.getElementById('target-ports');
        });

    }

    if (hostInput?.value) this.validateHost();

    if (portsInput?.value) this.validatePorts(); setupAnimations() {

    }        // Intersection Observer para animações

    const observerOptions = {

        validateHost() {
            threshold: 0.1,

        const hostInput = document.getElementById('target-host'); rootMargin: '0px 0px -50px 0px'

            const host = hostInput.value.trim();
        };



        if(!host) return; const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                // Regex para validar IP ou DNS                if (entry.isIntersecting) {

                const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; entry.target.classList.add('animate-in');

                const dnsRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;
            }

            });

        if(ipRegex.test(host) || dnsRegex.test(host)) { }, observerOptions);

    hostInput.style.borderColor = '#28a745';

    this.showValidationMessage('host-validation', '✅ Host válido', 'success'); document.querySelectorAll('.feature-card, .template-card, .scanner-section').forEach(el => {

    } else {
        observer.observe(el);

        hostInput.style.borderColor = '#dc3545';
    });

    this.showValidationMessage('host-validation', '❌ Formato inválido', 'error');
}

        }

    }    validateHost() {

    const hostInput = document.getElementById('target-host');

    validatePorts() {
        const host = hostInput.value.trim();

        const portsInput = document.getElementById('target-ports');

        const ports = portsInput.value.trim(); if (!host) return;



        if (!ports) return;        // Regex para validar IP ou DNS

        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

        try {
            const dnsRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/;

            const portList = ports.split(',').map(p => {

                const port = parseInt(p.trim()); if (ipRegex.test(host) || dnsRegex.test(host)) {

                    if (isNaN(port) || port < 1 || port > 65535) {
                        hostInput.style.borderColor = '#28a745';

                        throw new Error('Porta inválida'); this.showValidationMessage('host-validation', '✅ Host válido', 'success');

                    }
                } else {

                    return port; hostInput.style.borderColor = '#dc3545';

                }); this.showValidationMessage('host-validation', '❌ Formato inválido', 'error');

        }

            portsInput.style.borderColor = '#28a745';
    }

    this.showValidationMessage('ports-validation', `✅ ${portList.length} portas válidas`, 'success');

} catch (error) {
    validatePorts() {

        portsInput.style.borderColor = '#dc3545'; const portsInput = document.getElementById('target-ports');

        this.showValidationMessage('ports-validation', '❌ Formato inválido', 'error'); const ports = portsInput.value.trim();

    }

} if (!ports) return;



showValidationMessage(id, message, type) {
    try {

        let msgEl = document.getElementById(id); const portList = ports.split(',').map(p => {

            if (!msgEl) {
                const port = parseInt(p.trim());

                msgEl = document.createElement('div'); if (isNaN(port) || port < 1 || port > 65535) {

                    msgEl.id = id; throw new Error('Porta inválida');

                    msgEl.style.fontSize = '0.8rem';
                }

                msgEl.style.marginTop = '5px'; return port;

            });

        const input = id.includes('host') ?

            document.getElementById('target-host') : portsInput.style.borderColor = '#28a745';

        document.getElementById('target-ports'); this.showValidationMessage('ports-validation', `✅ ${portList.length} portas válidas`, 'success');

    } catch (error) {

        input.parentNode.appendChild(msgEl); portsInput.style.borderColor = '#dc3545';

    } this.showValidationMessage('ports-validation', '❌ Formato inválido', 'error');

}

msgEl.textContent = message;    }

msgEl.style.color = type === 'success' ? '#28a745' : '#dc3545';

    }    showValidationMessage(id, message, type) {

    let msgEl = document.getElementById(id);

    getTemplateNameFromCard(card) {
        if (!msgEl) {

            const title = card.querySelector('h4')?.textContent || ''; msgEl = document.createElement('div');

            if (title.includes('TOP 10')) return 'basic'; msgEl.id = id;

            if (title.includes('TOP 20')) return 'common'; msgEl.style.fontSize = '0.8rem';

            if (title.includes('Web')) return 'web'; msgEl.style.marginTop = '5px';

            if (title.includes('Bancos')) return 'database';

            if (title.includes('Remoto')) return 'remote'; const input = type === 'success' ?

        if (title.includes('Segurança')) return 'security'; (id.includes('host') ? document.getElementById('target-host') : document.getElementById('target-ports')) :

            if (title.includes('Email')) return 'email'; (id.includes('host') ? document.getElementById('target-host') : document.getElementById('target-ports'));

            if (title.includes('Development')) return 'development';

            return 'basic'; input.parentNode.appendChild(msgEl);

        }
    }



    useTemplate(templateName) {
        msgEl.textContent = message;

        if (!this.portTemplates[templateName]) {
            msgEl.style.color = type === 'success' ? '#28a745' : '#dc3545';

            this.showNotification('❌ Template não encontrado!', 'error');
        }

        return;

    } getTemplateNameFromCard(card) {

        const title = card.querySelector('h4').textContent;

        const ports = this.portTemplates[templateName]; if (title.includes('TOP 10')) return 'basic';

        const portsInput = document.getElementById('target-ports'); if (title.includes('TOP 20')) return 'common';

        if (title.includes('Web')) return 'web';

        if (!portsInput) {
            if (title.includes('Bancos')) return 'database';

            this.showNotification('❌ Campo de portas não encontrado!', 'error'); if (title.includes('Remoto')) return 'remote';

            return; if (title.includes('Segurança')) return 'security';

        } if (title.includes('Email')) return 'email';

        if (title.includes('Development')) return 'development';

        // Animação visual        return 'basic';

        portsInput.style.transform = 'scale(0.95)';
    }

    portsInput.style.transition = 'transform 0.15s ease';

    useTemplate(templateName) {

        setTimeout(() => {
            const ports = this.portTemplates[templateName];

            portsInput.value = ports; const portsInput = document.getElementById('target-ports');

            portsInput.style.transform = 'scale(1)';

            this.validatePorts();        // Animação de preenchimento

            this.showNotification(`📋 Template "${templateName}" aplicado com ${ports.split(',').length} portas!`, 'success'); portsInput.style.transform = 'scale(1.05)';

        }, 150); portsInput.style.borderColor = '#55c2d6';



        // Feedback visual no card se estiver disponível        setTimeout(() => {

        const cards = document.querySelectorAll('.template-card'); portsInput.value = ports;

        cards.forEach(card => card.classList.remove('selected')); portsInput.style.transform = 'scale(1)';

        this.validatePorts();

        // Encontrar o card clicado e destacá-lo        }, 150);

        const clickedCard = Array.from(cards).find(card => {

            const title = card.querySelector('h4')?.textContent || '';        // Feedback visual no card

            return (        const cards = document.querySelectorAll('.template-card');

            (templateName === 'basic' && title.includes('TOP 10')) || cards.forEach(card => card.classList.remove('selected'));

            (templateName === 'common' && title.includes('TOP 20')) || event.currentTarget.classList.add('selected');

            (templateName === 'web' && title.includes('Web')) ||    }

                (templateName === 'database' && title.includes('Bancos')) ||

            (templateName === 'remote' && title.includes('Remoto')) || async startScan() {

                (templateName === 'security' && title.includes('Segurança')) ||        if (this.isScanning) return;

        (templateName === 'email' && title.includes('Email')) ||

            (templateName === 'development' && title.includes('Development'))        const host = document.getElementById('target-host').value.trim();

            ); const ports = document.getElementById('target-ports').value.trim();

    });

    if (!host || !ports) {

        if (clickedCard) {
            this.showNotification('⚠️ Por favor, preencha o host e as portas!', 'warning');

            clickedCard.classList.add('selected'); return;

            setTimeout(() => clickedCard.classList.remove('selected'), 2000);
        }

    }

} this.isScanning = true;

this.showLoading();

    async startScan() {

    if (this.isScanning) {
        try {

            this.showNotification('⚠️ Scan já está em andamento!', 'warning');            // Em uma implementação real, aqui faria a chamada para o backend

            return; const results = await this.simulateScan(host, ports);

        }            this.displayResults(results);

    } catch (error) {

        const host = document.getElementById('target-host').value.trim(); this.showNotification('❌ Erro durante o scan: ' + error.message, 'error');

        const ports = document.getElementById('target-ports').value.trim();
    } finally {

        this.isScanning = false;

        if (!host || !ports) {
            this.hideLoading();

            this.showNotification('⚠️ Por favor, preencha o host e as portas!', 'warning');
        }

        return;
    }

}

    async quickScan() {

    this.isScanning = true; const host = document.getElementById('target-host').value.trim();

    this.showLoading();

    if (!host) {

        try {
            this.showNotification('⚠️ Por favor, preencha o host!', 'warning');

            const results = await this.simulateScan(host, ports); return;

            this.displayResults(results);
        }

            this.showNotification('✅ Scan concluído com sucesso!', 'success');

    } catch (error) {
        document.getElementById('target-ports').value = this.portTemplates.common;

        this.showNotification('❌ Erro durante o scan: ' + error.message, 'error'); await this.startScan();

    } finally { }

    this.isScanning = false;

    this.hideLoading();    async pingTest() {

    } const host = document.getElementById('target-host').value.trim();

}

if (!host) {

    async quickScan() {
        this.showNotification('⚠️ Por favor, preencha o host!', 'warning');

        const host = document.getElementById('target-host').value.trim(); return;

    }

    if (!host) {

        this.showNotification('⚠️ Por favor, preencha o host para scan rápido!', 'warning'); this.showLoading();

        return;

    } try {

        const result = await this.simulatePing(host);

        document.getElementById('target-ports').value = this.portTemplates.common; this.displayPingResults(result);

        this.validatePorts();
    } catch (error) {

        await this.startScan(); this.showNotification('❌ Erro no ping: ' + error.message, 'error');

    }
} finally {

    this.hideLoading();

    async pingTest() { }

    const host = document.getElementById('target-host').value.trim();
}



if (!host) {
    stopScan() {

        this.showNotification('⚠️ Por favor, preencha o host para teste de ping!', 'warning'); if (this.currentScan) {

            return; this.currentScan.abort();

        }
    }

    this.isScanning = false;

    if (this.isScanning) {
        this.hideLoading();

        this.showNotification('⚠️ Aguarde o scan atual terminar!', 'warning'); this.showNotification('🛑 Scan cancelado', 'info');

        return;
    }

}

    async simulateScan(host, ports) {

    this.isScanning = true; const portList = ports.split(',').map(p => parseInt(p.trim()));

    this.showLoading(); const results = {

        host,

        try {
            timestamp: new Date(),

            const result = await this.simulatePing(host); os: this.detectOS(),

            this.displayPingResults(result); ttl: Math.floor(Math.random() * 64) + 64,

            this.showNotification('✅ Teste de ping concluído!', 'success'); ports: []

        } catch(error) { };

        this.showNotification('❌ Erro no ping: ' + error.message, 'error');

    } finally {        // Simula o tempo de scan

        this.isScanning = false; for (let i = 0; i < portList.length; i++) {

            this.hideLoading(); await this.delay(200); // Simula tempo de verificação por porta

        }

    } const port = portList[i];

    const isOpen = Math.random() > 0.7; // 30% chance de estar aberta

    stopScan() {
        const service = this.knownServices[port] || 'Desconhecido';

        if (this.currentScan) {

            this.currentScan.abort(); results.ports.push({

            }                port,

                this.isScanning = false; status: isOpen ? 'open' : 'closed',

                    this.hideLoading(); service

            this.showNotification('🛑 Scan cancelado pelo usuário', 'info');
        });

    }

            // Atualiza progresso

    async simulateScan(host, ports) {
        this.updateProgress((i + 1) / portList.length * 100);

        const portList = ports.split(',').map(p => parseInt(p.trim()));
    }

    const results = {

        host, return results;

        timestamp: new Date(),
    }

    os: this.detectOS(),

        ttl: Math.floor(Math.random() * 64) + 64, async simulatePing(host) {

        ports: []        await this.delay(1500);

    };

    return {

        // Simula o tempo de scan            host,

        for(let i = 0; i <portList.length; i++) {
            success: Math.random() > 0.2, // 80% de sucesso

                await this.delay(300); // Simula tempo de verificação por porta            time: Math.floor(Math.random() * 100) + 10,

        os: this.detectOS(),

            const port = portList[i]; ttl: Math.floor(Math.random() * 64) + 64

        const isOpen = Math.random() > 0.6; // 40% chance de estar aberta        };

        const service = this.knownServices[port] || 'Desconhecido';
    }



    results.ports.push({
        detectOS() {

            port,        const oses = [

                status: isOpen ? 'open' : 'closed', { name: '🐧 Linux/Unix', ttl: '≤ 64' },

                service            { name: '🪟 Windows', ttl: '≤ 128' },

            }); { name: '🍎 Cisco/Network Device', ttl: '≤ 255' }

        ];

    // Atualiza progresso

    this.updateProgress((i + 1) / portList.length * 100); return oses[Math.floor(Math.random() * oses.length)];

}    }



return results; delay(ms) {

} return new Promise(resolve => setTimeout(resolve, ms));

    }

    async simulatePing(host) {

    await this.delay(1500); updateProgress(percentage) {

        const progressBar = document.querySelector('.progress-bar');

        return {
            if(progressBar) {

                host, progressBar.style.width = percentage + '%';

                success: Math.random() > 0.2, // 80% de sucesso        }

                    time: Math.floor(Math.random() * 100) + 10,    }

            os: this.detectOS(),

            ttl: Math.floor(Math.random() * 64) + 64    showLoading() {

            }; const loading = document.getElementById('loading');

        }        const results = document.getElementById('results');



        detectOS() {
            if (loading) loading.classList.add('active');

            const oses = [        if (results) results.classList.remove('active');

            { name: '🐧 Linux/Unix', ttl: '≤ 64' },

            { name: '🪟 Windows', ttl: '≤ 128' },        // Adiciona barra de progresso

            { name: '🍎 Cisco/Network Device', ttl: '≤ 255' } const loadingContent = loading.querySelector('p');

        ]; if (loadingContent && !loading.querySelector('.progress-container')) {

                const progressHTML = `

        return oses[Math.floor(Math.random() * oses.length)];                <div class="progress-container" style="width: 200px; height: 6px; background: #f0f0f0; border-radius: 3px; margin: 10px auto;">

    }                    <div class="progress-bar" style="height: 100%; background: #55c2d6; border-radius: 3px; width: 0%; transition: width 0.3s ease;"></div>

                </div>

    delay(ms) {            `;

                return new Promise(resolve => setTimeout(resolve, ms)); loadingContent.insertAdjacentHTML('afterend', progressHTML);

            }
        }

    }

    updateProgress(percentage) {

        const progressBar = document.querySelector('.progress-bar'); hideLoading() {

            if (progressBar) {
                const loading = document.getElementById('loading');

                progressBar.style.width = percentage + '%'; if (loading) loading.classList.remove('active');

            }
        }

    }

    displayResults(results) {

        showLoading() {
            const resultsDiv = document.getElementById('results-content');

            const loading = document.getElementById('loading'); const showClosed = document.getElementById('show-closed').checked;

            const results = document.getElementById('results');

            let html = `

        if (loading) loading.classList.add('active');            <div class="result-item">

        if (results) results.classList.remove('active');                <strong>🎯 Host:</strong> ${results.host}<br>

                <strong>📅 Data:</strong> ${results.timestamp.toLocaleString()}<br>

        // Adiciona barra de progresso                <strong>🔍 SO Detectado:</strong> ${results.os.name} (TTL ${results.os.ttl})<br>

        const loadingContent = loading?.querySelector('p');                <strong>📊 TTL:</strong> ${results.ttl}

        if (loadingContent && !loading.querySelector('.progress-container')) {            </div>

            const progressHTML = `        `;

                <div class="progress-container" style="width: 200px; height: 6px; background: #f0f0f0; border-radius: 3px; margin: 10px auto;">

                    <div class="progress-bar" style="height: 100%; background: #55c2d6; border-radius: 3px; width: 0%; transition: width 0.3s ease;"></div>        const openPorts = results.ports.filter(p => p.status === 'open');

                </div>        const closedPorts = results.ports.filter(p => p.status === 'closed');

            `;

            loadingContent.insertAdjacentHTML('afterend', progressHTML); results.ports.forEach(portResult => {

            }            if (portResult.status === 'open' || showClosed) {

            } const statusClass = portResult.status === 'open' ? 'result-open' : 'result-closed';

            const icon = portResult.status === 'open' ? '✅' : '❌';

            hideLoading() {
                const status = portResult.status === 'open' ? 'ABERTA' : 'FECHADA';

                const loading = document.getElementById('loading');

                if (loading) loading.classList.remove('active'); html += `

    }                    <div class="result-item ${statusClass}">

                        ${icon} <strong>Porta ${portResult.port}:</strong> ${status} - Serviço: ${portResult.service}

    displayResults(results) {                    </div>

        const resultsDiv = document.getElementById('results-content');                `;

                const showClosed = document.getElementById('show-closed')?.checked || false;
            }

        });

        let html = `

            <div class="result-item">        html += `

            < strong >🎯 Host:</strong> ${ results.host } <br>            <div class="result-item">

                <strong>📅 Data:</strong> ${results.timestamp.toLocaleString()}<br>                <strong>📊 Resumo:</strong> ${openPorts.length} abertas, ${closedPorts.length} fechadas

                    <strong>🔍 SO Detectado:</strong> ${results.os.name} (TTL ${results.os.ttl})<br>            </div>

                    <strong>📊 TTL:</strong> ${results.ttl}        `;

            </div>

                `;        resultsDiv.innerHTML = html;

                document.getElementById('results').classList.add('active');

        const openPorts = results.ports.filter(p => p.status === 'open');

        const closedPorts = results.ports.filter(p => p.status === 'closed');        // Scroll para resultados

                document.getElementById('results').scrollIntoView({

                    results.ports.forEach(portResult => {
                        behavior: 'smooth',

            if (portResult.status === 'open' || showClosed) {
                            block: 'nearest'

                            const statusClass = portResult.status === 'open' ? 'result-open' : 'result-closed';
                        });

                const icon = portResult.status === 'open' ? '✅' : '❌';    }

                const status = portResult.status === 'open' ? 'ABERTA' : 'FECHADA';

                displayPingResults(result) {

                    html += `        const resultsDiv = document.getElementById('results-content');

                    <div class="result-item ${statusClass}">

                        ${icon} <strong>Porta ${portResult.port}:</strong> ${status} - Serviço: ${portResult.service}        const status = result.success ? 'sucesso' : 'falha';

                    </div>        const statusClass = result.success ? 'result-open' : 'result-closed';

                `;        const icon = result.success ? '✅' : '❌';

            }

        });        let html = `

                <div class="result-item ${statusClass}">

                    html += `                <strong>🏓 Teste de Ping:</strong> ${result.host}<br>

                        <div class="result-item">                ${icon} ${result.success ? 'Host respondeu ao ping' : 'Host não respondeu ao ping'}

                            <strong>📊 Resumo:</strong> ${openPorts.length} abertas, ${closedPorts.length} fechadas        `;

                        </div>

                        `;        if (result.success) {

                            html += `

        resultsDiv.innerHTML = html;                <br><strong>🔍 SO Detectado:</strong> ${result.os.name} (TTL ${result.os.ttl})

        document.getElementById('results').classList.add('active');                <br><strong>📊 TTL:</strong> ${result.ttl}

                <br><strong>⏱️ Tempo:</strong> ${result.time}ms

        // Scroll para resultados            `;

                        document.getElementById('results').scrollIntoView({ }

                        behavior: 'smooth',

                        block: 'nearest'        html += '</div>';

        });

    }        resultsDiv.innerHTML = html;

                document.getElementById('results').classList.add('active');

                displayPingResults(result) { }

                const resultsDiv = document.getElementById('results-content');

                showNotification(message, type = 'info') {

        const statusClass = result.success ? 'result-open' : 'result-closed';        // Remove notificação anterior se existir

                const icon = result.success ? '✅' : '❌';        const existingNotification = document.querySelector('.notification');

                if (existingNotification) {

                    let html = `            existingNotification.remove();

                <div class="result-item ${statusClass}">        }

                    <strong>🏓 Teste de Ping:</strong> ${result.host}<br>

                        ${icon} ${result.success ? 'Host respondeu ao ping' : 'Host não respondeu ao ping'}        const notification = document.createElement('div');

                        `;        notification.className = `notification notification-${type}`;

                        notification.textContent = message;

                        if (result.success) {

                            html += `        Object.assign(notification.style, {

                <br><strong>🔍 SO Detectado:</strong> ${result.os.name} (TTL ${result.os.ttl})            position: 'fixed',

                <br><strong>📊 TTL:</strong> ${result.ttl}            top: '20px',

                <br><strong>⏱️ Tempo:</strong> ${result.time}ms            right: '20px',

            `;            padding: '15px 20px',

        }            borderRadius: '8px',

                        color: 'white',

                        html += '</div>';            fontWeight: 'bold',

                zIndex: '10000',

                resultsDiv.innerHTML = html;            transform: 'translateX(400px)',

                document.getElementById('results').classList.add('active');            transition: 'transform 0.3s ease',

                maxWidth: '300px',

                // Scroll para resultados            wordWrap: 'break-word'

                document.getElementById('results').scrollIntoView({ });

                behavior: 'smooth',

                block: 'nearest'        // Cores por tipo

        });        const colors = {

                }            success: '#28a745',

                error: '#dc3545',

                showNotification(message, type = 'info') {warning: '#ffc107',

        // Remove notificação anterior se existir            info: '#17a2b8'

        const existingNotification = document.querySelector('.notification');        };

                if (existingNotification) {

                    existingNotification.remove();        notification.style.backgroundColor = colors[type] || colors.info;

        }

                document.body.appendChild(notification);

                const notification = document.createElement('div');

                notification.className = `notification notification-${type}`;        // Animação de entrada

                notification.innerHTML = `<span>${message}</span>`;        setTimeout(() => {

                    notification.style.transform = 'translateX(0)';

                // Estilos CSS inline para garantir funcionamento        }, 100);

                notification.style.cssText = `

                position: fixed;        // Remove após 4 segundos

            top: 20px;        setTimeout(() => {

                    right: 20px;            notification.style.transform = 'translateX(400px)';

            padding: 15px 20px;            setTimeout(() => notification.remove(), 300);

            border-radius: 8px;        }, 4000);

            color: white;    }

                font-weight: 500;

                z-index: 10000;    exportResults() {

                    max - width: 400px;        const resultsContent = document.getElementById('results-content');

                box-shadow: 0 4px 12px rgba(0,0,0,0.2);        if (!resultsContent || !resultsContent.innerHTML.trim()) {

                    transform: translateX(400px);            this.showNotification('⚠️ Nenhum resultado para exportar! Execute um scan primeiro.', 'warning');

                transition: transform 0.3s ease;            return;

                ${type === 'success' ? 'background: linear-gradient(135deg, #28a745, #20c997);' : ''}        }

                ${type === 'error' ? 'background: linear-gradient(135deg, #dc3545, #e74c3c);' : ''}

                ${type === 'warning' ? 'background: linear-gradient(135deg, #ffc107, #fd7e14);' : ''}        // Extrair dados dos resultados de forma mais estruturada

                ${type === 'info' ? 'background: linear-gradient(135deg, #17a2b8, #6f42c1);' : ''}        const resultItems = resultsContent.querySelectorAll('.result-item');

                `;        let reportText = '='.repeat(60) + '\n';

                reportText += 'SKY VERIFICADOR DE PORTAS - RELATÓRIO DE SCAN\n';

                document.body.appendChild(notification);        reportText += '='.repeat(60) + '\n\n';



        // Animação de entrada        resultItems.forEach(item => {

                    setTimeout(() => {
                        const text = item.textContent.trim();

                        notification.style.transform = 'translateX(0)'; if (text) {

                        }, 100);                reportText += text + '\n';

                if (item.classList.contains('result-open') || item.classList.contains('result-closed')) {

                    // Remove após 4 segundos                    reportText += '-'.repeat(40) + '\n';

                    setTimeout(() => { } else {

                    notification.style.transform = 'translateX(400px)';                    reportText += '\n';

            setTimeout(() => notification.remove(), 300);                }

        }, 4000);            }

    }        });



                exportResults() {reportText += '\n' + '='.repeat(60) + '\n';

                const resultsContent = document.getElementById('results-content');        reportText += 'Relatório gerado em: ' + new Date().toLocaleString('pt-BR') + '\n';

                if (!resultsContent || !resultsContent.innerHTML.trim()) {reportText += 'SKY Verificador de Portas v2.0 - Interface Web Dinâmica\n';

                this.showNotification('⚠️ Nenhum resultado para exportar! Execute um scan primeiro.', 'warning');        reportText += '='.repeat(60);

                return;

        }        // Criar e baixar o arquivo

                try {

        // Extrair dados dos resultados de forma mais estruturada            const blob = new Blob([reportText], {type: 'text/plain;charset=utf-8' });

        const resultItems = resultsContent.querySelectorAll('.result-item');            const url = URL.createObjectURL(blob);

                let reportText = '='.repeat(60) + '\n';

                reportText += 'SKY VERIFICADOR DE PORTAS - RELATÓRIO DE SCAN\n';            const a = document.createElement('a');

                reportText += '='.repeat(60) + '\n\n';            a.href = url;

                a.download = `sky-scan-relatorio-${new Date().toISOString().split('T')[0]}-${new Date().toTimeString().split(' ')[0].replace(/:/g, '')}.txt`;

        resultItems.forEach(item => {a.style.display = 'none';

                const text = item.textContent.trim();

                if (text) {document.body.appendChild(a);

                reportText += text + '\n';            a.click();

                if (item.classList.contains('result-open') || item.classList.contains('result-closed')) {document.body.removeChild(a);

                reportText += '-'.repeat(40) + '\n';            URL.revokeObjectURL(url);

                } else {

                    reportText += '\n';            this.showNotification('📄 Relatório exportado com sucesso!', 'success');

                }        } catch (error) {

                }            console.error('Erro ao exportar relatório:', error);

        });            this.showNotification('❌ Erro ao exportar relatório. Verifique o console.', 'error');

                }

        reportText += '\n' + '='.repeat(60) + '\n';    }

        reportText += 'Relatório gerado em: ' + new Date().toLocaleString('pt-BR') + '\n';}

                reportText += 'SKY Verificador de Portas v2.0 - Interface Web Dinâmica\n';

                reportText += '='.repeat(60);// Inicializa a aplicação quando a página carrega

document.addEventListener('DOMContentLoaded', () => {

        // Criar e baixar o arquivo    console.log('🔐 SKY Scanner: Inicializando aplicação...');

        try {window.skyScanner = new SkyPortScanner();

                const blob = new Blob([reportText], {type: 'text/plain;charset=utf-8' });    console.log('✅ SKY Scanner: Aplicação inicializada com sucesso!');

                const url = URL.createObjectURL(blob);

    // Expõe funções globais para os botões HTML

            const a = document.createElement('a');    window.startScan = () => {

                    a.href = url;        console.log('🚀 Chamando startScan...');

                a.download = `sky-scan-relatorio-${new Date().toISOString().split('T')[0]}-${new Date().toTimeString().split(' ')[0].replace(/:/g, '')}.txt`;        return skyScanner.startScan();

            a.style.display = 'none';    };

                window.quickScan = () => {

                    document.body.appendChild(a);        console.log('⚡ Chamando quickScan...');

                a.click();        return skyScanner.quickScan();

            document.body.removeChild(a);    };

            URL.revokeObjectURL(url);    window.pingTest = () => {

                    console.log('🏓 Chamando pingTest...');

                this.showNotification('📄 Relatório exportado com sucesso!', 'success');        return skyScanner.pingTest();

        } catch (error) { };

            console.error('Erro ao exportar relatório:', error);    window.useTemplate = (template) => {

                    this.showNotification('❌ Erro ao exportar relatório. Verifique o console.', 'error');        console.log('📋 Chamando useTemplate:', template);

        }        return skyScanner.useTemplate(template);

    }    };

}    window.exportResults = () => {

                    console.log('📄 Chamando exportResults...');

// Inicializa a aplicação quando a página carrega        return skyScanner.exportResults();

document.addEventListener('DOMContentLoaded', () => { };

                console.log('🔐 SKY Scanner: Inicializando aplicação...');

                window.skyScanner = new SkyPortScanner();    // Teste adicional - verificar se elementos existem

                console.log('✅ SKY Scanner: Aplicação inicializada com sucesso!');    const resultsContent = document.getElementById('results-content');

                console.log('🔍 Elemento results-content encontrado:', !!resultsContent);

    // Expõe funções globais para os botões HTML});

    window.startScan = () => {

                    console.log('🚀 Chamando startScan...');// CSS adicional para animações

                return skyScanner.startScan();const additionalCSS = `

    };    .animate-in {

                    window.quickScan = () => {
                        animation: slideInUp 0.6s ease forwards;

                        console.log('⚡ Chamando quickScan...');
                    }

        return skyScanner.quickScan();

    };    @keyframes slideInUp {

                    window.pingTest = () => {        from {

                        console.log('🏓 Chamando pingTest...'); opacity: 0;

                        return skyScanner.pingTest(); transform: translateY(30px);

                    };
                    }

    window.useTemplate = (template) => {to {

                    console.log('📋 Chamando useTemplate:', template);            opacity: 1;

                return skyScanner.useTemplate(template);            transform: translateY(0);

    };        }

    window.exportResults = () => { }

                console.log('📄 Chamando exportResults...');

                return skyScanner.exportResults();    .template-card.selected {

                };        border-color: #55c2d6 !important;

                background: linear-gradient(135deg, #55c2d6, #4a9fb5);

                // Teste adicional - verificar se elementos existem        color: white;

                const resultsContent = document.getElementById('results-content');        transform: translateY(-5px);

    console.log('🔍 Elemento results-content encontrado:', !!resultsContent);    }



    // Adicionar estilos CSS para as notificações e animações    .template-card.selected h4 {

    const style = document.createElement('style');        color: white !important;

    style.textContent = `    }

                .template-card.selected {

                    transform: scale(1.05);    .template-card.selected .template-ports {

                    box - shadow: 0 8px 25px rgba(85, 194, 214, 0.3);        color: rgba(255,255,255,0.9) !important;

            border: 2px solid #37c2d6;    }

        }

                .notification {

        .loading.active {box - shadow: 0 4px 20px rgba(0,0,0,0.15);

            display: block;    }

        }

                .form-control:invalid {

        .loading {border - color: #dc3545;

            display: none;    }

                text-align: center;

                padding: 40px;    .form-control:valid {

                    background: #f8f9fa;        border-color: #28a745;

            border-radius: 10px;    }

                margin: 20px 0;`;

        }

                // Adiciona CSS ao documento

                .results.active {const style = document.createElement('style');

                display: block;style.textContent = additionalCSS;

        }document.head.appendChild(style);

                .results {
                    display: none;
                margin: 20px 0;
        }

                .result-item {
                    margin: 10px 0;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #28a745;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

                .result-open {
                    border - left - color: #28a745;
        }

                .result-closed {
                    border - left - color: #dc3545;
        }

                .spinner {
                    border: 4px solid #f3f3f3;
                border-top: 4px solid #37c2d6;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 2s linear infinite;
                margin: 0 auto 20px;
        }

                @keyframes spin {
                    0 % { transform: rotate(0deg); }
            100% {transform: rotate(360deg); }
        }

                .animate-in {
                    animation: fadeInUp 0.6s ease forwards;
        }

                @keyframes fadeInUp {
                    from {
                    opacity: 0;
                transform: translateY(30px);
            }
                to {
                    opacity: 1;
                transform: translateY(0);
            }
        }
                `;
                document.head.appendChild(style);
});

                console.log('🔐 SKY Verificador de Portas v2.0 - JavaScript Carregado');
                console.log('⚡ Todos os recursos estão funcionais!');
                console.log('🛡️ Use apenas em redes próprias ou com autorização!');