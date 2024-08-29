

document.getElementById('calculadora-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Seu código de cálculo
    const motor = { "1.0": 13.5, "1.4": 13.5, "1.6": 10, "1.8": 10, "2.0": 8 };
    const emissoresDeCarbono = { "gasolina": 0.15, "etanol": 0.07, "diesel": 0.20 };
  
    const tipoMotor = document.getElementById('motor').value;
    const tipoCombustivel = document.getElementById('tipoCombustivel').value;
    const qtdeCombustivel = document.getElementById('combustivel').value; 
    const distancia = parseFloat(document.getElementById('distancia').value);
    const numeroPassageiros = parseInt(document.getElementById('passageiros').value);
  
    if (!motor[tipoMotor] || !emissoresDeCarbono[tipoCombustivel] || distancia <= 0 || numeroPassageiros < 1) {
      alert("Por favor, insira valores válidos.");
      return;
    }
  
    const valor_carro = motor[tipoMotor];
    const carro = valor_carro * qtdeCombustivel / distancia;
    const emissaoDeCarbonoPorUnidadeDeEnergia = emissoresDeCarbono[tipoCombustivel];
    const emissaoDeCarbono = emissaoDeCarbonoPorUnidadeDeEnergia * carro / numeroPassageiros;
  
    const quantidadeDeCarbonoCompensadaPorCreditoDeCarbono = 0.25;
    const quantidadeDeCreditosDeCarbono = emissaoDeCarbono / quantidadeDeCarbonoCompensadaPorCreditoDeCarbono;
    const precoDoCreditoDeCarbono = 70;
  
    const lucroPotencial = quantidadeDeCreditosDeCarbono * precoDoCreditoDeCarbono;
  
    // Exibir a tabela com os resultados
    const tabela = document.getElementById('resultados-tabela');
    tabela.innerHTML = `
      <tr><th>Emissões de Carbono</th><td>${emissaoDeCarbono.toFixed(2)} kg CO2</td></tr>
      <tr><th>Lucro Potencial</th><td>R$ ${lucroPotencial.toFixed(2)}</td></tr>
    `;
    
    document.getElementById('resultado-container').style.display = 'block';
  });
  
  document.getElementById('calcular-button').addEventListener('click', function () {
    // Mostrar o container de resultados
    document.getElementById('resultado-container').style.display = 'block';
    // Mostrar o botão de baixar PDF
    document.getElementById('pdf-container').style.display = 'block';
    
    // Referência à tabela
    const tabela = document.getElementById('resultados-tabela');
    tabela.style.border = '2px solid black';
    tabela.style.borderCollapse = 'collapse';
    tabela.style.width = '100%';
    tabela.style.marginTop = '20px';
    
    // Estilos para as células
    const cells = tabela.querySelectorAll('th, td');
    cells.forEach(cell => {
      cell.style.border = '2px solid black';
      cell.style.padding = '8px';
      cell.style.textAlign = 'left';
    });
  });
  
  document.getElementById('calcular').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Adicionar título
    doc.setFontSize(16);
    doc.text("Resultado do Cálculo de Emissões de Carbono", 20,10);
  
    // Adicionar conteúdo da tabela ao PDF
    doc.setFontSize(12);
    
    const tipoMotor = document.getElementById('motor').value;
    const tipoCombustivel = document.getElementById('tipoCombustivel').value;
    const qtdeCombustivel = document.getElementById('combustivel').value; 
    const distancia = parseFloat(document.getElementById('distancia').value);
    const numeroPassageiros = parseInt(document.getElementById('passageiros').value);
    const emissoes = document.querySelector("#resultados-tabela tr:nth-child(1) td").textContent;
    const lucro = document.querySelector("#resultados-tabela tr:nth-child(2) td").textContent;
  
    // Adicionar texto ao PDF na ordem desejada
    doc.text(`Tipo de Motor: ${tipoMotor}`, 20, 20);
    doc.text(`Tipo de Combustível: ${tipoCombustivel}`, 20,30);
    doc.text(`Quantidade de Combustível: ${qtdeCombustivel}`, 20,40);
    doc.text(`Distância Percorrida: ${distancia}`, 20, 50);
    doc.text(`Número de Passageiros: ${numeroPassageiros}`, 20, 60);
    doc.text(`Emissões de carbono: ${emissoes}`, 20, 70); // Emissões de carbono antes do lucro
    doc.text(`Lucro potencial: ${lucro}`, 20, 80); // Lucro potencial depois das emissões
  
    // Salvar PDF
    doc.save("resultado_calculo.pdf");
  });

