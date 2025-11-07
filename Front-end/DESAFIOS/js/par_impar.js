const inputNumero = document.getElementById('numero');
const btnVerificar = document.getElementById('btn');
const divResultado = document.getElementById('resultado');

function verificarNumero() {
    const valor = inputNumero.value.trim();
    const numero = Number(valor);

    if (valor === '' || isNaN(numero)) {
        exibirResultado('⚠️ Por favor, digite apenas números.', 'erro');
        return;
    }

    let mensagem = `<p>O número <strong>${numero}</strong> é `;
    if (numero % 2 === 0) {
        mensagem += `<strong>par</strong>.</p>`;
        exibirResultado(mensagem, 'par');
    } else {
        mensagem += `<strong>ímpar</strong>.</p>`;
        exibirResultado(mensagem, 'impar');
    }
}

function exibirResultado(conteudo, tipo = 'normal') {
    divResultado.innerHTML = conteudo;
    divResultado.className = `resultado show ${tipo}`;
}

// Clique no botão
btnVerificar.addEventListener('click', verificarNumero);

// Pressionar Enter no input
inputNumero.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verificarNumero();
});

// Limpa resultado ao digitar novo valor
inputNumero.addEventListener('input', () => {
    divResultado.classList.remove('show');
    divResultado.innerHTML = '';
});