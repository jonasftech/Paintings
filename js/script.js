const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navRight = document.querySelector('.nav-right');
const pageoverlay = document.getElementById('overlay');
const siteTitle = document.querySelector('.site-title');
const body = document.querySelector('body');

navToggle.addEventListener('click', () => {
  pageoverlay.classList.toggle('show');
  navLinks.classList.toggle('show');
  navRight.classList.toggle('show');
  siteTitle.classList.toggle('black-text');
  body.classList.toggle('no-scroll');
});

const header = document.querySelector('header');
let lastScrollTop = 0;
let ticking = false;

function updateHeaderVisibility() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrollt nach unten, den Header ausblenden
        header.style.top = '-100px';
    } else {
        // Scrollt nach oben oder ist ganz oben, den Header einblenden
        header.style.top = '0';
    }

    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
    }
});

// Initialen Aufruf für die sichtbare Standard-Headerposition
updateHeaderVisibility();
