// Главный класс приложения
class IslandApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Ждём полной загрузки DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        try {
            // Инициализируем модули
            this.modules.notifications = new Notifications();
            this.modules.emailCopy = new EmailCopy();
            this.modules.smoothScroll = new SmoothScroll();

            // Настраиваем интерактивность
            this.setupInteractivity();
            
            console.log('🏝️ Остров-убежище загружен!');
        } catch (error) {
            console.error('Ошибка инициализации:', error);
        }
    }

    setupInteractivity() {
        // Обработчики для инструментов
        document.querySelectorAll('.tool-item').forEach(tool => {
            tool.addEventListener('click', () => {
                const toolName = tool.querySelector('h3').textContent;
                this.modules.notifications.show(`Инструмент: ${toolName}`, 'info');
            });
        });

        // Обработчики для лога мыслей
        document.querySelectorAll('.log-entry').forEach(entry => {
            entry.addEventListener('click', () => {
                const date = entry.querySelector('.log-date').textContent;
                const message = entry.querySelector('.log-message').textContent;
                this.modules.notifications.show(`${date}: ${message}`, 'log');
            });
        });
    }
}

// Запускаем приложение
const islandApp = new IslandApp();
