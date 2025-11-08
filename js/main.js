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
            this.modules.coordinates = new CoordinateTracker();
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
                this.modules.notifications.show(`Выбрано: ${toolName}`, 'info');
            });
        });

        // Обработчики для лога мыслей
        const logEntries = document.querySelectorAll('.log-entry');
        logEntries.forEach(entry => {
            entry.addEventListener('click', () => {
                const date = entry.querySelector('.log-date').textContent;
                const message = entry.querySelector('.log-message').textContent;
                this.modules.notifications.show(`${date}: ${message}`, 'log');
            });
        });

        // Анимация появления элементов при скролле
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.tool-item, .content-box, .log-entry, .message-bottle');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
}

// Запуск приложения
const islandApp = new IslandApp();
