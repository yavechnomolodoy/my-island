class Notifications {
    constructor() {
        this.notification = document.getElementById('notification');
        this.init();
    }

    init() {
        // Убедимся, что элемент существует
        if (!this.notification) {
            console.warn('Элемент уведомления не найден');
            return;
        }
        
        // Инициализируем стили
        this.notification.style.transition = 'all 0.3s ease';
    }

    show(message, type = 'info') {
        if (!this.notification) return;

        // Устанавливаем сообщение и тип
        this.notification.textContent = message;
        this.notification.className = 'notification'; // Сбрасываем классы
        
        // Добавляем класс типа и показываем
        this.notification.classList.add(type);
        this.notification.classList.add('show');

        // Автоматическое скрытие
        setTimeout(() => {
            this.hide();
        }, CONFIG.notifications.duration);
    }

    hide() {
        if (!this.notification) return;
        
        this.notification.classList.remove('show');
        
        // Ждем завершения анимации перед сбросом класса типа
        setTimeout(() => {
            this.notification.className = 'notification';
        }, 300);
    }
}
