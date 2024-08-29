

def main():
    while True:
        tipo_motor = input("Qual tipo do motor do veículo: ")
        motor = {
            "1.0": 13.5,
            "1.4": 13.5,
            "1.6": 10,
            "1.8": 10,
            "2.0": 8,
        }
        if tipo_motor not in motor:
            raise ValueError("Tipo de motor inválido.")

        quantidade_energia = float(input("Quantos litros de combustível foram gastos? "))
        if quantidade_energia <= 0:
            raise ValueError("Quantidade de energia inválida.")

        tipo_combustivel = input("Qual tipo de combustível foi utilizado? ")
        if tipo_combustivel not in ["gasolina", "etanol", "diesel"]:
            raise ValueError("Tipo de combustível inválido.")

        distancia = float(input("Qual foi a distância percorrida? (km): "))
        if distancia <= 0:
            raise ValueError("Distância percorrida inválida.")

        numero_passageiros = int(input("Quantos passageiros estavam presentes? "))
        if numero_passageiros < 1:
            raise ValueError("Número de passageiros inválido.")

        emissores_de_carbono = {
            "gasolina": 0.15,
            "etanol": 0.07,
            "diesel": 0.20,
        }

        valor_carro = motor[tipo_motor]
        carro = valor_carro * quantidade_energia / distancia

        emissao_de_carbono_por_unidade_de_energia = emissores_de_carbono[tipo_combustivel]
        emissao_de_carbono = emissao_de_carbono_por_unidade_de_energia * carro / numero_passageiros

        quantidade_de_carbono_compensada_por_credito_de_carbono = 0.25
        quantidade_de_creditos_de_carbono = emissao_de_carbono / quantidade_de_carbono_compensada_por_credito_de_carbono

        preco_do_credito_de_carbono = 70


        lucro_potencial = quantidade_de_creditos_de_carbono * preco_do_credito_de_carbono

        print(f"Emissões de carbono: {emissao_de_carbono:.2f} kg CO2")
        print(f"Lucro potencial com a venda de excedentes de créditos: R$ {lucro_potencial:.2f}")
        break

if __name__ == "__main__":
    main()