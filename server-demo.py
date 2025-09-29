#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SKY Verificador de Portas - Servidor Web Demonstração
======================================================

Este arquivo demonstra como integrar a interface web com o backend Python
usando Flask para criar uma API REST que conecta com o scanner de portas.

IMPORTANTE: Este é um exemplo educacional. Para uso em produção,
implemente autenticação, rate limiting e outras medidas de segurança.

Instalação de dependências:
pip install flask flask-cors

Execução:
python server-demo.py

Acesso:
http://localhost:5000
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sys
import os
from datetime import datetime

# Adiciona o diretório pai ao path para importar o scanner
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    # Importa as funções do scanner de portas
    from verificar_hashs import verificar_port_melhorado  # noqa: F401

    SCANNER_AVAILABLE = True
except ImportError:
    print("⚠️  Scanner não encontrado - usando modo simulação")
    SCANNER_AVAILABLE = False

app = Flask(__name__)
CORS(app)  # Permite requisições cross-origin

# Configurações
app.config["SECRET_KEY"] = "sky-scanner-demo-2025"


@app.route("/")
def index():
    """Serve a interface web principal"""
    return send_from_directory(".", "index.html")


@app.route("/<path:path>")
def static_files(path):
    """Serve arquivos estáticos (CSS, JS, imagens)"""
    return send_from_directory(".", path)


@app.route("/api/ping", methods=["POST"])
def api_ping():
    """
    API endpoint para teste de ping com detecção de OS

    POST /api/ping
    {
        "host": "google.com"
    }

    Returns:
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
    """
    try:
        data = request.get_json()
        host = data.get("host", "").strip()

        if not host:
            return jsonify({"success": False, "error": "Host não informado"}), 400

        # Simula ping (em ambiente real, use o scanner real)
        if SCANNER_AVAILABLE:
            # Aqui você integraria com o scanner real
            # result = scanner_real.ping_host(host)
            pass

        # Simulação para demonstração
        result = simulate_ping(host)

        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": f"Erro interno: {str(e)}"}), 500


@app.route("/api/scan", methods=["POST"])
def api_scan():
    """
    API endpoint para scan de portas

    POST /api/scan
    {
        "host": "google.com",
        "ports": [80, 443, 22, 21],
        "show_closed": false
    }

    Returns:
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
    """
    try:
        data = request.get_json()
        host = data.get("host", "").strip()
        ports = data.get("ports", [])
        show_closed = data.get("show_closed", False)

        if not host:
            return jsonify({"success": False, "error": "Host não informado"}), 400

        if not ports:
            return jsonify({"success": False, "error": "Nenhuma porta informada"}), 400

        # Simula scan (em ambiente real, use o scanner real)
        if SCANNER_AVAILABLE:
            # Aqui você integraria com o scanner real
            # result = scanner_real.scan_ports(host, ports)
            pass

        # Simulação para demonstração
        result = simulate_scan(host, ports, show_closed)

        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": f"Erro interno: {str(e)}"}), 500


@app.route("/api/templates", methods=["GET"])
def api_templates():
    """
    API endpoint para obter templates de portas

    GET /api/templates

    Returns:
    {
        "templates": {
            "basic": {
                "name": "TOP 10 - Essenciais",
                "ports": [21, 22, 23, 25, 53, 80, 135, 443, 445, 3389],
                "description": "Portas mais comuns"
            }
        }
    }
    """
    templates = {
        "basic": {
            "name": "🔥 TOP 10 - Essenciais",
            "ports": [21, 22, 23, 25, 53, 80, 135, 443, 445, 3389],
            "description": ("FTP, SSH, Telnet, SMTP, DNS, HTTP, RPC, HTTPS, SMB, RDP"),
        },
        "common": {
            "name": "⭐ TOP 20 - Comuns",
            "ports": [
                21,
                22,
                23,
                25,
                53,
                80,
                110,
                135,
                139,
                143,
                443,
                445,
                993,
                995,
                1433,
                3306,
                3389,
                5432,
                5900,
                8080,
            ],
            "description": "Inclui POP3, NetBIOS, IMAP, MySQL, PostgreSQL, VNC",
        },
        "web": {
            "name": "🌐 Web & HTTP",
            "ports": [80, 443, 8000, 8080, 8081, 8443, 8888, 9000, 9001, 9090],
            "description": "Serviços web, proxies HTTP e portas alternativas",
        },
        "database": {
            "name": "💾 Bancos de Dados",
            "ports": [1433, 1434, 3306, 5432, 6379, 27017, 1521, 5984],
            "description": ("SQL Server, MySQL, PostgreSQL, Redis, MongoDB, Oracle"),
        },
        "remote": {
            "name": "🔒 Acesso Remoto",
            "ports": [22, 23, 3389, 5900, 5901],
            "description": "SSH, Telnet, RDP, VNC",
        },
        "security": {
            "name": "🔐 Segurança/Pentest",
            "ports": [
                21,
                22,
                23,
                25,
                53,
                80,
                135,
                139,
                443,
                445,
                993,
                995,
                1433,
                3306,
                3389,
                5432,
                5900,
                8080,
            ],
            "description": "Conjunto otimizado para testes de penetração",
        },
        "email": {
            "name": "📧 Serviços de Email",
            "ports": [25, 110, 143, 465, 587, 993, 995],
            "description": "SMTP, POP3, IMAP, versões seguras",
        },
        "development": {
            "name": "💻 Desenvolvimento",
            "ports": [3000, 3001, 4000, 5000, 5001, 8000, 8080, 8081, 9000, 9001, 9090],
            "description": ("Node.js, Python, Ruby, servidores de desenvolvimento"),
        },
    }

    return jsonify({"success": True, "templates": templates})


