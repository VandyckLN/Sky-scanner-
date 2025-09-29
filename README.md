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
git clone https://github.com/seu-usuario/sky-verificador-de-portas.git
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

#### Exemplo 1: Scan Rápido

```
Opção: 3
Digite o IP ou DNS: google.com

🚀 Executando scan rápido em 19 portas comuns...
📝 Entrada: google.com (DNS válido)
🔍 DNS resolvido: google.com → 142.250.191.14
🏓 Testando conectividade com 142.250.191.14...
✅ Host respondeu ao ping
```

#### Exemplo 2: Scan Personalizado

```
Opção: 2
Digite o IP ou DNS: 192.168.1.1
Digite as portas separadas por vírgula: 22,80,443,8080
Mostrar portas fechadas? (s/n): n

✅ Porta 22 ABERTA - Serviço: SSH
✅ Porta 80 ABERTA - Serviço: HTTP
❌ Porta 443 FECHADA
✅ Porta 8080 ABERTA - Serviço: HTTP-Proxy
```

#### Exemplo 3: Teste de Conectividade

```
Opção: 4
Digite o IP ou DNS: 8.8.8.8

📝 Entrada: 8.8.8.8 (IP válido)
🏓 Testando conectividade com 8.8.8.8...
✅ Host respondeu ao ping
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
