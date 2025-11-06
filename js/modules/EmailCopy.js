class EmailCopy {
    constructor(notifications) {
        this.notifications = notifications;
        this.init();
    }
    
    init() {
        const emailText = document.getElementById('email-text');
        const emailNotification = document.getElementById('email-notification');
        
        if (emailText) {
            emailText.addEventListener('click', async () => {
                const email = emailText.getAttribute('data-email');
                
                try {
                    await navigator.clipboard.writeText(email);
                    this.showEmailNotification(emailNotification);
                } catch (err) {
                    // Fallback для старых браузеров
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showEmailNotification(emailNotification);
                }
            });
        }
    }
    
    showEmailNotification(notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, CONFIG.TIMING.EMAIL_NOTIFICATION_DURATION);
    }
}
