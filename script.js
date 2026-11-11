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

  /* ---- Hide the small header logo while the big hero logo is visible ---- */
  var heroLogo = document.querySelector('.hero-logo');
  var header = document.querySelector('.site-header');
  if (heroLogo && header && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('logo-hidden', entries[0].isIntersecting);
    }, { rootMargin: '-90px 0px 0px 0px' }).observe(heroLogo);
  }

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
