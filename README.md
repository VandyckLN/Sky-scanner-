# Sky Scanner

Um scanner de portas em Python para profissionais de cibersegurança e administradores de rede.

## Descrição

O Sky Scanner é uma ferramenta básica de varredura de portas desenvolvida em Python que permite aos profissionais de segurança cibernética e administradores de rede identificar portas abertas em sistemas remotos.

## Funcionalidades

- Varredura de portas TCP
- Suporte a varredura de intervalos de portas personalizados
- Varredura de portas comuns pré-definidas
- Interface de linha de comando intuitiva
- Suporte a threading para melhor performance
- Identificação de serviços em portas conhecidas

## Instalação

### Requisitos
- Python 3.6 ou superior

### Instalação via pip (desenvolvimento local)
```bash
pip install -e .
```

### Execução direta
```bash
python sky_scanner.py [opções] <target>
```

## Uso

### Exemplos básicos

1. **Varredura de portas comuns:**
```bash
python sky_scanner.py google.com --common
```

2. **Varredura de um intervalo de portas:**
```bash
python sky_scanner.py 192.168.1.1 --ports 1-1000
```

3. **Varredura de uma porta específica:**
```bash
python sky_scanner.py example.com --ports 80
```

4. **Varredura com timeout personalizado:**
```bash
python sky_scanner.py target.com --ports 1-100 --timeout 2
```

5. **Varredura com número de threads personalizado:**
```bash
python sky_scanner.py target.com --ports 1-1000 --threads 50
```

### Opções de linha de comando

```
usage: sky_scanner.py [-h] [-p PORTS] [-c] [-t TIMEOUT] [--threads THREADS] target

Sky Scanner - Port Scanner Tool

positional arguments:
  target                Target hostname or IP address

optional arguments:
  -h, --help            show this help message and exit
  -p PORTS, --ports PORTS
                        Port range (e.g., 1-1000) or single port
  -c, --common          Scan common ports only
  -t TIMEOUT, --timeout TIMEOUT
                        Socket timeout (default: 1)
  --threads THREADS     Number of threads (default: 100)
```

## Segurança e Ética

⚠️ **IMPORTANTE**: Esta ferramenta deve ser usada apenas para:
- Testes em seus próprios sistemas
- Auditorias autorizadas de segurança
- Fins educacionais em ambientes controlados

O uso não autorizado desta ferramenta em sistemas de terceiros pode ser ilegal. Sempre obtenha permissão explícita antes de realizar varreduras de rede.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar Pull Requests.
