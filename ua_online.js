(function() {
    'use strict';

    // Іконка HOT
    var hot_icon = '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#FF4757"/><text x="50" y="65" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">HOT</text></svg>';

    // Функція UA Online
    function uaMenu() {
        var items = [
            {title: '🔥 UAKino', url: 'https://uakino.cx/?s='},
            {title: '📱 UAFLIX', url: 'https://uafix.net/?s='},
            {title: '🎬 Kinoukr', url: 'https://kinoukr.tv/search/?story='},
            {title: '📺 UASerials', url: 'https://uaserials.com/?s='}
        ];

        Lampa.Select.show({
            title: 'UA Online - Вибери сайт',
            items: items,
            onSelect: (item) => {
                Lampa.Input.edit({
                    title: item.title + ' пошук',
                    value: '',
                    free: true
                }, (query) => {
                    Lampa.Browser.open({
                        url: item.url + encodeURIComponent(query),
                        title: item.title + ': ' + query
                    });
                });
            }
        });
    }

    // MSX меню селектори
    function addMSXMenu() {
        // Перевіряємо різні MSX меню
        var selectors = [
            '.menu .menu__list .menu__item',
            '.selector-menu .menu__item',
            '.menu-category .menu__item',
            '.view--menu .menu__item'
        ];

        var added = false;
        selectors.forEach(sel => {
            if ($(sel).length && !$(sel).find('[data-ua-hot]').length) {
                var item = $(`<div class="menu__item selector" data-ua-hot="1">
                    <div class="menu__ico" style="width:32px;height:32px;margin-right:10px;">${hot_icon}</div>
                    <div class="menu__text">UA Online</div>
                </div>`);

                item.on('hover:enter', uaMenu);
                $(sel).last().after(item);
                added = true;
                Lampa.Noty.show('🔥 UA Online додано в меню!');
            }
        });

        if (!added) {
            Lampa.Noty.show('MSX меню знайдено, але селектор інший. Дебаг...');
        }
    }

    // Запуск для MSX
    setTimeout(addMSXMenu, 3000);
    
    // Listener для повного завантаження
    Lampa.Listener.follow('app', (e) => {
        if (e.type == 'ready') setTimeout(addMSXMenu, 2000);
    });

    Lampa.Noty.show('🚀 UA плагін для MSX запущено!');
})();
