// =========================
// Elementos do DOM
// =========================
const btnVerificar = document.getElementById('verificar');
const divResultado = document.getElementById('resultado');


// =========================
// Funções Utilitárias
// =========================

// Lê o valor de um input e já converte para número
const getNumberValue = (id) => Number(document.getElementById(id).value);

// Mostra mensagens na interface
const mostrarResultado = (html) => {
    divResultado.innerHTML = html;
};


// =========================
// Função Principal
// =========================
const verificarMaior = () => {
    const valores = [
        getNumberValue('n1'),
        getNumberValue('n2'),
        getNumberValue('n3')
    ];

    // Verificação de validade
    if (valores.some(v => isNaN(v))) {
        mostrarResultado(`<p style="color: red;">⚠️ Por favor, preencha todos os números corretamente.</p>`);
        return;
    }

    const maior = Math.max(...valores);
    const ordenados = [...valores].sort((a, b) => b - a); // copia antes de ordenar

    mostrarResultado(`
        <p>🔹 O maior número é: <strong>${maior}</strong></p>
        <p>🔸 Ordem decrescente: ${ordenados.join(', ')}</p>
    `);
};


// =========================
// Eventos
// =========================
btnVerificar.addEventListener('click', function () {
        console.log('Clicou');
        verificarMaior();
    });
