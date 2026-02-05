(function () {
    'use strict';

    if (window.ua_online_msx_final) return;
    window.ua_online_msx_final = true;

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

    function findPlayButton() {
        var btns = document.querySelectorAll('button, .button, .selector');

        for (var i = 0; i < btns.length; i++) {
            var t = btns[i].innerText || '';
            if (t.indexOf('Див') !== -1 || t.indexOf('Play') !== -1) return btns[i];
        }

        return null;
    }

    function insertButton() {
        if (document.querySelector('.ua-online-btn')) return;

        var play = findPlayButton();
        if (!play) return;

        var titleEl = document.querySelector('.full__title,h1');
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

        play.parentNode.insertBefore(btn, play.nextSibling);
    }

    setInterval(function () {
        if (!window.Lampa) return;
        insertButton();
    }, 800);

    setTimeout(function () {
        if (window.Lampa) Lampa.Noty.show('UA Online активний');
    }, 1500);

})();
