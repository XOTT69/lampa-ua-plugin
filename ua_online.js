(function() {
    'use strict';
    
    // Іконка "HOT" (SVG текст)
    var hot_icon = '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#FF4757"/><text x="50" y="65" font-family="Arial, sans-serif" font-size="45" font-weight="bold" fill="white" text-anchor="middle">HOT</text></svg>';

    var ua_component = {
        title: 'UA Online',
        component: 'uaonline',
        icon: hot_icon,
        on: function() {
            var items = [
                {t:'UAKino', u:'https://uakino.cx/'}, 
                {t:'UAFLIX', u:'https://uafix.net/'},
                {t:'Kinoukr', u:'https://kinoukr.tv/'},
                {t:'UASerials', u:'https://uaserials.com/'}
            ];
            
            var html = Lampa.List(items.map(u => ({
                title: u.t,
                url: u.u,
                component: 'ua_search'
            })), {
                on_select: (item) => {
                    Lampa.Input.edit({
                        title: 'Пошук ' + item.title,
                        value: '',
                        free: true,
                        nosave: true
                    }, (query) => {
                        Lampa.Activity.push({
                            url: item.url,
                            title: 'Пошук: ' + query,
                            component: 'browser',
                            page: 1
                        });
                        Lampa.Browser.open({ url: item.url + '?s=' + encodeURIComponent(query) });
                    });
                }
            });
            Lampa.Controller.content(html);
        }
    };

    // Додаємо в меню з назвою "UA Online" та іконкою "HOT"
    function addMenu() {
        if ($('.menu .menu__item[data-action=uaonline]').length) return;
        
        var item = $(`<div class="menu__item selector" data-action="uaonline">
            <div class="menu__ico" style="width:30px; height:30px;">${hot_icon}</div>
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

        // Вставляємо ПІСЛЯ "Пошук" (індекс 1 або 2)
        $('.menu .menu__list').eq(0).find('.menu__item').eq(1).after(item);
    }

    if (window.appready) addMenu();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addMenu();
        });
    }
    
    Lampa.Component.add('uaonline', ua_component);
})();
