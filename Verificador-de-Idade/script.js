// ============================================================================
// 📊 DADOS DA APLICAÇÃO
// ============================================================================

const PESSOAS = {
    crianca_masc: {
        inicio: 0,
        fim: 12,
        imagem: './img/crianca-masc.png',
        nome: 'Criança Masculino',
        nomeJapones: '男の子'
    },
    crianca_fem: {
        inicio: 0,
        fim: 12,
        imagem: './img/crianca-fem.png',
        nome: 'Criança Feminino',
        nomeJapones: '女の子'
    },
    adolescente_masc: {
        inicio: 13,
        fim: 18,
        imagem: './img/adolescente-masc.png',
        nome: 'Adolescente Masculino',
        nomeJapones: '少年'
    },
    adolescente_fem: {
        inicio: 13,
        fim: 17,
        imagem: './img/adolescente-fem.png',
        nome: 'Adolescente Feminino',
        nomeJapones: '少女'
    },
    adulto_masc: {
        inicio: 17,
        fim: 59,
        imagem: './img/adulto-masc.png',
        nome: 'Adulto Masculino',
        nomeJapones: '男性'
    },
    adulto_fem: {
        inicio: 18,
        fim: 59,
        imagem: './img/adulto-fem.png',
        nome: 'Adulto Feminino',
        nomeJapones: '女性'
    },
    idoso_masc: {
        inicio: 60,
        fim: 150,
        imagem: './img/idoso-masc.png',
        nome: 'Idoso Masculino',
        nomeJapones: '老人'
    },
    idoso_fem: {
        inicio: 60,
        fim: 150,
        imagem: './img/idoso-fem.png',
        nome: 'Idoso Feminino',
        nomeJapones: '老婦人'
    }
};

// ============================================================================
// 🎭 SISTEMA DE MODAL (Componente UI)
// ============================================================================

class ModalManager {
    constructor() {
        this.createModalHTML();
        this.setupEventListeners();
    }

