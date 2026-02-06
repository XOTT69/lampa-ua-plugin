(function() {
    'use strict';

    const NAME = 'UA + Online FREE';
    const SOURCES = [
        // 🇺🇦 Твої UA-сайти
        {title: 'UAKino CX', url: 'https://uakino.cx/?s=QUERY'},
        {title: 'UAFLIX', url: 'https://uafix.net/?s=QUERY'},
        {title: 'UASerials', url: 'https://uaserials.com/?s=QUERY'},
        {title: 'Takflix UA', url: 'https://takflix.com/uk/search?q=QUERY'},
        
        // 🔥 Безкоштовні HD-балансери (замість платних VIP)
        {title: 'Lumex HD', action: () => Lampa.Source.get('lumex')},
        {title: 'RedHead HD', action: () => Lampa.Source.get('redhead')},
        {title: 'HDrezka Free', action: () => Lampa.Source.get('hdrezka')},
        {title: 'Fan Serials', action: () => Lampa.Source.get('fanserials')}
    ];

    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(function() {
                var title = e.data.movie.title || e.data.card.title || '';
                if (!title) return;

                $('.ua-free-btn').remove();

                var btn = Lampa.Template.get('button', {
                    title: NAME,
                    html: '🔥 FREE HD',
                    href: '',
                    klass: 'ua-free-btn selector focus'
                });

                btn.on('hover:enter', function() {
                    var menu_items = SOURCES.map(source => ({
                        title: source.title,
                        action: () => {
                            if (source.action) {
                                source.action();
                            } else {
                                var query = encodeURIComponent(title);
                                Lampa.Browser.open({
                                    url: source.url.replace('QUERY', query),
                                    title: source.title + ': ' + title
                                });
                            }
                            Lampa.Controller.toggle();
                        }
                    }));

                    Lampa.Select.show({
                        title: '8+ HD джерел (без VIP)',
                        items: menu_items,
                        onSelect: (a) => a.action(),
                        onBack: () => Lampa.Controller.toggle()
                    });
                });

                // Адаптовано під Hisense/MSX
                var containers = [
                    $('.view--category_full .full-start__buttons'),
                    $('.view--category_full .full-startbuttons'),
                    $('.full-start__buttons'),
                    $('.actions')
                ];
                containers.forEach(container => {
                    if (container.length) container.append(btn);
                });

                if ($('.ua-free-btn').length) {
                    Lampa.Noty.show(NAME + ' (' + SOURCES.length + ' джерел) для "' + title + '"');
                }
            }, 1500);
        }
    });

    // Додати в меню
    function addMenu() {
        var item = Lampa.Template.get('menuitem', {
            title: NAME,
            href: 'uafree'
        });
        $('.menu .menulist').append(item);
    }

    Lampa.Component.add('uafree', {
        component: 'uafree',
        name: NAME,
        icon: '🔥'
    });

    if (window.appready) addMenu();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addMenu();
        });
    }

    // Дебаг для Hisense
    setTimeout(() => {
        Lampa.Noty.show('🔥 ' + NAME + ' завантажено! (' + SOURCES.length + ' HD джерел)');
    }, 2000);

})();
