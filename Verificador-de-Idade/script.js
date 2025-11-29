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

// Elementos do DOM
const elementos = {
    inputAno: document.getElementById('txtano'),
    sexoMasc: document.getElementById('masc'),
    sexoFem: document.getElementById('fem'),
    resposta: document.getElementById('resposta'),
    foto: document.getElementById('foto')
};

const btn = document.getElementById('verificar');

// Função para calcular idade baseado no ano
function calcularIdade(anoNascimento) {
    const anoAtual = new Date().getFullYear();
    return anoAtual - anoNascimento;
}

// Função para determinar categoria da pessoa
function obterCategoriaPessoa(idade, sexoMasculino) {
    // Array com todas as categorias
    const categorias = [
        { masc: PESSOAS.crianca_masc, fem: PESSOAS.crianca_fem },
        { masc: PESSOAS.adolescente_masc, fem: PESSOAS.adolescente_fem },
        { masc: PESSOAS.adulto_masc, fem: PESSOAS.adulto_fem },
        { masc: PESSOAS.idoso_masc, fem: PESSOAS.idoso_fem }
    ];
    
    // Procura a categoria que corresponde à idade
    for (let cat of categorias) {
        const categoria = sexoMasculino ? cat.masc : cat.fem;
        if (idade >= categoria.inicio && idade < categoria.fim) {
            return categoria;
        }
    }
    
    return null;
}

// Função para atualizar a resposta visual
function atualizarResposta(categoria, idade) {
    if (!categoria) {
        elementos.resposta.innerHTML = `
            <p>Idade: ${idade} anos</p>
            <p>Categoria não encontrada. Adicione mais faixas etárias!</p>
        `;
        return;
    }

    // 🔧 CORREÇÃO: Incluir a tag <img> dentro de container estilizado
    elementos.resposta.innerHTML = `
        <p><strong>${categoria.nomeJapones}</strong></p>
        <p>${categoria.nome}</p>
        <p>Idade: ${idade} anos</p>
        <div class="foto-container">
            <img id="foto" src="${categoria.imagem}" alt="Imagem representando ${categoria.nome.toLowerCase()}">
        </div>
    `;
    
    // 🔍 DEBUG - Mostra o caminho que está tentando carregar
    console.log('🖼️ Tentando carregar imagem:', categoria.imagem);
    console.log('📁 Caminho completo:', window.location.href);
    
    // Pega a referência da nova imagem criada
    const fotoElement = document.getElementById('foto');
    
    // Tratamento de erro na imagem
    fotoElement.onerror = () => {
        console.error('❌ ERRO: Falha ao carregar imagem:', categoria.imagem);
        console.error('📍 Verifique se o arquivo existe em:', categoria.imagem);
        fotoElement.style.display = 'none';
        elementos.resposta.innerHTML += `<p style="color: red;">⚠️ Imagem não encontrada: ${categoria.imagem}</p>`;
    };
    
    // Confirma se carregou com sucesso
    fotoElement.onload = () => {
        console.log('✅ Imagem carregada com sucesso!');
    };
}

// Função principal de inicialização
function verificarIdade() {
    const anoNascimento = parseInt(elementos.inputAno.value);
    
    // Validação
    if (!anoNascimento || anoNascimento < 1900 || anoNascimento > new Date().getFullYear()) {
        alert('Por favor, insira um ano de nascimento válido!');
        return;
    }
    
    const idade = calcularIdade(anoNascimento);
    const sexoMasculino = elementos.sexoMasc.checked;
    const categoria = obterCategoriaPessoa(idade, sexoMasculino);
    
    atualizarResposta(categoria, idade);
    
    console.log('Verificação realizada:', { anoNascimento, idade, sexoMasculino, categoria });
}

// Event Listener
btn.addEventListener('click', () => {
    console.log('Botão clicado!');
    verificarIdade();
});

// Permitir Enter para verificar
elementos.inputAno.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verificarIdade();
    }
});

// 🧪 CÓDIGO DE DIAGNÓSTICO - REMOVER DEPOIS!
console.log('=== DIAGNÓSTICO COMPLETO ===');
console.log('1️⃣ Elementos encontrados:', {
    inputAno: elementos.inputAno ? '✅' : '❌',
    sexoMasc: elementos.sexoMasc ? '✅' : '❌',
    sexoFem: elementos.sexoFem ? '✅' : '❌',
    resposta: elementos.resposta ? '✅' : '❌',
    foto: elementos.foto ? '✅' : '❌',
    botao: btn ? '✅' : '❌'
});

console.log('2️⃣ Caminhos das imagens:', {
    masculino: PESSOAS.crianca_masc.imagem,
    feminino: PESSOAS.crianca_fem.imagem
});

console.log('3️⃣ URL atual da página:', window.location.href);

// Teste direto de carregamento
const testeImg = new Image();
testeImg.onload = () => console.log('✅ SUCESSO: Imagem masculina EXISTE e pode ser carregada!');
testeImg.onerror = () => console.error('❌ ERRO: Imagem masculina NÃO pode ser carregada!');
testeImg.src = PESSOAS.crianca_masc.imagem;

console.log('4️⃣ Testando carregamento direto da imagem...');
console.log('===========================');