document.addEventListener('DOMContentLoaded', () => {
  // Função para copiar o conteúdo de um parágrafo
  function copiarTexto(id) {
      const paragrafo = document.getElementById(id);
      const textarea = document.createElement("textarea");
      textarea.value = paragrafo.textContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      // Mostrar mensagem de "Texto copiado"
      const alerta = document.getElementById('alerta');
      alerta.style.display = 'block';
      alerta.style.opacity = '1';

      // Ocultar o alerta após 2 segundos
      setTimeout(() => {
          alerta.style.opacity = '0';
          setTimeout(() => {
              alerta.style.display = 'none';
          }, 500); // Tempo para a animação de desaparecimento
      }, 2000);
  }

  // Função para gerar o texto com base nos inputs
  document.getElementById('gerarTexto_tab').addEventListener('click', () => {
      let texto = "";

      // Contato com o condutor
      const nomeMotorista = document.getElementById('nome_motorista').value.trim();
      const numeroMotorista = document.getElementById('numero_motorista').value.trim();
      const contatoCondutor = document.querySelector('input[name="contato_condutor"]:checked');
      if (contatoCondutor) {
          if (contatoCondutor.value === 'sim') {
              texto += `Em contato com o Sr. ${nomeMotorista} (motorista), pelo telefone ${numeroMotorista}, onde nos informou que XXXX. Todos os comandos cabíveis foram enviados ao veículo. Ressaltamos que o veículo permanece posicionado corretamente, em rota, e sem gerar alerta de risco. `;
          } else if (contatoCondutor.value === 'nao') {
              texto += `Tentamos contato com o Sr. ${nomeMotorista} (motorista) através do telefone ${numeroMotorista}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
          } else if (contatoCondutor.value === 'inexistente_mot') {
              texto += `Tentamos contato com o Sr. ${nomeMotorista} (motorista) através do telefone ${numeroMotorista}, porém o número consta como inexistente ou fora de área. `;
          }
      }

      // Contato com o responsável
      const nomeResponsavel = document.getElementById('nome_responsavel').value.trim();
      const numeroResponsavel = document.getElementById('numero_responsavel').value.trim();
      const contatoResponsavel = document.querySelector('input[name="contato_responsavel"]:checked');
      if (contatoResponsavel) {
          if (contatoResponsavel.value === 'sim') {
              texto += `Efetuamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, onde nos informou que XXXX, sendo assim o notificamos que seguiremos com o procedimento de contingência até normalizar a situação. `;
          } else if (contatoResponsavel.value === 'nao') {
              texto += `Tentamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
          } else if (contatoResponsavel.value === 'inexistente_resp') {
              texto += `Tentamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, porém o número consta como inexistente ou fora de área. `;
          }
      }

      // Contato com o responsável via grupo
      const transportadoras = document.querySelector('input[name="contato_responsavel_grupo"]:checked');
      if (transportadoras) {
          if (transportadoras.value === "Qbox") {
              texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Qbox - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
          } else if (transportadoras.value === "Otimiza") {
              texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Otimiza - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
          } else if (transportadoras.value === "Adege") {
              texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Adege - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
          } else if (transportadoras.value === "GVM") {
              texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp GVM - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
          } else if (transportadoras.value === "jvtrans") {
              texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp JV Transportes - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
          } else if (transportadoras.value === "Rapido_parana") {
              texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Rápido Paraná - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
          }
      }

      // Contato com a polícia
      const nomePolicial = document.getElementById('nome_policial').value.trim();
      const numeroPolicial = document.getElementById('numero_policial').value.trim();
      const acionamentoPolicial = document.querySelector('input[name="acionamento_policial"]:checked');
      if (acionamentoPolicial) {
          if (acionamentoPolicial.value === 'sim') {
              texto += `Sendo assim, seguiremos com o procedimento de contingência onde efetuamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, onde fomos atendidos pelo Sr. XXXX, e o deixamos ciente da situação. Segue nossa proposta de pronta resposta: `;
          } else {
              texto += `Sendo assim, seguimos com o procedimento de contingência onde tentamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, mas a ligação é direcionada para caixa postal. Segue nossa proposta de pronta resposta: `;
          }
      }

      // Continuidade Policial
      const continuidadePolicial = document.querySelector('input[name="continuidade_policial"]:checked');
      if (continuidadePolicial && continuidadePolicial.value === 'Continuidade') {
          texto += "Sendo assim, manteremos o acionamento policial ativo até normalizar a situação. Segue nossa proposta de pronto atendimento:";
      }

      // Exibir o texto gerado na textarea (escondida)
      const textoArea = document.getElementById('textoGerado');
      textoArea.value = texto.trim();

      // Copiar o texto gerado
      textoArea.style.display = 'block'; // Mostra temporariamente a textarea para copiar
      textoArea.select();
      document.execCommand('copy');
      textoArea.style.display = 'none'; // Esconde novamente a textarea

      // Mostrar o alerta
      const alerta = document.getElementById('alerta');
      alerta.style.display = 'block';
      alerta.style.opacity = '1';

      // Ocultar o alerta após 2 segundos
      setTimeout(() => {
          alerta.style.opacity = '0';
          setTimeout(() => {
              alerta.style.display = 'none';
          }, 300); // Tempo para a animação de desaparecimento
      }, 2000);
  });

  // Função para limpar as escolhas
  document.getElementById('limparEscolhas').addEventListener('click', () => {
      // Limpar todos os inputs de radio
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
          radio.checked = false; // Desmarcar todos os radios
      });

      // Limpar os campos de texto
      document.getElementById('nome_motorista').value = '';
      document.getElementById('numero_motorista').value = '';
      document.getElementById('nome_responsavel').value = '';
      document.getElementById('numero_responsavel').value = '';
      document.getElementById('nome_policial').value = '';
      document.getElementById('numero_policial').value = '';
  });
});

//Botoa de copiar All
function copiarTexto(id) {
    const paragrafo = document.getElementById(id);
    const textarea = document.createElement("textarea");
    textarea.value = paragrafo.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    
    // Mostra a mensagem de alerta
    const alerta = document.getElementById('alerta');
    alerta.style.display = 'block';
    alerta.style.opacity = '1';
    
    // Oculta a mensagem após 2 segundos
    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 500); // Tempo para a animação de desaparecimento
    }, 2000);
}

