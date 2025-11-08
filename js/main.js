// Конфигурация и инициализация приложения
class IslandApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Инициализация модулей с задержкой для полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // Инициализация модулей
            this.modules.notifications = new Notifications();
            this.modules.emailCopy = new EmailCopy();
            this.modules.smoothScroll = new SmoothScroll();

            // Инициализация интерактивных элементов
            this.setupInteractiveElements();
            
            console.log('🏝️ Остров-убежище инициализирован успешно!');
        } catch (error) {
            console.error('Ошибка инициализации приложения:', error);
        }
    }

    setupInteractiveElements() {
        // Обработчики для инструментов
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach(tool => {
            tool.addEventListener('click', () => {
                const toolName = tool.querySelector('h3').textContent;
                const toolDesc = tool.querySelector('p').textContent;
                this.modules.notifications.show(`${toolName} - ${toolDesc}`, 'info');
            });
        });

        // Обработчики для лога мыслей
        const logEntries = document.querySelectorAll('.log-entry');
        logEntries.forEach(entry => {
            entry.addEventListener('click', () => {
                const date = entry.querySelector('.log-date').textContent;
                const message = entry.querySelector('.log-message').textContent;
                this.modules.notifications.show(`${date}\n${message}`, 'log');
            });
        });

        // УБРАЛИ обработчик для бутылки с посланием - он больше не нужен

        // Анимация появления элементов при скролле
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.tool-item, .content-box, .log-entry, .message-bottle');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            animatedElements.forEach(el => {
                observer.observe(el);
            });
        }
    }
}

// Запуск приложения
const islandApp = new IslandApp();
