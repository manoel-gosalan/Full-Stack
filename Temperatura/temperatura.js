 // ==========================================
        // CONFIGURAÇÃO E CONSTANTES
        // ==========================================
        const TEMP_CONFIG = {
            MIN_VALID: -50,
            MAX_VALID: 60,
            RANGES: {
                HOT: { min: 30, max: 60, emoji: '🔥', text: 'Está calor!', class: 'calor', color: '#ff6b6b' },
                PLEASANT: { min: 15, max: 29, emoji: '😌', text: 'Está agradável.', class: 'agradavel', color: '#4dabf7' },
                COLD: { min: -50, max: 14, emoji: '❄️', text: 'Está frio.', class: 'frio', color: '#74c0fc' }
            },
            ERROR: {
                emoji: '⚠️',
                text: 'Por favor, digite um valor válido!',
                class: 'erro',
                color: '#ff4d4d'
            }
        };

        const THEME_CONFIG = {
            STORAGE_KEY: 'temperature-app-theme',
            DARK: 'dark',
            LIGHT: 'light',
            ICONS: {
                dark: '☀️',  // Sol quando está em dark (para mudar para light)
                light: '🌙'  // Lua quando está em light (para mudar para dark)
            }
        };

        // ==========================================
        // CACHE DE ELEMENTOS DOM
        // ==========================================
        const DOM = {
            input: document.getElementById('temp'),
            button: document.getElementById('button'),
            result: document.getElementById('resposta'),
            thermometer: document.querySelector('.nivel'),
            themeToggle: document.getElementById('themeToggle'),
            themeIcon: document.getElementById('themeIcon'),
            html: document.documentElement
        };

        // ==========================================
        // THEME MANAGEMENT
        // ==========================================
        class ThemeManager {
            constructor() {
                this.currentTheme = this.getInitialTheme();
                this.applyTheme(this.currentTheme, false);
            }

            /**
             * Detecta o tema inicial baseado em:
             * 1. localStorage (preferência salva)
             * 2. Preferência do sistema operacional
             * 3. Light theme como fallback
             */
            getInitialTheme() {
                const savedTheme = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
                
                if (savedTheme) {
                    return savedTheme;
                }

                // Detecta preferência do sistema
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                return prefersDark ? THEME_CONFIG.DARK : THEME_CONFIG.LIGHT;
            }

            /**
             * Aplica o tema no documento
             */
            applyTheme(theme, withTransition = true) {
                // Remove transição temporariamente se necessário
                if (!withTransition) {
                    document.body.style.transition = 'none';
                }

                DOM.html.setAttribute('data-theme', theme);
                DOM.themeIcon.textContent = THEME_CONFIG.ICONS[theme];
                this.currentTheme = theme;

                // Salva preferência
                localStorage.setItem(THEME_CONFIG.STORAGE_KEY, theme);

                // Restaura transição
                if (!withTransition) {
                    setTimeout(() => {
                        document.body.style.transition = '';
                    }, 0);
                }
            }

            /**
             * Alterna entre os temas
             */
            toggle() {
                const newTheme = this.currentTheme === THEME_CONFIG.DARK 
                    ? THEME_CONFIG.LIGHT 
                    : THEME_CONFIG.DARK;
                
                this.applyTheme(newTheme, true);
            }
        }

        // Instancia o gerenciador de tema
        const themeManager = new ThemeManager();

        // ==========================================
        // VALIDAÇÃO
        // ==========================================
        function validateInput(value) {
            const trimmedValue = value.trim();
            
            if (!trimmedValue) {
                return { isValid: false, temp: 0 };
            }
            
            const temp = Number(trimmedValue);
            
            if (isNaN(temp)) {
                return { isValid: false, temp: 0 };
            }
            
            if (temp < TEMP_CONFIG.MIN_VALID || temp > TEMP_CONFIG.MAX_VALID) {
                return { isValid: false, temp };
            }
            
            return { isValid: true, temp };
        }

        // ==========================================
        // LÓGICA DE NEGÓCIO
        // ==========================================
        function getTemperatureStatus(temp) {
            const { RANGES } = TEMP_CONFIG;
            
            if (temp >= RANGES.HOT.min && temp <= RANGES.HOT.max) {
                return RANGES.HOT;
            }
            
            if (temp >= RANGES.PLEASANT.min && temp <= RANGES.PLEASANT.max) {
                return RANGES.PLEASANT;
            }
            
            return RANGES.COLD;
        }

        function calculateThermometerLevel(temp) {
            const { MIN_VALID, MAX_VALID } = TEMP_CONFIG;
            const normalized = (temp - MIN_VALID) / (MAX_VALID - MIN_VALID);
            return Math.min(100, Math.max(0, normalized * 100));
        }

        // ==========================================
        // ATUALIZAÇÃO DA UI
        // ==========================================
        function updateUI(config, level) {
            const { emoji, text, class: className, color } = config;
            
            DOM.result.textContent = `${emoji} ${text}`;
            DOM.result.className = `resultado ${className} animar`;
            
            DOM.input.style.borderColor = color;
            
            DOM.thermometer.style.height = `${level}%`;
            DOM.thermometer.style.background = color;
        }

        // ==========================================
        // FUNÇÃO PRINCIPAL
        // ==========================================
        function verificarTemperatura() {
            const { isValid, temp } = validateInput(DOM.input.value);
            
            if (!isValid) {
                updateUI(TEMP_CONFIG.ERROR, 0);
                return;
            }
            
            const status = getTemperatureStatus(temp);
            const level = calculateThermometerLevel(temp);
            
            updateUI(status, level);
        }

        // ==========================================
        // EVENT LISTENERS
        // ==========================================
        function initEventListeners() {
            // Temperatura
            DOM.button.addEventListener('click', verificarTemperatura);
            
            DOM.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    verificarTemperatura();
                }
            });
            
            DOM.input.addEventListener('input', () => {
                if (DOM.result.classList.contains('erro')) {
                    DOM.result.classList.remove('animar');
                }
            });

            // Tema
            DOM.themeToggle.addEventListener('click', () => {
                themeManager.toggle();
            });

            // Detecta mudanças na preferência do sistema
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Só muda automaticamente se o usuário não tiver preferência salva
                if (!localStorage.getItem(THEME_CONFIG.STORAGE_KEY)) {
                    themeManager.applyTheme(e.matches ? THEME_CONFIG.DARK : THEME_CONFIG.LIGHT);
                }
            });
        }

        // ==========================================
        // INICIALIZAÇÃO
        // ==========================================
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEventListeners);
        } else {
            initEventListeners();
        }