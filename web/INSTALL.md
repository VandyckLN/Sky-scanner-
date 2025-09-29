# 🌐 SKY Verificador de Portas - Interface Web

## 📋 Instalação e Configuração

### 🔧 Opção 1: Interface Estática (Recomendada)

A interface web funciona diretamente no navegador sem necessidade de servidor:

1. **Navegue para a pasta web:**

   ```bash
   cd sky-verificador-de-portas/web
   ```

2. **Abra o arquivo HTML:**
   - **Método 1:** Duplo clique em `index.html`
   - **Método 2:** Servidor HTTP simples:

     ```bash
     # Python 3
     python -m http.server 8000
     # Acesse: http://localhost:8000

     # Python 2
     python -m SimpleHTTPServer 8000
     ```

### 🚀 Opção 2: Servidor Flask (Demonstração)

Para integração completa com o backend Python, use o servidor de demonstração:

#### Pré-requisitos

```bash
# Instale as dependências
pip install flask flask-cors
```

#### Execução

```bash
# Na pasta web/
python server-demo.py
```

#### Acesso

- **Interface Web:** http://localhost:5000
- **API Status:** http://localhost:5000/api/status
- **API Templates:** http://localhost:5000/api/templates

## 🎯 Funcionalidades Disponíveis

### ✨ Interface Estática

- ✅ Design responsivo completo
- ✅ Templates de portas interativos
- ✅ Validação de entrada em tempo real
- ✅ Simulação visual de scanning
- ✅ Exportação de resultados
- ✅ Tema SKY com cores #55c2d6

### 🔌 API Flask (Demonstração)

- ✅ Endpoints REST para ping e scan
- ✅ Integração com scanner Python
- ✅ CORS habilitado para frontend
- ✅ Simulação realística de resultados
- ⚠️ **Apenas para demonstração/desenvolvimento**

## 📊 Endpoints da API

### `POST /api/ping`

Teste de ping com detecção de OS

**Entrada:**

```json
{
  "host": "google.com"
}
```

**Saída:**

```json
{
  "success": true,
  "host": "google.com",
  "ip": "142.250.191.14",
  "responsive": true,
  "os_detected": "Linux/Unix",
  "ttl": 64,
  "response_time": "23ms",
  "timestamp": "2025-01-09 15:30:45"
}
```

### `POST /api/scan`

Scan de portas customizado

**Entrada:**

```json
{
  "host": "google.com",
  "ports": [80, 443, 22, 21],
  "show_closed": false
}
```

**Saída:**

```json
{
  "success": true,
  "host": "google.com",
  "ip": "142.250.191.14",
  "ports_scanned": 4,
  "ports_open": 2,
  "ports_closed": 2,
  "results": [
    {
      "port": 80,
      "status": "open",
      "service": "HTTP",
      "response_time": "15ms"
    }
  ],
  "scan_duration": "2.3s",
  "timestamp": "2025-01-09 15:30:45"
}
```

### `GET /api/templates`

Obter templates de portas

### `GET /api/status`

Status da API

## 🔐 Segurança

### ⚠️ IMPORTANTE - Servidor de Demonstração

O arquivo `server-demo.py` é apenas para **demonstração e desenvolvimento**. Para uso em produção:

1. **Implemente autenticação** (JWT, OAuth, etc.)
2. **Configure rate limiting** para prevenir abuso
3. **Use HTTPS** com certificados válidos
4. **Valide todas as entradas** rigorosamente
5. **Configure firewalls** adequadamente
6. **Monitore logs** de acesso e erros

### 🛡️ Modo Simulação

A interface web por padrão funciona em **modo simulação**, que:

- ✅ Não executa comandos reais de rede
- ✅ Mostra resultados realísticos para demonstração
- ✅ É segura para testes e apresentações
- ✅ Não requer permissões administrativas

## 📁 Estrutura de Arquivos

```
web/
├── index.html              # Interface principal
├── server-demo.py          # Servidor Flask (demo)
├── INSTALL.md              # Este arquivo
├── css/
│   └── style.css           # Estilos e animações
├── js/
│   └── scanner.js          # Funcionalidade JavaScript
└── assets/                 # (pasta pai)
    ├── sky-ports-icon.svg      # Ícones do projeto
    ├── sky-ports-banner.svg    # Banner principal
    └── favicon.svg             # Favicon
```

## 🎨 Personalização

### Cores e Tema

Para modificar as cores do tema SKY, edite as variáveis CSS em `css/style.css`:

```css
:root {
  --sky-primary: #55c2d6; /* Cor principal SKY */
  --sky-secondary: #4a9eff; /* Cor secundária */
  --sky-accent: #00d4ff; /* Cor de destaque */
  /* ... outras variáveis ... */
}
```

### Templates de Portas

Para adicionar novos templates, edite o arquivo `js/scanner.js` na função `getPortTemplates()`.

## 🚀 Deploy em Produção

### Hospedagem Estática (Recomendada)

A interface pode ser hospedada em qualquer servidor web estático:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Apache/Nginx**

### Integração com Backend

Para conectar com scanner real:

1. Modifique `server-demo.py` para usar o scanner real
2. Implemente autenticação e segurança
3. Configure CORS apropriadamente
4. Use servidor WSGI para produção (Gunicorn, uWSGI)

## 📞 Suporte

Para dúvidas sobre a interface web:

1. Verifique este arquivo de instalação
2. Consulte os comentários no código
3. Teste primeiro em modo simulação
4. Para problemas específicos, consulte o README principal

---

**⚡ Interface desenvolvida para demonstrar as capacidades do SKY Verificador de Portas**
**🛡️ Lembre-se: Use sempre de forma ética e responsável!**
