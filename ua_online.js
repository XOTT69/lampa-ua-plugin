(function() {
    'use strict';
    const NAME = 'UA + Online Mod';
    const UA_SOURCES = [
        {title: 'UAKino', url: 'https://uakino.best/?s=QUERY'},
        {title: 'UASerials', url: 'https://uaserials.com/?s=QUERY'},
        {title: 'UAFix', url: 'https://uafix.net/?s=QUERY'},
        {title: 'UAKino One', url: 'https://uakino.one/search/QUERY'}
    ];

    Lampa.Listener.follow('full', (e) => {
        if (e.type == 'complite') {
            let title = e.data.card_title || e.data.name;
            let btn = Lampa.Template.get('button', { name: NAME, style: 'background: #ff4757; color: white; border-radius: 4px; margin-left: 4px;' });
            btn.on('hover:enter', () => {
                Lampa.Select.show({
                    title: `UA + Mod: ${title}`,
                    items: [
                        ...UA_SOURCES.map(s => ({ title: s.title, url: s.url.replace('QUERY', encodeURIComponent(title)) })),
                        { separator: true },
                        { title: 'Online Mod (повний парсер)', action: () => Lampa.Activity.push({ url: 'online_mod://search/' + encodeURIComponent(title), title: 'Online Mod' }) }
                    ],
                    onSelect: (a) => {
                        if (a.action) a.action();
                        else Lampa.Browser.open({ url: a.url, title: a.title });
                    },
                    onBack: () => Lampa.Controller.toggle()
                });
            });
            $('.view--category_full .full-start__buttons').append(btn);
            Lampa.Noty.show(`${NAME} активовано для "${title}"`);
        }
    });
})();
