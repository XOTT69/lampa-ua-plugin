(function() {
    'use strict';

    // UA Балансер (без торрентів)
    var network = new Lampa.Reguest();
    var uaParser = {
        search: function(query, call) {
            var urls = [
                'https://uafix.net/?s=' + encodeURIComponent(query),
                'https://uakino.cx/?s=' + encodeURIComponent(query),
                'https://kinoukr.tv/search/?story=' + encodeURIComponent(query),
                'https://uakino.one/?s=' + encodeURIComponent(query),
                'https://anitube.in.ua/search/?q=' + encodeURIComponent(query)
            ];
            
            var results = [];
            var count = 0;
            
            urls.forEach(url => {
                network.clear();
                network.timeout(4000);
                network.silent(url, (html) => {
                    // Парсимо плеєри (iframe)
                    var iframes = html.match(/iframe[^>]+src=["']([^"']+)["']/g);
                    if (iframes) {
                        iframes.forEach(frame => {
                            var src = frame.match(/src=["']([^"']+)["']/)[1];
                            results.push({
                                title: 'UA плеєр ' + url.split('/')[2],
                                url: src.startsWith('//') ? 'https:' + src : src
                            });
                        });
                    }
                    count++;
                    if (count === urls.length) call(results);
                }, () => count++);
            });
        }
    };

    // Додаємо в меню "Онлайн"
    if (!Lampa.Source.get('uaonline')) {
        Lampa.Source.add('uaonline', {
            title: 'UA Online',
            url: 'uaonline',
            component: 'full',
            search: function(query) {
                Lampa.Activity.push({
                    url: '',
                    title: 'UA Пошук - ' + query,
                    component: 'uaonline',
                    search: query,
                    page: 1
                });
            }
        });
    }

    Lampa.Controller.add('uaonline', {
        toggle: function() {
            uaParser.search(object.search || object.movie.title, (items) => {
                var html = Lampa.List(items, {
                    on_item: item => ({ title: item.title }),
                    on_select: item => Lampa.Player.play(item.url)
                });
                Lampa.Controller.content(html);
            });
        }
    });

    Lampa.Noty.show('🔥 UA Балансер "UA Online" в меню!');
})();
