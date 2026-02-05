(function() {
    'use strict';
    
    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
            setTimeout(function() {
                var title = e.data.movie.title || e.data.card.title;
                var btn = $('<div class="full-start__button selector view--online" data-subtitle="Пошук UA">' + 
                    '<svg viewBox="0 0 24 24" fill="none" width="24" height="24" style="fill:#fff"><rect width="24" height="24" rx="4" fill="#ff4757"/><path d="M7 17 L12 7 L17 17" stroke="white" stroke-width="2"/></svg>' +
                    '<span>UA Online</span>' +
                    '</div>');

                btn.on('hover:enter', function() {
                    Lampa.Input.edit({
                        title: 'Пошук ' + title,
                        value: title,
                        free: true,
                        nosave: true
                    }, function(new_query) {
                        if (new_query) {
                            var url = 'https://uafix.net/?s=' + encodeURIComponent(new_query);
                            Lampa.Browser.open({
                                url: url,
                                title: 'UA: ' + new_query
                            });
                        }
                    });
                });

                $('.full-start__buttons').append(btn);
            }, 500); // Затримка, щоб DOM прогрузився
        }
    });

    console.log('UA Simple Loaded');
})();
