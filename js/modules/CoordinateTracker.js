class CoordinateTracker {
    constructor(notifications) {
        this.notifications = notifications;
        this.lastRightClickTime = 0;
        this.objectData = {};
        
        this.init();
    }
    
    init() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const currentTime = new Date().getTime();
            
            if (currentTime - this.lastRightClickTime < CONFIG.TIMING.DOUBLE_CLICK_DELAY) {
                this.handleDoubleRightClick(e);
                this.lastRightClickTime = 0;
            } else {
                this.lastRightClickTime = currentTime;
            }
        });
        
        this.initObjectData();
    }
    
    handleDoubleRightClick(event) {
        const clickX = event.clientX + window.scrollX;
        const clickY = event.clientY + window.scrollY;
        const targetObject = this.findObjectAtCoordinates(clickX, clickY);
        const coordData = this.createCoordinateData(clickX, clickY, targetObject);
        
        this.copyToClipboard(coordData.formatted);
        this.notifications.show('Координаты скопированы!');
    }
    
    findObjectAtCoordinates(x, y) {
        const objects = document.querySelectorAll('[data-object]');
        
        for (const obj of objects) {
            const rect = obj.getBoundingClientRect();
            const absoluteRect = {
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY,
                right: rect.right + window.scrollX,
                bottom: rect.bottom + window.scrollY
            };
            
            if (x >= absoluteRect.left && x <= absoluteRect.right &&
                y >= absoluteRect.top && y <= absoluteRect.bottom) {
                return {
                    name: obj.getAttribute('data-object'),
                    element: obj,
                    description: this.getObjectDescription(obj.getAttribute('data-object'))
                };
            }
        }
        
        return null;
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
                description: targetObject.description
            };
        }
        
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
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            return success;
        }
    }
    
    initObjectData() {
        console.log('🗺️ Система координат активирована');
    }
}
