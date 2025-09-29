#!/usr/bin/env python3
"""
Test suite for Sky Scanner
Basic tests to validate core functionality
"""

import unittest
import socket
import threading
import time
from sky_scanner import SkyScanner, get_service_name

class TestSkyScanner(unittest.TestCase):
    
    def setUp(self):
        """Set up test fixtures"""
        self.test_host = "127.0.0.1"
        self.scanner = SkyScanner(self.test_host, timeout=1)
    
    def test_scanner_initialization(self):
        """Test scanner initialization"""
        self.assertEqual(self.scanner.target_host, self.test_host)
        self.assertEqual(self.scanner.target_ip, "127.0.0.1")
        self.assertEqual(self.scanner.timeout, 1)
        self.assertEqual(self.scanner.open_ports, [])
    
    def test_invalid_hostname(self):
        """Test handling of invalid hostname"""
        with self.assertRaises(SystemExit):
            SkyScanner("invalid-hostname-that-does-not-exist-12345.com")
    
    def test_scan_closed_port(self):
        """Test scanning a closed port"""
        # Use a high port number that's likely to be closed
        result = self.scanner.scan_port(65432)
        self.assertFalse(result)
    
    def test_get_service_name(self):
        """Test service name resolution"""
        self.assertEqual(get_service_name(80), "HTTP")
        self.assertEqual(get_service_name(443), "HTTPS")
        self.assertEqual(get_service_name(22), "SSH")
        self.assertEqual(get_service_name(99999), "Unknown")
    
    def test_thread_safety(self):
        """Test thread safety of port scanning"""
        scanner = SkyScanner("127.0.0.1")
        
        def scan_worker():
            scanner.scan_port(65431)  # Likely closed port
        
        threads = []
        for _ in range(10):
            t = threading.Thread(target=scan_worker)
            threads.append(t)
            t.start()
        
        for t in threads:
            t.join()
        
        # No assertion needed, just ensure no race conditions occur

class TestServiceIntegration(unittest.TestCase):
    """Integration tests that require a test service"""
    
    def setUp(self):
        """Set up a test server on localhost"""
        self.test_port = 12345
        self.server_socket = None
        self.server_thread = None
        
    def start_test_server(self):
        """Start a simple test server"""
        def server_worker():
            try:
                self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                self.server_socket.bind(('127.0.0.1', self.test_port))
                self.server_socket.listen(1)
                self.server_socket.settimeout(5)  # Timeout after 5 seconds
                
                while True:
                    try:
                        conn, addr = self.server_socket.accept()
                        conn.close()
                    except socket.timeout:
                        break
                    except:
                        break
            except Exception:
                pass
        
        self.server_thread = threading.Thread(target=server_worker, daemon=True)
        self.server_thread.start()
        time.sleep(0.1)  # Give server time to start
    
    def tearDown(self):
        """Clean up test server"""
        if self.server_socket:
            try:
                self.server_socket.close()
            except:
                pass
    
    def test_scan_open_port(self):
        """Test scanning an open port"""
        self.start_test_server()
        scanner = SkyScanner("127.0.0.1", timeout=2)
        
        # Test the open port
        result = scanner.scan_port(self.test_port)
        self.assertTrue(result)
        self.assertIn(self.test_port, scanner.open_ports)

if __name__ == '__main__':
    print("Running Sky Scanner Tests...")
    unittest.main(verbosity=2)