const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const target = `  .nav-menu.open {
    transform: translateY(0);
  }`;

const replacement = `  .nav-menu.open {
    transform: translateY(0);
  }

  .nav-item-dropdown {
    width: 100%;
  }

  .nav-item-dropdown .dropdown-toggle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-menu .dropdown-menu {
    position: static;
    transform: none;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: none;
    border-radius: 8px;
    margin-top: 8px;
    padding: 6px;
    min-width: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: max-height 0.35s ease, opacity 0.25s ease, visibility 0.25s ease;
  }

  .nav-menu .dropdown-menu::before,
  .nav-menu .dropdown-menu::after {
    display: none;
  }

  .nav-item-dropdown.mobile-open .dropdown-menu {
    max-height: 550px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .nav-item-dropdown.mobile-open .dropdown-chevron {
    transform: rotate(180deg);
  }`;

if (css.includes(target)) {
  css = css.replace(target, replacement);
  fs.writeFileSync('css/style.css', css, 'utf8');
  console.log('Mobile dropdown styles successfully added!');
} else {
  console.error('Target not found for mobile dropdown');
}

