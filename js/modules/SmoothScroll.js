class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnchorLinks();
        this.setupScrollAnimations();
    }

    setupAnchorLinks() {
        // Простая плавная прокрутка без устаревших событий
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            
            if (link && link.getAttribute('href') !== '#') {
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

    setupScrollAnimations() {
        // Используем IntersectionObserver вместо устаревших событий
        if (!('IntersectionObserver' in window)) return;

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

        const elementsToAnimate = document.querySelectorAll(
            '.tool-item, .content-box, .log-entry, .message-bottle, .section h2, .footer'
        );

        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }
}
