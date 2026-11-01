/**
 * Villux – Intelligens Google Ads Kulcsszó- és Címsor Illesztő Rendszer v2.0
 * 
 * Főbb képességek:
 * 1. Paraméter-hierarchia: 'tema' (elsődleges) > 'keyword'/'utm_term'/'q' (másodlagos)
 * 2. Prioritásos és szótő-alapú egyezés (a specifikusabb kifejezések élveznek előnyt)
 * 3. Téma és Kerület szinergia (a kerület NEM felülírja, hanem elegánsan kiegészíti a jelvényt)
 * 4. Hiteles, szolgáltatás-specifikus ígéretek (SOS vs. Tervezett munkák szétválasztása)
 * 5. Teljes körű belső link-öröklés (minden releváns aloldalra átviszi a kampányparamétereket)
 * 6. Duplikációmentes és strukturált űrlap-tárgymező frissítés (#formSubject)
 */
(function() {
  'use strict';

  // 1. Ékezetmentesítés és normalizálás
  function normalize(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\-_+.]/g, ' ')
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .trim();
  }

  // 2. Paraméterek kinyerése
  function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    return val ? val.trim() : null;
  }

  // 3. Szolgáltatási kategóriák (tema alapú definíciók hiteles ígéretekkel)
  const categoryThemes = {
    'zarlat': {
      id: 'zarlat',
      label: 'Zárlat & Hibakeresés',
      badge: '⚡ AZONNALI ZÁRLATELHÁRÍTÁS',
      title: 'Azonnali Zárlatkeresés & <span class="text-gold">Hibaelhárítás</span>',
      lead: 'Zárlat vagy leverődő biztosíték? Műszeres hibakereséssel falbontás nélkül elhárítjuk a veszélyt akár 30–60 percen belül.'
    },
    'aramszunet': {
      id: 'aramszunet',
      label: 'Áramkimaradás 0–24',
      badge: '⚡ SOS ÁRAMKIMARADÁS ELHÁRÍTÁS',
      title: '0–24 SOS Áramkimaradás <span class="text-gold">Elhárítás</span>',
      lead: 'Elment az áram a lakásban? Ügyeletes gyorsszolgálatunk éjjel-nappal azonnali kiszállásra kész Budapesten és Pest megyében.'
    },
    'sos': {
      id: 'sos',
      label: '0–24 SOS Gyorsszolgálat',
      badge: '⚡ 0–24 SOS GYORSSZOLGÁLAT',
      title: '0–24 SOS Villanyszerelő <span class="text-gold">Gyorsszolgálat</span>',
      lead: 'Sürgős elektromos hibaelhárítás Budapesten és Pest megyében akár 30–60 percen belüli érkezéssel.'
    },
    'ejjel': {
      id: 'ejjel',
      label: 'Éjszakai Ügyelet',
      badge: '🌙 0–24 ÉJSZAKAI GYORSSZOLGÁLAT',
      title: 'Éjszakai Villanyszerelő <span class="text-gold">Ügyelet 0–24</span>',
      lead: 'Munkaidőn túli vagy éjszakai elektromos vészhelyzet? Éjjel-nappali ügyeletünk azonnal hívható.'
    },
    'hetvege': {
      id: 'hetvege',
      label: 'Hétvégi Ügyelet',
      badge: '📅 HÉTVÉGI & ÜNNEPNAPI ÜGYELET',
      title: 'Hétvégi Villanyszerelő <span class="text-gold">Ügyelet Budapesten</span>',
      lead: 'Szombaton vagy vasárnap ment el az áram? Hétvégén és ünnepnapokon is teljes készenléttel indulunk.'
    },
    'fustol': {
      id: 'fustol',
      label: 'Szikrázó Aljzat / Tűzveszély',
      badge: '🔥 ÉLET- ÉS TŰZVESZÉLY ELHÁRÍTÁS',
      title: 'Szikrázó Aljzat & Égésszag <span class="text-gold">Azonnali Javítása</span>',
      lead: 'Szikrázik a konnektor vagy füstöl a kötődoboz? Kapcsolja le a kismegszakítót és hívja gyorsszolgálatunkat azonnal!'
    },
    'biztositek': {
      id: 'biztositek',
      label: 'Biztosítéktábla Csere',
      badge: '⚡ BIZTOSÍTÉKTÁBLA CSERE & FI-RELÉ',
      title: 'Biztosítéktábla Csere & <span class="text-gold">FI-relé Beépítés</span>',
      lead: 'Régi elavult olvadóbiztosítékok szakszerű cseréje modern Schneider és Hager kismegszakítókra, életvédelmi FI-relével.'
    },
    'fozolap': {
      id: 'fozolap',
      label: 'Főzőlap & Sütő Bekötés',
      badge: '🍳 HIVATALOS GARANCIÁLIS GÉPBEKÖTÉS',
      title: 'Indukciós Főzőlap & Sütő <span class="text-gold">Hivatalos Bekötése</span>',
      lead: 'Garanciális bekötés hivatalos pecséttel, számlával és érintésvédelmi ellenőrzéssel minden gyártmányhoz (Bosch, Electrolux stb.).'
    },
    'vbf': {
      id: 'vbf',
      label: 'VBF Felülvizsgálat',
      badge: '📋 HIVATALOS VBF FELÜLVIZSGÁLAT',
      title: 'Villamos Biztonsági Felülvizsgálat <span class="text-gold">(VBF) & Szabványosítás</span>',
      lead: 'Hivatalos VBF felülvizsgálat és minősítő irat ingatlaneladáshoz, bérbeadáshoz vagy hatósági előírásokhoz 48 órán belül.'
    },
    'wallbox': {
      id: 'wallbox',
      label: 'Elektromos Autó Töltő',
      badge: '🚗 ELEKTROMOS AUTÓ TÖLTŐ KIÉPÍTÉS',
      title: 'Otthoni Wallbox Fali Töltő <span class="text-gold">Szakszerű Kiépítése</span>',
      lead: '11 kW és 22 kW fali gyorstöltők biztonságos mechanikai és villamos bekötése garázsban vagy kocsibeállón B típusú védelemmel.'
    },
    'felujitas': {
      id: 'felujitas',
      label: 'Hálózat Felújítás',
      badge: '🔨 KOMPLETT VILLAMOS FELÚJÍTÁS',
      title: 'Villamos Hálózat Felújítás & <span class="text-gold">Átvezetékezés</span>',
      lead: 'Elöregedett alumínium vezetékek cseréje modern rézvezetékre panel- és téglaépületekben, pormentes falhoronymarással és garanciával.'
    },
    'led': {
      id: 'led',
      label: 'LED Világítás',
      badge: '💡 PRÉMIUM LED VILÁGÍTÁS',
      title: 'Modern LED Világítás Tervezés & <span class="text-gold">Kivitelezés</span>',
      lead: 'Mennyezeti indirekt rejtett világítás, konyhapult fénysorok és fali okosvezérlők szakszerű hűtőprofilos beépítése.'
    },
    'szerelvenyezes': {
      id: 'szerelvenyezes',
      label: 'Konnektorok & Kapcsolók',
      badge: '🔌 SZERELVÉNYEZÉS & JAVÍTÁS',
      title: 'Konnektorok, Kapcsolók & <span class="text-gold">Lámpák Szerelése</span>',
      lead: 'Szerelvényezés festés után karcmentes pontossággal, beégett aljzatok cseréje és új kiállások kiépítése garanciával.'
    }
  };

  // 4. Keresési kulcsszó illesztési szabályok prioritási súllyal (hosszabb kifejezések magasabb prioritást élveznek)
  const searchRules = [
    { phrase: 'indukcios fozolap bekotes', theme: 'fozolap', priority: 100 },
    { phrase: 'villanytuzhely bekotes', theme: 'fozolap', priority: 100 },
    { phrase: 'elektromos suto bekotes', theme: 'fozolap', priority: 100 },
    { phrase: 'gepbekotes garanciaval', theme: 'fozolap', priority: 95 },
    { phrase: 'biztositektabla csere', theme: 'biztositek', priority: 95 },
    { phrase: 'lakaseloszto csere', theme: 'biztositek', priority: 95 },
    { phrase: 'fi rele beepites', theme: 'biztositek', priority: 95 },
    { phrase: 'aramvedo kapcsolo', theme: 'biztositek', priority: 90 },
    { phrase: 'villamos biztonsagi felulvizsgalat', theme: 'vbf', priority: 100 },
    { phrase: 'erintesvedelmi felulvizsgalat', theme: 'vbf', priority: 100 },
    { phrase: 'vbf jegyzokonyv', theme: 'vbf', priority: 95 },
    { phrase: 'villamos szabvanyositas', theme: 'vbf', priority: 95 },
    { phrase: 'elektromos auto tolto', theme: 'wallbox', priority: 100 },
    { phrase: 'fali tolto kiepites', theme: 'wallbox', priority: 95 },
    { phrase: 'wallbox telepites', theme: 'wallbox', priority: 95 },
    { phrase: 'panellakas villanyszereles', theme: 'felujitas', priority: 90 },
    { phrase: 'halozat felujitas', theme: 'felujitas', priority: 90 },
    { phrase: 'vezetek athuzas', theme: 'felujitas', priority: 90 },
    { phrase: 'rejtett led vilagitas', theme: 'led', priority: 90 },
    { phrase: 'konyhapult vilagitas', theme: 'led', priority: 90 },
    { phrase: 'konnektor szereles', theme: 'szerelvenyezes', priority: 85 },
    { phrase: 'kapcsolo csere', theme: 'szerelvenyezes', priority: 85 },
    { phrase: 'szikrazo konnektor', theme: 'fustol', priority: 90 },
    { phrase: 'fustolo aljzat', theme: 'fustol', priority: 90 },
    { phrase: 'ejjeli villanyszerelo', theme: 'ejjel', priority: 85 },
    { phrase: 'ejszakai villanyszerelo', theme: 'ejjel', priority: 85 },
    { phrase: 'hetvegi villanyszerelo', theme: 'hetvege', priority: 85 },
    { phrase: 'sos villanyszerelo', theme: 'sos', priority: 80 },
    { phrase: 'ugyeletes villanyszerelo', theme: 'sos', priority: 80 },
    { phrase: 'zarlatkereses', theme: 'zarlat', priority: 85 },
    { phrase: 'rovidzarlat', theme: 'zarlat', priority: 85 },
    { phrase: 'aramkimaradas', theme: 'aramszunet', priority: 85 },
    { phrase: 'aramszunet', theme: 'aramszunet', priority: 85 },

    // Egyszavas / tő-alapú illesztések
    { phrase: 'fozolap', theme: 'fozolap', priority: 70 },
    { phrase: 'indukcio', theme: 'fozolap', priority: 70 },
    { phrase: 'tuzhely', theme: 'fozolap', priority: 65 },
    { phrase: 'suto', theme: 'fozolap', priority: 65 },
    { phrase: 'wallbox', theme: 'wallbox', priority: 75 },
    { phrase: 'autotolto', theme: 'wallbox', priority: 75 },
    { phrase: 'vbf', theme: 'vbf', priority: 80 },
    { phrase: 'jegyzokonyv', theme: 'vbf', priority: 70 },
    { phrase: 'firele', theme: 'biztositek', priority: 75 },
    { phrase: 'biztositek', theme: 'biztositek', priority: 70 },
    { phrase: 'kismegszakito', theme: 'biztositek', priority: 70 },
    { phrase: 'zarlat', theme: 'zarlat', priority: 70 },
    { phrase: 'szikra', theme: 'fustol', priority: 70 },
    { phrase: 'fustol', theme: 'fustol', priority: 70 },
    { phrase: 'led', theme: 'led', priority: 65 },
    { phrase: 'konnektor', theme: 'szerelvenyezes', priority: 65 },
    { phrase: 'dugalj', theme: 'szerelvenyezes', priority: 65 },
    { phrase: 'kapcsolo', theme: 'szerelvenyezes', priority: 60 },
    { phrase: 'ujrahuz', theme: 'felujitas', priority: 65 },
    { phrase: 'felujit', theme: 'felujitas', priority: 60 },
    { phrase: 'alapszerel', theme: 'felujitas', priority: 60 },
    { phrase: 'sos', theme: 'sos', priority: 50 },
    { phrase: '0 24', theme: 'sos', priority: 50 },
    { phrase: '0-24', theme: 'sos', priority: 50 },
    { phrase: 'nonstop', theme: 'sos', priority: 50 },
    { phrase: 'ejjel', theme: 'ejjel', priority: 55 },
    { phrase: 'ejszaka', theme: 'ejjel', priority: 55 },
    { phrase: 'hetvege', theme: 'hetvege', priority: 55 }
  ];

  // 5. Kerület és agglomeráció szótár
  const districtDict = [
    { num: 1, keys: ['1 kerulet', 'i kerulet', 'varkerulet'], name: 'I. kerület (Várkerület)', badge: 'I. KERÜLET' },
    { num: 2, keys: ['2 kerulet', 'ii kerulet', 'rozsadomb', 'pasaret'], name: 'II. kerület (Rózsadomb)', badge: 'II. KERÜLET' },
    { num: 3, keys: ['3 kerulet', 'iii kerulet', 'obuda', 'bekasmegyer'], name: 'III. kerület (Óbuda)', badge: 'III. KERÜLET' },
    { num: 4, keys: ['4 kerulet', 'iv kerulet', 'ujpest'], name: 'IV. kerület (Újpest)', badge: 'IV. KERÜLET' },
    { num: 5, keys: ['5 kerulet', 'v kerulet', 'belvaros', 'lipotvaros'], name: 'V. kerület (Belváros)', badge: 'V. KERÜLET' },
    { num: 6, keys: ['6 kerulet', 'vi kerulet', 'terezvaros'], name: 'VI. kerület (Terézváros)', badge: 'VI. KERÜLET' },
    { num: 7, keys: ['7 kerulet', 'vii kerulet', 'erzsebetvaros'], name: 'VII. kerület (Erzsébetváros)', badge: 'VII. KERÜLET' },
    { num: 8, keys: ['8 kerulet', 'viii kerulet', 'jozsefvaros'], name: 'VIII. kerület (Józsefváros)', badge: 'VIII. KERÜLET' },
    { num: 9, keys: ['9 kerulet', 'ix kerulet', 'ferencvaros'], name: 'IX. kerület (Ferencváros)', badge: 'IX. KERÜLET' },
    { num: 10, keys: ['10 kerulet', 'x kerulet', 'kobanya'], name: 'X. kerület (Kőbánya)', badge: 'X. KERÜLET' },
    { num: 11, keys: ['11 kerulet', 'xi kerulet', 'ujbuda', 'gazdagret', 'kelenfold'], name: 'XI. kerület (Újbuda)', badge: 'XI. KERÜLET' },
    { num: 12, keys: ['12 kerulet', 'xii kerulet', 'hegyvidek'], name: 'XII. kerület (Hegyvidék)', badge: 'XII. KERÜLET' },
    { num: 13, keys: ['13 kerulet', 'xiii kerulet', 'angyalfold', 'ujlipotvaros'], name: 'XIII. kerület (Angyalföld)', badge: 'XIII. KERÜLET' },
    { num: 14, keys: ['14 kerulet', 'xiv kerulet', 'zuglo'], name: 'XIV. kerület (Zugló)', badge: 'XIV. KERÜLET' },
    { num: 15, keys: ['15 kerulet', 'xv kerulet', 'rakospalota', 'ujpalota'], name: 'XV. kerület', badge: 'XV. KERÜLET' },
    { num: 16, keys: ['16 kerulet', 'xvi kerulet', 'matyasfold', 'sashalom', 'cinkota'], name: 'XVI. kerület', badge: 'XVI. KERÜLET' },
    { num: 17, keys: ['17 kerulet', 'xvii kerulet', 'rakosmente'], name: 'XVII. kerület', badge: 'XVII. KERÜLET' },
    { num: 18, keys: ['18 kerulet', 'xviii kerulet', 'pestszentlorinc', 'pestszentimre'], name: 'XVIII. kerület', badge: 'XVIII. KERÜLET' },
    { num: 19, keys: ['19 kerulet', 'xix kerulet', 'kispest'], name: 'XIX. kerület (Kispest)', badge: 'XIX. KERÜLET' },
    { num: 20, keys: ['20 kerulet', 'xx kerulet', 'pesterzsebet'], name: 'XX. kerület', badge: 'XX. KERÜLET' },
    { num: 21, keys: ['21 kerulet', 'xxi kerulet', 'csepel'], name: 'XXI. kerület (Csepel)', badge: 'XXI. KERÜLET' },
    { num: 22, keys: ['22 kerulet', 'xxii kerulet', 'budafok', 'nagyteteny'], name: 'XXII. kerület (Budafok)', badge: 'XXII. KERÜLET' },
    { num: 23, keys: ['23 kerulet', 'xxiii kerulet', 'soroksar'], name: 'XXIII. kerület', badge: 'XXIII. KERÜLET' },
    { num: 101, keys: ['budaors'], name: 'Budaörs és környéke', badge: 'BUDAÖRS' },
    { num: 102, keys: ['dunakeszi'], name: 'Dunakeszi és környéke', badge: 'DUNAKESZI' },
    { num: 103, keys: ['szentendre'], name: 'Szentendre és környéke', badge: 'SZENTENDRE' },
    { num: 104, keys: ['erd'], name: 'Érd és környéke', badge: 'ÉRD' },
    { num: 105, keys: ['godollo'], name: 'Gödöllő és környéke', badge: 'GÖDÖLLŐ' }
  ];

  // Kerület feloldása dedikált paraméterből vagy keresőszövegből
  function resolveDistrict(districtParam, textParam) {
    if (districtParam) {
      const cleanD = normalize(districtParam);
      // Szám (1-23)
      const numMatch = cleanD.match(/^(\d{1,2})/);
      if (numMatch) {
        const n = parseInt(numMatch[1], 10);
        if (n >= 1 && n <= 23) {
          const found = districtDict.find(d => d.num === n);
          if (found) return found;
        }
      }
      // Római számok
      const romanMap = { i:1, ii:2, iii:3, iv:4, v:5, vi:6, vii:7, viii:8, ix:9, x:10, xi:11, xii:12, xiii:13, xiv:14, xv:15, xvi:16, xvii:17, xviii:18, xix:19, xx:20, xxi:21, xxii:22, xxiii:23 };
      if (romanMap[cleanD]) {
        const found = districtDict.find(d => d.num === romanMap[cleanD]);
        if (found) return found;
      }
      // Szöveges településnév
      for (const d of districtDict) {
        for (const k of d.keys) {
          if (cleanD.includes(k)) return d;
        }
      }
    }

    if (textParam) {
      const cleanT = normalize(textParam);
      for (const d of districtDict) {
        for (const k of d.keys) {
          if (k.length > 3 && cleanT.includes(k)) {
            return d;
          }
        }
      }
    }

    return null;
  }

  // DOMContentLoaded eseményre futtatás
  document.addEventListener('DOMContentLoaded', function() {
    // 1. LÉPÉS: Paraméterek beolvasása hierarchia szerint
    const rawTema = getQueryParam('tema');
    const rawKeyword = getQueryParam('keyword') || getQueryParam('kw') || getQueryParam('utm_term') || getQueryParam('q');
    const rawDistrict = getQueryParam('kerulet') || getQueryParam('district') || getQueryParam('varos');

    const cleanTema = normalize(rawTema);
    const cleanKeyword = normalize(rawKeyword);

    let matchedCategory = null;

    // A) Elsődleges: 'tema' direkt egyezés ellenőrzése
    if (cleanTema && categoryThemes[cleanTema]) {
      matchedCategory = categoryThemes[cleanTema];
    }

    // B) Másodlagos: Keresőszó prioritásos illesztése
    if (!matchedCategory) {
      const textToSearch = (cleanTema ? cleanTema + ' ' : '') + cleanKeyword;
      if (textToSearch.trim()) {
        let bestMatch = null;
        let highestPriority = -1;

        for (const rule of searchRules) {
          const rulePhrase = normalize(rule.phrase);
          if (textToSearch.includes(rulePhrase) && rule.priority > highestPriority) {
            highestPriority = rule.priority;
            bestMatch = rule;
          }
        }

        if (bestMatch && categoryThemes[bestMatch.theme]) {
          matchedCategory = categoryThemes[bestMatch.theme];
        }
      }
    }

    // C) Kerület beazonosítása
    const matchedDistrict = resolveDistrict(rawDistrict, rawKeyword);

    // 2. LÉPÉS: DOM Frissítés szinergiában (Téma ÉS Kerület együtt)
    const eyebrowEl = document.querySelector('.hero-eyebrow, [data-dynamic-eyebrow]');
    const titleEl = document.querySelector('[data-dynamic-hero-title]');
    const leadEl = document.querySelector('.hero-desc-lead, [data-dynamic-lead]');
    const formSubjectEl = document.getElementById('formSubject');

    // A) Felső jelvény (Eyebrow) összeállítása szinergiában
    if (eyebrowEl && (matchedCategory || matchedDistrict)) {
      let badgeHtml = '<span class="pulse-dot"></span> ';
      if (matchedCategory && matchedDistrict) {
        badgeHtml += `${matchedCategory.badge} • ${matchedDistrict.badge}`;
      } else if (matchedCategory) {
        badgeHtml += matchedCategory.badge;
      } else if (matchedDistrict) {
        badgeHtml += `⚡ GYORSSZOLGÁLAT: ${matchedDistrict.badge}`;
      }
      eyebrowEl.innerHTML = badgeHtml;
    }

    // B) H1 Főcím frissítése
    if (titleEl && matchedCategory && matchedCategory.title) {
      titleEl.innerHTML = matchedCategory.title;
    }

    // C) Bevezető leíró mondat frissítése
    if (leadEl && matchedCategory && matchedCategory.lead) {
      leadEl.textContent = matchedCategory.lead;
    }

    // D) Űrlap tárgymező (#formSubject) tiszta, duplikációmentes beállítása
    if (formSubjectEl && (matchedCategory || matchedDistrict)) {
      const topicPart = matchedCategory ? matchedCategory.label : 'Általános Megkeresés';
      const districtPart = matchedDistrict ? ` | ${matchedDistrict.name}` : '';
      formSubjectEl.value = `⚡ Villux Megkeresés | ${topicPart}${districtPart}`;
    }

    // 3. LÉPÉS: Teljes körű belső link-öröklés
    if (window.location.search) {
      const searchParams = window.location.search;
      const allLinks = document.querySelectorAll('a[href]');
      
      allLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (!href) return;

        const isInternal = (
          href.endsWith('.html') ||
          (href.includes('.html#') && !href.startsWith('http')) ||
          (!href.includes('://') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('#'))
        );

        if (isInternal && !href.includes('?')) {
          if (href.includes('#')) {
            const parts = href.split('#');
            link.setAttribute('href', parts[0] + searchParams + '#' + parts[1]);
          } else {
            link.setAttribute('href', href + searchParams);
          }
        }
      });
    }
  });
})();
