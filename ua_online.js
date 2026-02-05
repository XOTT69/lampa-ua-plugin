(function() {
    'use strict';

    // Унікальний ID для уникнення конфліктів
    var PLUGIN_ID = 'ua_online_plugin_v2';

    // Якщо плагін вже завантажено - виходимо
    if (window[PLUGIN_ID]) return;
    window[PLUGIN_ID] = true;

    var settings = {
        name: 'UA Online',
        // Проста іконка без складних SVG (безпечніше для старих TV)
        icon: '<svg viewBox="0 0 512 512" fill="#fff" width="24" height="24"><rect width="512" height="512" rx="60" fill="#ff4757"/><path d="M150 350 L256 150 L362 350" stroke="white" stroke-width="40" fill="none"/></svg>', 
        sources: [
            {title: 'UAKino',    url: 'https://uakino.cx/?s='},
            {title: 'UAFLIX',    url: 'https://uafix.net/?s='},
            {title: 'Kinoukr',   url: 'https://kinoukr.tv/search/?story='},
            {title: 'UASerials', url: 'https://uaserials.com/?s='}
        ]
    };

    function startPlugin() {
        // 1. Додаємо в МЕНЮ (Безпечно, тільки додавання)
        function addMenu() {
            if ($('.menu__item[data-action="ua_mod"]').length) return; // Вже є

            var item = $(
                '<div class="menu__item selector" data-action="ua_mod">' +
                    '<div class="menu__ico">' + settings.icon + '</div>' +
                    '<div class="menu__text">' + settings.name + '</div>' +
                '</div>'
            );

            item.on('hover:enter', function() {
                Lampa.Select.show({
                    title: 'UA Online: Оберіть сайт',
                    items: settings.sources,
                    onSelect: function(src) {
                        Lampa.Input.edit({
                            title: 'Пошук на ' + src.title,
                            value: '',
                            free: true,
                            nosave: true
                        }, function(query) {
                            if (query) Lampa.Browser.open({
                                url: src.url + encodeURIComponent(query),
                                title: src.title + ': ' + query
                            });
                        });
                    }
                });
            });

            // Вставляємо акуратно після Пошуку
            var searchItem = $('.menu .menu__list .menu__item[data-action="search"]');
            if (searchItem.length) {
                searchItem.after(item);
            } else {
                $('.menu .menu__list').eq(0).append(item);
            }
        }

        // 2. Додаємо КНОПКУ на екран (Безпечно)
        Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
                var title = e.data.movie.title || e.data.card.title;
                var btn = Lampa.Template.get('button', {
                    title: 'UA Online',
                    description: 'Пошук українською',
                    icon: settings.icon
                });

                btn.on('hover:enter', function() {
                    Lampa.Input.edit({
                        title: 'Пошук UA',
                        value: title,
                        free: true,
                        nosave: true
                    }, function(query) {
                        Lampa.Select.show({
                            title: 'Де шукати?',
                            items: settings.sources,
                            onSelect: function(src) {
                                Lampa.Browser.open({
                                    url: src.url + encodeURIComponent(query),
                                    title: src.title
                                });
                            }
                        });
                    });
                });

                // Тільки додаємо, нічого не видаляємо
                $('.full-start__buttons').append(btn);
            }
        });

        // Запуск меню
        if (window.appready) addMenu();
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addMenu();
        });
        
        // Перестраховка для MSX (через 3 сек)
        setTimeout(addMenu, 3000);
    }

    // Безпечний старт
    if (!window.Lampa) {
        // Якщо Lampa ще не завантажена (рідкісний кейс)
        console.error('Lampa not found');
    } else {
        startPlugin();
        setTimeout(function(){
             Lampa.Noty.show('UA Online V2 готовий');
        }, 2000);
    }

})();
