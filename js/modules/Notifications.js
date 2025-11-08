class Notifications {
    constructor() {
        this.notification = document.getElementById('notification');
        this.init();
    }

    init() {
        if (!this.notification) {
            console.warn('Элемент уведомления не найден');
            return;
        }
        
        // Базовая инициализация стилей
        this.notification.style.transition = 'all 0.3s ease';
    }

    show(message, type = 'info') {
        if (!this.notification) return;

        // Сбрасываем и устанавливаем новые классы
        this.notification.textContent = message;
        this.notification.className = 'notification';
        this.notification.classList.add(type, 'show');

        // Автоматическое скрытие
        setTimeout(() => {
            this.hide();
        }, CONFIG.notifications.duration);
    }

    hide() {
        if (!this.notification) return;
        
        this.notification.classList.remove('show');
    }
}
