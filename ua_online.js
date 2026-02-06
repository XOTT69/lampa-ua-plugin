(function() {
    'use strict';

    function openUA(item, title) {
        Lampa.Controller.toggle('content');

        if (item.action === 'lumex' || item.action === 'redhead') {
            // ВІДКРИВАЄМО РІДНИЙ ПАРСЕР (Lumex/RedHead)
            var source = Lampa.Source.get(item.action);
            if (source) {
                Lampa.Activity.push({
                    url: '',
                    title: 'Пошук: ' + title,
                    component: 'online_view',
                    search: title,
                    source: item.action,
                    page: 1
                });
            } else {
                Lampa.Noty.show('❌ Увімкни Lumex в Online_Mod!');
            }
        } else {
            // ВІДКРИВАЄМО ЯК IFRAME (через вбудований плеєр-контейнер)
            // Це прибирає панелі браузера і робить вигляд "як в додатку"
            Lampa.Component.add('ua_iframe', {
                url: item.url + encodeURIComponent(title),
                title: title,
                component: 'web', // Або 'iframe' якщо підтримується
                onBack: () => Lampa.Activity.back()
            });
            
            Lampa.Activity.push({
                url: item.url + encodeURIComponent(title),
                title: item.title,
                component: 'web', // Використовуємо web компонент як контейнер
                page: 1
            });
        }
    }

    function addUAButton(object) {
        if ($('.ua-compact-btn').length > 0) return;

        var btn = $(`
            <div class="full-start__item full-start__item--ua selector focus ua-compact-btn" style="width: auto; min-width: 100px;">
                <div class="full-start__icon" style="background: linear-gradient(45deg, #d32f2f, #f44336); border-radius: 50%; padding: 5px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    <svg viewBox="0 0 512 512" width="20" height="20" fill="#fff"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v256c0 10.9 12.9 16.5 20.7 9.1l172-127.1c8-6.1 8-18.1 0-24.2l-172-127.1c-8-7.5-20.7-1.9-20.7 9.1z"/></svg>
                </div>
                <div class="full-start__title">UA HD</div>
            </div>
        `);

        btn.on('click', function() {
            var title = (object.movie.title || object.card.title || '').trim();
            
            var items = [
                {title: '🔥 Lumex HD (Плеєр)', action: 'lumex'},
                {title: '🔥 RedHead HD (Плеєр)', action: 'redhead'},
                {title: '🇺🇦 UAKino (Iframe)', url: 'https://uakino.cx/?s='},
                {title: '🇺🇦 UAFLIX (Iframe)', url: 'https://uafix.net/?s='},
                {title: '🇺🇦 UASerials (Iframe)', url: 'https://uaserials.com/?s='},
                {title: '🇺🇦 Takflix (Iframe)', url: 'https://takflix.com/uk/search?q='}
            ];

            Lampa.Select.show({
                title: 'UA HD: ' + title,
                items: items,
                onSelect: (a) => openUA(a, title),
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
