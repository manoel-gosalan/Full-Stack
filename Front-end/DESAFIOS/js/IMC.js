// =========================
// Elementos do DOM
// =========================
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const btnCalcular = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');
const btnTema = document.getElementById('toggleTema');


// =========================
// Funções Utilitárias
// =========================
const exibir = (html) => {
    resultadoDiv.innerHTML = html;
};

const calcularIMC = () => {
    const peso = Number(pesoInput.value);
    const altura = Number(alturaInput.value) / 100;

    if (!peso || !altura) {
        exibir(`<p>⚠️ Digite valores válidos.</p>`);
        return;
    }

    const imc = peso / (altura * altura);

    let msg = "";

    if (imc <= 18.5) msg = "Você está abaixo do peso.";
    else if (imc <= 24.9) msg = "Peso adequado. Continue assim!";
    else if (imc <= 29.9) msg = "Acima do peso. Atenção!";
    else msg = "Obesidade. Procure acompanhamento.";

    exibir(`<p><strong>IMC:</strong> ${imc.toFixed(2)}<br>${msg}</p>`);
};


// =========================
// Tema Light/Dark
// =========================
btnTema.addEventListener('click', () => {
    const html = document.documentElement;
    const temaAtual = html.getAttribute("data-theme");

    if (temaAtual === "dark") {
        html.setAttribute("data-theme", "light");
        btnTema.textContent = "☀️";
    } else {
        html.setAttribute("data-theme", "dark");
        btnTema.textContent = "🌙";
    }
});


// =========================
// Eventos
// =========================
btnCalcular.addEventListener('click', calcularIMC);
