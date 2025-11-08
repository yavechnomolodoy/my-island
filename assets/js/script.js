// Чистый JavaScript с анимациями
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏝️ Остров-убежище загружен! 8 ноября 2025');
    
    // Анимации появления при скролле
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.tool-item, .content-box, .log-entry, .message-bottle, .section h2, .footer'
        );
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Копирование email
    const emailText = document.getElementById('email-text');
    const emailNotification = document.getElementById('email-notification');
    
    if (emailText) {
        emailText.addEventListener('click', async function() {
            const email = this.getAttribute('data-email');
            try {
                await navigator.clipboard.writeText(email);
                if (emailNotification) {
                    emailNotification.classList.add('show');
                    setTimeout(() => {
                        emailNotification.classList.remove('show');
                    }, 2000);
                }
            } catch (err) {
                // Fallback для старых браузеров
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                if (emailNotification) {
                    emailNotification.classList.add('show');
                    setTimeout(() => {
                        emailNotification.classList.remove('show');
                    }, 2000);
                }
            }
        });
    }
    
    // Интерактивность инструментов
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.addEventListener('click', function() {
            const toolName = this.querySelector('h3').textContent;
            console.log(`Выбран инструмент: ${toolName}`);
        });
    });
    
    // Интерактивность лога мыслей
    document.querySelectorAll('.log-entry').forEach(entry => {
        entry.addEventListener('click', function() {
            const date = this.querySelector('.log-date').textContent;
            const message = this.querySelector('.log-message').textContent;
            console.log(`${date}: ${message}`);
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Запускаем анимации
    setupScrollAnimations();
});
