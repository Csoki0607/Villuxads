/**
 * Villux – Intelligens Google Ads Kulcsszó-, Címsor- és Kampányparaméter-kezelő Rendszer v2.2
 * 
 * Biztonsági és Architektúrális Finomítások:
 * 1. Precíz URL útvonal-megőrzés (nem csonkítja a kezdő / jelet, külön kezeli a root, relatív és query-only linkeket)
 * 2. document.readyState ellenőrzés (azonnali futtatás, ha a DOM már betöltődött)
 * 3. Célzott H1 keresés hero konténerre szűkítve (megakadályozza az oldal egyéb részein lévő H1-ek felülírását)
 * 4. Szóhatár-alapú kulcsszó- és szótőfelismerés (\b)
 * 5. Témakód és slug-alias rendszer (pl. ?tema=fozolap-bekotes -> fozolap)
 * 6. Biztonságos kerületfelismerés (szóhatárok, kizárja az 1 / 11, I / XIII tévesztéseket)
 * 7. Az 5 megerősített, szolgáltatás-specifikus szakmai garancia megtartása
 */
(function() {
  'use strict';

  // 1. Ékezetmentesítés és normalizálás
  function normalize(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[\-_+.,;:\/]/g, ' ')
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .trim();
  }

  // 2. Keresési paraméter kinyerése
  function getQueryParam(key) {
    try {
      const params = new URLSearchParams(window.location.search);
      const val = params.get(key);
      return val ? val.trim() : null;
    } catch (e) {
      return null;
    }
  }

  // 3. Kanonikus szolgáltatási kategóriák (hiteles, szakmailag alátámasztott ígéretekkel)
  const categoryThemes = {
    'zarlat': {
      id: 'zarlat',
      label: 'Zárlat & Hibakeresés',
      badge: '⚡ AZONNALI ZÁRLATELHÁRÍTÁS',
      title: 'Azonnali Zárlatkeresés & <span class="text-gold">Hibaelhárítás</span>',
      lead: 'Zárlat vagy leverődő biztosíték? Műszeres hibakereséssel falbontás nélkül elhárítjuk a hibát akár 30–60 percen belül.'
    },
    'aramszunet': {
      id: 'aramszunet',
      label: 'Áramkimaradás 0–24',
      badge: '⚡ SOS ÁRAMKIMARADÁS ELHÁRÍTÁS',
      title: '0–24 SOS Áramkimaradás <span class="text-gold">Elhárítás</span>',
      lead: 'Elment az áram a lakásban vagy leoldott a főbiztosíték? Ügyeletes gyorsszolgálatunk éjjel-nappal azonnali indulásra kész.'
    },
    'sos': {
      id: 'sos',
      label: '0–24 SOS Gyorsszolgálat',
      badge: '⚡ 0–24 SOS GYORSSZOLGÁLAT',
      title: '0–24 SOS Villanyszerelő <span class="text-gold">Gyorsszolgálat</span>',
      lead: 'Sürgős elektromos hibaelhárítás Budapesten és Pest megyében akár 30–60 percen belüli helyszínre érkezéssel.'
    },
    'ejjel': {
      id: 'ejjel',
      label: 'Éjszakai Ügyelet',
      badge: '🌙 0–24 ÉJSZAKAI GYORSSZOLGÁLAT',
      title: 'Éjszakai Villanyszerelő <span class="text-gold">Ügyelet 0–24</span>',
      lead: 'Munkaidőn túli vagy késő éjszakai elektromos vészhelyzet? Éjjel-nappali telefonos ügyeletünk azonnal hívható.'
    },
    'hetvege': {
      id: 'hetvege',
      label: 'Hétvégi Ügyelet',
      badge: '📅 HÉTVÉGI & ÜNNEPNAPI ÜGYELET',
      title: 'Hétvégi Villanyszerelő <span class="text-gold">Ügyelet 0–24</span>',
      lead: 'Szombaton vagy vasárnap lépett fel áramhiba? Hétvégén és ünnepnapokon is teljes készültségben dolgozunk.'
    },
    'fustol': {
      id: 'fustol',
      label: 'Szikrázó Aljzat / Tűzveszély',
      badge: '🔥 ÉLET- ÉS TŰZVESZÉLY ELHÁRÍTÁS',
      title: 'Szikrázó Aljzat & Égésszag <span class="text-gold">Azonnali Javítása</span>',
      lead: 'Szikrázik a konnektor vagy égésszag jön a dobozból? Kapcsolja le a biztosítékot, szervizünk azonnal indul a vészhelyzet elhárítására.'
    },
    'biztositek': {
      id: 'biztositek',
      label: 'Biztosítéktábla Csere',
      badge: '⚡ BIZTOSÍTÉKTÁBLA CSERE & FI-RELÉ',
      title: 'Biztosítéktábla Csere & <span class="text-gold">FI-relé Beépítés</span>',
      lead: 'Elavult olvadóbiztosítékok szakszerű cseréje modern Schneider és Hager kismegszakítókra, életvédelmi FI-relé beépítésével.'
    },
    'fozolap': {
      id: 'fozolap',
      label: 'Főzőlap & Sütő Bekötés',
      badge: '🍳 HIVATALOS GARANCIÁLIS GÉPBEKÖTÉS',
      title: 'Indukciós Főzőlap & Sütő <span class="text-gold">Hivatalos Bekötése</span>',
      lead: 'Hivatalos garanciális gépbekötés gyártói pecséttel, számlával és érintésvédelmi ellenőrzéssel minden márkához (Bosch, Electrolux, AEG stb.).'
    },
    'vbf': {
      id: 'vbf',
      label: 'VBF Felülvizsgálat',
      badge: '📋 HIVATALOS VBF FELÜLVIZSGÁLAT',
      title: 'Villamos Biztonsági Felülvizsgálat <span class="text-gold">(VBF) & Szabványosítás</span>',
      lead: 'Hivatalos VBF felülvizsgálat és minősítő irat ingatlaneladáshoz, bérbeadáshoz vagy hatósági előírásokhoz akár 48 órán belül.'
    },
    'wallbox': {
      id: 'wallbox',
      label: 'Elektromos Autó Töltő',
      badge: '🚗 ELEKTROMOS AUTÓ TÖLTŐ KIÉPÍTÉS',
      title: 'Otthoni Wallbox Fali Töltő <span class="text-gold">Szakszerű Kiépítése</span>',
      lead: '11 kW és 22 kW fali gyorstöltők biztonságos telepítése méretezett tápkábellel és B típusú egyenáramú szivárgásvédelemmel.'
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
      lead: 'Mennyezeti indirekt rejtett világítások, konyhapult fénysorok és fali okosvezérlők szakszerű hűtőprofilos beépítése.'
    },
    'szerelvenyezes': {
      id: 'szerelvenyezes',
      label: 'Konnektorok & Kapcsolók',
      badge: '🔌 SZERELVÉNYEZÉS & JAVÍTÁS',
      title: 'Konnektorok, Kapcsolók & <span class="text-gold">Lámpák Szerelése</span>',
      lead: 'Szerelvényezés festés után karcmentes pontossággal, beégett dugaljak cseréje és új áramköri kiállások kiépítése garanciával.'
    }
  };

  // 4. Témakód aliasok és slug-ok
  const themeAliases = {
    // Zárlat
    'zarlat': 'zarlat',
    'zarlatelharitas': 'zarlat',
    'zarlat-elharitas': 'zarlat',
    'zarlatkereses': 'zarlat',
    'rovidzarlat': 'zarlat',
    'hibakereses': 'zarlat',
    'hibaelharitas': 'zarlat',

    // Áramszünet
    'aramszunet': 'aramszunet',
    'aramkimaradas': 'aramszunet',
    'nincs-aram': 'aramszunet',

    // SOS & Ügyelet
    'sos': 'sos',
    'sos-villanyszerelo': 'sos',
    'gyorsszolgalat': 'sos',
    'ugyelet': 'sos',
    'nonstop': 'sos',
    'ejjel': 'ejjel',
    'ejszakai': 'ejjel',
    'ejszakai-villanyszerelo': 'ejjel',
    'hetvege': 'hetvege',
    'hetvegi-ugyelet': 'hetvege',
    'hetvegi-villanyszerelo': 'hetvege',

    // Főzőlap & sütő gépbekötés
    'fozolap': 'fozolap',
    'fozolap-bekotes': 'fozolap',
    'indukcios-fozolap': 'fozolap',
    'indukcios-fozolap-bekotes': 'fozolap',
    'suto-bekotes': 'fozolap',
    'suto': 'fozolap',
    'villanytuzhely': 'fozolap',
    'villanytuzhely-bekotes': 'fozolap',
    'gepbekotes': 'fozolap',
    'tuzhely': 'fozolap',

    // Biztosítéktábla
    'biztositek': 'biztositek',
    'biztositektabla': 'biztositek',
    'biztositektabla-szereles': 'biztositek',
    'biztositektabla-csere': 'biztositek',
    'eloszto': 'biztositek',
    'lakaseloszto': 'biztositek',
    'fi-rele': 'biztositek',
    'firele': 'biztositek',
    'kismegszakito': 'biztositek',

    // VBF
    'vbf': 'vbf',
    'vbf-felulvizsgalat': 'vbf',
    'erintesvedelem': 'vbf',
    'erintesvedelmi-felulvizsgalat': 'vbf',
    'villamos-szabvanyositas': 'vbf',
    'villamos-biztonsagi-felulvizsgalat': 'vbf',
    'jegyzokonyv': 'vbf',

    // Wallbox & E-autó töltő
    'wallbox': 'wallbox',
    'autotolto': 'wallbox',
    'auto-tolto': 'wallbox',
    'elektromos-auto-tolto': 'wallbox',
    'tolto-kiepites': 'wallbox',
    'fali-tolto': 'wallbox',

    // Felújítás
    'felujitas': 'felujitas',
    'halozat-felujitas': 'felujitas',
    'villamos-halozat-felujitas': 'felujitas',
    'panellakas': 'felujitas',
    'panel-villanyszereles': 'felujitas',
    'atvezetekezes': 'felujitas',
    'vezetekcsere': 'felujitas',

    // LED
    'led': 'led',
    'led-vilagitas': 'led',
    'vilagitas': 'led',
    'rejtett-vilagitas': 'led',

    // Szerelvényezés
    'szerelvenyezes': 'szerelvenyezes',
    'konnektor': 'szerelvenyezes',
    'kapcsolo': 'szerelvenyezes',
    'dugalj': 'szerelvenyezes',

    // Tűzveszély / Szikra / Füst
    'fustol': 'fustol',
    'szikra': 'fustol',
    'szikrazo-konnektor': 'fustol',
    'egesszag': 'fustol',
    'tuzveszely': 'fustol'
  };

  // Témakód feloldása slug-ból vagy szövegből
  function resolveThemeSlug(rawVal) {
    if (!rawVal) return null;
    const clean = rawVal.toLowerCase().trim();
    if (themeAliases[clean]) return themeAliases[clean];
    const dashed = clean.replace(/[\s_]+/g, '-');
    if (themeAliases[dashed]) return themeAliases[dashed];
    const normalized = normalize(clean).replace(/\s+/g, '-');
    if (themeAliases[normalized]) return themeAliases[normalized];
    return null;
  }

  // 5. Keresőszó-illesztési szabályok szóhatárokkal és prioritási rangsorral
  const searchRules = [
    // Prioritás 100+: Hosszú, több szavas, egyértelmű kifejezések
    { pattern: /\bindukcios\s+fozolap\s*(bekot(es|ese|est)?)?\b/i, theme: 'fozolap', priority: 110 },
    { pattern: /\bvillanytuzhely\s*(bekot(es|ese|est)?)?\b/i, theme: 'fozolap', priority: 110 },
    { pattern: /\belektromos\s+suto\s*(bekot(es|ese|est)?)?\b/i, theme: 'fozolap', priority: 110 },
    { pattern: /\bgepbekotes\s*(hivatalos|pecsettel|garanciaval)?\b/i, theme: 'fozolap', priority: 105 },
    { pattern: /\bvillamos\s+biztonsagi\s+felulvizsgalat\b/i, theme: 'vbf', priority: 115 },
    { pattern: /\berintesvedelmi\s+felulvizsgalat\b/i, theme: 'vbf', priority: 115 },
    { pattern: /\bvbf\s*(jegyzokonyv|minosito|vizsgalat)?\b/i, theme: 'vbf', priority: 110 },
    { pattern: /\bvillamos\s+szabvanyositas\b/i, theme: 'vbf', priority: 105 },
    { pattern: /\belektromos\s+auto\s*tolto\b/i, theme: 'wallbox', priority: 110 },
    { pattern: /\bfali\s+tolto\s*kiepites\b/i, theme: 'wallbox', priority: 105 },
    { pattern: /\bwallbox\s*(telepites|bekotes|szereles)?\b/i, theme: 'wallbox', priority: 105 },
    { pattern: /\bbiztositektabla\s*(cser(e|et|eje)|szerel(es|est|ese))\b/i, theme: 'biztositek', priority: 105 },
    { pattern: /\blakaseloszto\s*(cser(e|et|eje)|szerel(es|est|ese))\b/i, theme: 'biztositek', priority: 105 },
    { pattern: /\bfi\s*rele\s*(beepites|szereles|cser(e|et))?\b/i, theme: 'biztositek', priority: 105 },
    { pattern: /\baramvedo\s*kapcsolo\b/i, theme: 'biztositek', priority: 100 },
    { pattern: /\bpanellakas\s*villanyszerel(es|o|est)?\b/i, theme: 'felujitas', priority: 100 },
    { pattern: /\b(halozat|villamos)\s*felujit(as|ast|asa)?\b/i, theme: 'felujitas', priority: 100 },
    { pattern: /\bvezetek\s*(athuzas|csere|ujrahuzas)\b/i, theme: 'felujitas', priority: 100 },
    { pattern: /\bszikrazo\s*(konnektor|aljzat|kapcsolo)\b/i, theme: 'fustol', priority: 105 },
    { pattern: /\bfustol(o)?\s*(kotes|doboz|aljzat|vezetek)?\b/i, theme: 'fustol', priority: 105 },
    { pattern: /\begesszag\b/i, theme: 'fustol', priority: 100 },
    { pattern: /\bejszakai\s+villanyszerel(o|es|est)?\b/i, theme: 'ejjel', priority: 95 },
    { pattern: /\bejjeli\s+villanyszerel(o|es|est)?\b/i, theme: 'ejjel', priority: 95 },
    { pattern: /\bhetvegi\s+villanyszerel(o|es|est)?\b/i, theme: 'hetvege', priority: 95 },
    { pattern: /\bsos\s+villanyszerel(o|es|est)?\b/i, theme: 'sos', priority: 90 },
    { pattern: /\bugyeletes\s+villanyszerel(o|es|est)?\b/i, theme: 'sos', priority: 90 },
    { pattern: /\bzarlatkeres(es|est)?\b/i, theme: 'zarlat', priority: 95 },
    { pattern: /\b(rovid)?zarlat\s*(elharitas|javitas)?\b/i, theme: 'zarlat', priority: 95 },
    { pattern: /\baram(szunet|kimaradas)\b/i, theme: 'aramszunet', priority: 95 },
    { pattern: /\brejtett\s*(led\s*)?vilagitas\b/i, theme: 'led', priority: 90 },
    { pattern: /\bkonyhapult\s*vilagitas\b/i, theme: 'led', priority: 90 },
    { pattern: /\bkonnektor\s*(szereles|csere|beepites)\b/i, theme: 'szerelvenyezes', priority: 90 },
    { pattern: /\bkapcsolo\s*(szereles|csere|beepites)\b/i, theme: 'szerelvenyezes', priority: 90 },

    // Prioritás 60-80: Tő-alapú egy szavas illeszkedések szóhatárral
    { pattern: /\bfozolap(ot)?\b/i, theme: 'fozolap', priority: 80 },
    { pattern: /\bindukcio(s)?\b/i, theme: 'fozolap', priority: 75 },
    { pattern: /\bsuto(t)?\b/i, theme: 'fozolap', priority: 70 },
    { pattern: /\btuzhely(t)?\b/i, theme: 'fozolap', priority: 70 },
    { pattern: /\bautotolto\b/i, theme: 'wallbox', priority: 80 },
    { pattern: /\bwallbox\b/i, theme: 'wallbox', priority: 80 },
    { pattern: /\bvbf\b/i, theme: 'vbf', priority: 85 },
    { pattern: /\bminosito\s*irat\b/i, theme: 'vbf', priority: 80 },
    { pattern: /\bfirele\b/i, theme: 'biztositek', priority: 80 },
    { pattern: /\bbiztositek(ok)?\b/i, theme: 'biztositek', priority: 75 },
    { pattern: /\bkismegszakito(k)?\b/i, theme: 'biztositek', priority: 75 },
    { pattern: /\bzarlat\b/i, theme: 'zarlat', priority: 80 },
    { pattern: /\bfust(ol)?\b/i, theme: 'fustol', priority: 75 },
    { pattern: /\bszikra\b/i, theme: 'fustol', priority: 75 },
    { pattern: /\bled\b/i, theme: 'led', priority: 70 },
    { pattern: /\bkonnektor(ok)?\b/i, theme: 'szerelvenyezes', priority: 70 },
    { pattern: /\bdugalj(ak)?\b/i, theme: 'szerelvenyezes', priority: 70 },
    { pattern: /\bkapcsolo(k)?\b/i, theme: 'szerelvenyezes', priority: 65 },
    { pattern: /\bujrahuz(as)?\b/i, theme: 'felujitas', priority: 70 },
    { pattern: /\batvezetekez(es)?\b/i, theme: 'felujitas', priority: 70 },
    { pattern: /\bsos\b/i, theme: 'sos', priority: 60 },
    { pattern: /\b(0\s*24|0\-24|nonstop)\b/i, theme: 'sos', priority: 60 },
    { pattern: /\bejszaka\b/i, theme: 'ejjel', priority: 65 },
    { pattern: /\bejjel\b/i, theme: 'ejjel', priority: 65 },
    { pattern: /\bhetvege\b/i, theme: 'hetvege', priority: 65 }
  ];

  // 6. Kerület és agglomeráció szótár prioritásos és szóhatár-alapú vizsgálattal
  const districtDict = [
    // 2 számjegyű kerületek
    { num: 23, regex: /\b(23(\.|\s|ker|kerulet)?|xxiii(\.|\s|ker|kerulet)?|soroksar)\b/i, name: 'XXIII. kerület (Soroksár)', badge: 'XXIII. KERÜLET' },
    { num: 22, regex: /\b(22(\.|\s|ker|kerulet)?|xxii(\.|\s|ker|kerulet)?|budafok|nagyteteny)\b/i, name: 'XXII. kerület (Budafok)', badge: 'XXII. KERÜLET' },
    { num: 21, regex: /\b(21(\.|\s|ker|kerulet)?|xxi(\.|\s|ker|kerulet)?|csepel)\b/i, name: 'XXI. kerület (Csepel)', badge: 'XXI. KERÜLET' },
    { num: 20, regex: /\b(20(\.|\s|ker|kerulet)?|xx(\.|\s|ker|kerulet)?|pesterzsebet)\b/i, name: 'XX. kerület (Pesterzsébet)', badge: 'XX. KERÜLET' },
    { num: 19, regex: /\b(19(\.|\s|ker|kerulet)?|xix(\.|\s|ker|kerulet)?|kispest)\b/i, name: 'XIX. kerület (Kispest)', badge: 'XIX. KERÜLET' },
    { num: 18, regex: /\b(18(\.|\s|ker|kerulet)?|xviii(\.|\s|ker|kerulet)?|pestszentlorinc|pestszentimre)\b/i, name: 'XVIII. kerület', badge: 'XVIII. KERÜLET' },
    { num: 17, regex: /\b(17(\.|\s|ker|kerulet)?|xvii(\.|\s|ker|kerulet)?|rakosmente)\b/i, name: 'XVII. kerület', badge: 'XVII. KERÜLET' },
    { num: 16, regex: /\b(16(\.|\s|ker|kerulet)?|xvi(\.|\s|ker|kerulet)?|matyasfold|sashalom|cinkota)\b/i, name: 'XVI. kerület', badge: 'XVI. KERÜLET' },
    { num: 15, regex: /\b(15(\.|\s|ker|kerulet)?|xv(\.|\s|ker|kerulet)?|rakospalota|ujpalota)\b/i, name: 'XV. kerület', badge: 'XV. KERÜLET' },
    { num: 14, regex: /\b(14(\.|\s|ker|kerulet)?|xiv(\.|\s|ker|kerulet)?|zuglo)\b/i, name: 'XIV. kerület (Zugló)', badge: 'XIV. KERÜLET' },
    { num: 13, regex: /\b(13(\.|\s|ker|kerulet)?|xiii(\.|\s|ker|kerulet)?|angyalfold|ujlipotvaros)\b/i, name: 'XIII. kerület (Angyalföld)', badge: 'XIII. KERÜLET' },
    { num: 12, regex: /\b(12(\.|\s|ker|kerulet)?|xii(\.|\s|ker|kerulet)?|hegyvidek)\b/i, name: 'XII. kerület (Hegyvidék)', badge: 'XII. KERÜLET' },
    { num: 11, regex: /\b(11(\.|\s|ker|kerulet)?|xi(\.|\s|ker|kerulet)?|ujbuda|gazdagret|kelenfold)\b/i, name: 'XI. kerület (Újbuda)', badge: 'XI. KERÜLET' },
    { num: 10, regex: /\b(10(\.|\s|ker|kerulet)?|x(\.|\s|ker|kerulet)?|kobanya)\b/i, name: 'X. kerület (Kőbánya)', badge: 'X. KERÜLET' },

    // 1 számjegyű kerületek
    { num: 9, regex: /\b(9(\.|\s|ker|kerulet)?|ix(\.|\s|ker|kerulet)?|ferencvaros)\b/i, name: 'IX. kerület (Ferencváros)', badge: 'IX. KERÜLET' },
    { num: 8, regex: /\b(8(\.|\s|ker|kerulet)?|viii(\.|\s|ker|kerulet)?|jozsefvaros)\b/i, name: 'VIII. kerület (Józsefváros)', badge: 'VIII. KERÜLET' },
    { num: 7, regex: /\b(7(\.|\s|ker|kerulet)?|vii(\.|\s|ker|kerulet)?|erzsebetvaros)\b/i, name: 'VII. kerület (Erzsébetváros)', badge: 'VII. KERÜLET' },
    { num: 6, regex: /\b(6(\.|\s|ker|kerulet)?|vi(\.|\s|ker|kerulet)?|terezvaros)\b/i, name: 'VI. kerület (Terézváros)', badge: 'VI. KERÜLET' },
    { num: 5, regex: /\b(5(\.|\s|ker|kerulet)?|v(\.|\s|ker|kerulet)?|belvaros|lipotvaros)\b/i, name: 'V. kerület (Belváros)', badge: 'V. KERÜLET' },
    { num: 4, regex: /\b(4(\.|\s|ker|kerulet)?|iv(\.|\s|ker|kerulet)?|ujpest)\b/i, name: 'IV. kerület (Újpest)', badge: 'IV. KERÜLET' },
    { num: 3, regex: /\b(3(\.|\s|ker|kerulet)?|iii(\.|\s|ker|kerulet)?|obuda|bekasmegyer)\b/i, name: 'III. kerület (Óbuda)', badge: 'III. KERÜLET' },
    { num: 2, regex: /\b(2(\.|\s|ker|kerulet)?|ii(\.|\s|ker|kerulet)?|rozsadomb|pasaret)\b/i, name: 'II. kerület (Rózsadomb)', badge: 'II. KERÜLET' },
    { num: 1, regex: /\b(1(\.|\s|ker|kerulet)?|i(\.|\s|ker|kerulet)?|varkerulet)\b/i, name: 'I. kerület (Várkerület)', badge: 'I. KERÜLET' },

    // Pest megyei agglomeráció
    { num: 101, regex: /\bbudaors\b/i, name: 'Budaörs és környéke', badge: 'BUDAÖRS' },
    { num: 102, regex: /\bdunakeszi\b/i, name: 'Dunakeszi és környéke', badge: 'DUNAKESZI' },
    { num: 103, regex: /\bszentendre\b/i, name: 'Szentendre és környéke', badge: 'SZENTENDRE' },
    { num: 104, regex: /\berd\b/i, name: 'Érd és környéke', badge: 'ÉRD' },
    { num: 105, regex: /\bgodollo\b/i, name: 'Gödöllő és környéke', badge: 'GÖDÖLLŐ' },
    { num: 106, regex: /\bdunaharaszti\b/i, name: 'Dunaharaszti és környéke', badge: 'DUNAHARASZTI' },
    { num: 107, regex: /\bszigetszentmiklos\b/i, name: 'Szigetszentmiklós és környéke', badge: 'SZIGETSZENTMIKLÓS' },
    { num: 108, regex: /\bgyal\b/i, name: 'Gyál és környéke', badge: 'GYÁL' },
    { num: 109, regex: /\bvecses\b/i, name: 'Vecsés és környéke', badge: 'VECSÉS' },
    { num: 110, regex: /\bfot\b/i, name: 'Fót és környéke', badge: 'FÓT' },
    { num: 111, regex: /\bvac\b/i, name: 'Vác és környéke', badge: 'VÁC' }
  ];

  // Kerület feloldása dedikált paraméterből vagy keresőkifejezésből szóhatárokkal
  function resolveDistrict(districtParam, textParam) {
    if (districtParam) {
      const cleanD = normalize(districtParam);
      const numMatch = cleanD.match(/^(\d{1,2})$/);
      if (numMatch) {
        const n = parseInt(numMatch[1], 10);
        const direct = districtDict.find(d => d.num === n);
        if (direct) return direct;
      }
      for (const d of districtDict) {
        if (d.regex.test(cleanD)) return d;
      }
    }

    if (textParam) {
      const cleanT = normalize(textParam);
      for (const d of districtDict) {
        if (d.regex.test(cleanT)) return d;
      }
    }

    return null;
  }

  // Fő inicializáló rutin
  function initLandingParams() {
    // 1. LÉPÉS: Paraméterek beolvasása és normalizálása
    const rawTema = getQueryParam('tema');
    const rawKeyword = getQueryParam('keyword') || getQueryParam('kw') || getQueryParam('utm_term') || getQueryParam('q');
    const rawDistrict = getQueryParam('kerulet') || getQueryParam('district') || getQueryParam('varos');

    let matchedCategory = null;

    // A) Elsődleges: 'tema' ellenőrzése direkt azonosítóval vagy slug-aliasszal
    if (rawTema) {
      const resolvedKey = resolveThemeSlug(rawTema);
      if (resolvedKey && categoryThemes[resolvedKey]) {
        matchedCategory = categoryThemes[resolvedKey];
      }
    }

    // B) Másodlagos: Keresőszó illesztése szóhatárral és prioritási rangsorral
    if (!matchedCategory) {
      const textToSearch = normalize((rawTema ? rawTema + ' ' : '') + (rawKeyword || ''));
      if (textToSearch) {
        let bestMatch = null;
        let highestPriority = -1;

        for (const rule of searchRules) {
          if (rule.pattern.test(textToSearch) && rule.priority > highestPriority) {
            highestPriority = rule.priority;
            bestMatch = rule;
          }
        }

        if (bestMatch && categoryThemes[bestMatch.theme]) {
          matchedCategory = categoryThemes[bestMatch.theme];
        }
      }
    }

    // C) Kerület beazonosítása (szóhatár- és számbiztos módszerrel)
    const matchedDistrict = resolveDistrict(rawDistrict, rawKeyword);

    // 2. LÉPÉS: DOM Frissítés (Célzott szelektorokkal, hero-ra korlátozva)
    const eyebrowEl = document.querySelector('.hero-eyebrow, [data-dynamic-eyebrow]');
    
    // Célzott H1 szelektor: először az explicit attribútum, majd .hero-title, majd a hero szekció h1 eleme.
    // Szándékosan NEM sima 'h1', hogy ne írja felül az oldal más részein (fejléc logó, tartalom) lévő h1-eket!
    const titleEl = document.querySelector('[data-dynamic-hero-title], .hero-title, .hero-section h1, .hero-content h1');
    const leadEl = document.querySelector('.hero-desc-lead, [data-dynamic-lead]');
    const formSubjectEl = document.getElementById('formSubject');

    // A) Jelvény (Eyebrow): Téma és Kerület szinergiája
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

    // C) Lead mondat frissítése
    if (leadEl && matchedCategory && matchedCategory.lead) {
      leadEl.textContent = matchedCategory.lead;
    }

    // D) Űrlap tárgymező (#formSubject) automatikus és tiszta beállítása
    if (formSubjectEl && (matchedCategory || matchedDistrict)) {
      const topicPart = matchedCategory ? matchedCategory.label : 'Általános Megkeresés';
      const districtPart = matchedDistrict ? ` | ${matchedDistrict.name}` : '';
      formSubjectEl.value = `⚡ Villux Megkeresés | ${topicPart}${districtPart}`;
    }

    // 3. LÉPÉS: Intelligens és biztonságos belső link-öröklés (Útvonal-megőrző logika)
    if (window.location.search) {
      try {
        const currentParams = new URLSearchParams(window.location.search);
        const allLinks = document.querySelectorAll('a[href]');

        allLinks.forEach(function(link) {
          const rawHref = link.getAttribute('href');
          if (!rawHref) return;

          // Kizárjuk a kizárólag oldalon belüli horgonyokat, telefon/email és JS linkeket
          if (
            rawHref.startsWith('#') ||
            rawHref.startsWith('tel:') ||
            rawHref.startsWith('mailto:') ||
            rawHref.startsWith('javascript:')
          ) {
            return;
          }

          // Külső linkek ellenőrzése: ha teljes URL van protokollal, csak azonos origint módosítunk
          if (rawHref.includes('://')) {
            try {
              const fullUrl = new URL(rawHref);
              if (fullUrl.origin !== window.location.origin) {
                return; // Külső link, nem módosítjuk
              }
            } catch (e) {
              return;
            }
          }

          // Útvonal-megőrző bontás: leválasztjuk a horgonyt (#) és a meglévő paramétereket (?)
          let base = rawHref;
          let hashPart = '';
          let existingSearchPart = '';

          const hashIdx = base.indexOf('#');
          if (hashIdx !== -1) {
            hashPart = base.substring(hashIdx);
            base = base.substring(0, hashIdx);
          }

          const qIdx = base.indexOf('?');
          if (qIdx !== -1) {
            existingSearchPart = base.substring(qIdx + 1);
            base = base.substring(0, qIdx);
          }

          // Összefésüljük a cél URL meglévő paramétereit a bejövő kampányparaméterekkel
          const linkParams = new URLSearchParams(existingSearchPart);
          currentParams.forEach(function(val, key) {
            if (!linkParams.has(key)) {
              linkParams.set(key, val);
            }
          });

          const newQueryString = linkParams.toString();
          const finalHref = base + (newQueryString ? '?' + newQueryString : '') + hashPart;

          link.setAttribute('href', finalHref);
        });
      } catch (err) {
        console.warn('Villux landing params link inheritance error:', err);
      }
    }
  }

  // 4. LÉPÉS: Biztonságos indítás document.readyState ellenőrzéssel
  // Ha a DOM még töltődik, megvárjuk a DOMContentLoaded-et, ellenkező esetben azonnal futtatjuk
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingParams);
  } else {
    initLandingParams();
  }
})();
