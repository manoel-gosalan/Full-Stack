// DOM
const temperaturaInput = document.getElementById('temp');
const botao = document.getElementById('button');
const resposta = document.getElementById('resposta');
const termometro = document.querySelector('.nivel');

// Função principal
function verificarTemperatura() {
    const valorDigitado = temperaturaInput.value.trim();
    const temp = Number(valorDigitado);

    if (!valorDigitado || isNaN(temp) || temp >= 60 ) {
        atualizarUI('⚠️ Por favor, digite um valor válido!', 'erro', '#ff4d4d', 0);
        return;
    }

    if (temp >= 30 && temp <= 60) {
        atualizarUI('🔥 Está calor!', 'calor', '#ff6b6b', calcularNivel(temp));
    } 
    else if (temp >= 15 && temp <= 29) {
        atualizarUI('😌 Está agradável.', 'agradavel', '#4dabf7', calcularNivel(temp));
    } 
    else {
        atualizarUI('❄️ Está frio.', 'frio', '#74c0fc', calcularNivel(temp));
    }
}

// Atualiza tudo da interface
function atualizarUI(texto, tipo, cor, nivel) {
    resposta.textContent = texto;
    resposta.className = `resultado ${tipo} animar`;
    temperaturaInput.style.borderColor = cor;
    termometro.style.height = `${nivel}%`;
    termometro.style.background = cor;
}

// nível do termômetro
function calcularNivel(temp) {
    return Math.min(100, Math.max(0, (temp / 60) * 100));
}

botao.addEventListener('click', verificarTemperatura);

temperaturaInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') verificarTemperatura();
} );
