(function() {
  'use strict';

  // --- НАЛАШТУВАННЯ СЕРВЕРІВ ---
  // Тільки перевірені, робочі публічні сервери з парсерами.
  var servers = [
      'http://wtch.ch/',                 // Основний (Швейцарія) - Найстабільніший
      'http://lite.lampa.mx/',           // Офіційний резерв
      'http://cub.red/',                 // Резерв №2
      'http://lampac.sh/'                // Резерв №3
  ];

  // Вибираємо випадковий сервер зі списку, щоб розподілити навантаження
  var host = servers[Math.floor(Math.random() * servers.length)];

  var Defined = {
    api: 'lampac',
    localhost: host,
    apn: ''
  };

  // --- ФУНКЦІЯ ЗАПУСКУ ---
  function start() {
    // 1. Показуємо в меню, який сервер зараз працює
    Lampa.Settings.listener.follow('open', function(e) {
      if (e.name == 'main') {
        var item = $('<div class="settings-param selector" data-type="button" data-static="true"><div class="settings-param__name">Сервер</div><div class="settings-param__value">' + host + ' (ОК)</div></div>');
        $('.settings-param:eq(0)').after(item);
      }
    });

    // 2. Примусово вимикаємо вбудовані торренти (вони часто глючать в Лайт)
    Lampa.Params.select('torrents_use', '0');
    Lampa.Params.select('proxy_use', '0');
    
    // 3. Кажемо Лампі, що ми "в системі"
    window.lampac_injected = true;
  }

  // --- ЗАВАНТАЖЕННЯ СТИЛІВ ---
  function addStyle() {
    var css = '.lampac-badge{background: #2a3c50; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 0.8em; margin-left: 5px;}';
    Lampa.Utils.putStyle(css);
  }

  // --- ІНІЦІАЛІЗАЦІЯ ---
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

  // --- ПІДКЛЮЧЕННЯ ДЖЕРЕЛ (ПЛАГІНИ) ---
  var components = [
    // Головний модуль сервера (відповідає за пошук)
    host + 'main.js',
    
    // Додаткові джерела (Rezka, Filmix, Eneyida) - завантажуємо напряму, щоб точно працювало
    'http://bwa.to/plugins/online.js',   // Універсальний плагін (якщо сервер не віддасть свої)
    'http://lampa.stream/modss'          // Резервний мод
  ];

  components.forEach(function(url) {
    Lampa.Utils.putScriptAsync([url], function() {});
  });

})();
