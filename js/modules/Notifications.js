class Notifications {
    constructor() {
        this.notification = document.getElementById('notification');
        this.coordNotification = document.getElementById('coord-notification');
    }

    show(message, type = 'info') {
        const colors = {
            info: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800'
        };
        
        this.notification.textContent = message;
        this.notification.style.borderLeftColor = colors[type] || colors.info;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, CONFIG.TIMING.NOTIFICATION_DURATION);
    }

    showCoordinates(message) {
        this.coordNotification.textContent = message;
        this.coordNotification.classList.add('show');
        
        setTimeout(() => {
            this.coordNotification.classList.remove('show');
        }, CONFIG.TIMING.NOTIFICATION_DURATION);
    }
}
