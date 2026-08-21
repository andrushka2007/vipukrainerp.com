const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
let clockTime = document.querySelector('[data-kyiv-time]');
let clockDate = document.querySelector('[data-kyiv-date]');

if (!clockTime || !clockDate) {
  const header = document.querySelector('.site-header');
  const clock = document.createElement('div');
  clock.className = 'header-clock';
  clock.setAttribute('aria-label', 'Поточний час у Києві');
  clock.innerHTML = '<span class="header-clock-mark"></span><time class="header-clock-time" data-kyiv-time>00:00</time><time class="header-clock-date" data-kyiv-date>00.00.0000</time>';
  header.insertBefore(clock, menuToggle);
  clockTime = clock.querySelector('[data-kyiv-time]');
  clockDate = clock.querySelector('[data-kyiv-date]');
}

const kyivTimeFormatter = new Intl.DateTimeFormat('uk-UA', {
  timeZone: 'Europe/Kyiv',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
const kyivDateFormatter = new Intl.DateTimeFormat('uk-UA', {
  timeZone: 'Europe/Kyiv',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function updateKyivClock() {
  const now = new Date();
  clockTime.textContent = kyivTimeFormatter.format(now);
  clockDate.textContent = kyivDateFormatter.format(now).replaceAll('/', '.');
}

updateKyivClock();
setInterval(updateKyivClock, 1000);

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
