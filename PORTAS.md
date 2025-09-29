# 📋 LISTA DE PORTAS - SKY VERIFICADOR DE PORTAS

## 🚀 **Modelos Prontos para Copiar**

### 🔥 **TOP 10 - PORTAS ESSENCIAIS**

```
21,22,23,25,53,80,135,443,445,3389
```

**Descrição**: FTP, SSH, Telnet, SMTP, DNS, HTTP, RPC, HTTPS, SMB, RDP

---

### ⭐ **TOP 20 - PORTAS COMUNS**

```
21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080
```

**Descrição**: Inclui POP3, NetBIOS, IMAP, IMAPS, POP3S, MSSQL, MySQL, PostgreSQL, VNC, HTTP-Proxy

---

### 🌟 **SCAN COMPLETO - 60+ PORTAS**

```
20,21,22,23,25,53,67,68,69,80,110,111,119,123,135,137,138,139,143,161,162,179,389,443,445,465,514,515,587,636,993,995,1080,1433,1434,1521,1723,2049,2082,2083,2086,2087,3306,3389,4443,5060,5432,5900,5901,5984,6379,6660,6661,6662,6663,6664,6665,6666,6667,6668,6669,8000,8080,8081,8443,8888,9000,9001,9090,10000
```

---

## 🎯 **PORTAS POR CATEGORIA**

### 🌐 **WEB E HTTP**

```
80,443,8000,8080,8081,8443,8888,9000,9001,9090
```

- **80**: HTTP
- **443**: HTTPS
- **8000**: HTTP Alternativo
- **8080**: HTTP Proxy
- **8081**: HTTP Alternativo
- **8443**: HTTPS Alternativo
- **8888**: HTTP Alternativo
- **9000**: HTTP Alternativo

### 💾 **BANCOS DE DADOS**

```
1433,1434,3306,5432,6379,27017,1521,5984
```

- **1433**: Microsoft SQL Server
- **1434**: Microsoft SQL Monitor
- **3306**: MySQL
- **5432**: PostgreSQL
- **6379**: Redis
- **27017**: MongoDB
- **1521**: Oracle Database
- **5984**: CouchDB

### 🔒 **ACESSO REMOTO**

```
22,23,3389,5900,5901,5984
```

- **22**: SSH
- **23**: Telnet
- **3389**: RDP (Remote Desktop)
- **5900**: VNC
- **5901**: VNC Web

### 📧 **EMAIL E COMUNICAÇÃO**

```
25,110,143,465,587,993,995
```

- **25**: SMTP
- **110**: POP3
- **143**: IMAP
- **465**: SMTP Seguro
- **587**: SMTP Alternativo
- **993**: IMAPS
- **995**: POP3S

### 📁 **TRANSFERÊNCIA DE ARQUIVOS**

```
20,21,69,2049
```

- **20**: FTP Data
- **21**: FTP Control
- **69**: TFTP
- **2049**: NFS

### 🎮 **JOGOS E CHAT**

```
6660,6661,6662,6663,6664,6665,6666,6667,6668,6669
```

- **6660-6669**: IRC (Internet Relay Chat)

### 🖥️ **SISTEMA E REDE**

```
53,135,137,138,139,445
```

- **53**: DNS
- **135**: RPC
- **137**: NetBIOS Name Service
- **138**: NetBIOS Datagram
- **139**: NetBIOS Session
- **445**: SMB

### 💻 **DESENVOLVIMENTO**

```
3000,3001,4000,5000,5001,8000,8080,8081,9000,9001,9090
```

- **3000**: Node.js padrão
- **3001**: Node.js alternativo
- **4000**: Ruby on Rails
- **5000**: Flask/Python
- **5001**: Flask alternativo
- **8000**: Django/Python
- **9000**: PHP/Diversos
- **9090**: Desenvolvimento geral

### 🔐 **SEGURANÇA E PENTEST**

```
21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080
```

**Ideal para testes de penetração e auditoria de segurança**

### 🏢 **EMPRESARIAL**

```
80,443,445,993,995,1433,3306,3389,5432,8080,10000
```

**Portas comuns em ambientes corporativos**

### 🏠 **REDE DOMÉSTICA**

```
22,23,53,80,135,139,443,445,3389,8080
```

**Portas típicas em roteadores e dispositivos domésticos**

---

## 📊 **ESTATÍSTICAS DAS PORTAS**

### 🔝 **MAIS UTILIZADAS**

1. **80** (HTTP) - Universal
2. **443** (HTTPS) - Universal
3. **22** (SSH) - Linux/Unix
4. **3389** (RDP) - Windows
5. **445** (SMB) - Windows

### ⚡ **MAIS VULNERÁVEIS**

- **21** (FTP) - Texto plano
- **23** (Telnet) - Sem criptografia
- **135** (RPC) - Alvo de exploits
- **445** (SMB) - Vulnerabilidades conhecidas
- **1433** (MSSQL) - Ataques de força bruta

### 🎯 **PARA RECONNAISSANCE**

- **53** (DNS) - Enumeração de subdominios
- **80/443** (HTTP/S) - Fingerprinting web
- **22** (SSH) - Versões e algoritmos
- **135/445** (Windows) - Enumeração SMB

---

## 📝 **COMO USAR NO VERIFICADOR**

1. **Copie** uma das listas acima
2. **Execute** o programa: `python verificar-port-melhorado.py`
3. **Escolha** a opção 2 (Scan Personalizado)
4. **Cole** a lista de portas quando solicitado
5. **Aguarde** os resultados com detecção de SO!

---

**💡 Dica**: Comece sempre com o TOP 10 para um scan rápido, depois use listas mais específicas conforme necessário!
