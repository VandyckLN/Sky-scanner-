# 🔐 Verificador de Portas para Cibersegurança -SKY

Um scanner de portas avançado desenvolvido em Python para profissionais de cibersegurança e administradores de rede. Esta ferramenta permite a verificação de portas abertas em hosts remotos, identificação de serviços em execução e geração de relatórios detalhados.

## 🎯 Funcionalidades

### 🔍 Scanner de Portas Avançado

- **Validação inteligente de entrada**: Aceita endereços IP e nomes DNS
- **Resolução automática de DNS**: Converte nomes de domínio para endereços IP
- **Teste de conectividade**: Verificação prévia com ping real do sistema operacional
- **Identificação de serviços**: Reconhece automaticamente serviços comuns em portas padrão

### 📊 Modos de Operação

1. **Enumeração de Serviços**: Lista serviços baseados em portas fornecidas
2. **Scan Personalizado**: Escaneia portas específicas em um host
3. **Scan Rápido**: Verifica automaticamente 19 portas mais comuns
4. **Teste de Ping**: Verifica conectividade básica com o host

### 🛡️ Recursos de Segurança

- **Timeout configurável**: Evita travamentos em hosts lentos
- **Tratamento de erros**: Gerenciamento robusto de exceções
- **Validação de entrada**: Previne entradas malformadas
- **Relatórios detalhados**: Geração automática de logs com timestamp

### 📋 Serviços Identificados

- **FTP** (21), **SSH** (22), **Telnet** (23)
- **SMTP** (25), **DNS** (53), **HTTP** (80)
- **HTTPS** (443), **SMB** (445), **RDP** (3389)
- **MySQL** (3306), **PostgreSQL** (5432)
- **Redis** (6379), **VNC** (5900)
- E muitos outros...

### 🆕 **Nova Funcionalidade: Detecção de Sistema Operacional**

- **🔍 Análise de TTL**: Identifica o SO do host baseado no Time To Live
- **🐧 Linux/Unix**: TTL ≤ 64
- **🪟 Windows**: TTL ≤ 128
- **🍎 Cisco/Dispositivos de Rede**: TTL ≤ 255
- **📊 Informações técnicas**: Exibe valor TTL para análise

## 🚀 Instalação e Uso

### 📋 Pré-requisitos

- **Python 3.6+** instalado no sistema
- **Permissões de rede** para executar pings e conexões TCP
- **Sistema operacional**: Windows, Linux ou macOS

### 🐧 Instalação no Linux

#### Passo 1: Atualizar o Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

#### Passo 2: Instalar Python (se necessário)

```bash
# Ubuntu/Debian
sudo apt install python3 python3-pip -y

# CentOS/RHEL/Fedora
sudo dnf install python3 python3-pip -y
# ou
sudo yum install python3 python3-pip -y
```

#### Passo 3: Baixar o Projeto

```bash
# Opção 1: Git (recomendado)
git clone https://github.com/seu-usuario/sky-verificador-de-portas.git
cd sky-verificador-de-portas/verificar-hashs

# Opção 2: Download direto
wget https://github.com/seu-usuario/sky-verificador-de-portas/archive/main.zip
unzip main.zip
cd sky-verificador-de-portas-main/verificar-hashs
```

#### Passo 4: Executar

```bash
python3 verificar-port-melhorado.py
```

### 🪟 Instalação no Windows

#### Passo 1: Instalar Python

1. Baixe Python em: https://python.org/downloads/
2. Durante a instalação, marque "Add Python to PATH"
3. Instale com as configurações padrão

#### Passo 2: Baixar o Projeto

```powershell
# Opção 1: Git (instale Git for Windows primeiro)
git clone https://github.com/VandyckLN/Sky-scanner-
cd sky-verificador-de-portas\verificar-hashs

# Opção 2: Download manual
# Baixe o ZIP do GitHub e extraia
cd caminho\para\sky-verificador-de-portas\verificar-hashs
```

#### Passo 3: Executar

```powershell
python verificar-port-melhorado.py
```

## 📖 Como Usar

### 🎮 Interface do Menu

Ao executar o programa, você verá o menu principal:

```
🔐 VERIFICADOR DE PORTAS E SERVIÇOS v2.0
=============================================
💡 Aceita DNS (google.com) ou IP (8.8.8.8)

Escolha uma opção:
1. Enumerar serviços por portas (lista)
2. Escanear portas em um host
3. Scan rápido (portas comuns)
4. Teste de ping
5. Sair
```

### 🔧 Exemplos Práticos

#### 📋 **Modelo de Portas Prontas para Copiar:**

**Portas Básicas (Top 10):**

