(function() {
    'use strict';

    // Функція відкриття плеєра (спроба парсингу)
    function playStream(url, title) {
        var network = new Lampa.Reguest();
        Lampa.Noty.show('⏳ Шукаю плеєр...');
        
        // Тут ми просто відкриваємо сторінку у Web-режимі Лампи (найстабільніше для MSX)
        // Бо парсити кожен сайт окремо - це 1000 строк коду
        Lampa.Component.add('ua_web_player', {
            url: url,
            title: title,
            component: 'web_player', // Використовуємо вбудований браузер-плеєр
            onBack: () => Lampa.Controller.toggle('full')
        });
        Lampa.Activity.push({
            url: url,
            title: title,
            component: 'web', // Відкриває сайт всередині Лампи (не викидає)
            page: 1
        });
    }

    function addUAButton(object) {
        if ($('.ua-compact-btn').length > 0) return;

        // Кнопка (твоя гарна версія)
        var btn = $(`
            <div class="full-start__item full-start__item--ua selector focus ua-compact-btn" style="width: auto; min-width: 100px;">
                <div class="full-start__icon" style="background: linear-gradient(45deg, #ff4757, #ff6b7a); border-radius: 50%; padding: 5px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <svg viewBox="0 0 512 512" width="20" height="20" fill="#fff"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v256c0 10.9 12.9 16.5 20.7 9.1l172-127.1c8-6.1 8-18.1 0-24.2l-172-127.1c-8-7.5-20.7-1.9-20.7 9.1z"/></svg>
                </div>
                <div class="full-start__title">UA HD</div>
            </div>
        `);

        btn.on('hover:enter click', function() {
            var title = (object.movie.title || object.card.title || '').trim();
            var query = encodeURIComponent(title);
            
            var items = [
                {title: 'UAKino (Вбудовано)', url: 'https://uakino.cx/?s=' + query, mode: 'web'},
                {title: 'UAFLIX (Вбудовано)', url: 'https://uafix.net/?s=' + query, mode: 'web'},
                {title: 'UASerials (Вбудовано)', url: 'https://uaserials.com/?s=' + query, mode: 'web'},
                {title: 'Takflix (Браузер)', url: 'https://takflix.com/uk/search?q=' + query, mode: 'link'},
                {title: '🔥 Lumex HD (Плеєр)', action: 'lumex'},
                {title: '🔥 RedHead HD (Плеєр)', action: 'redhead'}
            ];

            Lampa.Select.show({
                title: 'UA HD: ' + title,
                items: items.map(s => ({
                    title: s.title,
                    action: () => {
                        if (s.action) {
                            Lampa.Controller.toggle('content');
                            Lampa.Source.get(s.action); // Відкриває рідний парсер
                        } else if (s.mode === 'web') {
                            // Відкриваємо сайт ВСЕРЕДИНІ Лампи (Web Component)
                            Lampa.Activity.push({
                                url: s.url,
                                title: s.title,
                                component: 'web',
                                page: 1
                            });
                        } else {
                            // Для Takflix - зовнішній браузер (надійніше)
                            if (typeof Lampa.Android !== 'undefined') Lampa.Android.open(s.url);
                            else window.open(s.url, '_blank');
                        }
                    }
                })),
                onBack: () => Lampa.Controller.toggle('full')
            });
        });

        var container = $('.full-start__buttons');
        if (!container.length) container = $('.full-start-new__buttons');
        if (container.length) container.prepend(btn);
    }

    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(() => addUAButton(e.data), 1000);
        }
    });
})();
