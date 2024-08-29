import requests
from bs4 import BeautifulSoup

# URL do site
link = "https://br.investing.com/commodities/carbon-emissions-historical-data"

# Defina o User-Agent para evitar bloqueios
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"}

# Faça a requisição com os headers
requisicao = requests.get(link, headers=headers)

# Verifique se a requisição foi bem-sucedida
if requisicao.status_code == 200:
    site = BeautifulSoup(requisicao.text, "html.parser")

    # Encontre o valor desejado (ajuste a classe conforme necessário)
    cotacao_carbono = site.find("div", class_="md:text-[42px]")  # Ajuste a classe conforme a estrutura do HTML

    if cotacao_carbono:
        cotacao_texto = cotacao_carbono.get_text(strip=True)

        # Limpe o texto removendo caracteres não numéricos
        # Ajuste conforme o formato do valor (por exemplo, substitua "." por "," se necessário)
        cotacao_texto = cotacao_texto.replace("R$", "").replace(".", "").replace(",", ".")

        try:
            # Converta o texto para float
            cotacao_float = float(cotacao_texto)
        except ValueError:
            print("Não foi possível converter o valor para float.")
    else:
        print("Não foi possível encontrar o elemento com a cotação.")
else:
    print(f"Erro ao acessar o site: {requisicao.status_code}")

with open('./projeto/cotacao_carbono.txt', 'w') as f:
    f.write(str(cotacao_float))