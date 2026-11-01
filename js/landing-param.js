/**
 * Villux – Intelligens Google Ads Kulcsszó- és Címsor Illesztő Rendszer
 * Kezeli: ?tema=..., ?keyword=..., ?utm_term=..., ?q=..., ?kerulet=...
 * 
 * Funkciók:
 * 1. Dinamikus felső Hero jelvény (.hero-eyebrow)
 * 2. Dinamikus H1 Főcímsor ([data-dynamic-hero-title]) aranyszínű kiemeléssel
 * 3. Dinamikus bevezető mondat (.hero-desc-lead)
 * 4. Ajánlatkérő űrlap tárgymező frissítés (#formSubject) az e-mailes lead-azonosításhoz
 * 5. URL paraméterek megőrzése a fejléc és a belső linkek kattintásakor
 */
(function() {
  'use strict';

  // Ékezetmentesítő segédfüggvény a robusztus kulcsszó-egyeztetéshez
  function removeAccents(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\-_+.]/g, ' ')
      .toLowerCase()
      .trim();
  }

  function getQueryParam(names) {
    const urlParams = new URLSearchParams(window.location.search);
    for (const name of names) {
      const val = urlParams.get(name);
      if (val) return val.trim();
    }
    return null;
  }

  // Teljes körű kulcsszó- és témamátrix
  const keywordMatrix = [
    // --- SOS / SÜRGŐSSÉGI HIBÁK ---
    {
      triggers: ['zarlat', 'rovidzarlat', 'hibakereses', 'leveri', 'lecsapja', 'zarlatos', 'szikra'],
      label: 'Zárlat & Hibakeresés',
      eyebrow: '⚡ AZONNALI ZÁRLATELHÁRÍTÁS & MŰSZERES HIBAKERESÉS',
      title: 'Azonnali Zárlatkeresés & <span class="text-gold">Sürgősségi Hibaelhárítás</span>',
      lead: 'Zárlat vagy leverődő biztosíték? Műszeres hibakereséssel falbontás nélkül elhárítjuk a veszélyt akár 30–60 percen belül.'
    },
    {
      triggers: ['aramszunet', 'aramkimaradas', 'nincs aram', 'elment az aram', 'aramhiba'],
      label: 'Áramkimaradás 0–24',
      eyebrow: '⚡ SOS ÁRAMKIMARADÁS ELHÁRÍTÁS BUDAPESTEN',
      title: '0–24 SOS Áramkimaradás <span class="text-gold">Azonnali Elhárítás</span>',
      lead: 'Elment az áram az ingatlanban? Ügyeletes gyorsszolgálatunk éjjel-nappal azonnali kiszállásra kész Budapesten és Pest megyében.'
    },
    {
      triggers: ['ejjel', 'ejszaka', '0-24', '0 24', 'nonstop', 'non stop', 'ugyelet', 'surgos', 'sos'],
      label: '0–24 Éjszakai Ügyelet',
      eyebrow: '🌙 0–24 ÉJSZAKAI & HÉTVÉGI GYORSSZOLGÁLAT',
      title: '0–24 SOS Villanyszerelő <span class="text-gold">Azonnali Kiszállással</span>',
      lead: 'Munkaidőn túli vagy éjszakai elektromos vészhelyzet? Ügyeletes csapatunk 30–60 percen belül indul a helyszínre.'
    },
    {
      triggers: ['hetvege', 'szombat', 'vasarnap', 'unnepnap', 'pihenonap'],
      label: 'Hétvégi & Ünnepnapi',
      eyebrow: '📅 HÉTVÉGI & ÜNNEPNAPI VILLANYSZERELŐ ÜGYELET',
      title: 'Hétvégi Villanyszerelő <span class="text-gold">Ügyelet Budapesten</span>',
      lead: 'Szombaton, vasárnap vagy ünnepnapon lépett fel áramkimaradás? Hétvégén is teljes felszereltséggel állunk rendelkezésére.'
    },
    {
      triggers: ['fustol', 'szikrazik', 'egett', 'tuzveszely', 'melegszik', 'egesszag'],
      label: 'Élet- és Tűzveszély',
      eyebrow: '🔥 ÉLET- ÉS TŰZVESZÉLY AZONNALI MEGSZÜNTETÉSE',
      title: 'Szikrázó Aljzat & Égésszag <span class="text-gold">Azonnali Elhárítása</span>',
      lead: 'Szikrázik a dugalj vagy égésszag érezhető? Kapcsolja le a kismegszakítót és hívja azonnal 0–24 ügyeleti számunkat!'
    },

    // --- BIZTOSÍTÉKTÁBLA & FI-RELÉ ---
    {
      triggers: ['biztositek', 'tablacsere', 'biztositektabla', 'kismegszakito', 'fi rele', 'firele', 'aramvedo'],
      label: 'Biztosítéktábla Csere',
      eyebrow: '⚡ BIZTOSÍTÉKTÁBLA CSERE & ÉLETVÉDELMI FI-RELÉ',
      title: 'Biztosítéktábla Csere & <span class="text-gold">FI-relé Beépítés</span>',
      lead: 'Régi elavult olvadóbiztosítékok cseréje modern Schneider és Hager moduláris lakáselosztóra, életvédelmi FI-relével.'
    },

    // --- FŐZŐLAP, SÜTŐ & KONYHAI GÉPEK ---
    {
      triggers: ['fozolap', 'indukcio', 'suto', 'tuzhely', 'gepbekotes', 'garancialis bekotes', 'villanytuzhely', 'keramia'],
      label: 'Főzőlap & Sütő Bekötés',
      eyebrow: '🍳 HIVATALOS GARANCIÁLIS GÉPBEKÖTÉS PECSÉTTEL',
      title: 'Indukciós Főzőlap & Sütő <span class="text-gold">Hivatalos Bekötése</span>',
      lead: 'Garanciális bekötés hivatalos pecséttel, számlával és érintésvédelmi ellenőrzéssel minden típushoz (Bosch, Electrolux, Whirlpool stb.).'
    },

    // --- VBF & SZABVÁNYOSÍTÁS ---
    {
      triggers: ['vbf', 'felulvizsgalat', 'jegyzokonyv', 'erintesvedelem', 'szabvanyositas', 'minosito irat', 'villamos biztonsagi'],
      label: 'VBF Felülvizsgálat',
      eyebrow: '📋 HIVATALOS VBF FELÜLVIZSGÁLAT & MINŐSÍTŐ IRAT',
      title: 'Villamos Biztonsági Felülvizsgálat <span class="text-gold">(VBF) & Jegyzőkönyv</span>',
      lead: 'Hivatalos VBF felülvizsgálat és minősítő irat ingatlaneladáshoz, bérbeadáshoz vagy hatósági előírásokhoz akár 48 órán belül.'
    },

    // --- ELEKTROMOS AUTÓ TÖLTŐ (WALLBOX) ---
    {
      triggers: ['wallbox', 'autotolto', 'tolto', 'elektromos auto', 'ev charging', 'ev tolto', 'fali tolto'],
      label: 'Elektromos Autó Töltő',
      eyebrow: '🚗 ELEKTROMOS AUTÓ TÖLTŐ (WALLBOX) TELEPÍTÉS',
      title: 'Otthoni Wallbox Fali Töltő <span class="text-gold">Szakszerű Kiépítése</span>',
      lead: '11 kW és 22 kW fali gyorstöltők biztonságos mechanikai és villamos bekötése garázsban vagy kocsibeállón B típusú védelemmel.'
    },

    // --- HÁLÓZAT FELÚJÍTÁS & ÁTVEZETÉKEZÉS ---
    {
      triggers: ['felujitas', 'ujrahuzas', 'athuzas', 'vezetekezes', 'alapszereles', 'panellakas', 'vezetek csere'],
      label: 'Hálózat Felújítás',
      eyebrow: '🔨 KOMPLETT VILLAMOS FELÚJÍTÁS & ÁTVEZETÉKEZÉS',
      title: 'Villamos Hálózat Felújítás & <span class="text-gold">Újrahúzás</span>',
      lead: 'Elöregedett alumínium hálózatok komplett cseréje rézvezetékre panel- és téglaépületekben, pormentes horonymarással és garanciával.'
    },

    // --- LED & VILÁGÍTÁS ---
    {
      triggers: ['led', 'vilagitas', 'rejtett vilagitas', 'pultvilagitas', 'fenyeroszabalyzas', 'okosvilagitas', 'led szalag'],
      label: 'LED Világítás',
      eyebrow: '💡 PRÉMIUM LED VILÁGÍTÁS TERVEZÉS & KIVITELEZÉS',
      title: 'Modern LED Világítás Tervezés & <span class="text-gold">Kivitelezés</span>',
      lead: 'Mennyezeti indirekt rejtett világítás, konyhapult fénysorok és fali okosvezérlők szakszerű hűtőprofilos beépítése.'
    },

    // --- DUGALJ, KAPCSOLÓ & SZERELVÉNYEZÉS ---
    {
      triggers: ['konnektor', 'dugalj', 'kapcsolo', 'szerelvenyezes', 'lampatest', 'csillar'],
      label: 'Szerelvényezés & Konnektorok',
      eyebrow: '🔌 DUGALJAK, KAPCSOLÓK & LÁMPATESTEK SZERELÉSE',
      title: 'Konnektorok, Kapcsolók & <span class="text-gold">Lámpák Szerelése</span>',
      lead: 'Szerelvényezés festés után karcmentes pontossággal, beégett aljzatok cseréje és új kiállások kiépítése garanciával.'
    }
  ];

  // Helyi kerületi / települési célzás felismerése
  const districtMap = {
    '1 kerulet': 'I. kerület (Várkerület)',
    '2 kerulet': 'II. kerület (Rózsadomb, Pasarét)',
    '3 kerulet': 'III. kerület (Óbuda, Békásmegyer)',
    '4 kerulet': 'IV. kerület (Újpest)',
    '5 kerulet': 'V. kerület (Belváros, Lipótváros)',
    '6 kerulet': 'VI. kerület (Terézváros)',
    '7 kerulet': 'VII. kerület (Erzsébetváros)',
    '8 kerulet': 'VIII. kerület (Józsefváros)',
    '9 kerulet': 'IX. kerület (Ferencváros)',
    '10 kerulet': 'X. kerület (Kőbánya)',
    '11 kerulet': 'XI. kerület (Újbuda, Gazdagrét, Kelenföld)',
    '12 kerulet': 'XII. kerület (Hegyvidék)',
    '13 kerulet': 'XIII. kerület (Angyalföld, Újlipótváros)',
    '14 kerulet': 'XIV. kerület (Zugló)',
    '15 kerulet': 'XV. kerület (Rákospalota, Újpalota)',
    '16 kerulet': 'XVI. kerület (Mátyásföld, Sashalom)',
    '17 kerulet': 'XVII. kerület (Rákosmente)',
    '18 kerulet': 'XVIII. kerület (Pestszentlőrinc)',
    '19 kerulet': 'XIX. kerület (Kispest)',
    '20 kerulet': 'XX. kerület (Pesterzsébet)',
    '21 kerulet': 'XXI. kerület (Csepel)',
    '22 kerulet': 'XXII. kerület (Budafok, Nagytétény)',
    '23 kerulet': 'XXIII. kerület (Soroksár)',
    'budaors': 'Budaörs és környéke',
    'dunakeszi': 'Dunakeszi és környéke',
    'szentendre': 'Szentendre és környéke',
    'erd': 'Érd és környéke',
    'godollo': 'Gödöllő és környéke'
  };

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Paraméterek beolvasása (több lehetséges Google Ads névből)
    const rawParam = getQueryParam(['tema', 'keyword', 'utm_term', 'q', 'kw']);
    const rawDistrict = getQueryParam(['kerulet', 'district', 'varos', 'city']);

    const cleanParam = removeAccents(rawParam);
    const cleanDistrict = removeAccents(rawDistrict);

    let matchedTopic = null;
    let matchedDistrictLabel = null;

    // Téma keresése a mátrixban
    if (cleanParam) {
      for (const item of keywordMatrix) {
        for (const trigger of item.triggers) {
          if (cleanParam.includes(removeAccents(trigger))) {
            matchedTopic = item;
            break;
          }
        }
        if (matchedTopic) break;
      }
    }

    // Kerület keresése
    if (cleanDistrict) {
      for (const key in districtMap) {
        if (cleanDistrict.includes(key)) {
          matchedDistrictLabel = districtMap[key];
          break;
        }
      }
    } else if (cleanParam) {
      // Ha a kulcsszóban szerepel a kerület (pl. "villanyszerelo 13 kerulet")
      for (const key in districtMap) {
        if (cleanParam.includes(key)) {
          matchedDistrictLabel = districtMap[key];
          break;
        }
      }
    }

    // 2. Tartalom dinamikus módosítása a DOM-ban
    const eyebrowEl = document.querySelector('.hero-eyebrow, [data-dynamic-eyebrow]');
    const titleEl = document.querySelector('[data-dynamic-hero-title], .hero-title');
    const leadEl = document.querySelector('.hero-desc-lead, [data-dynamic-lead]');
    const formSubjectEl = document.getElementById('formSubject');

    // Téma alapú frissítés
    if (matchedTopic) {
      if (eyebrowEl && matchedTopic.eyebrow) {
        eyebrowEl.innerHTML = `<span class="pulse-dot"></span> ` + matchedTopic.eyebrow;
      }

      if (titleEl && matchedTopic.title) {
        titleEl.innerHTML = matchedTopic.title;
      }

      if (leadEl && matchedTopic.lead) {
        leadEl.textContent = matchedTopic.lead;
      }

      // Űrlap tárgymező finomhangolása az e-mailhez
      if (formSubjectEl) {
        const currentVal = formSubjectEl.value || 'Villux Megkeresés';
        formSubjectEl.value = currentVal + ` [Kampány: ${matchedTopic.label}]`;
      }
    }

    // Kerület alapú kiegészítés
    if (matchedDistrictLabel) {
      if (eyebrowEl) {
        eyebrowEl.innerHTML = `<span class="pulse-dot"></span> KISZÁLLÁS: ${matchedDistrictLabel.toUpperCase()}`;
      }
      if (formSubjectEl) {
        formSubjectEl.value += ` [Helyszín: ${matchedDistrictLabel}]`;
      }
    }

    // 3. Paraméterek megőrzése belső navigáció során (ne vesszenek el az UTM adatok)
    if (window.location.search) {
      const currentQuery = window.location.search;
      const navLinks = document.querySelectorAll('.nav-dropdown-item, .nav-link, a.header-logo');
      navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.includes('?')) {
          link.setAttribute('href', href + currentQuery);
        }
      });
    }
  });
})();
