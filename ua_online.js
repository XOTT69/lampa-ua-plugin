(function(){

    if(window.ua_online_context) return;
    window.ua_online_context = true;

    var sources = [
        {title:'UAKino',url:'https://uakino.cx/?s='},
        {title:'UAFLIX',url:'https://uafix.net/?s='},
        {title:'Kinoukr',url:'https://kinoukr.tv/search/?story='},
        {title:'UASerials',url:'https://uaserials.com/?s='}
    ];

    var orig = Lampa.Manifest.plugins.onContextMenu;

    Lampa.Manifest.plugins.onContextMenu = function(object){

        var menu = orig ? orig(object) : {};

        menu.uaonline = {
            name: 'UA Online',
            description: 'Українські сайти'
        };

        return menu;
    };

    var origLaunch = Lampa.Manifest.plugins.onContextLauch;

    Lampa.Manifest.plugins.onContextLauch = function(object){

        if(object && object.name === 'UA Online'){

            var title = object.movie.title || object.movie.name || '';

            Lampa.Input.edit({
                title:'Пошук',
                value:title,
                free:true,
                nosave:true
            },function(q){

                if(!q) return;

                Lampa.Select.show({
                    title:'UA Online',
                    items:sources,
                    onSelect:function(a){
                        Lampa.Browser.open({
                            url:a.url + encodeURIComponent(q),
                            title:a.title
                        });
                    }
                });
            });

            return;
        }

        if(origLaunch) origLaunch.apply(this,arguments);
    };

})();
