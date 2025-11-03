// Elementos do DOM
const inputIdade = document.getElementById('idade');
const btnVerificar = document.getElementById('btn');
const divResultado = document.getElementById('resultado');

// Função principal
function verificarIdade() {
    const idade = Number(inputIdade.value.trim());

    // Validação
    if (!idade || idade <= 0 || idade >= 122) {
        exibirResultado('⚠️ Por favor, digite uma idade válida!', 'erro');
        return;
    }

    let mensagem = `<p>Sua idade atual é <strong>${idade}</strong>.</p>`;

    if (idade < 18) {
        mensagem += `<p>Você é <strong>menor de idade</strong>.</p>`;
    } else if (idade <= 59) {
        mensagem += `<p>Você é <strong>maior de idade</strong>.</p>`;
    } else {
        mensagem += `<p>Você é <strong>idoso</strong>.</p>`;
    }


    exibirResultado(mensagem, 'sucesso');
}

// Função para exibir o resultado com animação
function exibirResultado(conteudo, tipo = 'normal') {
    divResultado.innerHTML = conteudo;
    divResultado.className = `resultado show ${tipo}`;
}

// Listeners
btnVerificar.addEventListener('click', verificarIdade);
inputIdade.addEventListener('keypress', e => e.key === 'Enter' && verificarIdade());

// Limpa o resultado ao digitar (com segurança)
inputIdade.addEventListener('input', () => {
            divResultado.classList.remove('show');

            clearTimeout(limparResultadoTimeout); // ← cancela timeout anterior

            inputIdade.addEventListener('input', () => {
                divResultado.classList.remove('show');
                setTimeout(() => (divResultado.innerHTML = ''), 300);
            });
});