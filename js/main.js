// Конфигурация
const CONFIG = {
    notifications: {
        duration: 3000
    },
    email: {
        copyNotificationDuration: 2000
    }
};

// Уведомления
class Notifications {
    constructor() {
        this.notification = document.getElementById('notification');
    }

    show(message, type = 'info') {
        if (!this.notification) return;

        this.notification.textContent = message;
        this.notification.className = 'notification';
        this.notification.classList.add('show');

        setTimeout(() => {
            this.hide();
        }, CONFIG.notifications.duration);
    }

    hide() {
        if (this.notification) {
            this.notification.classList.remove('show');
        }
    }
}

// Копирование email
class EmailCopy {
    constructor() {
        this.emailElement = document.getElementById('email-text');
        this.emailNotification = document.getElementById('email-notification');
        this.init();
    }

    init() {
        if (!this.emailElement) return;

        this.emailElement.addEventListener('click', () => {
            this.copyEmail();
        });

        this.emailElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.copyEmail();
            }
        });
    }

    async copyEmail() {
        const email = this.emailElement.getAttribute('data-email');
        
        try {
            await navigator.clipboard.writeText(email);
            this.showSuccess();
        } catch (err) {
            this.showFallback(email);
        }
    }

    showSuccess() {
        if (this.emailNotification) {
            this.emailNotification.classList.add('show');
            setTimeout(() => {
                this.emailNotification.classList.remove('show');
            }, CONFIG.email.copyNotificationDuration);
        }
    }

    showFallback(email) {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showSuccess();
    }
}

// Плавная прокрутка
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Интерактивность
function setupInteractivity(notifications) {
    // Инструменты
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.addEventListener('click', () => {
            const toolName = tool.querySelector('h3').textContent;
            notifications.show(`Выбран: ${toolName}`, 'info');
        });
    });

    // Лог мыслей
    document.querySelectorAll('.log-entry').forEach(entry => {
        entry.addEventListener('click', () => {
            const date = entry.querySelector('.log-date').textContent;
            const message = entry.querySelector('.log-message').textContent;
            notifications.show(`${date}\n${message}`, 'info');
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const notifications = new Notifications();
    const emailCopy = new EmailCopy();
    const smoothScroll = new SmoothScroll();
    
    setupInteractivity(notifications);
    
    console.log('🏝️ Остров-убежище загружен! 8 ноября 2025');
});
