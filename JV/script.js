// botao de limpar bloco de notas
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('notes').value = ''; // Limpa o conteúdo
});

// botao de copiar bloco de notas
document.getElementById('copyButton').addEventListener('click', function() {
    const textarea = document.getElementById('notes');
    textarea.select(); // Seleciona o conteúdo
    document.execCommand('copy'); // Copia o conteúdo para a área de transferência
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

// Adiciona o evento de clique ao botão "Copiar" no bloco de notas
document.getElementById('copyButton').addEventListener('click', function() {
    const notes = document.getElementById('notes');
    if (notes.value) {
        copiarTexto('notes');
    } else {
        alert('Nada para copiar!');
    }
});

// Adiciona eventos de clique aos botões "Copiar" em outros textos
const textosParaCopiar = ['sinal1', 'alert1', 'perclt1', 'retirada', 'tab1'];
textosParaCopiar.forEach(id => {
    document.querySelector(`#${id} + button`).addEventListener('click', () => {
        copiarTexto(id);
    });
});

//tabela de postos qbox
async function loadCSV(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.text();
        const rows = data.split('\n').slice(1).filter(row => {
            const columns = row.split(',');
            return columns.length === 3 && columns.every(col => col.trim() !== '');
        });
        return rows.map(row => {
            const [cidade, posto, telefone] = row.split(',').map(item => item.trim());
            return { cidade, posto, telefone };
        });
    } catch (error) {
        console.error('Error loading CSV:', error);
        return [];
    }
}

function filterResults(data, query) {
    return data.filter(item => 
        item.cidade.toLowerCase().includes(query) ||
        item.posto.toLowerCase().includes(query)
    );
}

function updateTable(data) {
    const tableBody = document.querySelector('#resultTable tbody');
    const resultTable = document.getElementById('resultTable');
    tableBody.innerHTML = ''; // Limpa a tabela atual

    if (data.length === 0) {
        resultTable.style.display = 'none'; // Oculta a tabela se não houver resultados
        return;
    }

    data.forEach(item => {
        if (item) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.cidade || 'N/A'}</td>
                <td>${item.posto || 'N/A'}</td>
                <td>${item.telefone || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    resultTable.style.display = 'table'; // Mostra a tabela quando houver resultados
}

async function main() {
    const csvData = await loadCSV('/CSV/cidades.csv');

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredData = filterResults(csvData, query);
        updateTable(filteredData);
    });
}

//tabela de acionamento central
document.getElementById('gerarTexto').addEventListener('click', () => {
    let texto = "";

    // Contato com o condutor
    const nomeMotorista = document.getElementById('nome_motorista').value.trim();
    const numeroMotorista = document.getElementById('numero_motorista').value.trim();
    const contatoCondutor = document.querySelector('input[name="contato_condutor"]:checked');
    
    if (contatoCondutor) {
        if (contatoCondutor.value === 'sim') {
            if (nomeMotorista && numeroMotorista) {
                texto += `Em contato com o Sr. ${nomeMotorista} (motorista), pelo telefone ${numeroMotorista}, onde nos informou que XXXX. Todos os comandos cabíveis foram enviados ao veículo. Ressaltamos que o veículo permanece posicionado corretamente, em rota, e sem gerar alerta de risco. `;
            } else {
                texto += "Em contato com o motorista, mas não foram fornecidas informações detalhadas sobre o nome ou telefone. ";
            }
        }
        else if (contatoCondutor.value === "nao") {
            if (nomeMotorista && numeroMotorista) {
                texto += `Tentamos contato com o Sr. ${nomeMotorista} (motorista) através do telefone ${numeroMotorista}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
            } else {
                texto += "Tentamos contato com o motorista, mas o número de telefone não foi fornecido. ";
            }
        }
        else if (contatoCondutor.value === "inexistente_mot") {
            if (nomeMotorista && numeroMotorista) {
                texto += `Tentamos contato com o Sr. ${nomeMotorista} (motorista) através do telefone ${numeroMotorista}, porém o número consta como inexistente ou fora de área. `;
            } else {
                texto += "Tentamos contato com o motorista, mas o número de telefone não foi fornecido. ";
            }
        }
    }

    // Contato com o responsável
    const nomeResponsavel = document.getElementById('nome_responsavel').value.trim();
    const numeroResponsavel = document.getElementById('numero_responsavel').value.trim();
    const contatoResponsavel = document.querySelector('input[name="contato_responsavel"]:checked');
    if (contatoResponsavel) {
        if (contatoResponsavel.value === 'sim') {
            if (nomeResponsavel && numeroResponsavel) {
                texto += `Efetuamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, onde nos informou que XXXX, sendo assim o notificamos que seguiremos com o procedimento de contingência até normalizar a situação. `;
            } else {
                texto += "Efetuamos contato com o responsável, mas não foram fornecidas informações detalhadas sobre o nome ou telefone. ";
            }
        } 
        else if (contatoResponsavel.value === "nao") {
            if (nomeResponsavel && numeroResponsavel) {
                texto += `Tentamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, porém a ligação chama até ser direcionada à caixa de mensagem. `;
            } else {
                texto += "Tentamos contato com o responsável, mas o número de telefone não foi fornecido. ";
            }
        }
        else if (contatoResponsavel.value === "inexistente_resp") {
            if (nomeResponsavel && numeroResponsavel) {
                texto += `Tentamos contato com o Sr. ${nomeResponsavel} (responsável) através do telefone ${numeroResponsavel}, porém o número consta como inexistente ou fora de área. `;
            } else {
                texto += "Tentamos contato com o responsável, mas o número de telefone não foi fornecido. ";
            }
        }
    }

// Contato responsavel por grupo
const transportadoras = document.querySelector('input[name="contato_responsavel_grupo"]:checked');
if (transportadoras) {
    if (transportadoras.value === "Qbox") {
        texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Qbox - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
    }
    else if (transportadoras.value === "Otimiza"){
        texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Otimiza - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
    }
    else if (transportadoras.value === "Adege"){
        texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Adege - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
    }
    else if (transportadoras.value === "GVM"){
        texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp GVM - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
    }
    else if (transportadoras.value === "Milklat"){
        texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Milklat - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
    }
    else if (transportadoras.value === "Rapido_parana"){
        texto += "Deste modo notificamos os responsáveis através do grupo de WhatsApp Rápido Paraná - Tecnorisk, onde os deixamos ciente da situação e informados que seguiremos com o procedimento de contingência. ";
    }
}
    // Acionamento Policial
    const nomePolicial = document.getElementById('nome_policial').value.trim();
    const numeroPolicial = document.getElementById('numero_policial').value.trim();
    const acionamentoPolicial = document.querySelector('input[name="acionamento_policial"]:checked');
    if (acionamentoPolicial) {
        if (acionamentoPolicial.value === 'sim') {
            if (nomePolicial && numeroPolicial) {
                texto += `Sendo assim, seguiremos com o procedimento de contingência onde efetuamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, onde fomos atendidos pelo Sr. XXXX, e o deixamos ciente da situação. Segue nossa proposta de pronta resposta: `;
            } else {
                texto += "Sendo assim, seguimos com o procedimento de contingência, porém não foram fornecidas informações sobre o policial ou o número de telefone. ";
            }
        } else {
            if (nomePolicial && numeroPolicial) {
                texto += `Sendo assim, seguiremos com o procedimento de contingência onde tentamos contato com a PRF de ${nomePolicial} através do telefone ${numeroPolicial}, mas a ligação é direcionada para caixa postal. Segue nossa proposta de pronta resposta: `;
            } else {
                texto += "Sendo assim, seguimos com o procedimento de contingência, mas não conseguimos contactar a PRF, pois o número não foi fornecido ou está inacessível. ";
            }
        }
    }

    // Continuidade Policial
    const continuidadePolicial = document.querySelector('input[name="continuidade_policial"]:checked');
    if (continuidadePolicial) {
        if (continuidadePolicial.value === 'Continuidade') {
            texto += "Sendo assim, manteremos o acionamento policial até normalizar a situação. Segue nossa proposta de pronto atendimento:";
        }
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

//botão de limpar tabela central
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

    // Limpar o texto gerado
    const textoGerado = document.getElementById('textoGerado');
    textoGerado.value = ''; // Limpa o texto gerado
});

//Tabela Qbox
document.getElementById('copiarTabela').addEventListener('click', () => {
    const placa = document.getElementById('Placa').value;
    const carreta = document.getElementById('Carreta').value;
    const motorista = document.getElementById('Motorista').value;
    const operacao = document.getElementById('Operação').value;
    const carga = document.getElementById('Carga').value;
    const localizacao = document.getElementById('Localização').value;
    const situacao = document.getElementById('Situação').value;
    const ocorrecia = document.getElementById('Ocorrência').value;

    // Formata o texto da tabela
    let 
    tabelaTexto = `Segue situação:\n`;
    tabelaTexto += `Placa: ${placa}\n`;
    tabelaTexto += `Carreta: ${carreta}\n`;
    tabelaTexto += `Motorista: ${motorista}\n`;
    tabelaTexto += `Operação: ${operacao}\n`;
    tabelaTexto += `Carga: ${carga}\n`;
    tabelaTexto += `Localização: ${localizacao}\n`;
    tabelaTexto += `Situação: ${situacao}\n`;
    tabelaTexto += `Ocorrência: ${ocorrecia}\n`;

    // Cria um textarea temporário para copiar o texto
    const textarea = document.createElement('textarea');
    textarea.value = tabelaTexto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Exibir um alerta informando que o texto foi copiado
    const alerta = document.getElementById('alerta');
    alerta.style.display = 'block';
    alerta.style.opacity = '1';

    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => {
            alerta.style.display = 'none';
        }, 500);
    }, 2000);
});

// Adiciona a funcionalidade de limpar
document.getElementById('clearButton1').addEventListener('click', () => {
    // Seleciona todos os inputs e o textarea dentro do artigo com a classe 'tabela_qbox'
    const fields = document.querySelectorAll('.tabela_qbox input[type="text"], .tabela_qbox textarea');
    
    // Limpa o conteúdo de cada campo
    fields.forEach(field => {
        field.value = '';
    });
});

// Adiciona a funcionalidade de copiar
document.getElementById('copiarTabela').addEventListener('click', () => {
    const fields = document.querySelectorAll('.tabela_qbox input[type="text"], .tabela_qbox textarea');
    let textToCopy = '';

    // Percorre os campos e adiciona o valor de cada um no texto a ser copiado
    fields.forEach(field => {
        textToCopy += field.id + ': ' + field.value + '\n'; // Adiciona o nome do campo e seu valor
    });

    // Copia o texto gerado para a área de transferência
    navigator.clipboard.writeText(textToCopy).then(() => {
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do "Consultar Prestador"
    const localInput = document.getElementById('local');
    const copiarDadosButton = document.getElementById('copiarDados');
    
    // Referências aos elementos de "Dados Motorista / Veículo"
    const cavaloInput = document.getElementById('cavalo');
    const carretaInput = document.getElementById('carreta_pr');
    const modeloInput = document.getElementById('modelo');
    const corInput = document.getElementById('cor');
    const motoristaInput = document.getElementById('motorista_pr');
    const cpfInput = document.getElementById('cpf');
    const copiarDadosVeiculoButton = document.getElementById('copiarDadosVeiculo');
    const clearButton = document.getElementById('clearButton_2');
    
    const alerta = document.getElementById('alerta');
    
    // Função para copiar os dados do "Consultar Prestador"
    function copiarDadosConsultarPrestador() {
        const local = localInput.value;

        // Criar o texto a ser copiado
        const texto = `Consultar prestador!\nLocal: ${local}`;
        
        // Copiar o texto para a área de transferência
        navigator.clipboard.writeText(texto).then(() => {
            alerta.style.display = 'block';
            setTimeout(() => alerta.style.display = 'none', 2000);
        });
    }

    // Função para copiar os dados do "Dados Motorista / Veículo"
    function copiarDadosVeiculo() {
        const cavalo = cavaloInput.value;
        const carreta = carretaInput.value;
        const modelo = modeloInput.value;
        const cor = corInput.value;
        const motorista = motoristaInput.value;
        const cpf = cpfInput.value;
        
        // Criar o texto a ser copiado
        const textoVeiculo = `Dados Motorista / Veículo\nCavalo: ${cavalo}\nCarreta: ${carreta}\nModelo: ${modelo}\nCor: ${cor}\nMotorista: ${motorista}\nCPF: ${cpf}`;
        
        // Copiar o texto para a área de transferência
        navigator.clipboard.writeText(textoVeiculo).then(() => {
            alerta.style.display = 'block';
            setTimeout(() => alerta.style.display = 'none', 2000);
        });
    }

    // Função para limpar os campos
    function limparCampos() {
        localInput.value = '';
        cavaloInput.value = '';
        carretaInput.value = '';
        modeloInput.value = '';
        corInput.value = '';
        motoristaInput.value = '';
        cpfInput.value = '';
    }

    // Eventos dos botões
    copiarDadosButton.addEventListener('click', copiarDadosConsultarPrestador);
    copiarDadosVeiculoButton.addEventListener('click', copiarDadosVeiculo);
    clearButton.addEventListener('click', limparCampos);
});




main();
