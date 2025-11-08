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
        this.setupStyles();
    }

    setupEventListeners() {
        // Обработчик клика для копирования
        this.emailElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.copyEmail();
        });

        // Обработчики для клавиатуры
        this.emailElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.copyEmail();
            }
        });

        // Делаем элемент доступным для фокуса
        this.emailElement.setAttribute('tabindex', '0');
        this.emailElement.setAttribute('role', 'button');
        this.emailElement.setAttribute('aria-label', 'Скопировать email адрес');
    }

    setupStyles() {
        // Убедимся, что уведомление скрыто изначально
        this.emailNotification.style.transition = 'all 0.3s ease';
        this.emailNotification.classList.remove('show');
    }

    copyEmail() {
        const email = this.emailElement.getAttribute('data-email');
        
        if (!email) {
            console.error('Email не найден в data-атрибуте');
            return;
        }

        // Используем современный Clipboard API
        navigator.clipboard.writeText(email).then(() => {
            this.showSuccess();
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            this.showFallback(email);
        });
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
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
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
