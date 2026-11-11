/* Back to Life Carpet & Upholstery Cleaning — spec mockup
   No analytics, no trackers, no third-party calls. */
(function () {
  'use strict';

  /* ---- Reveal on scroll: once, then stop watching ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Underlines: a phrase on one line gets the drawn underline; a phrase that
         wraps onto two lines gets one underline per line instead ---- */
  var hls = document.querySelectorAll('.hl');
  function fitUnderlines() {
    hls.forEach(function (el) {
      el.classList.remove('hl-wrap');
      var lh = parseFloat(getComputedStyle(el).lineHeight) || el.getBoundingClientRect().height;
      if (el.getBoundingClientRect().height > lh * 1.4) el.classList.add('hl-wrap');
    });
  }
  fitUnderlines();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitUnderlines);
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitUnderlines, 150);
  });

  /* ---- Contact form: inert until an endpoint exists ---- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) status.textContent = 'Thanks. This preview does not send messages yet.';
    });
  }
})();
