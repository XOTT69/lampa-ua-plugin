(function() {
  'use strict';

  // --- НАЛАШТУВАННЯ СЕРВЕРІВ ---
  var servers = [
      'http://wtch.ch/', 
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
    Lampa.Settings.listener.follow('open', function(e) {
      if (e.name == 'main') {
        var item = $('<div class="settings-param selector" data-type="button" data-static="true"><div class="settings-param__name">Сервер</div><div class="settings-param__value">' + host + '</div></div>');
        $('.settings-param:eq(0)').after(item);
      }
    });

    // 🔥 ПРИМУСОВЕ ВКЛЮЧЕННЯ PROXY ДЛЯ REZKA
    Lampa.Storage.set('proxy_rezka', 'true'); 
    Lampa.Storage.set('rezka_ua', 'true'); // Якщо ти в Україні

    // Вимикаємо зайве
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

  // --- 🔥 НАЙКРАЩІ ПЛАГІНИ 2026 ---
  var components = [
    host + 'main.js',
    
    // 1. Online Mod від NB557 (ТОП для Rezka)
    'https://nb557.github.io/plugins/online_mod.js',
    
    // 2. MODSS (Резерв, якщо перший не спрацює)
    'http://lampa.stream/modss',
    
    // 3. Спеціальний фікс для Rezka (якщо інші не бачать)
    'http://lampa.init.sh/rezka.js' 
  ];

  components.forEach(function(url) {
    Lampa.Utils.putScriptAsync([url], function() {});
  });

})();
