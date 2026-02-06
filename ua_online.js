(function() {
    'use strict';

    function addUAButton(object) {
        if ($('.ua-hd-btn').length > 0) return;

        // Рідна кнопка без стилів (як інші)
        var btn = $('<div class="selector focus ua-hd-btn full-start__item"><div class="full-start__title">UA HD</div></div>');

        // Обробник кліку ФІКС
        btn.on('hover:enter', function() {
            var title = object.movie.title || object.card.title || 'Фільм';
            
            var items = [
                {title: '🇺🇦 UAKino', url: 'https://uakino.cx/?s=' + encodeURIComponent(title)},
                {title: '🇺🇦 UAFLIX', url: 'https://uafix.net/?s=' + encodeURIComponent(title)},
                {title: '🇺🇦 UASerials', url: 'https://uaserials.com/?s=' + encodeURIComponent(title)},
                {title: '🇺🇦 Takflix', url: 'https://takflix.com/uk/search?q=' + encodeURIComponent(title)}
            ];

            Lampa.Select.show({
                title: 'UA HD: ' + title,
                items: items.map(item => ({
                    title: item.title,
                    one_line: true,
                    action: function() {
                        Lampa.Browser.open({
                            url: item.url,
                            title: item.title,
                            from: 'ua_hd'
                        });
                    }
                })),
                onBack: function() {
                    Lampa.Controller.toggle('full');
                }
            });
        });

        // Знаходимо контейнер кнопок
        var container = $('.full-start__buttons');
        if (container.length === 0) container = $('.actions');
        
        if (container.length > 0) {
            container.append(btn);
            Lampa.Noty.show('🔥 UA HD готова!');
        }
    }

    // Основний listener
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(function() {
                addUAButton(e.data);
            }, 800);
        }
    });

})();
