#!/usr/bin/env python3
"""
Sky Scanner - Usage Examples
Demonstrates various ways to use the Sky Scanner port scanning tool
"""

import subprocess
import sys
import time

def run_example(description, command):
    """Run an example command and display the output"""
    print(f"\n{'='*60}")
    print(f"EXAMPLE: {description}")
    print(f"COMMAND: {command}")
    print('='*60)
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
        print(result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)
    except subprocess.TimeoutExpired:
        print("Command timed out")
    except Exception as e:
        print(f"Error running command: {e}")
    
    time.sleep(1)  # Brief pause between examples

def main():
    print("Sky Scanner - Usage Examples")
    print("Demonstrating various scanning techniques")
    
    # Example 1: Help command
    run_example(
        "Display help information",
        "python3 sky_scanner.py --help"
    )
    
    # Example 2: Single port scan
    run_example(
        "Scan a single port (HTTP) on localhost",
        "python3 sky_scanner.py 127.0.0.1 --ports 80"
    )
    
    # Example 3: Small range scan
    run_example(
        "Scan a small range of ports on localhost",
        "python3 sky_scanner.py 127.0.0.1 --ports 78-82"
    )
    
    # Example 4: Common ports scan
    run_example(
        "Scan common ports on localhost",
        "python3 sky_scanner.py 127.0.0.1 --common"
    )
    
    # Example 5: Custom timeout
    run_example(
        "Scan with custom timeout (2 seconds)",
        "python3 sky_scanner.py 127.0.0.1 --ports 80 --timeout 2"
    )
    
    print(f"\n{'='*60}")
    print("Examples completed!")
    print("For more information, run: python3 sky_scanner.py --help")
    print('='*60)

if __name__ == "__main__":
    main()