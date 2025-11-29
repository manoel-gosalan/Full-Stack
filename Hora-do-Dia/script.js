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

const INTERVALO_ATUALIZACAO = 1000;

const elementos = {
    horario: null,
    periodo: null,
    foto: null,
    dia: null,
    mes: null,
    ano: null
};

function obterPeriodoDoDia(hora) {
    if (hora >= PERIODOS.MANHA.inicio && hora < PERIODOS.MANHA.fim) {
        return PERIODOS.MANHA;
    }
    
    if (hora >= PERIODOS.TARDE.inicio && hora < PERIODOS.TARDE.fim) {
        return PERIODOS.TARDE;
    }
    
    return PERIODOS.NOITE;
}

function formatarNumero(numero) {
    return numero.toString().padStart(2, '0');
}

function atualizarHorario(agora) {
    const hora = formatarNumero(agora.getHours());
    const minutos = formatarNumero(agora.getMinutes());
    elementos.horario.textContent = `${hora}:${minutos}`;
}

function atualizarPeriodo(periodo) {
    elementos.periodo.textContent = `${periodo.nomeJapones} ${periodo.nome}`;
}

function atualizarImagem(periodo) {
    elementos.foto.src = periodo.imagem;
    elementos.foto.alt = `Imagem representando ${periodo.nome.toLowerCase()}`;
}

function atualizarData(agora) {
    elementos.dia.textContent = agora.getDate();
    elementos.mes.textContent = MESES[agora.getMonth()];
    elementos.ano.textContent = agora.getFullYear();
}

function tratarErroImagem(periodo) {
    console.error(`Falha ao carregar imagem: ${periodo.imagem}`);
    elementos.foto.style.display = 'none';
}

function cachearElementos() {
    elementos.horario = document.getElementById('horario');
    elementos.periodo = document.getElementById('periodo');
    elementos.foto = document.getElementById('foto');
    elementos.dia = document.getElementById('dia');
    elementos.mes = document.getElementById('mes');
    elementos.ano = document.getElementById('ano');
    
    elementos.foto.onerror = () => tratarErroImagem(obterPeriodoDoDia(new Date().getHours()));
}

function atualizarInterface() {
    const agora = new Date();
    const periodo = obterPeriodoDoDia(agora.getHours());
    
    atualizarHorario(agora);
    atualizarPeriodo(periodo);
    atualizarImagem(periodo);
    atualizarData(agora);
}

function inicializar() {
    cachearElementos();
    atualizarInterface();
    setInterval(atualizarInterface, INTERVALO_ATUALIZACAO);
}

document.addEventListener('DOMContentLoaded', inicializar);