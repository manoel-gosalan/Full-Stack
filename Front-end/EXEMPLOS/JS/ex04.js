// 1. Selecionar elementos
const primeiroP = document.getElementsByTagName('p')[0];
const divResultado = document.getElementById('resultado');
const btnInterativo = document.getElementById('btnInterativo');

// 2. Mostrar conteúdo do primeiro parágrafo (substitui document.write)
divResultado.textContent = `Está escrito assim: ${primeiroP.innerText}`;

// 3. Adicionar evento de clique (substitui onclick no HTML)
btnInterativo.addEventListener('click', function () {
    // Verifica se já foi clicado
    if (this.textContent === 'Clique em mim') {
        this.textContent = 'Clicado! 🎉';
        console.log('Clicado! 🎉')
        this.classList.add('clicado');
    } else {
        this.textContent = 'Clique em mim';
        this.classList.remove('clicado');
    }
});

// 4. Log no console (bom para debug)
console.log('DOM carregado com sucesso!');
console.log('Primeiro parágrafo:', primeiroP.innerText);


 // ========================================
        // 📚 TIPOS DE SELETORES DOM
        // ========================================
        
        // 1️⃣ POR MARCA (Tag)
        // Retorna HTMLCollection com TODOS os elementos daquela tag
        // Exemplo: document.getElementsByTagName('p')
        // Exemplo: document.getElementsByTagName('div')
        
        // 2️⃣ POR ID
        // Retorna UM ÚNICO elemento (ID é único na página)
        // Exemplo: document.getElementById('resultado')
        // Exemplo: document.getElementById('btnInterativo')
        
        // 3️⃣ POR NOME
        // Usado principalmente em formulários
        // Retorna NodeList com elementos que têm aquele atributo name
        // Exemplo: document.getElementsByName('usuario')
        // Exemplo: document.getElementsByName('email')
        
        // 4️⃣ POR CLASSE
        // Retorna HTMLCollection com TODOS os elementos daquela classe
        // Exemplo: document.getElementsByClassName('btn-interativo')
        // Exemplo: document.getElementsByClassName('container')
        
        // 5️⃣ POR SELETOR (Modernos - usam sintaxe CSS)
        // querySelector() → retorna o PRIMEIRO elemento encontrado
        // Exemplo: document.querySelector('.btn-interativo')
        // Exemplo: document.querySelector('#resultado')
        
        // querySelectorAll() → retorna TODOS os elementos (NodeList)
        // Exemplo: document.querySelectorAll('p')
        // Exemplo: document.querySelectorAll('.container div')
 // ========================================       