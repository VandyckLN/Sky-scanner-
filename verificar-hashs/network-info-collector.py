#!/usr/bin/env python3
"""
SKY Network Info Collector - Ferramenta para análise de rede própria
IMPORTANTE: Use apenas em redes e sistemas próprios ou com autorização
"""

import socket
import requests
import subprocess
import platform
from datetime import datetime


class NetworkInfoCollector:
    def __init__(self):
        self.info = {}

    def get_local_ip(self):
        """Obtém o IP local da máquina"""
        try:
            # Conecta a um endereço externo para descobrir IP local
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.connect(("8.8.8.8", 80))
                local_ip = s.getsockname()[0]
            return local_ip
        except Exception:
            return "Não disponível"

    def get_public_ip(self):
        """Obtém o IP público da conexão"""
        try:
            # Serviços públicos para verificar IP próprio
            services = [
                "https://httpbin.org/ip",
                "https://api.ipify.org?format=json",
                "https://jsonip.com",
            ]

            for service in services:
                try:
                    response = requests.get(service, timeout=5)
                    if "httpbin.org" in service:
                        return response.json()["origin"].split(",")[0].strip()
                    elif "ipify.org" in service:
                        return response.json()["ip"]
                    elif "jsonip.com" in service:
                        return response.json()["ip"]
                except:
                    continue

            return "Não disponível"
        except Exception:
            return "Não disponível"

    def get_network_interfaces(self):
        """Lista interfaces de rede disponíveis"""
        try:
            import psutil

            interfaces = {}
            for interface, addresses in psutil.net_if_addrs().items():
                interface_info = []
                for addr in addresses:
                    if addr.family == socket.AF_INET:  # IPv4
                        interface_info.append(
                            {
                                "ip": addr.address,
                                "netmask": addr.netmask,
                                "broadcast": addr.broadcast,
                            }
                        )
                if interface_info:
                    interfaces[interface] = interface_info
            return interfaces
        except ImportError:
            return {"erro": "psutil não instalado - use: pip install psutil"}
        except Exception as e:
            return {"erro": str(e)}

    def get_gateway_info(self):
        """Obtém informações do gateway/roteador"""
        try:
            if platform.system().lower() == "windows":
                result = subprocess.run(["ipconfig"], capture_output=True, text=True)
                # Procura por gateway padrão na saída
                lines = result.stdout.split("\n")
                for line in lines:
                    if "Gateway" in line or "gateway" in line:
                        parts = line.split(":")
                        if len(parts) > 1:
                            gateway = parts[1].strip()
                            if gateway and gateway != "":
                                return gateway
            else:
                result = subprocess.run(["ip", "route"], capture_output=True, text=True)
                lines = result.stdout.split("\n")
                for line in lines:
                    if "default" in line:
                        parts = line.split()
                        if "via" in parts:
                            idx = parts.index("via")
                            if idx + 1 < len(parts):
                                return parts[idx + 1]

            return "Não detectado"
        except Exception:
            return "Erro ao detectar"

    def collect_all_info(self):
        """Coleta todas as informações de rede"""
        print("🔍 SKY NETWORK INFO COLLECTOR")
        print("=" * 40)
        print("⚠️  APENAS PARA ANÁLISE DA SUA PRÓPRIA REDE")
        print("=" * 40)

        # IP Local
        local_ip = self.get_local_ip()
        print(f"🏠 IP Local: {local_ip}")

        # IP Público
        public_ip = self.get_public_ip()
        print(f"🌐 IP Público: {public_ip}")

        # Gateway
        gateway = self.get_gateway_info()
        print(f"🚪 Gateway: {gateway}")

        # Interfaces de rede
        print(f"\n🔌 INTERFACES DE REDE:")
        interfaces = self.get_network_interfaces()
        if "erro" in interfaces:
            print(f"   ❌ {interfaces['erro']}")
        else:
            for interface, info in interfaces.items():
                print(f"   📡 {interface}:")
                for addr_info in info:
                    print(f"      IP: {addr_info['ip']}")
                    print(f"      Máscara: {addr_info['netmask']}")

        # Informações do sistema
        print(f"\n💻 INFORMAÇÕES DO SISTEMA:")
        print(f"   SO: {platform.system()} {platform.release()}")
        print(f"   Hostname: {socket.gethostname()}")
        print(f"   Data/Hora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        return {
            "local_ip": local_ip,
            "public_ip": public_ip,
            "gateway": gateway,
            "interfaces": interfaces,
            "system": platform.system(),
            "hostname": socket.gethostname(),
            "timestamp": datetime.now().isoformat(),
        }


def main():
    """Função principal com avisos éticos"""
    print("⚠️" * 20)
    print("IMPORTANTE - LEIA ANTES DE USAR:")
    print("• Esta ferramenta deve ser usada APENAS em suas próprias redes")
    print("• Obter IPs de terceiros sem autorização pode ser ILEGAL")
    print("• Use apenas para administração de sistemas próprios")
    print("• Respeite a privacidade e leis locais")
    print("⚠️" * 20)

    continuar = input("\nVocê confirma que usará apenas em redes próprias? (s/n): ")

    if continuar.lower() != "s":
        print("❌ Operação cancelada. Use apenas de forma ética!")
        return

    collector = NetworkInfoCollector()
    info = collector.collect_all_info()

    # Opção para salvar relatório
    salvar = input("\nSalvar relatório? (s/n): ").lower() == "s"
    if salvar:
        filename = f"network-info-{datetime.now().strftime('%Y%m%d-%H%M%S')}.txt"
        with open(filename, "w", encoding="utf-8") as f:
            f.write("SKY NETWORK INFO REPORT\n")
            f.write("=" * 30 + "\n")
            f.write(f"Data: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

            for key, value in info.items():
                f.write(f"{key}: {value}\n")

        print(f"📄 Relatório salvo: {filename}")


if __name__ == "__main__":
    main()
