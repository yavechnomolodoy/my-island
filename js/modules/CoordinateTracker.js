class CoordinateTracker {
    constructor() {
        this.coordNotification = document.getElementById('coord-notification');
        this.isTracking = false;
        this.lastUpdate = 0;
        this.updateInterval = 100; // ms между обновлениями
        
        this.init();
    }

    init() {
        this.setupMouseTracking();
        this.setupTouchTracking();
    }

    setupMouseTracking() {
        // Используем requestAnimationFrame для оптимизации
        let rafId;
        
        const updateCoordinates = (e) => {
            if (!this.isTracking) return;
            
            const now = Date.now();
            if (now - this.lastUpdate < this.updateInterval) {
                return;
            }
            
            this.lastUpdate = now;
            this.showCoordinates(e.clientX, e.clientY);
        };

        document.addEventListener('mousemove', (e) => {
            if (!this.isTracking) {
                this.isTracking = true;
                this.coordNotification.classList.add('show');
            }

            // Отменяем предыдущий кадр анимации
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            rafId = requestAnimationFrame(() => updateCoordinates(e));
        });

        document.addEventListener('mouseleave', () => {
            this.hideCoordinates();
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        });
    }

    setupTouchTracking() {
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.showCoordinates(touch.clientX, touch.clientY);
                this.coordNotification.classList.add('show');
                this.isTracking = true;
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            this.hideCoordinates();
        });
    }

    showCoordinates(x, y) {
        const coordinates = `X: ${x}, Y: ${y}`;
        this.coordNotification.textContent = coordinates;
        this.coordNotification.classList.add('show');
    }

    hideCoordinates() {
        this.isTracking = false;
        this.coordNotification.classList.remove('show');
    }
}
