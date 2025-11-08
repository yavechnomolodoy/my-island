// Чистый JavaScript с анимациями для острова-убежища

// Ждем полной загрузки DOM перед выполнением скриптов
document.addEventListener('DOMContentLoaded', function() {
    // Логируем сообщение о успешной загрузке в консоль
    console.log('🏝️ Остров-убежище загружен! 8 ноября 2025');
    
    // ===== ФУНКЦИЯ ДЛЯ АНИМАЦИЙ ПРИ СКРОЛЛЕ =====
    function setupScrollAnimations() {
        // Находим все элементы, которые нужно анимировать при появлении в viewport
        const animatedElements = document.querySelectorAll(
            '.tool-item, .content-box, .log-entry, .message-bottle, .section h2, .footer'
        );
        
        // Создаем Intersection Observer для отслеживания появления элементов в viewport
        const observer = new IntersectionObserver((entries) => {
            // Для каждой записи (элемента) в observer
            entries.forEach(entry => {
                // Если элемент видим в viewport
                if (entry.isIntersecting) {
                    // Добавляем класс для запуска анимации
                    entry.target.classList.add('animate-in');
                    // Прекращаем наблюдение за элементом после анимации
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,     // Срабатывает когда 10% элемента видно
            rootMargin: '50px'  // Добавляем запас в 50px вокруг viewport
        });

        // Начинаем наблюдение за каждым анимируемым элементом
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ===== ФУНКЦИОНАЛ КОПИРОВАНИЯ EMAIL =====
    // Находим элементы для работы с email
    const emailText = document.getElementById('email-text');
    const emailNotification = document.getElementById('email-notification');
    
    // Если элемент email существует (проверка на случай ошибки)
    if (emailText) {
        // Добавляем обработчик клика на email
        emailText.addEventListener('click', async function() {
            // Получаем email из data-атрибута
            const email = this.getAttribute('data-email');
            try {
                // Пытаемся использовать современный Clipboard API
                await navigator.clipboard.writeText(email);
                // Если успешно, показываем уведомление
                if (emailNotification) {
                    emailNotification.classList.add('show');
                    // Убираем уведомление через 2 секунды
                    setTimeout(() => {
                        emailNotification.classList.remove('show');
                    }, 2000);
                }
            } catch (err) {
                // Fallback для старых браузеров, которые не поддерживают Clipboard API
                // Создаем временный textarea для копирования
                const textArea = document.createElement('textarea');
                textArea.value = email;
                // Добавляем в DOM (обязательно для некоторых браузеров)
                document.body.appendChild(textArea);
                // Выделяем текст
                textArea.select();
                // Копируем с помощью устаревшего метода
                document.execCommand('copy');
                // Удаляем временный элемент
                document.body.removeChild(textArea);
                // Показываем уведомление об успешном копировании
                if (emailNotification) {
                    emailNotification.classList.add('show');
                    setTimeout(() => {
                        emailNotification.classList.remove('show');
                    }, 2000);
                }
            }
        });
    }
    
    // ===== ИНТЕРАКТИВНОСТЬ ИНСТРУМЕНТОВ =====
    // Добавляем обработчики клика на все карточки инструментов
    document.querySelectorAll('.tool-item').forEach(tool => {
        tool.addEventListener('click', function() {
            // Получаем название инструмента из заголовка
            const toolName = this.querySelector('h3').textContent;
            // Логируем выбор инструмента в консоль
            console.log(`Выбран инструмент: ${toolName}`);
        });
    });
    
    // ===== ИНТЕРАКТИВНОСТЬ ЛОГА МЫСЛЕЙ =====
    // Добавляем обработчики клика на все записи лога
    document.querySelectorAll('.log-entry').forEach(entry => {
        entry.addEventListener('click', function() {
            // Получаем дату и сообщение из записи
            const date = this.querySelector('.log-date').textContent;
            const message = this.querySelector('.log-message').textContent;
            // Логируем полную запись в консоль
            console.log(`${date}: ${message}`);
        });
    });
    
    // ===== ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК =====
    // Обработчик кликов по всем ссылкам, которые начинаются с #
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            // Предотвращаем стандартное поведение ссылки
            e.preventDefault();
            // Получаем ID целевого элемента из href
            const targetId = e.target.getAttribute('href');
            // Находим целевой элемент в DOM
            const targetElement = document.querySelector(targetId);
            // Если элемент найден, плавно прокручиваем к нему
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Плавная прокрутка
                    block: 'start'      // Выравнивание по верху viewport
                });
            }
        }
    });

    // ===== ЗАПУСК ВСЕХ АНИМАЦИЙ =====
    // Вызываем функцию настройки анимаций при скролле
    setupScrollAnimations();
});
