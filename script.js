class CoordinateTracker {
    constructor() {
        this.coordNotification = document.getElementById('coord-notification');
        this.lastRightClickTime = 0;
        this.doubleClickDelay = 500; // ms
        this.objectData = {};
        
        this.init();
    }
    
    init() {
        // Отслеживаем правые клики
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const currentTime = new Date().getTime();
            
            if (currentTime - this.lastRightClickTime < this.doubleClickDelay) {
                // Двойной правый клик
                this.handleDoubleRightClick(e);
                this.lastRightClickTime = 0;
            } else {
                this.lastRightClickTime = currentTime;
            }
        });
        
        // Инициализируем данные объектов
        this.initObjectData();
    }
    
    initObjectData() {
        // Собираем информацию обо всех объектах с data-object атрибутом
        const objects = document.querySelectorAll('[data-object]');
        objects.forEach(obj => {
            const objectName = obj.getAttribute('data-object');
            const rect = obj.getBoundingClientRect();
            
            this.objectData[objectName] = {
                element: obj,
                description: this.getObjectDescription(objectName),
                selectors: this.getElementSelectors(obj),
                position: {
                    x: Math.round(rect.left + window.scrollX),
                    y: Math.round(rect.top + window.scrollY)
                },
                size: {
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                }
            };
        });
    }
    
    getObjectDescription(objectName) {
        const descriptions = {
            'html-tool': 'Инструмент HTML/CSS - строительные материалы для убежища',
            'js-tool': 'Инструмент JavaScript - магия, оживляющая остров',
            'git-tool': 'Инструмент Git - карта всех открытий',
            'python-tool': 'Инструмент Python - верный помощник в исследованиях',
            'first-log': 'Первая запись в логе - инициализация репозитория',
            'second-log': 'Вторая запись в логе - построение первой хижины',
            'third-log': 'Третья запись в логе - добавление системы координат',
            'contact-bottle': 'Бутылка с посланием - контактная информация'
        };
        
        return descriptions[objectName] || `Объект: ${objectName}`;
    }
    
    getElementSelectors(element) {
        const selectors = [];
        
        // ID
        if (element.id) {
            selectors.push(`#${element.id}`);
        }
        
        // Классы
        if (element.className && typeof element.className === 'string') {
            const classes = element.className.split(' ').filter(c => c);
            if (classes.length > 0) {
                selectors.push(`.${classes.join('.')}`);
            }
        }
        
        // Тег
        selectors.push(element.tagName.toLowerCase());
        
        // Data-атрибут
        if (element.hasAttribute('data-object')) {
            selectors.push(`[data-object="${element.getAttribute('data-object')}"]`);
        }
        
        return selectors;
    }
    
    handleDoubleRightClick(event) {
        const clickX = event.clientX + window.scrollX;
        const clickY = event.clientY + window.scrollY;
        
        // Находим объект под курсором
        const targetObject = this.findObjectAtCoordinates(clickX, clickY);
        
        // Создаем данные для копирования
        const coordData = this.createCoordinateData(clickX, clickY, targetObject);
        
        // Копируем в буфер обмена
        this.copyToClipboard(coordData.formatted);
        
        // Показываем уведомление
        this.showNotification(coordData);
    }
    
    findObjectAtCoordinates(x, y) {
        // Ищем объекты с data-object атрибутом, содержащие данные координаты
        for (const [objectName, data] of Object.entries(this.objectData)) {
            const rect = data.element.getBoundingClientRect();
            const absoluteRect = {
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY,
                right: rect.right + window.scrollX,
                bottom: rect.bottom + window.scrollY
            };
            
            if (x >= absoluteRect.left && x <= absoluteRect.right &&
                y >= absoluteRect.top && y <= absoluteRect.bottom) {
                return { name: objectName, data: data };
            }
        }
        
        return null;
    }
    
    createCoordinateData(x, y, targetObject) {
        const data = {
            coordinates: { x, y },
            timestamp: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                scrollX: window.scrollX,
                scrollY: window.scrollY
            },
            targetObject: null
        };
        
        if (targetObject) {
            data.targetObject = {
                name: targetObject.name,
                description: targetObject.data.description,
                selectors: targetObject.data.selectors,
                position: targetObject.data.position,
                size: targetObject.data.size
            };
        }
        
        // Форматируем для отображения и копирования
        data.formatted = this.formatCoordinateData(data);
        
        return data;
    }
    
    formatCoordinateData(data) {
        let formatted = `Координаты: X=${data.coordinates.x}, Y=${data.coordinates.y}\n`;
        formatted += `Время: ${new Date(data.timestamp).toLocaleString('ru-RU')}\n`;
        formatted += `Размер окна: ${data.viewport.width}x${data.viewport.height}\n`;
        formatted += `Прокрутка: X=${data.viewport.scrollX}, Y=${data.viewport.scrollY}\n`;
        
        if (data.targetObject) {
            formatted += `\n--- ОБЪЕКТ ---\n`;
            formatted += `Название: ${data.targetObject.name}\n`;
            formatted += `Описание: ${data.targetObject.description}\n`;
            formatted += `Позиция: X=${data.targetObject.position.x}, Y=${data.targetObject.position.y}\n`;
            formatted += `Размер: ${data.targetObject.size.width}x${data.targetObject.size.height}\n`;
            formatted += `Селекторы: ${data.targetObject.selectors.join(' > ')}\n`;
        } else {
            formatted += `\nОбъект: фон/пустая область\n`;
        }
        
        return formatted;
    }
    
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        }
    }
    
    showNotification(coordData) {
        let notificationText = `✅ Скопировано!\nКоординаты: X=${coordData.coordinates.x}, Y=${coordData.coordinates.y}`;
        
        if (coordData.targetObject) {
            notificationText += `\nОбъект: ${coordData.targetObject.description}`;
        }
        
        this.coordNotification.textContent = notificationText;
        this.coordNotification.classList.add('show');
        
        setTimeout(() => {
            this.coordNotification.classList.remove('show');
        }, 4000);
    }
    
    // Метод для получения информации по координатам (для отладки)
    getObjectInfoByCoordinates(x, y) {
        return this.findObjectAtCoordinates(x, y);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new CoordinateTracker();
    
    // Делаем tracker глобальным для отладки
    window.coordTracker = tracker;
    
    console.log('Система координат активирована!');
    console.log('Двойной правый клик для копирования координат и информации об объектах');
});

// Плавная прокрутка для навигации
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
