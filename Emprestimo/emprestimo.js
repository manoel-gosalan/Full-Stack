// ==========================================
        // CONFIGURAÇÃO
        // ==========================================
        const CONFIG = {
            IDADE_MIN: 1,
            IDADE_MAX: 80,
            IDADE_MIN_EMPRESTIMO: 18,
            SALARIO_MIN: 1,
            SALARIO_MAX: 1000000,
            SALARIO_MIN_EMPRESTIMO: 1700
        };

        // ==========================================
        // DOM
        // ==========================================
        const formulario = document.getElementById('formulario');
        const divIdade = document.getElementById('idade');
        const divSalario = document.getElementById('salario');
        const divResultado = document.getElementById('resultado');

        // ==========================================
        // VALIDAÇÃO
        // ==========================================
        function validarCampos(idadeTexto, salarioTexto) {
            // 1. Campos vazios
            if (idadeTexto === '' || salarioTexto === '') {
                return {
                    valido: false,
                    mensagem: '⚠️ Por favor, preencha todos os campos!'
                };
            }

            const idade = Number(idadeTexto);
            const salario = Number(salarioTexto);

            // 2. Valores não numéricos
            if (isNaN(idade) || isNaN(salario)) {
                return {
                    valido: false,
                    mensagem: '⚠️ Digite apenas valores numéricos!'
                };
            }

            // 3. Valores negativos ou zero
            if (idade <= 0 || salario <= 0) {
                return {
                    valido: false,
                    mensagem: '⚠️ Os valores devem ser maiores que zero!'
                };
            }

            // 4. Idade fora do range
            if (idade < CONFIG.IDADE_MIN || idade > CONFIG.IDADE_MAX) {
                return {
                    valido: false,
                    mensagem: `⚠️ Idade deve estar entre ${CONFIG.IDADE_MIN} e ${CONFIG.IDADE_MAX} anos!`
                };
            }

            // 5. Salário fora do range
            if (salario < CONFIG.SALARIO_MIN || salario > CONFIG.SALARIO_MAX) {
                const maxFormatado = CONFIG.SALARIO_MAX.toLocaleString('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                });
                return {
                    valido: false,
                    mensagem: `⚠️ Salário deve estar entre € 1 e ${maxFormatado}!`
                };
            }

            return { valido: true, idade, salario };
        }

        // ==========================================
        // LÓGICA DE NEGÓCIO
        // ==========================================
        function analisarEmprestimo(idade, salario) {
            const salarioFormatado = salario.toLocaleString('pt-PT', {
                style: 'currency',
                currency: 'EUR'
            });

            // Aprovado
            if (idade >= CONFIG.IDADE_MIN_EMPRESTIMO && salario >= CONFIG.SALARIO_MIN_EMPRESTIMO) {
                return {
                    tipo: 'sucesso',
                    mensagem: `
                        <strong>✅ EMPRÉSTIMO APROVADO!</strong><br><br>
                        📋 Dados da análise:<br>
                        • Idade: ${idade} anos<br>
                        • Salário: ${salarioFormatado}<br><br>
                        🎉 Parabéns! Entre em contato para prosseguir.
                    `
                };
            }

            // Negado - Razões específicas
            const razoes = [];
            if (idade < CONFIG.IDADE_MIN_EMPRESTIMO) {
                razoes.push(`Idade mínima: ${CONFIG.IDADE_MIN_EMPRESTIMO} anos`);
            }
            if (salario < CONFIG.SALARIO_MIN_EMPRESTIMO) {
                const minFormatado = CONFIG.SALARIO_MIN_EMPRESTIMO.toLocaleString('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                });
                razoes.push(`Salário mínimo: ${minFormatado}`);
            }

            return {
                tipo: 'negado',
                mensagem: `
                    <strong>❌ EMPRÉSTIMO NEGADO</strong><br><br>
                    📋 Motivo(s):<br>
                    ${razoes.map(r => `• ${r}`).join('<br>')}
                `
            };
        }

        // ==========================================
        // FUNÇÃO PRINCIPAL
        // ==========================================
        function pedirEmprestimo(event) {
            event.preventDefault(); // Impede reload da página

            const idadeTexto = divIdade.value.trim();
            const salarioTexto = divSalario.value.trim();

            // Validação
            const validacao = validarCampos(idadeTexto, salarioTexto);
            
            if (!validacao.valido) {
                divResultado.innerHTML = `<p>${validacao.mensagem}</p>`;
                divResultado.className = 'erro';
                return;
            }

            // Análise
            const resultado = analisarEmprestimo(validacao.idade, validacao.salario);
            divResultado.innerHTML = resultado.mensagem;
            divResultado.className = resultado.tipo;
        }

        // ==========================================
        // EVENT LISTENERS
        // ==========================================
        formulario.addEventListener('submit', pedirEmprestimo);