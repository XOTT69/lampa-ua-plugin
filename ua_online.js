(function() {
    'use strict';

    // 1. Налаштування: Твої сайти і Іконка
    var settings = {
        name: 'UA Online',
        icon: '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#FF4757"/><text x="50" y="65" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">HOT</text></svg>',
        sources: [
            {title: 'UAKino',    url: 'https://uakino.cx/?s='},
            {title: 'UAFLIX',    url: 'https://uafix.net/?s='},
            {title: 'Kinoukr',   url: 'https://kinoukr.tv/search/?story='},
            {title: 'UASerials', url: 'https://uaserials.com/?s='},
            {title: 'AniTube',   url: 'https://anitube.in.ua/search/?q='}
        ]
    };

    // 2. Логіка відкриття (як в моді)
    function openSource(item, query) {
        Lampa.Browser.open({
            url: item.url + encodeURIComponent(query),
            title: item.title + ': ' + query
        });
    }

    function showSourcesMenu(title) {
        var items = settings.sources.map(function(item) {
            return {
                title: item.title,
                subtitle: 'Пошук на ' + item.title,
                url: item.url,
                icon: settings.icon
            };
        });

        Lampa.Select.show({
            title: 'Вибери джерело для: ' + title,
            items: items,
            onSelect: function(a) {
                openSource(a, title);
            }
        });
    }

    // 3. Кнопка на екрані фільму (Full)
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            var title = e.data.movie.title || e.data.card.title;
            
            var btn = Lampa.Template.get('button', {
                title: 'UA Online',
                description: 'Дивитись українською',
                icon: settings.icon
            });

            // Стиль кнопки щоб виділялась
            btn.css({
                'background': 'linear-gradient(90deg, #ff4757 0%, #ff6b81 100%)',
                'border': 'none'
            });

            btn.on('hover:enter', function() {
                showSourcesMenu(title);
            });

            // Вставляємо кнопку
            if ($('.full-start__buttons').length) {
                $('.full-start__buttons').prepend(btn); // Ставимо ПЕРШОЮ
            } else {
                $('.view--category_full').find('.view__body').prepend(btn);
            }
        }
    });

    // 4. Меню зліва (Спеціально для MSX)
    function addMenu() {
        // Видаляємо старе якщо є, щоб не дублювати
        $('.menu__item[data-action="ua_mod"]').remove();

        var item = $(
            '<div class="menu__item selector" data-action="ua_mod">' +
                '<div class="menu__ico" style="width:32px; height:32px; margin-right:10px;">' + settings.icon + '</div>' +
                '<div class="menu__text">' + settings.name + '</div>' +
            '</div>'
        );

        item.on('hover:enter', function() {
            Lampa.Input.edit({
                title: 'UA Online Пошук',
                value: '',
                free: true,
                nosave: true
            }, function(newQuery) {
                if (newQuery) showSourcesMenu(newQuery);
            });
        });

        // Шукаємо куди вставити (під Пошук або Головну)
        var place = $('.menu .menu__list .menu__item').eq(1); // Другий пункт
        if (place.length) {
            place.after(item);
        } else {
            // Фолбек для MSX якщо меню ще не прогрузилось
            $('.menu .menu__list').append(item);
        }
    }

    // 5. Запуск (агресивно для MSX)
    if (window.appready) addMenu();
    
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') addMenu();
    });

    // Постійна перевірка для MSX (бо воно часто перемальовує меню)
    setInterval(function() {
        if (!$('.menu__item[data-action="ua_mod"]').length && $('.menu__list').length) {
            addMenu();
        }
    }, 2000);

    Lampa.Noty.show('🇺🇦 UA MOD активовано');

})();
