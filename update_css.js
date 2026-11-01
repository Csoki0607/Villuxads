const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Desktop dropdown styles after .nav-link:hover::after, .nav-link.active::after { width: 100%; }
const target1 = `.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}`;

const replace1 = `.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* ==========================================================================
   SERVICES DROPDOWN NAVIGATION (DESKTOP)
   ========================================================================== */
.nav-item-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.dropdown-chevron {
  width: 12px;
  height: 12px;
  transition: transform var(--transition-fast);
}

.nav-item-dropdown:hover .dropdown-chevron,
.nav-item-dropdown.active .dropdown-chevron {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: rgba(5, 26, 19, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(246, 186, 19, 0.35);
  border-radius: 12px;
  padding: 8px;
  min-width: 290px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 20px rgba(0, 255, 135, 0.08);
  list-style: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
  z-index: 1000;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: #051a13;
  border-left: 1px solid rgba(246, 186, 19, 0.35);
  border-top: 1px solid rgba(246, 186, 19, 0.35);
}

.dropdown-menu::after {
  content: '';
  position: absolute;
  top: -16px;
  left: 0;
  right: 0;
  height: 16px;
}

.nav-item-dropdown:hover .dropdown-menu,
.nav-item-dropdown:focus-within .dropdown-menu,
.nav-item-dropdown.open .dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.dropdown-menu li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  color: #e5ece9;
  font-size: 0.88rem;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.dropdown-link:hover,
.dropdown-link.active {
  background: rgba(246, 186, 19, 0.14);
  color: var(--accent-gold);
  transform: translateX(3px);
}

.dropdown-icon {
  font-size: 1.05rem;
  line-height: 1;
  flex-shrink: 0;
}`;

// Normalize line endings for replacement
const normalize = s => s.replace(/\r\n/g, '\n');

if (normalize(css).includes(normalize(target1))) {
  // Replace first occurrence
  const idx = normalize(css).indexOf(normalize(target1));
  css = normalize(css).replace(normalize(target1), normalize(replace1));
  console.log('Desktop dropdown CSS added successfully!');
} else {
  console.error('Target 1 not found in css/style.css');
}

// 2. Mobile dropdown styles in @media (max-width: 768px)
const target2 = `.nav-menu.open {
  transform: translateY(0);
}`;

const replace2 = `.nav-menu.open {
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
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: none;
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
  transition: max-height 0.3s ease, opacity 0.2s ease, visibility 0.2s ease;
}

.nav-menu .dropdown-menu::before,
.nav-menu .dropdown-menu::after {
  display: none;
}

.nav-item-dropdown.mobile-open .dropdown-menu {
  max-height: 500px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.nav-item-dropdown.mobile-open .dropdown-chevron {
  transform: rotate(180deg);
}`;

if (normalize(css).includes(normalize(target2))) {
  css = normalize(css).replace(normalize(target2), normalize(replace2));
  console.log('Mobile dropdown CSS added successfully!');
} else {
  console.error('Target 2 not found in css/style.css');
}

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('css/style.css saved!');

