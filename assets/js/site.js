/* ==========================================================================
   Interacción del portafolio.
   Nada aquí es necesario para leer el sitio: sin JavaScript todo el contenido
   sigue visible y los enlaces funcionan.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  var nativeTimeline =
    typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()');

  /* ---------------------------------------------------------------------
     1. Revelado al entrar en viewport.
     Solo se activa cuando el navegador no soporta animation-timeline: view(),
     porque en ese caso el CSS ya lo resuelve sin JavaScript.
     --------------------------------------------------------------------- */
  function initReveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('.rise'));
    if (!nodes.length) return;

    // Si el navegador soporta animation-timeline: view(), el CSS ya revela sin JS.
    if (nativeTimeline && !reduce.matches) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------------------------------------------------------------------
     2. Resplandor que sigue al puntero sobre la tarjeta de proyecto.
     --------------------------------------------------------------------- */
  function initGlow() {
    if (!fine.matches || reduce.matches) return;

    document.querySelectorAll('[data-glow]').forEach(function (card) {
      var glow = card.querySelector('.card__glow');
      if (!glow) return;

      card.addEventListener('pointermove', function (ev) {
        var box = card.getBoundingClientRect();
        var x = ev.clientX - box.left;
        var y = ev.clientY - box.top;
        glow.style.transform =
          'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
      });
    });
  }

  /* ---------------------------------------------------------------------
     3. Botón que se inclina levemente hacia el cursor.
     --------------------------------------------------------------------- */
  function initMagnetic() {
    if (!fine.matches || reduce.matches) return;

    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var box = null;

      btn.addEventListener('pointerenter', function () {
        box = btn.getBoundingClientRect();
      });

      btn.addEventListener('pointermove', function (ev) {
        if (!box) box = btn.getBoundingClientRect();
        var dx = (ev.clientX - box.left - box.width / 2) / box.width;
        var dy = (ev.clientY - box.top - box.height / 2) / box.height;
        btn.style.transform =
          'translate(' + (dx * 5).toFixed(2) + 'px,' + (dy * 4 - 1).toFixed(2) + 'px)';
      });

      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
        box = null;
      });
    });
  }

  /* ---------------------------------------------------------------------
     4. Copiar el correo con confirmación visible.
     --------------------------------------------------------------------- */
  var ICON_COPY =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/>' +
    '<path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>';
  var ICON_OK =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';

  function initCopyEmail() {
    var button = document.querySelector('[data-copy-email]');
    if (!button) return;

    var email = button.getAttribute('data-copy-email');
    var label = button.querySelector('[data-copy-email-text]');
    var icon = button.querySelector('[data-copy-email-icon]');
    var status = document.querySelector('[data-copy-email-status]');
    var timer = null;

    function reset() {
      button.classList.remove('is-copied');
      label.textContent = email;
      icon.innerHTML = ICON_COPY;
      status.textContent = 'clic para copiar el correo';
      status.classList.remove('is-fresh');
    }

    button.addEventListener('click', function () {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        status.textContent = 'copiá manualmente: ' + email;
        return;
      }

      navigator.clipboard.writeText(email).then(function () {
        button.classList.add('is-copied');
        label.textContent = 'copiado';
        icon.innerHTML = ICON_OK;
        status.textContent = 'listo, ya está en el portapapeles';
        status.classList.add('is-fresh');
        window.clearTimeout(timer);
        timer = window.setTimeout(reset, 2400);
      }, function () {
        status.textContent = 'no se pudo copiar: ' + email;
      });
    });
  }

  initReveal();
  initGlow();
  initMagnetic();
  initCopyEmail();
})();
