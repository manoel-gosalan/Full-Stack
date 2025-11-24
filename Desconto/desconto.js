// ===========================
// CONFIGURACAO
// ===========================
const CONFI = {
    VALOR_30: 1000,
    VALOR_MAX_20: 999.99,
    VALOR_MIN_10: 100,
    VALOR_MIN_20: 200,
    VALOR_MAX_10: 199.99
};

// ===========================
// DOM
// ===========================
const formulario = document.getElementById('formulario');
const divValor = document.getElementById('valor');
const divResultado = document.getElementById('resultado');

// ===========================
// VALIDACAO
// ===========================
function validarCampo(valorTexto) {
    if (valorTexto === '') {
        return {
            validado: false,
            mensagem: '⚠️ Por favor, preencha o valor da compra'
        };
    }

    const valor = Number(valorTexto);

    if (isNaN(valor)) {
        return {
            validado: false,
            mensagem: '⚠️ Por favor, preencha somente com números'
        };
    }

    if (valor <= 99) {
        return {
            validado: false,
            mensagem: '❌ Valor mínimo para desconto não alcançado (mínimo: 100€)'
        };
    }

    return {
        validado: true,
        valor
    };
}

// ===========================
// LOGICA PARA O DESCONTO
// ===========================
function analisarDesconto(valor) {
    const valorFormatado = valor.toLocaleString('pt-PT', {
        style: 'currency',
        currency: 'EUR'
    });

    if (valor >= CONFI.VALOR_MIN_10 && valor <= CONFI.VALOR_MAX_10) {
        return {
            tipo: 'sucesso',
            mensagem: `<strong>✅ DESCONTO DE 10% APROVADO!</strong><br><br>
                               🎉 Parabéns! Finalize a compra para receber o desconto na sua compra de ${valorFormatado}.<br><br>
                               💡 Para desconto de 20% a compra mínima deve ser de 200€, e para 30% deve ser superior a 1000€.`
        };
    }

    if (valor >= CONFI.VALOR_MIN_20 && valor <= CONFI.VALOR_MAX_20) {
        return {
            tipo: 'sucesso',
            mensagem: `<strong>✅ DESCONTO DE 20% APROVADO!</strong><br><br>
                               🎉 Parabéns! Finalize a compra para receber o desconto na sua compra de ${valorFormatado}.<br><br>
                               💡 Para 30% de desconto, o valor deve ser superior a 1000€.`
        };
    }

    if (valor >= CONFI.VALOR_30) {
        return {
            tipo: 'sucesso',
            mensagem: `<strong>✅ DESCONTO DE 30% APROVADO!</strong><br><br>
                               🎊 Excelente! Você alcançou nosso maior desconto na compra de ${valorFormatado}!`
        };
    }
}

// ===========================
// FUNCAO PRINCIPAL
// ===========================
function aplicarDesconto(event) {
    event.preventDefault();

    const valorTexto = divValor.value.trim();
    const validar = validarCampo(valorTexto);

    if (!validar.validado) {
        divResultado.innerHTML = `<p>${validar.mensagem}</p>`;
        divResultado.className = 'erro';
        return;
    }

    const resultado = analisarDesconto(validar.valor);
    divResultado.innerHTML = resultado.mensagem;
    divResultado.className = resultado.tipo;
}

// ===========================
// TEMA TOGGLE
// ===========================
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);

    const icon = document.getElementById('theme-icon');
    const text = document.getElementById('theme-text');

    if (newTheme === 'dark') {
        icon.textContent = '🌙';
        text.textContent = 'Modo Claro';
    } else {
        icon.textContent = '🌸';
        text.textContent = 'Modo Escuro';
    }

    localStorage.setItem('theme', newTheme);
}

// Carregar tema salvo
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'dark') {
        document.getElementById('theme-icon').textContent = '🌙';
        document.getElementById('theme-text').textContent = 'Modo Claro';
    }
});

// ===========================
// EVENT LISTENERS
// ===========================
formulario.addEventListener('submit', aplicarDesconto);