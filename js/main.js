// Главный файл инициализации
class IslandWebsite {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    init() {
        try {
            // Инициализируем модули
            this.modules.notifications = new Notifications();
            this.modules.coordinateTracker = new CoordinateTracker(this.modules.notifications);
            this.modules.emailCopy = new EmailCopy(this.modules.notifications);
            this.modules.smoothScroll = new SmoothScroll();
            
            console.log('🏝️ Остров-убежище успешно загружен!');
            console.log('📍 Двойной правый клик - копирование координат');
            console.log('📧 Клик по email - копирование адреса');
            
        } catch (error) {
            console.error('Ошибка при загрузке сайта:', error);
        }
    }
}

// Инициализация при полной загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.island = new IslandWebsite();
});

// Обработка ошибок
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});
