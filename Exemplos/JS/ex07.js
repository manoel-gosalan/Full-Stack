// Constantes e estrutura de dados
        const DIAS_DA_SEMANA = [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado'
        ];

        /**
         * Obtém o nome do dia da semana atual
         * @param {Date} data - Data para obter o dia da semana
         * @returns {string} Nome do dia da semana
         */
        function obterNomeDoDia(data = new Date()) {
            const indiceDia = data.getDay();
            return DIAS_DA_SEMANA[indiceDia];
        }

        /**
         * Obtém o dia formatado em um idioma específico
         * @param {Date} data - Data para formatar
         * @param {string} idioma - Código do idioma (ex: 'pt-BR', 'en-US')
         * @returns {string} Nome do dia no idioma especificado
         */
        function obterDiaFormatado(data = new Date(), idioma = 'pt-BR') {
            return data.toLocaleDateString(idioma, {
                weekday: 'long'
            });
        }

        /**
         * Obtém a data completa formatada
         * @param {Date} data - Data para formatar
         * @returns {string} Data formatada completa
         */
        function obterDataCompleta(data = new Date()) {
            return data.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }

        /**
         * Atualiza todos os dias na interface
         */
        function atualizarDias() {
            const dataAtual = new Date();

            // Atualiza dia principal
            document.getElementById('diaPrincipal').textContent = obterNomeDoDia(dataAtual);
            document.getElementById('dataCompleta').textContent = obterDataCompleta(dataAtual);

            // Atualiza idiomas
            document.getElementById('diaPT').textContent = obterDiaFormatado(dataAtual, 'pt-BR');
            document.getElementById('diaEN').textContent = obterDiaFormatado(dataAtual, 'en-US');
            document.getElementById('diaJP').textContent = obterDiaFormatado(dataAtual, 'ja-JP');
            

            // Log no console (mantendo o exemplo original)
            console.log('Português:', obterDiaFormatado(dataAtual, 'pt-BR'));
            console.log('Inglês:', obterDiaFormatado(dataAtual, 'en-US'));
            console.log('Japonês:', obterDiaFormatado(dataAtual, 'ja-JP'));
        }

        // Inicializa ao carregar a página
        atualizarDias();