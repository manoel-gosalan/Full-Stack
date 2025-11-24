const inputNota = document.getElementById('nota');
const btnVerificar = document.getElementById('btn');
const divResultado = document.getElementById('resultado');

function verificarNota() {
    const nota = Number(inputNota.value.trim());

    // Validação robusta
    if (isNaN(nota) || nota < 0 || nota > 100) {
        exibirResultado('⚠️ Por favor, digite uma nota válida (0 a 100)', 'erro');
        return;
    }

    let mensagem = `<p>Sua nota é: <strong>${nota}</strong></p>`;

    if (nota < 50) {
        mensagem += `<p>Você está <strong>Reprovado</strong>.</p>`;
        tipoClasse = 'reprovado';
    } else if (nota < 70) {
        mensagem += `<p>Você está em <strong>Recuperação</strong>.</p>`;
        tipoClasse= 'recuperacao';
    } else if (nota < 90) {
        mensagem += `<p>Você está <strong>Aprovado</strong>!</p>`;
        tipoClasse ='aprovado';
    } else {
        mensagem += `<p>Parabéns! <strong>Aprovado com Excelência</strong> 🏅</p>`;
        tipoClasse = 'aprovado90';
    }

    exibirResultado(mensagem, tipoClasse);
}

function exibirResultado(conteudo, tipo = 'normal') {
    divResultado.innerHTML = conteudo;
    divResultado.className = `resultado show ${tipo}`;
}

btnVerificar.addEventListener('click', () => {
    console.log('Clicou');
    verificarNota();
});

inputNota.addEventListener('keypress', e => {
    if (e.key === 'Enter') verificarNota();
});

inputNota.addEventListener('input', () => {
    divResultado.classList.remove('show');
    setTimeout(() => (divResultado.innerHTML = ''), 300);
});