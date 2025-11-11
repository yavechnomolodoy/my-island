// ===== ОСНОВНОЙ JAVASCRIPT ФАЙЛ =====
console.log('🏝️ Остров-убежище загружен! Обновление от 10 ноября 2025');

// Глобальные переменные
let currentTheme = 'light';
let achievements = {
    firstVisit: { name: "Первый визит", unlocked: true, icon: "🎯" },
    explorer: { name: "Исследователь", unlocked: false, icon: "🔍" },
    skillMaster: { name: "Мастер навыков", unlocked: false, icon: "⚡" },
    mapDiscoverer: { name: "Первооткрыватель", unlocked: false, icon: "🗺️" }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Инициализация приложения...');
    
    // Инициализация модулей
    setupPreloader();
    setupScrollAnimations();
    setupNavigation();
    setupTheme();
    setupEmailCopy();
    setupInteractiveElements();
    setupProgressIndicator();
    setupBackToTop();
    setupStatsCounter();
    setupSkillsAnimation();
    
    // Запуск мини-игры
    setTimeout(createMiniGame, 5000);
    
    console.log('✅ Все системы острова запущены!');
}

// Preloader
function setupPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                unlockAchievement('firstVisit');
            }, 500);
        }, 1000);
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.tool-item, .content-box, .log-entry, .message-bottle, .section h2, .footer, .skill-item, .map-area, .stat-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Специальные анимации для элементов
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillProgress(entry.target);
                }
                
                if (entry.target.classList.contains('stat-item')) {
                    animateStatCounter(entry.target);
                }
                
                if (entry.target.classList.contains('map-area')) {
                    unlockAchievement('mapDiscoverer');
                }
                
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

// Navigation
function setupNavigation() {
    const nav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Theme Management
function setupTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('island-theme');
    
    if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme(savedTheme);
    }
    
    // Detect system theme
    if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
        applyTheme('dark');
    }
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('island-theme', currentTheme);
}

function applyTheme(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--primary-blue', '#4a6fa5');
        document.documentElement.style.setProperty('--secondary-blue', '#48cae4');
        document.documentElement.style.setProperty('--light-blue', '#1a1a2e');
        document.documentElement.style.setProperty('--text-dark', '#e2e2e2');
        document.documentElement.style.setProperty('--shadow', '0 10px 30px rgba(0, 0, 0, 0.3)');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.style.setProperty('--primary-blue', '#1a2980');
        document.documentElement.style.setProperty('--secondary-blue', '#26d0ce');
        document.documentElement.style.setProperty('--light-blue', '#e0f7fa');
        document.documentElement.style.setProperty('--text-dark', '#2c3e50');
        document.documentElement.style.setProperty('--shadow', '0 10px 30px rgba(0, 0, 0, 0.1)');
        themeToggle.textContent = '🌙';
    }
}

// Email Copy Functionality
function setupEmailCopy() {
    const emailText = document.getElementById('email-text');
    const emailNotification = document.getElementById('email-notification');

    if (emailText) {
        emailText.addEventListener('click', async function() {
            const email = this.getAttribute('data-email');
            try {
                await navigator.clipboard.writeText(email);
                showNotification(emailNotification, '✅ Email скопирован!');
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification(emailNotification, '✅ Email скопирован!');
            }
        });
    }
}

function showNotification(element, message) {
    if (element) {
        element.textContent = message;
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 2000);
    }
}

