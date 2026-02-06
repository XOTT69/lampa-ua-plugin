(function() {
    'use strict';

    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite' && e.buttons) {
            setTimeout(function(){
                // Твоя Filmix логіка + UA
                var html = '<div class="selector focus full-start__item full-start__item--filmix" style="background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)"><div class="full-start__title">🔥 UA FREE HD</div></div>';
                
                e.buttons.append(html);
                
                $(html).on('hover:enter', function(){
                    Lampa.Select.show({
                        title: 'UA + HD Безкоштовно',
                        items: [
                            {title: 'UAKino', url: 'https://uakino.cx/?s=Прелюдія:Міт'},
                            {title: 'UAFLIX', url: 'https://uafix.net/?s=Прелюдія:Міт'},
                            {title: 'UASerials', url: 'https://uaserials.com/?s=Прелюдія:Міт'},
                            {title: 'Takflix UA', url: 'https://takflix.com/uk/search?q=Прелюдія:Міт'},
                            {title: 'Lumex HD', action: () => Lampa.Source.get('lumex')},
                            {title: 'RedHead HD', action: () => Lampa.Source.get('redhead')}
                        ].map(item => ({
                            title: item.title,
                            action: () => item.url ? Lampa.Browser.open({url: item.url, title: item.title}) : item.action()
                        })),
                        onBack: () => Lampa.Controller.toggle('full')
                    });
                });
                
                Lampa.Noty.show('🔥 UA FREE HD додано в кнопки!');
            }, 1500);
        }
    });

    Lampa.Noty.show('🔥 UA плагін = Filmix логіка!');
})();