    createModalHTML() {
        const modalHTML = `
            <div id="modal-overlay" class="modal-overlay">
                <div class="modal-container">
                    <div class="modal-content">
                        <div class="modal-icon">⚠️</div>
                        <h3 class="modal-title">Atenção</h3>
                        <p class="modal-message"></p>
                        <button class="modal-btn" onclick="modalManager.close()">Entendi</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.overlay = document.getElementById('modal-overlay');
        this.message = this.overlay.querySelector('.modal-message');
    }

    show(message, icon = '⚠️') {
        this.message.textContent = message;
        this.overlay.querySelector('.modal-icon').textContent = icon;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupEventListeners() {
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });
    }
}

// ============================================================================
// 🎯 LÓGICA PRINCIPAL DO NEGÓCIO (Business Logic)
// ============================================================================

/**
 * Função principal que coordena toda a verificação de idade
 * Esta é a "orquestradora" - ela chama todas as outras funções
 */
function verificarIdade() {
    // 1. Coleta dados do usuário
    const anoNascimento = parseInt(elementos.inputAno.value);
    const sexoMasculino = elementos.sexoMasc.checked;
    
    // 2. Valida entrada
    if (!validarAnoNascimento(anoNascimento)) {
        return; // Para aqui se inválido
    }
    
    // 3. Processa dados
    const idade = calcularIdade(anoNascimento);
    const categoria = obterCategoriaPessoa(idade, sexoMasculino);
    
    // 4. Atualiza interface
    atualizarResposta(categoria, idade);
    
    // 5. Log para debug
    console.log('✅ Verificação realizada:', { anoNascimento, idade, sexoMasculino, categoria });
}

// ============================================================================
// 🔧 FUNÇÕES AUXILIARES (Helper Functions)
// ============================================================================

/**
 * Valida se o ano de nascimento está dentro do intervalo aceitável
 * @param {number} ano - Ano a ser validado
 * @returns {boolean} - true se válido, false se inválido
 */
function validarAnoNascimento(ano) {
    const anoAtual = new Date().getFullYear();
    const anoMinimo = 1900;
    
    if (!ano || ano < anoMinimo || ano > anoAtual) {
        modalManager.show(
            `Por favor, insira um ano entre ${anoMinimo} e ${anoAtual}!`,
            '⚠️'
        );
        return false;
    }
    
    return true;
}

/**
 * Calcula a idade baseada no ano de nascimento
 * @param {number} anoNascimento - Ano em que a pessoa nasceu
 * @returns {number} - Idade calculada
 */
function calcularIdade(anoNascimento) {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNascimento;
}

/**
 * Determina a categoria da pessoa baseada em idade e sexo
 * @param {number} idade - Idade da pessoa
 * @param {boolean} sexoMasculino - true se masculino, false se feminino
 * @returns {Object|null} - Objeto com dados da categoria ou null
 */
function obterCategoriaPessoa(idade, sexoMasculino) {
    const categorias = [
        { masc: PESSOAS.crianca_masc, fem: PESSOAS.crianca_fem },
        { masc: PESSOAS.adolescente_masc, fem: PESSOAS.adolescente_fem },
        { masc: PESSOAS.adulto_masc, fem: PESSOAS.adulto_fem },
        { masc: PESSOAS.idoso_masc, fem: PESSOAS.idoso_fem }
    ];
    
    for (let cat of categorias) {
        const categoria = sexoMasculino ? cat.masc : cat.fem;
        if (idade >= categoria.inicio && idade < categoria.fim) {
            return categoria;
        }
    }
    
    return null;
}

// ============================================================================
// 🎨 FUNÇÕES DE INTERFACE (UI Functions)
// ============================================================================

/**
 * Atualiza a área de resposta com as informações da categoria
 * @param {Object|null} categoria - Dados da categoria encontrada
 * @param {number} idade - Idade calculada
 */
function atualizarResposta(categoria, idade) {
    if (!categoria) {
        elementos.resposta.innerHTML = `
            <p>Idade: ${idade} anos</p>
            <p>Categoria não encontrada. Adicione mais faixas etárias!</p>
        `;
        return;
    }

    elementos.resposta.innerHTML = `
        <p><strong>${categoria.nomeJapones}</strong></p>
        <p>${categoria.nome}</p>
        <p>Idade: ${idade} anos</p>
        <div class="foto-container">
            <img id="foto" src="${categoria.imagem}" alt="Imagem representando ${categoria.nome.toLowerCase()}">
        </div>
    `;
    
    configurarImagemComTratamentoDeErro(categoria);
}

/**
 * Configura os event listeners da imagem (load e error)
 * @param {Object} categoria - Categoria atual para tratamento de erro
 */
function configurarImagemComTratamentoDeErro(categoria) {
    const fotoElement = document.getElementById('foto');
    
    fotoElement.onerror = () => {
        console.error('❌ Falha ao carregar:', categoria.imagem);
        fotoElement.style.display = 'none';
        modalManager.show(`Imagem não encontrada: ${categoria.imagem}`, '🖼️');
    };
    
    fotoElement.onload = () => {
        console.log('✅ Imagem carregada:', categoria.imagem);
    };
}

// ============================================================================
// 🚀 INICIALIZAÇÃO DA APLICAÇÃO (App Initialization)
// ============================================================================

// Referências aos elementos do DOM
const elementos = {
    inputAno: document.getElementById('txtano'),
    sexoMasc: document.getElementById('masc'),
    sexoFem: document.getElementById('fem'),
    resposta: document.getElementById('resposta'),
    foto: document.getElementById('foto')
};

// Inicializa o sistema de modal
const modalManager = new ModalManager();

// Botão de verificação
const btn = document.getElementById('verificar');

// Event Listeners
btn.addEventListener('click', () => {
    console.log('🔘 Botão verificar clicado');
    verificarIdade();
});

elementos.inputAno.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('⌨️ Enter pressionado');
        verificarIdade();
    }
});

// Log de inicialização
console.log('✅ Aplicação inicializada com sucesso!');
console.log('📦 Elementos carregados:', Object.keys(elementos));
console.log('🎭 Sistema de modal ativo');