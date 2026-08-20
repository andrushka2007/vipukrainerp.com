const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCloseButtons = document.querySelectorAll('[data-menu-close]');

function setMenuState(isOpen) {
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
}

menuToggle.addEventListener('click', () => setMenuState(!document.body.classList.contains('menu-open')));
menuCloseButtons.forEach((button) => button.addEventListener('click', () => setMenuState(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuState(false);
});
