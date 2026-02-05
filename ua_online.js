(function() {
    'use strict';
    
    // Реєструємо компонент UA Online
    var ua_component = {
        title: 'UA Online',
        component: 'uaonline',
        icon: '<svg viewBox="0 0 512 512" fill="#fff"><path d="M256 0c141.4 0 256 114.6 256 256S397.4 512 256 512 0 397.4 0 256 114.6 0 256 0z" fill="#0057b7"/><path d="M0 256h512v256H0z" fill="#ffd700"/></svg>',
        on: function() {
            var network = new Lampa.Reguest();
            var items = [];
            var urls = [
                {t:'UAKino', u:'https://uakino.cx/'}, 
                {t:'UAFLIX', u:'https://uafix.net/'},
                {t:'Kinoukr', u:'https://kinoukr.tv/'}
            ];
            
            // Показуємо список сайтів для пошуку
            var html = Lampa.List(urls.map(u => ({
                title: 'Пошук на ' + u.t,
                url: u.u,
                component: 'ua_search'
            })), {
                on_select: (item) => {
                    Lampa.Input.edit({
                        title: 'Пошук на ' + item.title,
                        value: '',
                        free: true,
                        nosave: true
                    }, (query) => {
                        Lampa.Activity.push({
                            url: item.url,
                            title: 'Пошук: ' + query,
                            component: 'browser', // Відкриємо вбудований браузер поки що
                            page: 1
                        });
                        Lampa.Browser.open({ url: item.url + '?s=' + encodeURIComponent(query) });
                    });
                }
            });
            Lampa.Controller.content(html);
        }
    };

    // Додаємо пункт в ГОЛОВНЕ МЕНЮ
    function addMenu() {
        if ($('.menu .menu__item[data-action=uaonline]').length) return;
        
        var item = $(`<div class="menu__item selector" data-action="uaonline">
            <div class="menu__ico">${ua_component.icon}</div>
            <div class="menu__text">UA Online</div>
        </div>`);

        item.on('hover:enter', function() {
            Lampa.Activity.push({
                url: '',
                title: 'UA Online',
                component: 'uaonline',
                page: 1
            });
        });

        $('.menu .menu__list').eq(0).append(item);
    }

    // Запускаємо додавання
    if (window.appready) addMenu();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addMenu();
        });
    }
    
    // Реєструємо активність
    Lampa.Component.add('uaonline', ua_component);

    Lampa.Noty.show('🔥 UA Online додано в меню!');
})();