@app.route("/api/status", methods=["GET"])
def api_status():
    """Status da API"""
    return jsonify(
        {
            "success": True,
            "service": "SKY Verificador de Portas API",
            "version": "2.0.0",
            "scanner_available": SCANNER_AVAILABLE,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }
    )


def simulate_ping(host):
    """
    Simula resultado de ping para demonstração
    Em ambiente real, use o scanner real
    """
    import random

    # Simula diferentes tipos de host
    if "google" in host.lower():
        ip = "142.250.191.14"
        os_detected = "Linux/Unix"
        ttl = 64
        responsive = True
    elif "microsoft" in host.lower() or "windows" in host.lower():
        ip = "40.113.200.201"
        os_detected = "Windows"
        ttl = 128
        responsive = True
    else:
        ip = f"192.168.1.{random.randint(1, 254)}"
        os_choices = ["Linux/Unix", "Windows", "Cisco/Network Device"]
        os_detected = random.choice(os_choices)
        ttl = random.choice([64, 128, 255])
        responsive = random.choice([True, False])

    return {
        "success": True,
        "host": host,
        "ip": ip,
        "responsive": responsive,
        "os_detected": os_detected,
        "ttl": ttl,
        "response_time": f"{random.randint(5, 50)}ms",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


def simulate_scan(host, ports, show_closed=False):
    """
    Simula resultado de scan para demonstração
    Em ambiente real, use o scanner real
    """
    import random
    import time

    start_time = time.time()

    # Serviços conhecidos
    services = {
        21: "FTP",
        22: "SSH",
        23: "Telnet",
        25: "SMTP",
        53: "DNS",
        80: "HTTP",
        110: "POP3",
        135: "RPC",
        139: "NetBIOS",
        143: "IMAP",
        443: "HTTPS",
        445: "SMB",
        993: "IMAPS",
        995: "POP3S",
        1433: "SQL Server",
        3306: "MySQL",
        3389: "RDP",
        5432: "PostgreSQL",
        5900: "VNC",
        8080: "HTTP-Alt",
    }

    results = []
    ports_open = 0
    ports_closed = 0

    for port in ports:
        # Simula probabilidade de porta aberta baseada no tipo
        if port in [80, 443]:  # HTTP/HTTPS mais prováveis
            is_open = random.random() > 0.2
        elif port in [22, 21, 25]:  # SSH, FTP, SMTP moderadamente prováveis
            is_open = random.random() > 0.6
        else:  # Outras portas menos prováveis
            is_open = random.random() > 0.8

        status = "open" if is_open else "closed"
        service = services.get(port, "Unknown")

        if is_open:
            ports_open += 1
        else:
            ports_closed += 1

        result = {
            "port": port,
            "status": status,
            "service": service,
            "response_time": f"{random.randint(1, 30)}ms",
        }

        # Adiciona resultado se porta aberta ou se deve mostrar fechadas
        if is_open or show_closed:
            results.append(result)

    scan_duration = time.time() - start_time

    return {
        "success": True,
        "host": host,
        "ip": simulate_ping(host)["ip"],
        "ports_scanned": len(ports),
        "ports_open": ports_open,
        "ports_closed": ports_closed,
        "results": results,
        "scan_duration": f"{scan_duration:.1f}s",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


if __name__ == "__main__":
    print("🔐 SKY Verificador de Portas - Servidor Web Demo")
    print("=" * 50)
    print("🌐 Interface web: http://localhost:5000")
    print("📡 API endpoints:")
    print("   POST /api/ping - Teste de ping")
    print("   POST /api/scan - Scan de portas")
    print("   GET  /api/templates - Templates de portas")
    print("   GET  /api/status - Status da API")
    print()
    print("⚠️  IMPORTANTE: Este é um servidor de demonstração!")
    print("   Para produção, implemente autenticação e rate limiting.")
    print()
    print("🚀 Iniciando servidor...")

    app.run(
        host="0.0.0.0",  # Permite acesso externo
        port=5000,
        debug=True,  # Modo debug para desenvolvimento
        threaded=True,  # Suporte a múltiplas requisições
    )
