const PERIODOS = {
    MANHA: {
        inicio: 5,
        fim: 12,
        imagem: './img/manha.png',
        nome: 'Manhã',
        nomeJapones: '朝'
    },
    TARDE: {
        inicio: 12,
        fim: 18,
        imagem: './img/tarde.png',
        nome: 'Tarde',
        nomeJapones: '午後'
    },
    NOITE: {
        inicio: 18,
        fim: 5,
        imagem: './img/noite.png',
        nome: 'Noite',
        nomeJapones: '夜'
    }
};

const MESES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

function obterPeriodoDoDia(hora) {
    if (hora >= PERIODOS.MANHA.inicio && hora < PERIODOS.MANHA.fim) {
        return PERIODOS.MANHA;
    } else if (hora >= PERIODOS.TARDE.inicio && hora < PERIODOS.TARDE.fim) {
        return PERIODOS.TARDE;
    }
    return PERIODOS.NOITE;
}

function atualizarInterface() {
    const agora = new Date();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const dia = agora.getDate();
    const mes = agora.getMonth();
    const ano = agora.getFullYear();

    const horarioElement = document.getElementById('horario');
    const periodoElement = document.getElementById('periodo');
    const fotoElement = document.getElementById('foto');
    const diaElement = document.getElementById('dia');
    const mesElement = document.getElementById('mes');
    const anoElement = document.getElementById('ano');

    const periodo = obterPeriodoDoDia(hora);

    const horaFormatada = hora.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');

    horarioElement.textContent = `${horaFormatada}:${minutosFormatados}`;
    periodoElement.textContent = `${periodo.nomeJapones} ${periodo.nome}`;

    fotoElement.src = periodo.imagem;
    fotoElement.alt = `Imagem representando ${periodo.nome.toLowerCase()}`;

    diaElement.textContent = dia;
    mesElement.textContent = MESES[mes];
    anoElement.textContent = ano;

    fotoElement.onerror = function () {
        console.error(`Erro ao carregar: ${periodo.imagem}`);
        this.style.display = 'none';
    };
}

document.addEventListener('DOMContentLoaded', function () {
    atualizarInterface();
    setInterval(atualizarInterface, 1000);
});