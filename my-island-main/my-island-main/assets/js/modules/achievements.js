// МОДУЛЬ СИСТЕМЫ ДОСТИЖЕНИЙ - ИСПРАВЛЕННАЯ ВЕРСИЯ
const AchievementsSystem = {
    init: function() {
        console.log("🏆 Система достижений инициализирована");
        this.setupModalHandlers();
        this.loadAchievements();
    },

    setupModalHandlers: function() {
        // Кнопка открытия модального окна
        const achievementsBtn = document.querySelector('[onclick="showAchievements()"]');
        if (achievementsBtn) {
            achievementsBtn.onclick = AchievementsSystem.showModal;
        }

        // Кнопка закрытия модального окна
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = AchievementsSystem.hideModal;
        }

        // Закрытие по клику вне модального окна
        const modal = document.getElementById('achievementsModal');
        if (modal) {
            modal.onclick = function(event) {
                if (event.target === modal) {
                    AchievementsSystem.hideModal();
                }
            };
        }

        // Закрытие по клавише Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                AchievementsSystem.hideModal();
            }
        });
    },

    showModal: function() {
        const modal = document.getElementById('achievementsModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку
            console.log("🏆 Модальное окно достижений открыто");
        }
    },

    hideModal: function() {
        const modal = document.getElementById('achievementsModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
            console.log("🏆 Модальное окно достижений закрыто");
        }
    },

    loadAchievements: function() {
        // Здесь может быть логика загрузки достижений
        console.log("📊 Загрузка данных достижений...");
    },

    unlockAchievement: function(achievementId) {
        // Логика разблокировки достижений
        console.log("🎉 Разблокировано достижение: " + achievementId);
    }
};

// Глобальные функции для вызова из HTML
function showAchievements() {
    AchievementsSystem.showModal();
}

function closeAchievementsModal() {
    AchievementsSystem.hideModal();
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    AchievementsSystem.init();
});

window.AchievementsSystem = AchievementsSystem;
window.showAchievements = showAchievements;
window.closeAchievementsModal = closeAchievementsModal;
