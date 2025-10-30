// ========================================
// SELECIONANDO ELEMENTOS
// ========================================
const areaInterativa = document.getElementById('area');
const statusDiv = document.getElementById('status')

// ========================================
// FUNÇÃO AUXILIAR: Atualizar Status
// ========================================

function atualizarStatus(mensagem) {
    statusDiv.innerHTML = mensagem;
    statusDiv.classList.add('update');
    setTimeout(() => statusDiv.classList.remove('update'), 500);
    
}

// ========================================
// EVENTO 1: MOUSEOVER (mouse entra)
// ========================================

function aoEntrar() {
    this.classList.add('hover');
    atualizarStatus('🖱️ <strong>Mouseover:</strong> Mouse entrou na área!');

}

// ========================================
// EVENTO 2: MOUSEOUT (mouse sai)
// ========================================

function aoSair() {
    this.classList.remove('hover');
    this.classList.remove('pressing');
    atualizarStatus('👋 <strong>Mouseout:</strong> Mouse saiu da área!');
}

// ========================================
// EVENTO 3: MOUSEDOWN (botão pressionado)
// ========================================

function aoApertar() {
    this.classList.add('pressing');
    atualizarStatus('⬇️ <strong>Mousedown:</strong> Você apertou o botão do mouse!');
}

// ========================================
// EVENTO 4: MOUSEUP (botão solto)
// ========================================

function aoSoltar() {
    this.classList.remove('pressing');
    atualizarStatus('⬆️ <strong>Mouseup:</strong> Você soltou o botão do mouse!');
}

// ========================================
// EVENTO 5: CLICK (clique completo)
// ========================================

function aoClicar() {
    const estaAtivo = this.classList.contains('clicked');

    if (!estaAtivo) {
        this.textContent = 'クリックした' // Kurikku shita -> Clicou
        this.classList.add('Clicked');
        this.setAttribute('aria-pressed', 'true');
        atualizarStatus('✅ <strong>Click:</strong> Área ATIVADA! Você clicou completamente!');
    } else {
        this.textContent = 'Interaja'
        this.classList.remove('clicked');
        this.setAttribute('aria-pressed', 'false');
        atualizarStatus('⬜ <strong>Click:</strong> Área DESATIVADA!');
    }
}

// ========================================
// EVENTO 6: DBLCLICK (clique duplo)
// ========================================

function aoDuploClick() {
    atualizarStatus('⚡ <strong>Double Click:</strong> Você deu um duplo clique!')
    // Efeito especial no duplo clique
    this.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        this.style.transform = '';
    }, 1000);
}

// ========================================
// REGISTRANDO TODOS OS EVENTOS
// ========================================

areaInterativa.addEventListener('mouseover', aoEntrar);
areaInterativa.addEventListener('mouseout', aoSair);
areaInterativa.addEventListener('mousedown', aoApertar);
areaInterativa.addEventListener('mouseup', aoSoltar);
areaInterativa.addEventListener('click', aoClicar);
areaInterativa.addEventListener('dblclick', aoDuploClick);

// ========================================
// ACESSIBILIDADE: Suporte a Teclado
// Apenas para o evento principal (click)
// ========================================

areaInterativa.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        aoClicar.call(this);
    }
});

// ========================================
// LOG INICIAL
// ========================================
console.log('🚀 Sistema de eventos iniciado!');
console.log('📦 Elemento área:', areaInterativa);
console.log('📊 Eventos registrados: mouseover, mouseout, mousedown, mouseup, click, dblclick');
