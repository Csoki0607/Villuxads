/**
 * Villux – Dinamikus Google Ads kulcsszó- és paraméterkezelő
 * Kiemeli a keresett témát (pl. zárlat, áramszünet, kerület) anélkül,
 * hogy módosítaná a hiteles alapértelmezett tartalmat.
 */
(function() {
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const keywordMap = {
    'zarlat': {
      eyebrow: '⚡ AZONNALI ZÁRLATELHÁRÍTÁS & HIBAKERESÉS',
      lead: 'Zárlat vagy leverődő biztosíték? Műszeres hibakereséssel azonnal segítünk Budapesten.'
    },
    'aramszunet': {
      eyebrow: '⚡ SOS ÁRAMKIMARADÁS ELHÁRÍTÁS',
      lead: 'Elment az áram a lakásban? Ügyeletes szervizautónk azonnal indulásra kész.'
    },
    'biztositek': {
      eyebrow: '⚡ BIZTOSÍTÉKTÁBLA & FI-RELÉ GYORSSZOLGÁLAT',
      lead: 'Leveri a kismegszakítót, vagy szikrázik a tábla? Szakszerű biztosítékcsere garanciával.'
    },
    'ejjel': {
      eyebrow: '🌙 0–24 ÉJSZAKAI VILLANYSZERELŐ ÜGYELET',
      lead: 'Munkaidőn túli vagy éjszakai elektromos vészhelyzet? Hívja ügyeletünket most!'
    },
    'hetvege': {
      eyebrow: '📅 HÉTVÉGI & ÜNNEPNAPI VILLANYSZERELŐ',
      lead: 'Szombaton vagy vasárnap hibásodott meg az elektromos hálózat? Kiszállunk hétvégén is.'
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    const tema = (getQueryParam('tema') || getQueryParam('keyword') || '').toLowerCase();
    let matched = null;

    for (const key in keywordMap) {
      if (tema.includes(key)) {
        matched = keywordMap[key];
        break;
      }
    }

    if (matched) {
      const eyebrowEl = document.querySelector('.hero-eyebrow, [data-dynamic-eyebrow]');
      const leadEl = document.querySelector('.hero-desc-lead, [data-dynamic-lead]');
      
      if (eyebrowEl && matched.eyebrow) {
        eyebrowEl.innerHTML = `<span class="pulse-dot"></span> ` + matched.eyebrow;
      }
      if (leadEl && matched.lead) {
        leadEl.textContent = matched.lead;
      }
    }
  });
})();
