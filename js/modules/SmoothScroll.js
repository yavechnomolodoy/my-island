class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Плавная прокрутка для якорей
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

        // Добавляем класс активности для навигации (если будет навигационное меню)
        this.setupSectionObserver();
    }

    setupSectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-50px 0px -50px 0px'
            });

            sections.forEach(section => {
                observer.observe(section);
            });
        }
    }
}
