// УПРОЩЕННЫЙ МОДУЛЬ АНИМАЦИЙ
const AnimationManager = {
    init() {
        console.log("🎬 Менеджер анимаций инициализирован");
        this.setupHoverAnimations();
    },

    setupHoverAnimations() {
        // Простые hover эффекты для карточек инструментов
        const toolItems = document.querySelectorAll(".tool-item");
        toolItems.forEach(tool => {
            tool.addEventListener("mouseenter", function() {
                this.style.transform = "translateY(-5px)";
            });
            tool.addEventListener("mouseleave", function() {
                this.style.transform = "translateY(0)";
            });
        });

        // Простые hover эффекты для областей карты
        const mapAreas = document.querySelectorAll(".map-area");
        mapAreas.forEach(area => {
            area.addEventListener("mouseenter", function() {
                this.style.transform = "translateY(-5px)";
            });
            area.addEventListener("mouseleave", function() {
                this.style.transform = "translateY(0)";
            });
        });
    }
};

// Инициализация
document.addEventListener("DOMContentLoaded", function() {
    AnimationManager.init();
});

window.AnimationManager = AnimationManager;
