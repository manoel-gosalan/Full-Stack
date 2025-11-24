const usuario = document.getElementById("user");
const passInput = document.getElementById("senha");
const resultado = document.getElementById("resultado");
const forca = document.getElementById("forca");
const btn = document.getElementById("button");
const toggle = document.getElementById("theme-toggle");

/* =========================
   Mudar Tema
========================= */
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.classList.toggle("active");
});

/* =========================
   Validar Senha
========================= */
btn.addEventListener("click", () => {
    const user = usuario.value.trim();
    const password = passInput.value.trim();

    if (user === "" || password === "") {
        resultado.textContent = "Por favor, preencha todos os campos.";
        forca.textContent = "";
        return;
    }

    // Força da senha
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    /* Exibir força */
    if (strength <= 1) {
        forca.style.color = "var(--fraco)";
        forca.textContent = "Senha fraca";
    } else if (strength === 2) {
        forca.style.color = "var(--medio)";
        forca.textContent = "Senha média";
    } else {
        forca.style.color = "var(--forte)";
        forca.textContent = "Senha forte";
    }

    resultado.textContent = `Sua senha tem ${password.length} caracteres.`;
});
