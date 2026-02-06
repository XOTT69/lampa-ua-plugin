(function() {
    'use strict';

    var ua_component = {
        search: function(object) {
            var title = object.movie.title + ' ' + (object.movie.original_title || '');
            var html = '<div class="full-start__item selector focus" style="background: linear-gradient(45deg,#ff4757,#ff6b7a);color:#fff"><div class="full-start__title">🔥 UA FREE HD</div></div>';
            $('.full-start__buttons, .actions__line').append(html);
            
            $(document).on('hover:enter','.full-start__item', function(e){
                var items = [
                    {title:'UAKino', url:'https://uakino.cx/?s='+encodeURIComponent(title)},
                    {title:'UAFLIX', url:'https://uafix.net/?s='+encodeURIComponent(title)},
                    {title:'UASerials', url:'https://uaserials.com/?s='+encodeURIComponent(title)},
                    {title:'Takflix', url:'https://takflix.com/uk/search?q='+encodeURIComponent(title)},
                    {title:'Lumex HD', action: function(){Lampa.Source.get('lumex')}},
                    {title:'RedHead HD', action: function(){Lampa.Source.get('redhead')}}
                ];
                
                Lampa.Select.show({
                    title: '6 HD джерел',
                    items: items.map(function(item){
                        return {
                            title: item.title,
                            action: function(){
                                if(item.action) item.action();
                                else Lampa.Browser.open({url:item.url,title:item.title});
                            }
                        }
                    }),
                    onBack: function(){Lampa.Controller.toggle('full')}
                });
            });
        }
    };

    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(function(){
                if ($('.view--category_full').length) {
                    ua_component.search(e.data);
                    Lampa.Noty.show('🔥 UA FREE HD додано!');
                }
            }, 1500);
        }
    });

    Lampa.Noty.show('🔥 UA плагін активовано!');
})();
