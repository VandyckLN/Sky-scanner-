def verificar_hashes(lista_hashes):
    """
    Função que verifica se os hashes calculados correspondem aos hashes esperados

    Parâmetros:
    lista_hashes: Lista com pares de hashes no formato "hash_calculado,hash_esperado"
    """

    # Percorre cada par de hash na lista fornecida
    for hash_comparacao in lista_hashes:
        # Divide o par de hashes usando a vírgula como separador
        # hash_calculado: o hash que foi gerado pelo sistema
        # hash_esperado: o hash que deveria ser o resultado correto
        hash_calculado, hash_esperado = hash_comparacao.split(",")

        # Remove espaços em branco extras que podem existir
        hash_calculado = hash_calculado.strip()
        hash_esperado = hash_esperado.strip()

        # Compara se o hash calculado é exatamente igual ao hash esperado
        if hash_calculado == hash_esperado:
            # Se os hashes são iguais, a verificação passou
            print("Correto")
        else:
            # Se os hashes são diferentes, a verificação falhou
            print("Inválido")


def main():
    """
    Função principal que executa o programa de verificação de hashes
    """

    # Solicita ao usuário que digite os pares de hashes
    # O formato esperado é: "hash1,hash_esperado1;hash2,hash_esperado2"

    # Recebe a entrada do usuário
    hashes_usuario = input()

    # Divide a string de entrada usando ponto e vírgula como separador
    # Isso cria uma lista onde cada elemento é um par "hash_calculado,hash_esperado"
    lista_hashes = hashes_usuario.split(";")

    # Chama a função para verificar todos os hashes da lista
    verificar_hashes(lista_hashes)

# Verifica se este arquivo está sendo executado diretamente
if __name__ == "__main__":
    # Executa a função principal
    main()