```
21,22,23,25,53,80,135,443,445,3389
```

**Portas Comuns (Top 20):**

```
21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080
```

**Portas Completas (50+ serviços):**

```
20,21,22,23,25,53,67,68,69,80,110,111,119,123,135,137,138,139,143,161,162,179,389,443,445,465,514,515,587,636,993,995,1080,1433,1434,1521,1723,2049,2082,2083,2086,2087,3306,3389,4443,5060,5432,5900,5901,5984,6379,6660,6661,6662,6663,6664,6665,6666,6667,6668,6669,8000,8080,8081,8443,8888,9000,9001,9090,10000
```

**Portas de Desenvolvimento:**

```
3000,3001,4000,5000,5001,8000,8080,8081,8443,8888,9000,9001,9090,3306,5432,6379,27017
```

**Portas de Segurança/Pentest:**

```
21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080
```

#### Exemplo 1: Scan Rápido

```
Opção: 3
Digite o IP ou DNS: google.com

🚀 Executando scan rápido em 19 portas comuns...
📝 Entrada: google.com (DNS válido)
🔍 DNS resolvido: google.com → 142.250.191.14
🏓 Testando conectividade com 142.250.191.14...
✅ Host respondeu ao ping
🔍 SO provável: 🪟 Windows (TTL ≤ 128)
📊 TTL detectado: 112
```

#### Exemplo 2: Scan Personalizado

```
Opção: 2
Digite o IP ou DNS: 192.168.1.1
Digite as portas separadas por vírgula: 21,22,23,25,53,80,135,443,445,3389
Mostrar portas fechadas? (s/n): n

✅ Porta 22 ABERTA - Serviço: SSH
✅ Porta 80 ABERTA - Serviço: HTTP
❌ Porta 443 FECHADA
✅ Porta 8080 ABERTA - Serviço: HTTP-Proxy
```

#### Exemplo 3: Teste de Conectividade com Detecção de SO

```
Opção: 4
Digite o IP ou DNS: 8.8.8.8

📝 Entrada: 8.8.8.8 (IP válido)
🏓 Testando conectividade com 8.8.8.8...
✅ Host respondeu ao ping
🔍 SO provável: 🪟 Windows (TTL ≤ 128)
📊 TTL detectado: 112
```

### 📄 Relatórios Gerados

O programa gera automaticamente relatórios em formato texto:

```
RELATÓRIO DE SCAN DE PORTAS
Host: google.com
Data: 2025-09-29 14:30:15
==================================================

PORTAS ABERTAS:
Porta 80: HTTP
Porta 443: HTTPS

TOTAL: 2 portas abertas
TOTAL: 17 portas fechadas
```

## 🌐 Interface Web Dinâmica

### 🎯 **NOVO:** Interface Web Moderna

O SKY Verificador de Portas agora inclui uma interface web completa e responsiva para facilitar o uso em qualquer dispositivo!

#### ✨ Recursos da Interface Web

- **🎨 Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **⚡ Interface Dinâmica**: Validação em tempo real e feedback visual
- **📋 Templates Prontos**: 8 conjuntos de portas para diferentes cenários
- **🔍 Scanning Simulado**: Demonstração interativa do funcionamento
- **📊 Resultados Visuais**: Exibição organizada com ícones e cores
- **🌙 Tema SKY**: Design profissional com cores #55c2d6

#### 🚀 Executando a Interface Web

1. **Navegue para a pasta web:**

   ```bash
   cd sky-verificador-de-portas/web
   ```

2. **Abra o arquivo HTML:**

   - **Método 1**: Duplo clique em `index.html`
   - **Método 2**: Servidor local Python:

     ```bash
     # Python 3
     python -m http.server 8000
     # Acesse: http://localhost:8000

     # Python 2
     python -m SimpleHTTPServer 8000
     ```

3. **Estrutura dos Arquivos Web:**
   ```
   web/
   ├── index.html          # Interface principal
   ├── css/
   │   └── style.css       # Estilos e animações
   ├── js/
   │   └── scanner.js      # Funcionalidade dinâmica
   └── assets/
       ├── sky-ports-icon.svg    # Ícones do projeto
       ├── sky-ports-banner.svg  # Banner principal
       └── favicon.svg           # Favicon
   ```

#### 🌐 Acesso via GitHub Pages

A interface web está disponível online via GitHub Pages:

