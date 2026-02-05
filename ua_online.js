(function() {
    'use strict';
    const NAME = 'UA Online';
    const UA_SOURCES = [  // Актуальні 2026
        {title: 'UAKino CX', url: 'https://uakino.cx/?s=QUERY'},
        {title: 'UAFLIX', url: 'https://uafix.net/?s=QUERY'},
        {title: 'Kinoukr TV', url: 'https://kinoukr.tv/search/?story=QUERY'},
        {title: 'UAKino One', url: 'https://uakino.one/?s=QUERY'},
        {title: 'AniTube UA', url: 'https://anitube.in.ua/search/?q=QUERY'}
    ];

    // Твоя стара логіка: кнопка після torrent
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            let title = e.data.card_title || e.data.movie?.title || e.data.name;
            var btn = Lampa.Template.get('button', { 
                name: NAME, 
                style: 'background: #ff4757; color: white; border-radius: 4px; margin-left: 4px;' 
            });
            btn.on('hover:enter', function () {
                Lampa.Select.show({
                    title: `UA Пошук: ${title}`,
                    items: UA_SOURCES.map(s => ({ 
                        title: s.title, 
                        url: s.url.replace('QUERY', encodeURIComponent(title)) 
                    })),
                    onSelect: a => Lampa.Browser.open({ url: a.url, title: a.title }),
                    onBack: () => Lampa.Controller.toggle()
                });
            });
            // Твоя DOM логіка: після .full-start__buttons або torrent
            $('.view--category_full .full-start__buttons').last().after(btn);
            // Альтернатива для MSX
            if (!$('.full-start__buttons').length) {
                $('.view--torrent').after(btn);
            }
            Lampa.Noty.show(`${NAME} завантажено для "${title}"`);
        }
    });

    Lampa.Noty.show('🔥 UA плагін активний!');
})();
