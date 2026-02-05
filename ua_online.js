(function () {
    'use strict';

    if (window.ua_online_msx) return;
    window.ua_online_msx = true;

    var settings = {
        name: 'UA Online',
        icon: '<svg viewBox="0 0 512 512" width="24" height="24"><rect width="512" height="512" rx="60" fill="#ff4757"/><path d="M150 350 L256 150 L362 350" stroke="white" stroke-width="40" fill="none"/></svg>',
        sources: [
            { title: 'UAKino', url: 'https://uakino.cx/?s=' },
            { title: 'UAFLIX', url: 'https://uafix.net/?s=' },
            { title: 'Kinoukr', url: 'https://kinoukr.tv/search/?story=' },
            { title: 'UASerials', url: 'https://uaserials.com/?s=' }
        ]
    };

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    function waitMenu() {
        var list = document.querySelector('.menu .menu__list');
        if (!list) return setTimeout(waitMenu, 800);

        if (document.querySelector('[data-action="ua_mod"]')) return;

        var item = document.createElement('div');
        item.className = 'menu__item selector';
        item.setAttribute('data-action', 'ua_mod');
        item.innerHTML =
            '<div class="menu__ico">' + settings.icon + '</div>' +
            '<div class="menu__text">' + settings.name + '</div>';

        item.addEventListener('click', function () {
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
                            title: src.title
                        });
                    });
                }
            });
        });

        var search = document.querySelector('[data-action="search"]');
        if (search && search.parentNode) search.parentNode.insertBefore(item, search.nextSibling);
        else list.appendChild(item);
    }

    function hookCard() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type !== 'complete') return;
            if (document.querySelector('.ua-online-btn')) return;

            var box = document.querySelector('.full-start__buttons');
            if (!box) return;

            var title = (e.data.movie && e.data.movie.title) || (e.data.card && e.data.card.title) || '';

            var btn = Lampa.Template.get('button', {
                title: 'UA Online',
                description: 'Пошук українською',
                icon: settings.icon
            });

            btn.classList.add('ua-online-btn');

            btn.addEventListener('click', function () {
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

            box.appendChild(btn);
        });
    }

    ready(function () {
        if (!window.Lampa) return;

        waitMenu();
        hookCard();

        setTimeout(function () {
            Lampa.Noty.show('UA Online MSX готовий');
        }, 1500);
    });

})();
