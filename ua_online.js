(function () {
    'use strict';

    // Захист від повторного запуску (безпечний для Lampa)
    if (window.ua_online_loaded) return;
    window.ua_online_loaded = true;

    var settings = {
        name: 'UA Online',
        icon: '<svg viewBox="0 0 512 512" fill="#fff" width="24" height="24"><rect width="512" height="512" rx="60" fill="#ff4757"/><path d="M150 350 L256 150 L362 350" stroke="white" stroke-width="40" fill="none"/></svg>',
        sources: [
            { title: 'UAKino', url: 'https://uakino.cx/?s=' },
            { title: 'UAFLIX', url: 'https://uafix.net/?s=' },
            { title: 'Kinoukr', url: 'https://kinoukr.tv/search/?story=' },
            { title: 'UASerials', url: 'https://uaserials.com/?s=' }
        ]
    };

    function startPlugin() {

        // ===== MENU =====
        function addMenu() {
            if ($('.menu__item[data-action="ua_mod"]').length) return;

            var item = $(
                '<div class="menu__item selector" data-action="ua_mod">' +
                '<div class="menu__ico">' + settings.icon + '</div>' +
                '<div class="menu__text">' + settings.name + '</div>' +
                '</div>'
            );

            item.on('hover:click', function () {
                Lampa.Select.show({
                    title: 'UA Online',
                    items: settings.sources,
                    onSelect: function (src) {
                        Lampa.Input.edit({
                            title: 'Пошук на ' + src.title,
                            value: '',
                            free: true,
                            nosave: true
                        }, function (query) {
                            if (!query) return;

                            Lampa.Browser.open({
                                url: src.url + encodeURIComponent(query),
                                title: src.title + ': ' + query
                            });
                        });
                    }
                });
            });

            var searchItem = $('.menu .menu__list .menu__item[data-action="search"]');

            if (searchItem.length) searchItem.after(item);
            else $('.menu .menu__list').eq(0).append(item);
        }

        // ===== BUTTON IN CARD =====
        Lampa.Listener.follow('full', function (e) {
            if (e.type !== 'complete') return;

            if ($('.ua-online-btn').length) return;

            var title = (e.data.movie && e.data.movie.title) || (e.data.card && e.data.card.title) || '';

            var btn = Lampa.Template.get('button', {
                title: 'UA Online',
                description: 'Пошук українською',
                icon: settings.icon
            }).addClass('ua-online-btn');

            btn.on('hover:click', function () {
                Lampa.Input.edit({
                    title: 'Пошук UA',
                    value: title,
                    free: true,
                    nosave: true
                }, function (query) {
                    if (!query) return;

                    Lampa.Select.show({
                        title: 'Де шукати?',
                        items: settings.sources,
                        onSelect: function (src) {
                            Lampa.Browser.open({
                                url: src.url + encodeURIComponent(query),
                                title: src.title
                            });
                        }
                    });
                });
            });

            $('.full-start__buttons').append(btn);
        });

        if (window.appready) addMenu();

        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') addMenu();
        });

        setTimeout(addMenu, 3000);
    }

    if (window.Lampa) {
        startPlugin();
        setTimeout(function () {
            Lampa.Noty.show('UA Online готовий');
        }, 1500);
    } else {
        console.error('Lampa not found');
    }

})();
