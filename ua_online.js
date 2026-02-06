(function() {
    'use strict';

    function addUAButton(object) {
        if ($('.ua-compact-btn').length > 0) return;

        // Компактна кнопка (стиль як у Трейлер)
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
            var items = [
                {title: 'UAKino', url: 'https://uakino.cx/?s='},
                {title: 'UAFLIX', url: 'https://uafix.net/?s='},
                {title: 'UASerials', url: 'https://uaserials.com/?s='},
                {title: 'Takflix', url: 'https://takflix.com/uk/search?q='},
                {title: 'Lumex HD', action: 'lumex'},
                {title: 'RedHead HD', action: 'redhead'}
            ];

            Lampa.Select.show({
                title: 'UA HD: ' + title,
                items: items.map(s => ({
                    title: s.title,
                    action: () => {
                        if (s.action) {
                            Lampa.Controller.toggle('content'); 
                            Lampa.Source.get(s.action);
                        } else {
                            var url = s.url + encodeURIComponent(title);
                            // Універсальний відкривач для MSX/Browser
                            if (typeof Lampa.Android !== 'undefined') Lampa.Android.open(url);
                            else window.open(url, '_blank');
                        }
                    }
                })),
                onBack: () => Lampa.Controller.toggle('full')
            });
        });

        // Вставка (тільки в кнопки)
        var container = $('.full-start__buttons');
        if (!container.length) container = $('.full-start-new__buttons');
        
        if (container.length) {
            container.prepend(btn);
        }
    }

    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(() => addUAButton(e.data), 1000);
        }
    });

    console.log('🔥 UA Compact v4 Ready');
})();

