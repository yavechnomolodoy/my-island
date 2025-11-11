// ПРОСТОЙ МОДУЛЬ КАРТЫ ОСТРОВА
const IslandMap = {
    init: function() {
        console.log("🗺️ Карта острова инициализирована");
        this.setupMapInteractions();
    },

    setupMapInteractions: function() {
        var mapAreas = document.querySelectorAll(".map-area");
        
        for (var i = 0; i < mapAreas.length; i++) {
            var area = mapAreas[i];
            
            area.addEventListener("click", function(e) {
                IslandMap.handleAreaClick(this, e);
            });

            area.addEventListener("mouseenter", function() {
                IslandMap.showAreaTooltip(this);
            });

            area.addEventListener("mouseleave", function() {
                IslandMap.hideAreaTooltip();
            });
        }
    },

    handleAreaClick: function(area, event) {
        // Визуальная обратная связь
        area.style.transform = "scale(0.95)";
        setTimeout(function() {
            area.style.transform = "";
        }, 150);

        // Эффект ripple
        this.createRippleEffect(area, event);

        // Получаем название области
        var areaName = area.querySelector(".map-label").textContent;
        console.log("🗺️ Исследована область: " + areaName);
    },

    showAreaTooltip: function(area) {
        var areaName = area.querySelector(".map-label").textContent;
        var tooltip = document.createElement("div");
        tooltip.className = "map-tooltip";
        tooltip.textContent = areaName;
        
        tooltip.style.position = "absolute";
        tooltip.style.background = "rgba(0, 0, 0, 0.8)";
        tooltip.style.color = "white";
        tooltip.style.padding = "8px 12px";
        tooltip.style.borderRadius = "6px";
        tooltip.style.fontSize = "0.9rem";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.zIndex = "1000";
        tooltip.style.pointerEvents = "none";
        
        document.body.appendChild(tooltip);
        
        var rect = area.getBoundingClientRect();
        tooltip.style.top = (rect.top + window.pageYOffset - tooltip.offsetHeight - 10) + "px";
        tooltip.style.left = (rect.left + window.pageXOffset + rect.width / 2 - tooltip.offsetWidth / 2) + "px";
    },

    hideAreaTooltip: function() {
        var tooltip = document.querySelector(".map-tooltip");
        if (tooltip) {
            tooltip.remove();
        }
    },

    createRippleEffect: function(element, event) {
        var ripple = document.createElement("span");
        var rect = element.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var x = event.clientX - rect.left - size / 2;
        var y = event.clientY - rect.top - size / 2;
        
        ripple.style.position = "absolute";
        ripple.style.width = size + "px";
        ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.style.background = "rgba(255, 255, 255, 0.6)";
        ripple.style.borderRadius = "50%";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s linear";
        ripple.style.pointerEvents = "none";
        
        element.appendChild(ripple);
        
        setTimeout(function() {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
};

// Добавляем стили для анимации ripple
var rippleStyles = document.createElement("style");
rippleStyles.textContent = "@keyframes ripple { to { transform: scale(4); opacity: 0; } }";
document.head.appendChild(rippleStyles);

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", function() {
    IslandMap.init();
});

window.IslandMap = IslandMap;
