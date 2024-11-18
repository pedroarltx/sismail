// Função para copiar texto para a área de transferência
function copiarParaAreaDeTransferencia(texto) {
  // Cria um campo temporário de input
  const inputTemp = document.createElement('input');
  inputTemp.value = texto; // Coloca o texto a ser copiado no campo
  document.body.appendChild(inputTemp);
  inputTemp.select(); // Seleciona o texto no campo
  document.execCommand('copy'); // Executa o comando para copiar
  document.body.removeChild(inputTemp); // Remove o campo temporário
}

// Função para mostrar o alerta "Texto copiado!"
function mostrarAlerta() {
  const alerta = document.getElementById('alerta');
  alerta.style.display = 'block'; // Exibe o alerta
  setTimeout(() => {
      alerta.style.display = 'none'; // Esconde o alerta após 2 segundos
  }, 2000);
}

document.getElementById('copiarDados').addEventListener('click', () => {
  const local = document.getElementById('local').value;
  const textoParaCopiar = `Bom dia!\nConsultar Prestador!\nLocal: ${local}`;

  // Usando a API moderna Clipboard
  navigator.clipboard.writeText(textoParaCopiar).then(() => {
    mostrarAlerta();
  })
});

// Evento para copiar os dados do Veículo
document.getElementById('copiarDadosVeiculo').addEventListener('click', () => {
  const cavalo = document.getElementById('cavalo').value;
  const carreta = document.getElementById('carreta_pr').value;
  const modelo = document.getElementById('modelo').value;
  const cor = document.getElementById('cor').value;
  const motorista = document.getElementById('motorista_pr').value;
  const cpf = document.getElementById('cpf').value;

  const textoParaCopiar = `Dados do Veículo:\nCavalo: ${cavalo}\nCarreta: ${carreta}\nModelo: ${modelo}\nCor: ${cor}\nMotorista: ${motorista}\nCPF: ${cpf}`;
  copiarParaAreaDeTransferencia(textoParaCopiar);
  mostrarAlerta();
  navigator.clipboard.writeText(textoParaCopiar).then(() => {
    mostrarAlerta();
  })
});


// Evento para limpar os campos
document.getElementById('clearButton_2').addEventListener('click', () => {
  document.getElementById('local').value = '';
  document.getElementById('cavalo').value = '';
  document.getElementById('carreta_pr').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('cor').value = '';
  document.getElementById('motorista_pr').value = '';
  document.getElementById('cpf').value = '';
});