**🔗 Link: [https://vandyckln.github.io/Sky-scanner-/](https://vandyckln.github.io/Sky-scanner-/)**

- ✅ **Acesso direto pelo navegador** - sem necessidade de instalação
- ✅ **Sempre atualizado** - sincronizado automaticamente com o repositório
- ✅ **Interface completa** - todos os recursos disponíveis
- ✅ **Dispositivos móveis** - interface responsiva
- ⚠️ **Modo demonstração** - funcionalidade simulada para segurança

> **💡 Nota:** A versão online funciona em modo demonstração para segurança. Para scanning real, execute localmente conforme instruções acima.

#### 🎯 Templates de Portas Disponíveis

| Template                 | Portas                                                                            | Descrição                  |
| ------------------------ | --------------------------------------------------------------------------------- | -------------------------- |
| **🔥 TOP 10**            | `21,22,23,25,53,80,135,443,445,3389`                                              | Portas essenciais          |
| **⭐ TOP 20**            | `21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,8080` | Portas comuns              |
| **🌐 Web & HTTP**        | `80,443,8000,8080,8081,8443,8888,9000,9001,9090`                                  | Serviços web               |
| **💾 Bancos de Dados**   | `1433,1434,3306,5432,6379,27017,1521,5984`                                        | MySQL, PostgreSQL, MongoDB |
| **🔒 Acesso Remoto**     | `22,23,3389,5900,5901`                                                            | SSH, RDP, VNC              |
| **🔐 Segurança/Pentest** | `21,22,23,25,53,80,135,139,443,445,993,995,1433,3306,3389,5432,5900,8080`         | Teste de penetração        |
| **📧 Email**             | `25,110,143,465,587,993,995`                                                      | SMTP, POP3, IMAP           |
| **💻 Desenvolvimento**   | `3000,3001,4000,5000,5001,8000,8080,8081,9000,9001,9090`                          | Servidores de dev          |

#### 🛡️ Funcionalidades de Segurança Web

- **Validação de Entrada**: Verifica formato de IP e DNS automaticamente
- **Sanitização**: Previne entradas maliciosas no frontend
- **Modo Demonstração**: Simula scans sem executar comandos reais
- **Avisos Éticos**: Lembretes sobre uso responsável em toda interface

#### ⌨️ Atalhos de Teclado

- **Ctrl + Enter**: Executar scan personalizado
- **Escape**: Cancelar operação atual
- **Setas + Enter**: Navegação pelos templates

## 🛠️ Solução de Problemas

### ❌ Problemas Comuns

#### "python: command not found" (Linux)

```bash
# Tente com python3
python3 verificar-port-melhorado.py

# Ou instale Python
sudo apt install python3
```

#### Erro de Permissão (Linux)

```bash
# Execute com permissões administrativas para ICMP
sudo python3 verificar-port-melhorado.py
```

#### Timeout no Windows

- Verifique se o Windows Firewall não está bloqueando
- Execute o PowerShell como Administrador

### 🔧 Configurações Avançadas

#### Modificar Timeout de Conexão

Edite o arquivo `verificar-port-melhorado.py` na linha:

```python
def verificar_porta_individual(self, host, porta, timeout=3):
```

Altere `timeout=3` para o valor desejado em segundos.

#### Adicionar Novos Serviços

Edite o dicionário `self.port_services` para incluir novas portas:

```python
self.port_services = {
    # ... portas existentes ...
    9999: "Meu Serviço Customizado",
}
```

## ⚖️ Uso Ético e Legal

### ⚠️ IMPORTANTE - Leia Antes de Usar

Este software foi desenvolvido para fins educacionais e de segurança autorizada. **O uso desta ferramenta é de total responsabilidade do usuário.**

### ✅ Uso Permitido

- Teste em **suas próprias redes e sistemas**
- **Pentests autorizados** com permissão por escrito
- **Auditoria de segurança** em ambiente controlado
- **Fins educacionais** em laboratórios isolados

### ❌ Uso NÃO Permitido

- Scanning de **redes ou sistemas sem autorização**
- **Atividades maliciosas** ou ilegais
- **Violação de termos de serviço** de provedores
- **Teste em sistemas de terceiros** sem permissão

### 📋 Responsabilidades

- **Obtenha autorização explícita** antes de testar qualquer sistema
- **Respeite as leis locais** sobre segurança cibernética
- **Use apenas em ambiente controlado** para aprendizado
- **Não cause danos** ou interrupções em serviços

## 📞 Suporte

Para dúvidas, sugestões ou relatórios de bugs:

- Abra uma **issue** no repositório GitHub
- Consulte a **documentação** do código
- Verifique os **exemplos** fornecidos

## 📄 Licença

Este projeto é distribuído sob licença open source. Consulte o arquivo LICENSE para mais detalhes.

---

**⚡ Desenvolvido para profissionais de cibersegurança - Use com responsabilidade!**
