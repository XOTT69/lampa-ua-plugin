(function() {
    'use strict';

    function addUAButton(object) {
        // Перевірка на дублікат
        if ($('.ua-hd-btn').length > 0) return;

        // Ручна верстка кнопки (100% працює всюди)
        var btn = $(`
            <div class="full-start__item full-start__item--ua selector focus ua-hd-btn" style="background: linear-gradient(90deg, #d32f2f 0%, #f44336 100%);">
                <div class="full-start__icon">
                    <svg viewBox="0 0 512 512" width="20" height="20" fill="#fff"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM128 256h256v64H128v-64zm0-128h256v64H128v-64z"/></svg>
                </div>
                <div class="full-start__title">UA HD FREE</div>
            </div>
        `);

        // Логіка кліку
        btn.on('hover:enter click', function() {
            var title = object.movie.title || object.card.title;
            var items = [
                {title: '🇺🇦 UAKino', url: 'https://uakino.cx/?s='},
                {title: '🇺🇦 UAFLIX', url: 'https://uafix.net/?s='},
                {title: '🇺🇦 UASerials', url: 'https://uaserials.com/?s='},
                {title: '🇺🇦 Takflix', url: 'https://takflix.com/uk/search?q='},
                {title: '🔥 Lumex HD', action: 'lumex'},
                {title: '🔥 RedHead HD', action: 'redhead'}
            ];

            Lampa.Select.show({
                title: 'UA HD: ' + title,
                items: items.map(s => ({
                    title: s.title,
                    action: () => {
                        if (s.action) Lampa.Source.get(s.action);
                        else Lampa.Browser.open({
                            url: s.url + encodeURIComponent(title),
                            title: s.title
                        });
                    }
                })),
                onBack: () => Lampa.Controller.toggle()
            });
        });

        // Вставка кнопки (всі можливі селектори)
        var container = $('.full-start__buttons');
        if (!container.length) container = $('.full-start-new__buttons');
        if (!container.length) container = $('.actions');

        if (container.length) {
            container.prepend(btn);
            console.log('🔥 UA Button INSERTED!');
            Lampa.Noty.show('🔥 UA HD додано!');
        } else {
            // Запасний план - просто в body, якщо контейнер не знайдено
             $('body').append(btn.css({position:'fixed', top:'50%', right:'0', zIndex:999}));
        }
    }

    // Слухаємо відкриття Full screen
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(() => addUAButton(e.data), 1000);
        }
    });
    
    // Резервний сканер
    setInterval(() => {
        if ($('.view--category_full').length && !$('.ua-hd-btn').length) {
             var active = Lampa.Activity.active().activity;
             if (active && (active.movie || active.card)) addUAButton(active);
        }
    }, 2000);

    console.log('🔥 UA Plugin V3 Ready');
})();
