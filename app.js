(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const ageGate = document.getElementById('age-gate');
  const ageYes = document.getElementById('age-yes');
  const ageKey = 'ganaconmatias_age_confirmed';

  if (ageGate && !sessionStorage.getItem(ageKey)) {
    ageGate.hidden = false;
    document.body.classList.add('gate-open');
  }

  if (ageGate && ageYes) {
    ageYes.addEventListener('click', () => {
      sessionStorage.setItem(ageKey, '1');
      ageGate.hidden = true;
      document.body.classList.remove('gate-open');
    });
  }

  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll('.js-whatsapp').forEach((link) => {
    const message = link.dataset.message;
    if (message) {
      link.href = `https://wa.me/5492975815752?text=${encodeURIComponent(message)}`;
    }

    link.addEventListener('click', () => {
      window.dataLayer.push({
        event: 'click_whatsapp',
        page_path: window.location.pathname,
        link_text: link.textContent.trim()
      });
    });
  });
})();
