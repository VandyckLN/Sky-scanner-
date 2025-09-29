import socket
import threading
import subprocess
import platform
import re
from datetime import datetime


class PortScanner:
    def __init__(self):
        self.port_services = {
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
            1433: "MSSQL",
            3306: "MySQL",
            3389: "RDP",
            5432: "PostgreSQL",
            5900: "VNC",
            6379: "Redis",
            8080: "HTTP-Proxy",
        }
        self.resultados = []

    def validar_entrada_host(self, host):
        """
        Valida se a entrada é um IP válido ou um nome DNS válido
        """
        # Padrão para IP válido (IPv4)
        ip_pattern = r"^(\d{1,3}\.){3}\d{1,3}$"

        # Padrão para DNS válido (simplificado)
        dns_pattern = r"^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$"

        if re.match(ip_pattern, host):
            # Verifica se é um IP válido (cada octeto entre 0-255)
            octetos = host.split(".")
            for octeto in octetos:
                if int(octeto) > 255:
                    return False, "IP inválido: octeto maior que 255"
            return True, "IP válido"

        elif re.match(dns_pattern, host) and len(host) <= 253:
            return True, "DNS válido"

        else:
            return (
                False,
                "Formato inválido. Use IP (ex: 192.168.1.1) ou DNS (ex: google.com)",
            )

    def resolver_dns(self, host):
        """
        Resolve nome DNS para IP
        """
        try:
            ip = socket.gethostbyname(host)
            return True, ip
        except socket.gaierror as e:
            return False, f"Erro ao resolver DNS: {e}"

    def ping_host(self, host):
        """
        Verifica se o host está online usando ping REAL do sistema operacional
        """
        print(f"🏓 Testando conectividade com {host}...")

        sistema = platform.system().lower()

        # Comandos específicos para cada sistema
        if sistema == "windows":
            comando = ["ping", "-n", "2", host]  # 2 pings no Windows
        elif sistema == "linux":
            comando = ["ping", "-c", "2", host]  # 2 pings no Linux
        elif sistema == "darwin":  # macOS
            comando = ["ping", "-c", "2", host]
        else:
            comando = ["ping", "-c", "2", host]  # Padrão Unix-like

        try:
            # Executa o comando ping real do sistema
            resultado = subprocess.run(
                comando,
                capture_output=True,
                text=True,
                timeout=10,
                encoding="utf-8",
                errors="ignore",
            )

            # Analisa a saída do ping
            saida = resultado.stdout.lower()

            if sistema == "windows":
                # No Windows, procura por "perdidos = 0" ou "ttl="
                if "perdidos = 0" in saida or "ttl=" in saida:
                    print("✅ Host respondeu ao ping")
                    return True
                else:
                    print("❌ Host não respondeu ao ping")
                    return False
            else:
                # Em sistemas Unix-like, verifica o código de retorno
                if resultado.returncode == 0:
                    print("✅ Host respondeu ao ping")
                    return True
                else:
                    print("❌ Host não respondeu ao ping")
                    return False

        except subprocess.TimeoutExpired:
            print("⏱️ Timeout no ping - host pode estar offline ou bloqueando ping")
            return False
        except Exception as e:
            print(f"❌ Erro ao executar ping: {e}")
            return False

    def verificar_porta_individual(self, host, porta, timeout=3):
        """
        Verifica se uma porta específica está aberta em um host

        Parâmetros:
        host: endereço IP ou nome do host
        porta: número da porta a verificar
        timeout: tempo limite para conexão

        Retorna: True se porta estiver aberta, False caso contrário
        """
        try:
            # Cria um socket TCP
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(timeout)

            # Tenta conectar na porta
            resultado = sock.connect_ex((host, porta))
            sock.close()

            # Se resultado for 0, a conexão foi bem-sucedida
            return resultado == 0
        except Exception:
            return False

    def processar_host(self, entrada_host):
        """
        Processa a entrada do host (DNS ou IP) e retorna o IP para usar no scan
        """
        # Remove espaços e converte para minúsculo
        host = entrada_host.strip().lower()

        # Valida a entrada
        valido, mensagem = self.validar_entrada_host(host)
        if not valido:
            print(f"❌ {mensagem}")
            return None, None

        print(f"📝 Entrada: {host} ({mensagem})")

        # Se for DNS, resolve para IP
        if not re.match(r"^(\d{1,3}\.){3}\d{1,3}$", host):
            sucesso, ip = self.resolver_dns(host)
            if not sucesso:
                print(f"❌ {ip}")
                return None, None
            print(f"🔍 DNS resolvido: {host} → {ip}")
            return host, ip
        else:
            # Já é um IP
            return host, host

    def enumerate_services(self, ports):
        """
        Enumera os serviços baseados nas portas fornecidas
        """
        services = []

        for port in ports:
            if port in self.port_services:
                services.append(f"{port}: {self.port_services[port]}")
            else:
                services.append(f"{port}: Desconhecido")

        return services

    def scan_portas_host(self, entrada_host, portas_lista, mostrar_fechadas=False):
        """
        Escaneia uma lista de portas em um host específico
        """
        # Processa o host (DNS ou IP)
        host_original, ip_host = self.processar_host(entrada_host)
        if not ip_host:
            return [], []

        # Testa conectividade com ping
        if not self.ping_host(ip_host):
            continuar = input(
                "❓ Host não respondeu ao ping. Continuar mesmo assim? (s/n): "
            ).lower()
            if continuar != "s":
                print("❌ Scan cancelado pelo usuário")
                return [], []

        print(f"\n🔍 Escaneando {host_original} ({ip_host})...")
        print(f"📅 Início: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 50)

        portas_abertas = []
        portas_fechadas = []

        for porta in portas_lista:
            if self.verificar_porta_individual(ip_host, porta):
                servico = self.port_services.get(porta, "Desconhecido")
                print(f"✅ Porta {porta} ABERTA - Serviço: {servico}")
                portas_abertas.append((porta, servico))
            else:
                if mostrar_fechadas:
                    print(f"❌ Porta {porta} FECHADA")
                portas_fechadas.append(porta)

        print("-" * 50)
        print(
            f"📊 Resumo: {len(portas_abertas)} abertas, {len(portas_fechadas)} fechadas"
        )

        return portas_abertas, portas_fechadas

    def salvar_relatorio(self, host, portas_abertas, portas_fechadas):
        """
        Salva o relatório do scan em um arquivo
        """
        nome_arquivo = f"relatorio-scan-{host.replace('.', '-').replace(':', '-')}-{datetime.now().strftime('%Y%m%d-%H%M%S')}.txt"

        with open(nome_arquivo, "w", encoding="utf-8") as arquivo:
            arquivo.write("RELATÓRIO DE SCAN DE PORTAS\n")
            arquivo.write(f"Host: {host}\n")
            arquivo.write(f"Data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            arquivo.write("=" * 50 + "\n\n")

            arquivo.write("PORTAS ABERTAS:\n")
            for porta, servico in portas_abertas:
                arquivo.write(f"Porta {porta}: {servico}\n")

            arquivo.write(f"\nTOTAL: {len(portas_abertas)} portas abertas\n")
            arquivo.write(f"TOTAL: {len(portas_fechadas)} portas fechadas\n")

        print(f"📄 Relatório salvo em: {nome_arquivo}")


def main():
    """
    Função principal com menu interativo
    """
    print("🔐 VERIFICADOR DE PORTAS E SERVIÇOS v2.0")
    print("=" * 45)
    print("💡 Aceita DNS (google.com) ou IP (8.8.8.8)")

    scanner = PortScanner()

    while True:
        print("\nEscolha uma opção:")
        print("1. Enumerar serviços por portas (lista)")
        print("2. Escanear portas em um host")
        print("3. Scan rápido (portas comuns)")
        print("4. Teste de ping")
        print("5. Sair")

        opcao = input("\nOpção: ").strip()

        if opcao == "1":
            # Modo original - enumerar serviços
            print("\nDigite as portas separadas por vírgula:")
            print(
                "Exemplo: 21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,3306,3389,5432,5900,6379,8080"
            )
            ports_input = input("Portas: ")

            try:
                ports = [int(port.strip()) for port in ports_input.split(",")]
                services = scanner.enumerate_services(ports)

                print("\n📋 SERVIÇOS IDENTIFICADOS:")
                for service in services:
                    print(f"  {service}")
            except ValueError:
                print("❌ Erro: Digite apenas números separados por vírgula")

        elif opcao == "2":
            # Scan em host específico
            print("\nExemplos de entrada:")
            print("  • IP: 127.0.0.1, 192.168.1.1, 8.8.8.8")
            print("  • DNS: google.com, github.com, localhost")

            host = input("\nDigite o IP ou DNS: ").strip()
            ports_input = input("Digite as portas separadas por vírgula: ")
            mostrar_fechadas = input("Mostrar portas fechadas? (s/n): ").lower() == "s"

            try:
                ports = [int(port.strip()) for port in ports_input.split(",")]
                portas_abertas, portas_fechadas = scanner.scan_portas_host(
                    host, ports, mostrar_fechadas
                )

                if portas_abertas or portas_fechadas:
                    salvar = input("\nSalvar relatório? (s/n): ").lower() == "s"
                    if salvar:
                        scanner.salvar_relatorio(host, portas_abertas, portas_fechadas)

            except ValueError:
                print("❌ Erro: Digite apenas números separados por vírgula")

        elif opcao == "3":
            # Scan rápido
            print("\nExemplos: 127.0.0.1, google.com, github.com")
            host = input("Digite o IP ou DNS: ").strip()
            portas_comuns = [
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
                8080,
            ]

            print(
                f"\n🚀 Executando scan rápido em {len(portas_comuns)} portas comuns..."
            )
            portas_abertas, portas_fechadas = scanner.scan_portas_host(
                host, portas_comuns
            )

            if portas_abertas or portas_fechadas:
                salvar = input("\nSalvar relatório? (s/n): ").lower() == "s"
                if salvar:
                    scanner.salvar_relatorio(host, portas_abertas, portas_fechadas)

        elif opcao == "4":
            # Teste de ping apenas
            print("\nTeste de conectividade (ping)")
            print("Exemplos: 8.8.8.8, google.com, 127.0.0.1")
            host = input("Digite o IP ou DNS: ").strip()

            host_original, ip_host = scanner.processar_host(host)
            if ip_host:
                print(f"Testando conectividade com {host_original} "
                      f"({ip_host})")
                scanner.ping_host(ip_host)

        elif opcao == "5":
            print("👋 Saindo...")
            break

        else:
            print("❌ Opção inválida!")


if __name__ == "__main__":
    main()
