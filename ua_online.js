(function() {
  'use strict';

  // --- НАЛАШТУВАННЯ СЕРВЕРІВ ---
  var servers = [
      'http://wtch.ch/',
      'http://lite.lampa.mx/',
      'http://cub.red/',
      'http://lampac.sh/'
  ];

  var host = servers[Math.floor(Math.random() * servers.length)];

  var Defined = {
    api: 'lampac',
    localhost: host,
    apn: ''
  };

  function start() {
    // 1. Інформація про сервер
    Lampa.Settings.listener.follow('open', function(e) {
      if (e.name == 'main') {
        var item = $('<div class="settings-param selector" data-type="button" data-static="true"><div class="settings-param__name">Сервер</div><div class="settings-param__value">' + host + '</div></div>');
        $('.settings-param:eq(0)').after(item);
      }
    });

    // 2. 🔥 НАЛАШТУВАННЯ ДЖЕРЕЛ (Щоб прибрати VIP)
    // Вимикаємо платні джерела з видачі, якщо немає підписки
    Lampa.Storage.set('source_filmax_vip', 'false'); 
    
    // Ставимо пріоритет на безкоштовні (Rezka, Collaps)
    // Це змусить Лампу показувати їх ПЕРШИМИ у списку
    Lampa.Storage.set('online_proxy_all', 'true'); // Вмикає проксі для всіх
    
    // 3. Відключаємо торренти (щоб не заважали)
    Lampa.Params.select('torrents_use', '0');
    Lampa.Params.select('proxy_use', '0');
    
    window.lampac_injected = true;
  }

  function addStyle() {
    var css = '.lampac-badge{background: #2a3c50; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.8em; margin-left: 5px;}';
    Lampa.Utils.putStyle(css);
  }

  if (window.appready) {
    addStyle();
    start();
  } else {
    Lampa.Listener.follow('app', function(e) {
      if (e.type == 'ready') {
        addStyle();
        start();
      }
    });
  }

  // --- 🔥 МАКСИМАЛЬНИЙ НАБІР БЕЗКОШТОВНИХ ПЛАГІНІВ ---
  var components = [
    host + 'main.js',
    
    // BWA - Найкращий для безкоштовного кіно
    'http://bwa.to/plugins/online.js',
    
    // Додатковий мод, який часто відкриває закрите
    'http://lampa.stream/modss', 
    
    // Парсер для Rezka (щоб точно працювало без VIP)
    'https://raw.githubusercontent.com/nb557/plugins/master/rezka.js' 
  ];

  components.forEach(function(url) {
    Lampa.Utils.putScriptAsync([url], function() {});
  });

})();
