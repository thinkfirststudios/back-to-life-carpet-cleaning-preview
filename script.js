/* Back to Life Carpet Cleaning — spec mockup
   No analytics, no trackers, no third-party calls. */
(function () {
  'use strict';

  /* ---- One phone number, defined once in the markup (#call-link in the footer).
         Every other "Call Back to Life" control borrows its href. Without JS they
         fall back to #contact, which still shows the call link and the form. ---- */
  var canonical = document.getElementById('call-link');
  if (canonical) {
    var tel = canonical.getAttribute('href');
    document.querySelectorAll('[data-call]').forEach(function (a) {
      a.setAttribute('href', tel);
    });
  }

  /* ---- Reveal on scroll: once, then stop watching ---- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal, .pass-band');

  function showAll() {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  if (reduce || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
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
