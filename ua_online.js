(function() {
    'use strict';

    function addUAButton(object) {
        // Перевіряємо, чи вже є кнопка
        if ($('.ua-hd-btn').length > 0) return;

        // Створюємо кнопку через Lampa Template (щоб була як рідна)
        var btn = Lampa.Template.get('button', {
            title: 'UA HD',
            icon: '<svg viewBox="0 0 512 512" style="fill:#fff"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zM128 256h256v64H128v-64zm0-128h256v64H128v-64z"/></svg>', // Іконка прапора/плей
            url: ''
        });

        // Стилізуємо (червоний фон)
        btn.addClass('ua-hd-btn');
        btn.css({
            'background': 'linear-gradient(45deg, #ff4757, #ff6b7a)',
            'border': 'none'
        });
        
        // Додаємо текст "UA HD"
        btn.append('<div style="margin-left:10px; font-weight:bold;">UA HD</div>');

        // Клік
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

        // ДОДАЄМО В КНОПКИ (найкраще місце для MSX)
        var container = $('.full-start__buttons'); // Стандарт
        if (!container.length) container = $('.view--category_full .full-start__buttons'); // Альтернатива
        if (!container.length) container = $('.full-start-new__buttons'); // Новий інтерфейс
        if (!container.length) container = $('.actions'); // Запасний (MSX часто тут)

        if (container.length) {
            container.prepend(btn); // Ставимо ПЕРШОЮ
            console.log('🔥 UA Button added to:', container);
            Lampa.Noty.show('🔥 UA HD додано!');
        }
    }

    // Слухаємо відкриття Full screen
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(() => addUAButton(e.data), 1000); // 1 сек затримки щоб DOM завантажився
        }
    });
    
    // Запасний сканер (якщо Listener пропустить)
    setInterval(() => {
        if ($('.view--category_full').length && !$('.ua-hd-btn').length) {
            var data = Lampa.Activity.active().activity; 
            if (data && (data.movie || data.card)) addUAButton(data);
        }
    }, 2000);

    console.log('🔥 UA Plugin Ready');
})();
