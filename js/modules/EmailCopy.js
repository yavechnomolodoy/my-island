class EmailCopy {
    constructor() {
        this.emailElement = document.getElementById('email-text');
        this.emailNotification = document.getElementById('email-notification');
        this.init();
    }

    init() {
        if (!this.emailElement || !this.emailNotification) {
            console.warn('Элементы email не найдены');
            return;
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Современный обработчик без устаревших событий
        this.emailElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.copyEmail();
        });

        // Для доступности
        this.emailElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.copyEmail();
            }
        });

        this.emailElement.setAttribute('tabindex', '0');
        this.emailElement.setAttribute('role', 'button');
        this.emailElement.setAttribute('aria-label', 'Скопировать email адрес');
    }

    async copyEmail() {
        const email = this.emailElement.getAttribute('data-email');
        
        if (!email) {
            console.error('Email не найден');
            return;
        }

        try {
            await navigator.clipboard.writeText(email);
            this.showSuccess();
        } catch (err) {
            console.error('Ошибка копирования: ', err);
            this.showFallback(email);
        }
    }

    showSuccess() {
        this.emailNotification.classList.add('show');
        
        setTimeout(() => {
            this.emailNotification.classList.remove('show');
        }, CONFIG.email.copyNotificationDuration);
    }

    showFallback(email) {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showSuccess();
        } catch (err) {
            console.error('Fallback copying failed: ', err);
        }
        
        document.body.removeChild(textArea);
    }
}
