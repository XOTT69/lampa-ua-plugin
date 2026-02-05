(function () {
    'use strict';

    if (window.ua_online_msx_v4) return;
    window.ua_online_msx_v4 = true;

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

    function addButtonToCard() {
        var box = document.querySelector('.full-start__buttons');
        if (!box) return;

        if (box.querySelector('.ua-online-btn')) return;

        var titleEl = document.querySelector('.full__title');
        var title = titleEl ? titleEl.textContent : '';

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
    }

    function watchCard() {
        setInterval(addButtonToCard, 1000);
    }

    function addMenu() {
        var list = document.querySelector('.menu .menu__list');
        if (!list) return setTimeout(addMenu, 1000);

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

        list.appendChild(item);
    }

    function start() {
        if (!window.Lampa) return;

        addMenu();
        watchCard();

        setTimeout(function () {
            Lampa.Noty.show('UA Online готовий');
        }, 1500);
    }

    if (document.readyState !== 'loading') start();
    else document.addEventListener('DOMContentLoaded', start);

})();
