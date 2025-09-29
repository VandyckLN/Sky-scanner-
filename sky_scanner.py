#!/usr/bin/env python3
"""
Sky Scanner - Port Scanner Tool
A basic port scanner for cybersecurity professionals and network administrators.
"""

import socket
import threading
import argparse
import sys
from datetime import datetime
import time

class SkyScanner:
    def __init__(self, target_host, timeout=1):
        """
        Initialize the Sky Scanner
        
        Args:
            target_host (str): Target hostname or IP address
            timeout (int): Socket timeout in seconds
        """
        self.target_host = target_host
        self.timeout = timeout
        self.open_ports = []
        self.lock = threading.Lock()
        
        # Resolve hostname to IP
        try:
            self.target_ip = socket.gethostbyname(target_host)
        except socket.gaierror:
            print(f"Error: Could not resolve hostname '{target_host}'")
            sys.exit(1)
    
    def scan_port(self, port):
        """
        Scan a single port
        
        Args:
            port (int): Port number to scan
            
        Returns:
            bool: True if port is open, False otherwise
        """
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(self.timeout)
            result = sock.connect_ex((self.target_ip, port))
            sock.close()
            
            if result == 0:
                with self.lock:
                    self.open_ports.append(port)
                    print(f"Port {port}: Open")
                return True
        except Exception as e:
            pass
        return False
    
    def scan_range(self, start_port, end_port, threads=100):
        """
        Scan a range of ports using threading
        
        Args:
            start_port (int): Starting port number
            end_port (int): Ending port number
            threads (int): Number of threads to use
        """
        print(f"Starting Sky Scanner on {self.target_host} ({self.target_ip})")
        print(f"Scanning ports {start_port}-{end_port}")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 50)
        
        def worker():
            while True:
                try:
                    port = port_queue.get_nowait()
                    self.scan_port(port)
                    port_queue.task_done()
                except:
                    break
        
        import queue
        port_queue = queue.Queue()
        
        # Add ports to queue
        for port in range(start_port, end_port + 1):
            port_queue.put(port)
        
        # Start threads
        thread_list = []
        for _ in range(min(threads, end_port - start_port + 1)):
            t = threading.Thread(target=worker)
            t.daemon = True
            t.start()
            thread_list.append(t)
        
        # Wait for completion
        port_queue.join()
        
        # Print results
        print("-" * 50)
        if self.open_ports:
            print(f"Open ports found: {sorted(self.open_ports)}")
            print(f"Total open ports: {len(self.open_ports)}")
        else:
            print("No open ports found.")
        
        print(f"Scan completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    def scan_common_ports(self):
        """Scan commonly used ports"""
        common_ports = [
            21, 22, 23, 25, 53, 80, 110, 111, 135, 139, 143, 443, 993, 995,
            1723, 3306, 3389, 5900, 8080, 8443, 8888, 9090
        ]
        
        print(f"Starting Sky Scanner on {self.target_host} ({self.target_ip})")
        print("Scanning common ports...")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 50)
        
        for port in common_ports:
            if self.scan_port(port):
                time.sleep(0.1)  # Small delay to avoid overwhelming the target
        
        print("-" * 50)
        if self.open_ports:
            print(f"Open ports found: {sorted(self.open_ports)}")
            print(f"Total open ports: {len(self.open_ports)}")
        else:
            print("No open ports found.")
        
        print(f"Scan completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

def get_service_name(port):
    """Get service name for a given port"""
    services = {
        21: "FTP",
        22: "SSH",
        23: "Telnet",
        25: "SMTP",
        53: "DNS",
        80: "HTTP",
        110: "POP3",
        111: "RPC",
        135: "RPC",
        139: "NetBIOS",
        143: "IMAP",
        443: "HTTPS",
        993: "IMAPS",
        995: "POP3S",
        1723: "PPTP",
        3306: "MySQL",
        3389: "RDP",
        5900: "VNC",
        8080: "HTTP-Alt",
        8443: "HTTPS-Alt",
        8888: "HTTP-Alt",
        9090: "HTTP-Alt"
    }
    return services.get(port, "Unknown")

def main():
    parser = argparse.ArgumentParser(description="Sky Scanner - Port Scanner Tool")
    parser.add_argument("target", help="Target hostname or IP address")
    parser.add_argument("-p", "--ports", help="Port range (e.g., 1-1000) or single port")
    parser.add_argument("-c", "--common", action="store_true", help="Scan common ports only")
    parser.add_argument("-t", "--timeout", type=int, default=1, help="Socket timeout (default: 1)")
    parser.add_argument("--threads", type=int, default=100, help="Number of threads (default: 100)")
    
    args = parser.parse_args()
    
    if len(sys.argv) == 1:
        parser.print_help()
        return
    
    scanner = SkyScanner(args.target, args.timeout)
    
    try:
        if args.common:
            scanner.scan_common_ports()
        elif args.ports:
            if "-" in args.ports:
                start_port, end_port = map(int, args.ports.split("-"))
                scanner.scan_range(start_port, end_port, args.threads)
            else:
                port = int(args.ports)
                scanner.scan_range(port, port, 1)
        else:
            # Default: scan common ports
            scanner.scan_common_ports()
            
    except KeyboardInterrupt:
        print("\nScan interrupted by user")
        sys.exit(0)
    except ValueError:
        print("Error: Invalid port range format. Use format: start-end (e.g., 1-1000)")
        sys.exit(1)

if __name__ == "__main__":
    main()