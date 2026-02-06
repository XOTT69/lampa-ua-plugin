(function() {
    'use strict';

    const NAME = 'UA + Online FREE';
    const SOURCES = [
        {title: 'UAKino CX', url: 'https://uakino.cx/?s=QUERY'},
        {title: 'UAFLIX', url: 'https://uafix.net/?s=QUERY'},
        {title: 'UASerials', url: 'https://uaserials.com/?s=QUERY'},
        {title: 'Takflix UA', url: 'https://takflix.com/uk/search?q=QUERY'},
        {title: 'Lumex HD', action: () => Lampa.Source.get('lumex')},
        {title: 'RedHead HD', action: () => Lampa.Source.get('redhead')},
        {title: 'HDrezka Free', action: () => Lampa.Source.get('hdrezka')},
        {title: 'Fan Serials', action: () => Lampa.Source.get('fanserials')}
    ];

    // Фікс для MSX: listener на playlist + multiple containers
    Lampa.Listener.follow('playlist', function(e) {
        setTimeout(addButton, 500);
    });
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') setTimeout(addButton, 2000);
    });

    function addButton() {
        var title = $('.info__title').text() || 
                    $('.view--category_full .full-info__title').text() || 
                    $('h1').text() || '';
        if (!title) return;

        $('.ua-free-btn').remove();

        var btn = Lampa.Template.get('button_item', {
            title: NAME,
            icon: '🔥',
            href: ''
        });
        btn.addClass('ua-free-btn selector');

        btn.on('hover:enter', () => showMenu(title));

        // 5 місць додавання для MSX/Hisense
        const places = [
            '.full-start__buttons',
            '.full-startbuttons', 
            '.actions__body',
            '.view--playlist .actions',
            '.full-actions'
        ];
        
        places.forEach(selector => {
            $(selector).append(btn.clone(true));
        });

        Lampa.Noty.show('🔥 ' + NAME + ' (' + SOURCES.length + ') для ' + title);
    }

    function showMenu(title) {
        const items = SOURCES.map(s => ({
            title: s.title,
            action: () => {
                if (s.action) s.action();
                else {
                    const query = encodeURIComponent(title);
                    Lampa.Browser.open({
                        url: s.url.replace('QUERY', query),
                        title: s.title
                    });
                }
                Lampa.Controller.toggle('full');
            }
        }));

        Lampa.Select.show({
            title: 'HD Джерела',
            items,
            onBack: () => Lampa.Controller.toggle('full')
        });
    }

    // Меню в головному
    Lampa.Component.add('uafree', {
        name: NAME,
        url: 'uafree'
    });

    Lampa.Noty.show('🔥 ' + NAME + ' активовано!');
})();
