(function() {
    'use strict';
    
    console.log('🔥 UA PLUGIN START');
    
    const SOURCES = [
        {title: 'UAKino', url: 'https://uakino.cx/?s=QUERY'},
        {title: 'UAFLIX', url: 'https://uafix.net/?s=QUERY'},
        {title: 'UASerials', url: 'https://uaserials.com/?s=QUERY'},
        {title: 'Takflix', url: 'https://takflix.com/uk/search?q=QUERY'},
        {title: 'Lumex HD', action: 'lumex'},
        {title: 'RedHead HD', action: 'redhead'}
    ];

    function getTitle() {
        return $('.info__title, .full-info__title, h1, .view--category .title, title').first().text().trim() || 'Фільм';
    }

    function showUA() {
        const title = getTitle();
        if (!title) return;
        
        // Видаляємо старі
        $('.ua-button-2026').remove();
        
        // Червона кнопка
        const btn = $(`
            <div class="ua-button-2026 selector" style="
                position: fixed; top: 50%; right: 20px; z-index: 9999;
                background: linear-gradient(45deg, #ff4757, #ff6b7a);
                color: white; padding: 15px 20px; border-radius: 25px;
                font-size: 16px; font-weight: bold; box-shadow: 0 4px 15px rgba(255,71,87,0.4);
                cursor: pointer; transform: translateY(-50%);
            ">🔥 UA HD (${SOURCES.length})</div>
        `);
        
        btn.on('click', () => {
            const items = SOURCES.map(s => ({
                title: s.title,
                action: () => {
                    if (s.action) Lampa.Source.get(s.action);
                    else {
                        const url = s.url.replace('QUERY', encodeURIComponent(title));
                        Lampa.Browser.open({url, title: s.title});
                    }
                }
            }));
            Lampa.Select.show({
                title: `🔥 ${title}`,
                items,
                onBack: () => Lampa.Controller.toggle()
            });
        });
        
        $('body').append(btn);
        Lampa.Noty.show(`🔥 UA HD для "${title}" – ПРАВИЙ КРАЙ ЕКРАНА!`);
    }

    // Сканування Кожні 500мс
    setInterval(() => {
        if ($('.view--category_full, .full-start, .info-top').length && $('.ua-button-2026').length === 0) {
            console.log('🔥 UA: Film screen detected');
            showUA();
        }
    }, 500);

    // MutationObserver (додатковий)
    const observer = new MutationObserver(() => {
        if (document.querySelector('.full-start, .view--movie, .info__title') && $('.ua-button-2026').length === 0) {
            console.log('🔥 UA: Mutation detected');
            showUA();
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});

    Lampa.Noty.show('🔥 UA HD – сканування активне!');
    console.log('🔥 UA PLUGIN FULLY ACTIVE');
})();
