/*
 * Переключатель светлой/тёмной темы.
 * JS здесь делает ровно одно: ставит атрибут data-theme="light|dark" на <html>.
 * Всю перекраску выполняет CSS — в style.css для [data-theme="dark"]
 * переопределены значения CSS-переменных (--color-bg, --color-text и т.д.).
 * Выбор запоминается в localStorage, по умолчанию — светлая тема.
 */
(function () {
  var STORAGE_KEY = 'techstore-theme';
  var root = document.documentElement;

  var theme = 'light';
  try {
    theme = localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch (e) {
    /* localStorage недоступен (приватный режим) — остаёмся на светлой теме */
  }

  // Ставим тему сразу, ещё до отрисовки страницы, — без «мигания»
  root.setAttribute('data-theme', theme);

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;

    // Синхронизация состояния кнопки для скринридеров
    function syncButton() {
      var isDark = theme === 'dark';
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
    }

    syncButton();

    button.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* не удалось сохранить — тема просто не запомнится */
      }
      syncButton();
    });
  });
})();