// Interactive Elements
function setupInteractiveElements() {
    // Tool items interaction
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.addEventListener('click', function() {
            const toolName = this.querySelector('h3').textContent;
            console.log(`🛠️ Выбран инструмент: ${toolName}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Ripple effect
            createRippleEffect(this, event);
        });
    });
    
    // Log entries interaction
    document.querySelectorAll('.log-entry').forEach(entry => {
        entry.addEventListener('click', function() {
            const date = this.querySelector('.log-date').textContent;
            const message = this.querySelector('.log-message').textContent;
            console.log(`📝 ${date}: ${message}`);
            
            createRippleEffect(this, event);
        });
    });
    
    // Map areas interaction
    document.querySelectorAll('.map-area').forEach(area => {
        area.addEventListener('click', function() {
            const areaName = this.querySelector('.map-label').textContent;
            console.log(`🗺️ Исследована область: ${areaName}`);
            
            createRippleEffect(this, event);
            unlockAchievement('explorer');
        });
    });
    
    // Thought filtering
    setupThoughtFiltering();
}

// Thought Filtering
function setupThoughtFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const logEntries = document.querySelectorAll('.log-entry');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter entries
            logEntries.forEach(entry => {
                if (filter === 'all' || entry.getAttribute('data-category') === filter) {
                    entry.style.display = 'flex';
                    setTimeout(() => {
                        entry.style.opacity = '1';
                        entry.style.transform = 'translateX(0)';
                    }, 100);
                } else {
                    entry.style.opacity = '0';
                    entry.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        entry.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Progress Indicator
function setupProgressIndicator() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });
}

// Back to Top Button
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    ripple.classList.add('ripple-effect');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Continue with other functions in the next part...
// Stats Counter Animation
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateStatCounter(statElement) {
    const target = parseInt(statElement.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        statElement.textContent = Math.floor(current);
    }, 16);
}

// Skills Animation
function setupSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillProgress(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(skill => observer.observe(skill));
}

function animateSkillProgress(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    if (progressBar) {
        const width = progressBar.getAttribute('data-width');
        setTimeout(() => {
            progressBar.style.width = width + '%';
            
            // Check if all skills are at 100% for achievement
            checkSkillMasterAchievement();
        }, 300);
    }
}

function checkSkillMasterAchievement() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    let allMaxed = true;
    
    skillProgresses.forEach(progress => {
        const width = parseInt(progress.getAttribute('data-width'));
        if (width < 100) {
            allMaxed = false;
        }
    });
    
    if (allMaxed) {
        unlockAchievement('skillMaster');
    }
}

// Achievements System
function unlockAchievement(achievementKey) {
    if (achievements[achievementKey] && !achievements[achievementKey].unlocked) {
        achievements[achievementKey].unlocked = true;
        showAchievementNotification(achievements[achievementKey]);
        saveAchievements();
        console.log(`🏆 Достижение разблокировано: ${achievements[achievementKey].name}`);
    }
}

function showAchievementNotification(achievement) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-notification-content">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-text">
                <div class="achievement-title">Достижение разблокировано!</div>
                <div class="achievement-name">${achievement.name}</div>
            </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

function saveAchievements() {
    localStorage.setItem('island-achievements', JSON.stringify(achievements));
}

function loadAchievements() {
    const saved = localStorage.getItem('island-achievements');
    if (saved) {
        achievements = { ...achievements, ...JSON.parse(saved) };
    }
}

// Achievements Modal
function showAchievements() {
    const modal = document.getElementById('achievementsModal');
    const achievementsGrid = modal.querySelector('.achievements-grid');
    
    // Clear existing content
    achievementsGrid.innerHTML = '';
    
    // Populate achievements
    Object.keys(achievements).forEach(key => {
        const achievement = achievements[key];
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        achievementElement.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h3>${achievement.name}</h3>
                <p>${achievement.unlocked ? 'Разблокировано!' : 'Заблокировано'}</p>
            </div>
        `;
        achievementsGrid.appendChild(achievementElement);
    });
    
    // Show modal
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Mini Game - Resource Collection
function createMiniGame() {
    const resources = ['💎', '🌊', '🔥', '💨', '🌿', '⚡'];
    let collectedResources = 0;
    
    function spawnResource() {
        if (collectedResources >= 10) return;
        
        const resource = resources[Math.floor(Math.random() * resources.length)];
        const resourceElement = document.createElement('div');
        resourceElement.className = 'floating-resource';
        resourceElement.textContent = resource;
        resourceElement.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 100;
            animation: float 3s ease-in-out infinite;
            transition: transform 0.3s ease;
        `;
        
        resourceElement.addEventListener('click', function() {
            collectedResources++;
            this.style.transform = 'scale(0)';
            this.style.opacity = '0';
            
            // Show collection effect
            showCollectionEffect(this);
            
            setTimeout(() => {
                document.body.removeChild(this);
            }, 300);
            
            // Check for collection achievement
            if (collectedResources >= 5) {
                unlockAchievement('collector');
            }
        });
        
        document.body.appendChild(resourceElement);
        
        // Remove resource after 10 seconds if not collected
        setTimeout(() => {
            if (document.body.contains(resourceElement)) {
                resourceElement.style.opacity = '0';
                resourceElement.style.transform = 'scale(0)';
                setTimeout(() => {
                    if (document.body.contains(resourceElement)) {
                        document.body.removeChild(resourceElement);
                    }
                }, 300);
            }
        }, 10000);
    }
    
    // Spawn resources periodically
    setInterval(spawnResource, 5000);
    
    // Initial spawn
    for (let i = 0; i < 3; i++) {
        setTimeout(spawnResource, i * 1000);
    }
}

function showCollectionEffect(element) {
    const effect = document.createElement('div');
    effect.textContent = '+1';
    effect.style.cssText = `
        position: fixed;
        font-size: 1.2rem;
        font-weight: bold;
        color: #27ae60;
        pointer-events: none;
        z-index: 101;
        animation: floatUp 1s ease-out forwards;
    `;
    
    const rect = element.getBoundingClientRect();
    effect.style.left = rect.left + 'px';
    effect.style.top = rect.top + 'px';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 1000);
}

// Weather System
function setupWeatherSystem() {
    const weatherWidget = document.querySelector('.weather-widget');
    const weatherIcon = weatherWidget.querySelector('.weather-icon');
    const weatherTemp = weatherWidget.querySelector('.weather-temp');
    
    // Simulate weather changes
    const weatherConditions = [
        { icon: '☀️', temp: '+26°C', name: 'sunny' },
        { icon: '🌤️', temp: '+22°C', name: 'partly-cloudy' },
        { icon: '⛅', temp: '+20°C', name: 'cloudy' },
        { icon: '🌧️', temp: '+18°C', name: 'rainy' },
        { icon: '⛈️', temp: '+16°C', name: 'stormy' }
    ];
    
    let currentWeather = 0;
    
    function changeWeather() {
        currentWeather = (currentWeather + 1) % weatherConditions.length;
        const weather = weatherConditions[currentWeather];
        
        // Animate weather change
        weatherIcon.style.transform = 'scale(0)';
        weatherTemp.style.opacity = '0';
        
        setTimeout(() => {
            weatherIcon.textContent = weather.icon;
            weatherTemp.textContent = weather.temp;
            
            weatherIcon.style.transform = 'scale(1)';
            weatherTemp.style.opacity = '1';
        }, 300);
        
        // Change background based on weather
        updateBackgroundForWeather(weather.name);
    }
    
    // Change weather every 30 seconds
    setInterval(changeWeather, 30000);
    
    // Random initial weather
    setTimeout(() => {
        currentWeather = Math.floor(Math.random() * weatherConditions.length);
        const weather = weatherConditions[currentWeather];
        weatherIcon.textContent = weather.icon;
        weatherTemp.textContent = weather.temp;
        updateBackgroundForWeather(weather.name);
    }, 1000);
}

function updateBackgroundForWeather(weather) {
    const body = document.body;
    let gradient = '';
    
    switch(weather) {
        case 'sunny':
            gradient = 'linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #FFD700 100%)';
            break;
        case 'partly-cloudy':
            gradient = 'linear-gradient(135deg, #B0C4DE 0%, #87CEEB 50%, #F0E68C 100%)';
            break;
        case 'cloudy':
            gradient = 'linear-gradient(135deg, #778899 0%, #B0C4DE 50%, #D3D3D3 100%)';
            break;
        case 'rainy':
            gradient = 'linear-gradient(135deg, #4682B4 0%, #708090 50%, #A9A9A9 100%)';
            break;
        case 'stormy':
            gradient = 'linear-gradient(135deg, #2F4F4F 0%, #696969 50%, #808080 100%)';
            break;
        default:
            gradient = 'linear-gradient(135deg, var(--light-blue) 0%, #b2ebf2 50%, #80deea 100%)';
    }
    
    body.style.background = gradient;
}

// Performance Optimizations
function setupPerformanceOptimizations() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                // Handle scroll actions
            }, 100);
        }
    });
}

// Error Handling
function setupErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('🚨 Ошибка на острове:', e.error);
        // You can add error reporting here
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('🚨 Необработанный Promise:', e.reason);
    });
}

// Initialize additional systems
function initializeAdditionalSystems() {
    loadAchievements();
    setupWeatherSystem();
    setupPerformanceOptimizations();
    setupErrorHandling();
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showAchievements = showAchievements;
window.scrollToTop = scrollToTop;
window.toggleTheme = toggleTheme;

// Final initialization
setTimeout(initializeAdditionalSystems, 1000);
