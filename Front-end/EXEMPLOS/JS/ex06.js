// Constantes
const VELOCIDADE_MAXIMA = 60;

// Elementos do DOM
const inputVelocidade = document.getElementById('txtvel');
const btnVerificar = document.getElementById('btn');
const divResultado = document.getElementById('resultado');

// Função para verificar velocidade
function verificarVelocidade() {
    const velocidade = Number(inputVelocidade.value);

    // Validação
    if (!velocidade || velocidade <= 0) {
        exibirResultado('Por favor, digite uma velocidade válida!', 'erro');
        return;
    }

    // Monta o HTML do resultado
    let html = `<div class="velocidade-info">
                <p>Sua velocidade atual é de <strong>${velocidade} Km/h</strong></p>
            </div>`;

    if (velocidade > VELOCIDADE_MAXIMA) {
        const excesso = velocidade - VELOCIDADE_MAXIMA;
        html += `<div class="multa">
                    <p>⚠️ <strong>Você foi multado!</strong></p>
                    <p>Excesso de ${excesso} Km/h acima do limite</p>
                </div>`;
    }

    html += `<div class="seguranca">
                <p>✅ Dirija sempre com segurança!</p>
            </div>`;

    exibirResultado(html);
}

// Função para exibir resultado com animação
function exibirResultado(conteudo, tipo = 'normal') {
    divResultado.innerHTML = conteudo;
    divResultado.classList.remove('show');

    // Força reflow para reiniciar a animação
    void divResultado.offsetWidth;

    divResultado.classList.add('show');
}

// Event Listeners
btnVerificar.addEventListener('click', verificarVelocidade);

// Permite verificar pressionando Enter
inputVelocidade.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        verificarVelocidade();
    }
});

// Limpa resultado ao começar a digitar
inputVelocidade.addEventListener('input', () => {
    if (divResultado.innerHTML) {
        divResultado.classList.remove('show');
    }
});