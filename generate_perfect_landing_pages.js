const fs = require('fs');
const path = require('path');
const {
  replaceSection,
  buildServicesSection,
  buildPricingSection,
  buildCalcSection,
  buildProjectsSection,
  buildFaqSection
} = require('./landing_builder_helpers.js');

const masterHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const pages = [
  // 1. SOS VILLANYSZERELŐ
  {
    fileName: 'sos-villanyszerelo-budapest.html',
    title: 'SOS Villanyszerelő Budapest 0–24 | Gyors Kiszállás 30-60 Perc | Villux',
    metaDesc: '0-24 SOS villanyszerelő gyorsszolgálat Budapesten és Pest megyében. Azonnali zárlatelhárítás, áramszünet, leverődő biztosíték javítás 30-60 percen belül. Hívjon!',
    metaKeywords: 'sos villanyszerelő, sos villanyszerelő budapest, villanyszerelő azonnal, zárlat elhárítás, ügyeletes villanyszerelő, 0-24 villanyszerelő budapest, nincs áram',
    heroBadge: '⚡ 0–24 SOS ÜGYELET BUDAPEST & PEST MEGYE',
    heroTitle: 'SOS Villanyszerelő Budapest – <span class="text-gold">Azonnali Hibaelhárítás</span>',
    heroSubtitle: 'Teljes áramkimaradás, leverődő biztosíték, szikrázó konnektor vagy zárlat? Felszerelt szervizautóink Budapest összes kerületében 30–60 percen belül indulnak a helyszínre!',
    formServiceVal: 'SOS Hibajavítás (Azonnali kiszállás)',
    services: {
      badge: '0-24 SOS Gyorsszolgálat',
      title: 'Milyen Sürgős Hibákban <span class="text-gold">Tudunk Azonnal Segíteni?</span>',
      desc: 'Szervizautóink Budapest összes kerületében és Pest megyében azonnal indulásra készek. Fix munkadíjak, hivatalos garancia és azonnali helyszíni megoldások.',
      cards: [
        {
          img: 'images/panel-work.avif',
          badge: '0-24 SOS ÜGYELET',
          title: 'SOS & Ügyeletes Villanyszerelő 0–24',
          desc: 'Teljes áramkimaradás, leverődő kismegszakító, szikrázó konnektorok vagy égésszag? Azonnal indulunk a helyszínre és megszüntetjük a veszélyt.',
          features: ['Kiszállás akár 30–60 percen belül', 'Éjjel-nappal, hétvégén és ünnepnap', 'Élet- és tűzveszély azonnali elhárítása'],
          priceLabel: 'Kiszállás',
          priceVal: '0 Ft (Elvégzett munka esetén)',
          ctaText: 'Hívás azonnal ↗',
          ctaLink: 'tel:+36703068409'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Zárlatkeresés & Sürgősségi Hibaelhárítás',
          desc: 'Célzott műszeres bemérés felesleges falbontás nélkül. Megkeressük és biztonságosan javítjuk a rejtett vezetékszakadást, földzárlatot vagy meglazult kötést.',
          features: ['Rombolásmentes műszeres bemérés', 'Kismegszakító & biztosíték csere', 'Beégett kötések szakszerű újrahúzása'],
          priceLabel: 'Diagnosztika',
          priceVal: '10 000 Ft',
          ctaText: 'Hívás azonnal ↗',
          ctaLink: 'tel:+36703068409'
        },
        {
          img: 'images/eloszto.avif',
          title: 'Biztosítéktábla & FI-relé Vészjavítás',
          desc: 'Túlterhelt olvadóbiztosítékok, leoldó kismegszakítók és életvédelmi kapcsolók (FI-relé) azonnali helyszíni javítása vagy cseréje mozgó raktárkészletből.',
          features: ['Schneider és Hager minőségi alkatrészek', 'Életvédelmi FI-relé azonnali beépítés', 'Áramellátás biztonságos visszaállítása'],
          priceLabel: 'Munkadíj',
          priceVal: '7 500 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/panel-work.avif',
          title: 'Szikrázó, Füstölő Konnektor & Kötődoboz',
          desc: 'Közvetlen tűzveszélyt okozó túlmelegedett aljzatok és elégett kötések megszüntetése, új biztonságos szerelvények beépítése WAGO technológiával.',
          features: ['Égésszag és szikrázás azonnali megszüntetése', 'Gyulladásmentes fali szerelés', 'Terhelhetőség ellenőrzése'],
          priceLabel: 'Munkadíj',
          priceVal: '6 500 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        }
      ]
    },
    pricing: {
      badge: 'SOS Árlista',
      title: 'Sürgősségi & Ügyeleti <span class="text-gold">Átlátható Díjszabás</span>',
      desc: 'Előre egyeztetett fix munkadíjak rejtett költségek nélkül. Megrendelt javítás esetén a kiszállási díj 0 Ft!',
      cards: [
        {
          cat: 'hibajavitas',
          title: 'Sürgősségi Hibaelhárítás',
          sub: 'Azonnali helyszíni beavatkozások',
          items: [
            { name: 'Műszeres hibakeresés & zárlatbemérés', price: '10 000 Ft' },
            { name: 'Kismegszakító vészhelyzeti csere', price: '7 500 Ft / db' },
            { name: 'FI-relé sürgősségi javítás / beépítés', price: '24 000 Ft' },
            { name: 'Beégett kötés szakszerű újrakötése', price: '8 500 Ft / pont' },
            { name: 'Szikrázó konnektor / aljzat cseréje', price: '6 500 Ft / db' }
          ]
        },
        {
          cat: 'kiszallas',
          title: 'Ügyelet & Kiszállási Díjak',
          sub: 'Budapesten és Pest megyében',
          items: [
            { name: 'Kiszállási díj (elvégzett javítás esetén)', price: '0 Ft (DÍJMENTES)' },
            { name: 'Kiszállás és műszeres diagnosztika', price: '10 000 Ft' },
            { name: 'Hétvégi ügyeleti munkavégzés', price: '+30% munkadíj' },
            { name: 'Éjszakai sürgősségi ügyelet (22–06h)', price: '+50% munkadíj' },
            { name: 'Hivatalos kárszakértői jegyzőkönyv', price: '15 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'SOS Árkalkulátor',
      title: 'Sürgősségi Villamossági <span class="text-gold">Kalkulátor</span>',
      desc: 'Számítsa ki a várható hibajavítási munkadíjat! (Elvégzett munka esetén a kiszállás díjmentes).',
      options: [
        { name: 'Műszeres hibakeresés & zárlatbemérés', price: 10000, priceFormatted: '10 000 Ft' },
        { name: 'SOS Életvédelmi FI-relé beépítés / csere', price: 24000, priceFormatted: '24 000 Ft' },
        { name: 'Sürgősségi elosztótábla csere (6–12 modul)', price: 58000, priceFormatted: '58 000 Ft' }
      ],
      counters: [
        { type: 'circuit-breaker', name: 'Hibás kismegszakító csere', unitPrice: 7500, priceFormatted: '7 500 Ft / db' },
        { type: 'outlet', name: 'Beégett / szikrázó konnektor csere', unitPrice: 6500, priceFormatted: '6 500 Ft / db' },
        { type: 'junction-box', name: 'Beégett kötődoboz újrakötése WAGO-val', unitPrice: 8500, priceFormatted: '8 500 Ft / db' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Budapest, XIII. kerület',
        date: '2026. március',
        title: 'Éjszakai zárlatos biztosítéktábla azonnali cseréje',
        desc: 'Leolvadt régi bakelit biztosítékok helyett modern Hager süllyesztett kismegszakító tábla és életvédelmi FI-relé beépítése 45 perc alatt.'
      },
      {
        isBeforeAfter: false,
        img: 'images/hibajavitas.avif',
        location: 'Budapest, XI. kerület',
        date: '2026. április',
        title: 'SOS zárlatbemérés felesleges falbontás nélkül',
        desc: 'Rejtett konyhai vezetékszakadás és földzárlat felderítése digitális fali műszerrel, a hálózat azonnali helyreállítása.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/hero-img-1.avif',
        location: 'Budaörs, Családi ház',
        date: '2026. április',
        title: 'Szikrázó fali kötődoboz és aljzat helyreállítása',
        desc: 'Kilazult alumínium kötések égésnyomainak megszüntetése, új WAGO kötések és terhelhető szerelvények beépítése.'
      }
    ],
    faqs: [
      { q: 'Mennyi idő alatt érnek ki SOS vészhelyzet esetén?', a: 'Budapest bármely kerületébe és a környező Pest megyei településekre forgalomtól függően átlagosan 30–60 percen belül megérkezik felszerelt szervizautónk.' },
      { q: 'Éjszaka és hétvégén is hívható a gyorsszolgálat?', a: 'Igen! Ügyeletünk az év 365 napján, éjjel-nappal (0–24), szombaton, vasárnap és ünnepnapokon is folyamatosan fogadja a vészhelyzeti hívásokat.' },
      { q: 'Mit tegyek azonnal, ha füstöl a biztosítéktábla vagy szikrázik a konnektor?', a: 'Azonnal kapcsolja le a főbiztosítékot a villanyóra szekrénynél! Ne nyúljon a füstölő eszközhöz, és semmiképp ne próbálja vízzel oltani! Ezután hívjon minket a +36 70 306 8409 számon. Közvetlen életveszély esetén hívja a 112-t!' },
      { q: 'Mennyibe kerül az SOS kiszállás?', a: 'Amennyiben a helyszínen megrendeli és elvégezzük a javítási munkát, a kiszállási díj 0 Ft (díjmentes). Csak az elvégzett javítás fix munkadíját és a beépített anyagot kell fizetnie.' },
      { q: 'Adnak számlát és garanciát a gyorsjavításra?', a: 'Természetesen! Minden SOS beavatkozásról hivatalos számlát és garancialevelet állítunk ki, amely biztosítók felé is teljes mértékben benyújtható.' }
    ]
  },

  // 2. VILLANYSZERELŐ BUDAPEST
  {
    fileName: 'villanyszerelo-budapest.html',
    title: 'Villanyszerelő Budapest – Megbízható Lakossági Villanyszerelés | Villux',
    metaDesc: 'Villanyszerelő Budapesten és Pest megyében. Megbízható lakossági villanyszerelés: biztosítéktábla csere, konnektorok, indukciós főzőlap bekötés, hálózatfelújítás fix árakkal.',
    metaKeywords: 'villanyszerelő budapest, villanyszerelő, lakossági villanyszerelés, biztosítéktábla csere, főzőlap bekötés, villanyhálózat felújítás, villanyszerelés árak',
    heroBadge: '⚡ MEGBÍZHATÓ LAKOSSÁGI VILLANYSZERELÉS',
    heroTitle: 'Villanyszerelő Budapest – <span class="text-gold">Megbízható Lakossági Szolgáltatás</span>',
    heroSubtitle: 'Villanyszerelési munkák lakásokban és családi házakban: táblacsere, garanciális készülékbekötések, konnektorok cseréje és teljes villanyhálózat korszerűsítése garanciával.',
    formServiceVal: 'Biztosítótábla / FI-relé csere',
    services: {
      badge: 'Lakossági Szolgáltatások',
      title: 'Milyen Feladatokban <span class="text-gold">Tudunk Önnek Segíteni?</span>',
      desc: 'A kisebb javításoktól a komplett hálózatfelújításig szakképzett szerelőink tiszta és biztonságos munkát végeznek Budapest egész területén.',
      cards: [
        {
          img: 'images/eloszto.avif',
          title: 'Biztosítéktábla & FI-relé Csere',
          desc: 'Elavult olvadóbiztosítók cseréje modern DIN-sínes elosztókra, életvédelmi FI-relé beépítésével és terheléselosztással.',
          features: ['Hager és Schneider kismegszakítók', 'Áramütés elleni életvédelem', '100% írásos munkagarancia'],
          priceLabel: 'Munkadíj',
          priceVal: '58 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/fozolap.avif',
          title: 'Főzőlap, Sütő & Bojler Bekötés',
          desc: 'Indukciós és elektromos főzőlapok, beépíthető sütők hivatalos garanciális bekötése jótállási pecséttel.',
          features: ['Gyártói garancialevél érvényesítése', '1 és 3 fázisú precíz bekötés', 'Új tápkábel kiépítés ha szükséges'],
          priceLabel: 'Fix munkadíj',
          priceVal: '24 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/panel-work.avif',
          title: 'Konnektorok & Kapcsolók Szerelése',
          desc: 'Laza, szikrázó szerelvények cseréje prémium Schneider és Legrand típusokra, új dugaljak létesítése.',
          features: ['Szerelvényezés festés után', 'Új kiállások kiépítése véséssel', 'Korszerű dizájn kapcsolók'],
          priceLabel: 'Munkadíj',
          priceVal: '6 500 Ft / db-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Villamos Hálózat Felújítás',
          desc: 'Régi alumínium vezetékek cseréje rézvezetékekre panellakásokban és tégla épületekben, pormentes horonymarással.',
          features: ['Teljes és részleges felújítás', 'Új áramkörök nagygépekhez', 'Tételes fix árajánlat'],
          priceLabel: 'Árajánlat',
          priceVal: 'Egyedi felmérés alapján',
          ctaText: 'Felmérés kérése ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'Hivatalos Árlista',
      title: 'Átlátható, Fix Díjszabás <br><span class="text-gold">Rejtett Költségek Nélkül</span>',
      desc: 'Már azelőtt pontosan tudni fogja a fizetendő összeget, mielőtt mesterünk hozzányúlna a szerszámaihoz.',
      cards: [
        {
          cat: 'telepites',
          title: 'Telepítés és Szerelés',
          sub: 'Fix munkadíjak készülékekhez és hálózathoz',
          items: [
            { name: 'Elosztótábla csere (6–12 modul)', price: '58 000 Ft' },
            { name: 'Komplett lakáselosztó csere (12–24 modul)', price: '85 000 Ft' },
            { name: 'Tűzhely / Főzőlap bekötés + pecsét', price: '24 000 Ft' },
            { name: 'Villanybojler szakszerű bekötése', price: '22 000 Ft' },
            { name: 'Új konnektor kiépítése (véséssel, csövezéssel)', price: '22 000 Ft' }
          ]
        },
        {
          cat: 'hibajavitas',
          title: 'Kisebb Munkák & Javítás',
          sub: 'Darabáras szerelési munkadíjak',
          items: [
            { name: 'Kismegszakító csere', price: '7 500 Ft / db' },
            { name: 'FI-relé csere / beépítés', price: '24 000 Ft' },
            { name: 'Konnektor vagy kapcsoló csere', price: '6 500 Ft / db' },
            { name: 'Mennyezeti lámpa felszerelés', price: '7 000 Ft / db' },
            { name: 'Csillár / függesztett lámpa szerelés', price: '14 000 Ft / db' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Lakossági Kalkulátor',
      title: 'Fix Áras Villamossági <span class="text-gold">Kalkulátor</span>',
      desc: 'Számítsa ki előre a fix munkadíjat elosztótábla, biztosítékcsere, lámpák és készülékek szakszerű bekötésére!',
      options: [
        { name: 'Elosztótábla csere (6–12 modul)', price: 58000, priceFormatted: '58 000 Ft' },
        { name: 'Komplett lakáselosztó csere FI-relével (12–24 modul)', price: 85000, priceFormatted: '85 000 Ft' },
        { name: 'Tűzhely / Főzőlap bekötés + garancialevél', price: 24000, priceFormatted: '24 000 Ft' },
        { name: 'Villanybojler bekötése', price: 22000, priceFormatted: '22 000 Ft' }
      ],
      counters: [
        { type: 'circuit-breaker', name: 'Biztosító / Kismegszakító csere', unitPrice: 7500, priceFormatted: '7 500 Ft / db' },
        { type: 'fi-rele', name: 'FI-relé csere / beépítés', unitPrice: 24000, priceFormatted: '24 000 Ft / db' },
        { type: 'outlet', name: 'Konnektor vagy Kapcsoló csere', unitPrice: 6500, priceFormatted: '6 500 Ft / db' },
        { type: 'lamp', name: 'Mennyezeti lámpa / spot felszerelés', unitPrice: 7000, priceFormatted: '7 000 Ft / db' },
        { type: 'new-outlet', name: 'Új konnektor kiépítése (vésés, csövezés)', unitPrice: 22000, priceFormatted: '22 000 Ft / kiállás' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Budapest, XIII. kerület',
        date: '2026. március',
        title: 'Komplett lakáselosztó és FI-relé beépítés',
        desc: '60 éves olvadóbiztosítékos doboz cseréje modern falon kívüli elosztóra, érintésvédelmi áramvédő kapcsolóval.'
      },
      {
        isBeforeAfter: false,
        img: 'images/fozolap.avif',
        location: 'Budapest, II. kerület',
        date: '2026. április',
        title: 'Indukciós főzőlap és sütő garanciális bekötése',
        desc: 'Új 3 fázisú sorkapocs bekötés, fázisterhelés mérés és jótállási pecsét érvényesítés.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/hibajavitas.avif',
        location: 'Budapest, XIV. kerület',
        date: '2026. március',
        title: 'Panellakás szerelvényezés és dugalj bővítés',
        desc: 'Konyhai konnektorok áthelyezése és új kiállások kiépítése korszerű Schneider Asfora szerelvényekkel.'
      }
    ],
    faqs: [
      { q: 'Milyen gyorsan tudnak elkezdeni egy munkát?', a: 'Kisebb szerelési munkákat (főzőlap bekötés, biztosítéktábla csere, konnektorok) általában 24–48 órán belül, sürgős esetben akár aznap elvégzünk. Felújításoknál előzetes helyszíni felmérés után egyeztetünk kezdési időpontot.' },
      { q: 'Adnak hivatalos számlát és garanciát?', a: 'Igen, minden munkáról tételes elektronikus számlát és írásos garancialevelet adunk. A beépített anyagokra a gyártói garancia, a szerelésre pedig saját munkagaranciánk érvényes.' },
      { q: 'A gyártói garancia megmarad a bekötött készülékekre?', a: 'Igen! Hivatalos villanyszerelő szakemberként a helyszínen lepecsételjük és aláírjuk a jótállási jegyet (Bosch, Electrolux, Whirlpool stb.), így a garancia 100%-ban érvényes.' },
      { q: 'Hogyan történik az árajánlatadás?', a: 'Kisebb, standard munkáknál online kalkulátorunkkal vagy telefonos egyeztetés során fix árat adunk. Nagyobb felújításoknál helyszíni felmérést követően tételes árajánlatot készítünk.' },
      { q: 'Budapesten kívül is dolgoznak?', a: 'Igen, egész Pest megyében vállalunk munkát (pl. Dunakeszi, Budaörs, Érd, Szigetszentmiklós, Szentendre, Vecsés, Gödöllő stb.).' }
    ]
  },

  // 3. BIZTOSÍTÉKTÁBLA SZERELÉS
  {
    fileName: 'biztositektabla-szereles.html',
    title: 'Biztosítéktábla Csere & Korszerűsítés Budapest | Villux',
    metaDesc: 'Szakszerű biztosítéktábla csere, kismegszakító és lakáselosztó korszerűsítés Budapesten. Modern életvédelmi FI-relé beépítése, szabványos kivitelezés fix áron.',
    metaKeywords: 'biztosítéktábla csere, biztosítéktábla szerelés, kismegszakító csere, lakáselosztó csere budapest, fi-relé beépítés, biztosítéktábla árak',
    heroBadge: '⚡ SZABVÁNYOS LAKÁSELOSZTÓK & ÉLETVÉDELEM',
    heroTitle: 'Biztosítéktábla Csere & Szerelés – <span class="text-gold">Budapesten Fix Áron</span>',
    heroSubtitle: 'Régi fekete bakelit olvadóbiztosítók cseréje modern DIN-sínes kismegszakítókra és életvédelmi FI-relére. Megszünteti a zúgást, melegedést és a váratlan áramkimaradásokat.',
    formServiceVal: 'Biztosítótábla / FI-relé csere',
    services: {
      badge: 'Elosztótábla Szolgáltatás',
      title: 'Biztonságos & Korszerű <span class="text-gold">Lakáselosztók</span>',
      desc: 'A legtöbb lakástűz és zárlat az elavult, túlterhelt biztosítéktáblák miatt keletkezik. Korszerűsítse tábláját minőségi anyagokkal!',
      cards: [
        {
          img: 'images/eloszto.avif',
          title: 'Alap Elosztótábla Csere (6–12 modul)',
          desc: 'Régi kismegszakítók vagy olvadóbiztosítékok cseréje esztétikus süllyesztett vagy falon kívüli dobozra, modern kismegszakítókkal.',
          features: ['Megszünteti a túlterheléses lekapcsolást', 'Schneider / Hager megbízható alkatrészek', 'Szabványos áramköri feliratozás'],
          priceLabel: 'Munkadíj',
          priceVal: '58 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/panel-work.avif',
          title: 'Komplett Lakáselosztó FI-relével (12–24 modul)',
          desc: 'Teljeskörű védelmi szekrény kialakítása 30mA-es életvédelmi áramvédő kapcsolóval és többkörös kismegszakító sorral.',
          features: ['Életvédelem áramütés ellen', 'Külön áramkör klímának és sütőnek', 'Túlfeszültség-védelem opció'],
          priceLabel: 'Munkadíj',
          priceVal: '85 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Életvédelmi FI-relé Utólagos Beépítése',
          desc: 'Meglévő, jó állapotú táblába történő áramvédő kapcsoló beépítése a vizes helyiségek és a lakás teljes védelmére.',
          features: ['Ezredmásodperces leoldási sebesség', 'Gyermekvédelem és háziállat védelem', 'Műszeres leoldási próba átadáskor'],
          priceLabel: 'Fix munkadíj',
          priceVal: '24 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Fázisterhelés Mérés & Szimmetrizálás',
          desc: '3 fázisú rendszereknél a fogyasztók egyenletes elosztása a kismegszakítók között, elkerülve az egyoldalú túlterhelést.',
          features: ['Lakatfogós digitális mérés', 'Kiegyensúlyozott fázisterhelés', 'Fáziskiesés megelőzése'],
          priceLabel: 'Munkadíj',
          priceVal: '15 000 Ft',
          ctaText: 'Időpontfoglalás ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'Elosztó Árlista',
      title: 'Biztosítéktábla Szerelési <span class="text-gold">Fix Munkadíjak</span>',
      desc: 'Átlátható, tételes árak minőségi kivitelezéssel és írásos garanciával.',
      cards: [
        {
          cat: 'telepites',
          title: 'Elosztótáblák & Főelemek',
          sub: 'Komplett szerelési díjak',
          items: [
            { name: 'Alap elosztótábla csere (6–12 modul)', price: '58 000 Ft' },
            { name: 'Komplett lakáselosztó csere FI-relével (12–24 modul)', price: '85 000 Ft' },
            { name: 'Utólagos FI-relé beépítése meglévő táblába', price: '24 000 Ft' },
            { name: 'Túlfeszültség-levezető T2 beépítése', price: '28 000 Ft' },
            { name: '3 fázisú terhelésmérés és beállítás', price: '15 000 Ft' }
          ]
        },
        {
          cat: 'hibajavitas',
          title: 'Darabáras Tábla Elemek',
          sub: 'Egyedi kismegszakítók és kiegészítők',
          items: [
            { name: 'Kismegszakító (B/C típus) csere', price: '7 500 Ft / db' },
            { name: 'Új kismegszakító beépítése új körhöz', price: '9 500 Ft / db' },
            { name: 'Fővezetéki sorkapocs beépítése', price: '8 000 Ft / db' },
            { name: 'Nulla és föld sín felújítása', price: '9 000 Ft / készlet' },
            { name: 'Fésűs sín szakszerű bekötése', price: '5 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Elosztó Kalkulátor',
      title: 'Biztosítéktábla Csere <span class="text-gold">Kalkulátor</span>',
      desc: 'Válassza ki a kívánt elosztó méretét és a szükséges kiegészítő védelmeket!',
      options: [
        { name: 'Alap elosztótábla csere (6–12 modul)', price: 58000, priceFormatted: '58 000 Ft' },
        { name: 'Komplett lakáselosztó csere FI-relével (12–24 modul)', price: 85000, priceFormatted: '85 000 Ft' },
        { name: 'Túlfeszültség-levezető T2 beépítése', price: 28000, priceFormatted: '28 000 Ft' },
        { name: '3 fázisú terhelésmérés és fázisszimmetrizálás', price: 15000, priceFormatted: '15 000 Ft' }
      ],
      counters: [
        { type: 'circuit-breaker', name: 'Kismegszakító (B/C típus) csere', unitPrice: 7500, priceFormatted: '7 500 Ft / db' },
        { type: 'fi-rele', name: 'Életvédelmi FI-relé (30mA) beépítés', unitPrice: 24000, priceFormatted: '24 000 Ft / db' },
        { type: 'new-breaker', name: 'Új kismegszakító beépítése új körhöz', unitPrice: 9500, priceFormatted: '9 500 Ft / db' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Budapest, VII. kerület',
        date: '2026. március',
        title: '1970-es évekbeli fa dobozos tábla cseréje',
        desc: 'Leégett porcelán biztosítékok helyett 8 modulos süllyesztett Schneider doboz és 30mA FI-relé.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/hero-img-1.avif',
        location: 'Budapest, XI. kerület',
        date: '2026. április',
        title: 'Panel lakáselosztó áramköri bővítése',
        desc: 'Külön kismegszakító kiépítése új klímához és mosogatógéphez terhelésméréssel.'
      },
      {
        isBeforeAfter: false,
        img: 'images/hibajavitas.avif',
        location: 'Szentendre, Családi ház',
        date: '2026. április',
        title: '3 fázisú lakáselosztó szabványosítása',
        desc: 'Fázisonkénti terheléselosztás, fésűs sínezés és túlfeszültség-levezető beépítése.'
      }
    ],
    faqs: [
      { q: 'Mennyi ideig tart egy biztosítéktábla komplett cseréje?', a: 'Egy átlagos 6–12 modulos lakáselosztó cseréje, bekötése és tesztelése mindössze 2–3 órát vesz igénybe.' },
      { q: 'Áramszünettel jár a csere?', a: 'Igen, a biztonságos szerelés idejére (kb. 2 óra) a villanyóránál lekapcsoljuk a főkapcsolót. Az átadás után az áramellátás azonnal helyreáll.' },
      { q: 'Kötelező a FI-relé (áramvédő kapcsoló) beépítése?', a: 'A hatályos villamosipari szabványok szerint minden új vagy felújított elosztóban kötelező az életvédelmi FI-relé. Ez a készülék áramütés esetén ezredmásodpercek alatt lekapcsol, megelőzve a tragédiát.' },
      { q: 'Milyen márkájú alkatrészeket építenek be?', a: 'Kizárólag megbízható, minőségi európai gyártók termékeit használjuk: Schneider Electric, Hager, Legrand kismegszakítókat és elosztódobozokat.' },
      { q: 'Mennyibe kerül a biztosítéktábla csere?', a: 'Egy alap 6–12 modulos csere munkadíja már 58 000 Ft-tól elérhető, komplett 12–24 modulos elosztó FI-relével 85 000 Ft-tól indul.' }
    ]
  },

  // 4. FŐZŐLAP BEKÖTÉS
  {
    fileName: 'fozolap-bekotes.html',
    title: 'Indukciós Főzőlap & Tűzhely Bekötés Budapest | Villux',
    metaDesc: 'Indukciós és elektromos főzőlap, villanytűzhely, beépíthető sütő szakszerű bekötése Budapesten. Hivatalos garanciapecsét, 1 és 3 fázisú bekötés, új kábelkiépítés fix áron.',
    metaKeywords: 'főzőlap bekötés, indukciós főzőlap bekötése budapest, villanytűzhely bekötés, elektromos sütő bekötés garancia, főzőlap bekötés árak',
    heroBadge: '⚡ HIVATALOS GARANCIÁLIS BEÜZEMELÉS',
    heroTitle: 'Főzőlap & Villanytűzhely Bekötés – <span class="text-gold">Hivatalos Pecséttel</span>',
    heroSubtitle: 'Elektromos és indukciós főzőlapok, beépíthető sütők szakszerű bekötése a gyártói garancia megőrzéséhez. Szükség esetén új, terhelhető tápkábel kiépítése az elosztótól.',
    formServiceVal: 'Főzőlap / sütő bekötés',
    services: {
      badge: 'Készülékbekötés',
      title: 'Szakszerű Készülékbekötés <span class="text-gold">Gyártói Garanciával</span>',
      desc: 'Ne kockáztassa az új készülék épségét és a jótállást! Szakemberünk elvégzi a biztonságos üzembe helyezést.',
      cards: [
        {
          img: 'images/fozolap.avif',
          title: 'Indukciós Főzőlap Bekötése',
          desc: '1 vagy 3 fázisú precíz sorkapocs bekötés, fázishidak beállítása és hivatalos gyártói garancialevél érvényesítése pecséttel.',
          features: ['Bosch, Electrolux, Whirlpool stb. pecsét', '1 és 3 fázisú beállítás', 'Teljesítménykorlát programozás'],
          priceLabel: 'Fix munkadíj',
          priceVal: '24 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/panel-work.avif',
          title: 'Beépíthető Elektromos Sütő Bekötése',
          desc: 'Konyhabútorba építhető sütők közvetlen fali csatlakozása vagy dugaljas bekötése terhelhető kötésekkel.',
          features: ['Hőálló bekötővezeték', 'Földelés műszeres ellenőrzése', 'Gyártói jótállási pecsét'],
          priceLabel: 'Fix munkadíj',
          priceVal: '20 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Kombinált Főzőlap + Sütő Szett',
          desc: 'Két készülék együttes szakszerű bekötése kedvezményes szett áron, terhelésmegosztás ellenőrzésével.',
          features: ['Kettős garanciapecsét', 'Együttes kedvezményes díj', 'Azonnali próbaüzem'],
          priceLabel: 'Kedvezményes ár',
          priceVal: '35 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Új Tápkábel Kiépítése Konyhába',
          desc: 'Amennyiben a régi alumínium vezeték nem bírná el a főzőlap 7 kW-os felvételét, új réz tápkábelt építünk ki az elosztótól.',
          features: ['5x2.5 vagy 5x4 mm2 rézvezeték', 'Vezetékcsatornában vagy horonyban', 'Dedikált új kismegszakító'],
          priceLabel: 'Munkadíj',
          priceVal: '25 000 Ft-tól',
          ctaText: 'Felmérés kérése ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'Bekötési Árlista',
      title: 'Készülékbekötési <span class="text-gold">Fix Munkadíjak</span>',
      desc: 'Minden bekötéshez hivatalos garancialevelet és számlát adunk.',
      cards: [
        {
          cat: 'telepites',
          title: 'Készülékbekötési Díjak',
          sub: 'Fix munkadíjak garanciapecséttel',
          items: [
            { name: 'Indukciós / kerámia főzőlap bekötése + pecsét', price: '24 000 Ft' },
            { name: 'Beépíthető elektromos sütő bekötése', price: '20 000 Ft' },
            { name: 'Főzőlap + Sütő szett együttes bekötése', price: '35 000 Ft' },
            { name: 'Villanybojler elektromos bekötése', price: '22 000 Ft' },
            { name: 'Páraelszívó villamos bekötése', price: '12 000 Ft' }
          ]
        },
        {
          cat: 'kiepites',
          title: 'Kábelezés & Védelem',
          sub: 'Új áramkör kiépítés a konyhába',
          items: [
            { name: 'Új rézkábel nyomvonal (méterenként)', price: '4 500 Ft / m' },
            { name: 'Dedikált kismegszakító beépítése elosztóba', price: '9 500 Ft' },
            { name: 'Konyhai leválasztó kapcsoló felszerelése', price: '12 000 Ft' },
            { name: 'Fali csatlakozó doboz kiépítése', price: '8 000 Ft' },
            { name: 'Sorkapocs és hőálló bekötőkábel', price: '6 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Bekötés Kalkulátor',
      title: 'Főzőlap & Készülék <span class="text-gold">Kalkulátor</span>',
      desc: 'Számítsa ki a konyhai gépek bekötési költségét!',
      options: [
        { name: 'Indukciós főzőlap bekötése + garanciapecsét', price: 24000, priceFormatted: '24 000 Ft' },
        { name: 'Beépíthető elektromos sütő bekötése', price: 20000, priceFormatted: '20 000 Ft' },
        { name: 'Főzőlap + Sütő szett együtt bekötve', price: 35000, priceFormatted: '35 000 Ft' },
        { name: 'Villanybojler szakszerű elektromos bekötése', price: 22000, priceFormatted: '22 000 Ft' }
      ],
      counters: [
        { type: 'breaker', name: 'Új kismegszakító a konyhai körhöz', unitPrice: 9500, priceFormatted: '9 500 Ft / db' },
        { type: 'cable', name: 'Új terhelhető tápkábel kiépítés (méterenként)', unitPrice: 4500, priceFormatted: '4 500 Ft / m' },
        { type: 'switch', name: 'Biztonsági leválasztó kapcsoló szerelése', unitPrice: 12000, priceFormatted: '12 000 Ft / db' }
      ]
    },
    projects: [
      {
        isBeforeAfter: false,
        img: 'images/fozolap.avif',
        location: 'Budapest, IX. kerület',
        date: '2026. április',
        title: 'Bosch indukciós lap bekötése és pecsételése',
        desc: '3 fázisú sorkapocs híd beállítása, fázisonkénti 16A áramterhelés ellenőrzése, jótállási jegy kitöltése.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/fozolap.avif',
        location: 'Budapest, III. kerület',
        date: '2026. március',
        title: 'Új tápkábel kiépítése és sütő bekötés',
        desc: 'Régi alumínium vezeték helyett 5x2.5 réz kábel kiépítése a lakáselosztótól és Electrolux sütő beüzemelése.'
      },
      {
        isBeforeAfter: false,
        img: 'images/hibajavitas.avif',
        location: 'Dunakeszi, Újépítésű társasház',
        date: '2026. április',
        title: 'Kombinált konyhai gépek bekötése',
        desc: 'Főzőlap, beépített sütő és páraelszívó együttes bekötése, áramköri leválasztó kapcsolóval.'
      }
    ],
    faqs: [
      { q: 'Miért szükséges villanyszerelő a főzőlap bekötéséhez?', a: 'A gyártók (Bosch, Electrolux, Whirlpool, Gorenje stb.) a jótállást kifejezetten szakképzett villanyszerelő által lepecsételt és aláírt beüzemeléshez kötik.' },
      { q: 'Beköthető az indukciós főzőlap 1 fázisra is?', a: 'Igen, a legtöbb modern főzőlap sorkapcsa alkalmas 1 fázisú (230V) és 2-3 fázisú (400V) bekötésre is. Szükség esetén beállítjuk a teljesítménykorlátot, hogy ne verje le a kismegszakítót.' },
      { q: 'Mennyi ideig tart a bekötés?', a: 'Ha a vezeték és a kiállás már a konyhapult alatt van, a bekötés és tesztelés mindössze 30–45 percet vesz igénybe.' },
      { q: 'Tudnak új tápvezetéket is kiépíteni a konyhába?', a: 'Igen! Ha a meglévő vezeték nem bírná el a főzőlap terhelését, az elosztótáblától új, réz tápkábelt építünk ki csatornában vagy horonymarással.' },
      { q: 'Mennyibe kerül a bekötés munkadíja?', a: 'Meglévő kiállásra történő bekötés garancialevéllel fix 24 000 Ft. Főzőlap + sütő együttes bekötése 35 000 Ft.' }
    ]
  },

  // 5. VILLAMOS HÁLÓZAT FELÚJÍTÁS
  {
    fileName: 'villamos-halozat-felujitas.html',
    title: 'Villamos Hálózat Felújítás & Vezetékezés Budapest | Villux',
    metaDesc: 'Komplett és részleges elektromos hálózat felújítás panellakásokban és tégla épületekben Budapesten. Régi alumínium vezetékek cseréje rézre, pormentes horonymarás.',
    metaKeywords: 'villamos hálózat felújítás, panellakás villanyszerelés, lakás villanyszerelés budapest, alumínium vezeték csere, villanyhálózat korszerűsítés',
    heroBadge: '⚡ KORSZERŰ LAKÁS- ÉS PANELVILLAMOSSÁG',
    heroTitle: 'Villamos Hálózat Felújítás – <span class="text-gold">Budapesten & Pest Megyében</span>',
    heroSubtitle: 'Régi, törékeny alumínium vezetékek cseréje réz kábelekre panellakásokban és tégla épületekben. Pormentes horonymarás, új áramkörök nagygépekhez és írásos garancia.',
    formServiceVal: 'Hálózatfelújítás / Épületvillamosság',
    services: {
      badge: 'Hálózatfelújítás',
      title: 'Megbízható & Korszerű <span class="text-gold">Villanyhálózatok</span>',
      desc: 'A modern háztartási gépek terhelését a régi vezetékek nem bírják. Korszerűsítse hálózatát pormentesen!',
      cards: [
        {
          img: 'images/panel-work.avif',
          title: 'Panellakás Teljes Villamos Felújítás',
          desc: 'Régi alumínium kábelek kiváltása új rézvezetékekkel, mennyezeti és fali nyomvonalak marása minimális porral.',
          features: ['Ipari porszívós horonymarás', 'Új áramkörök klímához, sütőhöz', 'Modern süllyesztett lakáselosztó'],
          priceLabel: 'Munkadíj',
          priceVal: '250 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Tégla Lakások & Házak Újrahúzása',
          desc: 'Meglévő védőcsövekbe történő újrahúzás vagy új horony vésése, modern kötődobozok és kötések kiépítése.',
          features: ['Téglafalak pormentes marása', 'Szobánkénti áramköri bontás', 'Tűzbiztos WAGO kötések'],
          priceLabel: 'Munkadíj',
          priceVal: 'Egyedi felmérés alapján',
          ctaText: 'Felmérés kérése ↗',
          ctaLink: '#kapcsolat'
        },
        {
          img: 'images/eloszto.avif',
          title: 'Részleges Konyhai Hálózatbővítés',
          desc: 'Ha nem szeretné a teljes lakást felújítani, kizárólag a konyhába és fürdőszobába húzunk be új terhelhető áramköröket.',
          features: ['Nagyfogyasztók külön körön', 'Főzőlap, sütő, mosogatógép', 'Minimális bontás és felfordulás'],
          priceLabel: 'Munkadíj',
          priceVal: '65 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Földelőhálózat & EPH Kiépítés',
          desc: 'Gázcsövek, fűtési csövek és fürdőkád egyenpotenciálra hozása, szakszerű földelőszonda telepítés.',
          features: ['Gázátadáshoz jegyzőkönyv', 'Áramütés elleni védelem', 'Hivatalos mérési jegyzőkönyv'],
          priceLabel: 'Munkadíj',
          priceVal: '28 000 Ft-tól',
          ctaText: 'Időpontfoglalás ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'Felújítási Árlista',
      title: 'Hálózatfelújítási <span class="text-gold">Munkadíjak</span>',
      desc: 'Tételes költségvetés rejtett költségek nélkül.',
      cards: [
        {
          cat: 'panel',
          title: 'Lakásfelújítási Munkadíjak',
          sub: 'Becsült irányárak alapterület szerint',
          items: [
            { name: '1 szobás lakás (kb. 35 m2) vezetékezése', price: '250 000 Ft-tól' },
            { name: '2 szobás lakás (kb. 50–60 m2) vezetékezése', price: '380 000 Ft-tól' },
            { name: '3 szobás lakás (kb. 70 m2 felett) vezetékezése', price: '490 000 Ft-tól' },
            { name: 'Részleges konyhai hálózat kiépítése', price: '65 000 Ft-tól' },
            { name: 'Alap elosztótábla csere felújításkor', price: '58 000 Ft' }
          ]
        },
        {
          cat: 'tetelek',
          title: 'Darabáras Kivitelezés',
          sub: 'Vésés, csövezés és szerelvényezés',
          items: [
            { name: 'Új konnektor kiépítése véséssel, csövezéssel', price: '22 000 Ft / db' },
            { name: 'Világítási kiállás kiépítése kapcsolóval', price: '18 000 Ft / db' },
            { name: 'Klíma / sütő dedikált áramkör kiépítés', price: '25 000 Ft / kör' },
            { name: 'Szerelvényezés festés után (dugalj / kapcsoló)', price: '3 500 Ft / db' },
            { name: 'EPH hálózat kiépítése gázkészülékhez', price: '28 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Felújítás Kalkulátor',
      title: 'Hálózatfelújítás <span class="text-gold">Kalkulátor</span>',
      desc: 'Állítsa össze a felújítás során szükséges áramköröket és kiállásokat!',
      options: [
        { name: 'Részleges konyhai áramkör kiépítés (új réz tápvezetékek)', price: 65000, priceFormatted: '65 000 Ft' },
        { name: 'Alap lakáselosztó csere 8-12 modullal felújításkor', price: 58000, priceFormatted: '58 000 Ft' },
        { name: 'Nagy lakáselosztó 18-24 modullal és FI-relével', price: 85000, priceFormatted: '85 000 Ft' },
        { name: 'Érintésvédelmi EPH és földelés összekötés', price: 25000, priceFormatted: '25 000 Ft' }
      ],
      counters: [
        { type: 'outlet-box', name: 'Új konnektor / kapcsoló kiállás véséssel, csövezéssel', unitPrice: 22000, priceFormatted: '22 000 Ft / kiállás' },
        { type: 'light-box', name: 'Új világítási kiállás fali kapcsolóval', unitPrice: 18000, priceFormatted: '18 000 Ft / kiállás' },
        { type: 'dedicated-circuit', name: 'Klíma / sütő dedikált áramkör kiépítés', unitPrice: 25000, priceFormatted: '25 000 Ft / kör' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/hibajavitas.avif',
        location: 'Budapest, III. kerület (Óbuda)',
        date: '2026. március',
        title: '55 m2 panellakás komplett alumínium vezeték cseréje',
        desc: 'Új áramkörök klímához és mosogatógéphez, pormentes horonymarással és Schneider szerelvényekkel.'
      },
      {
        isBeforeAfter: false,
        img: 'images/eloszto.avif',
        location: 'Budapest, XIII. kerület',
        date: '2026. április',
        title: 'Tégla polgári lakás villamos hálózat modernizálása',
        desc: 'Meglévő Bergmann csövek újrahúzása rézvezetékekkel, új lakáselosztó szekrény kiépítése.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Budaörs, Családi ház',
        date: '2026. április',
        title: 'Családi ház konyha és nappali villamos korszerűsítése',
        desc: 'Dedikált fázisok kiépítése nagyfogyasztóknak, rejtett világítási kiállások kialakítása.'
      }
    ],
    faqs: [
      { q: 'Mennyi ideig tart egy teljes panellakás villamos felújítása?', a: 'Egy átlagos 50–70 m2-es panellakás komplett újracsövezése és vezetékezése általában 3–5 munkanapot vesz igénybe.' },
      { q: 'Nagyon nagy porral és bontással jár a felújítás?', a: 'Ipari porszívóhoz csatlakoztatott horonymaró gépekkel dolgozunk, így a szálló por mennyiségét minimálisra csökkentjük. Lakott lakás esetén fóliázással védjük a bútorokat.' },
      { q: 'Lehetséges csak a konyhát vagy fürdőszobát felújítani?', a: 'Igen, részleges hálózatfelújítást is vállalunk. Ilyenkor a konyhába vagy fürdőszobába külön új réz áramköröket húzunk be az elosztótól a többi helyiség érintése nélkül.' },
      { q: 'Hogyan kaphatok pontos árajánlatot?', a: 'Előzetes igényfelmérést követően a helyszínen felmérjük az ingatlant, átbeszéljük a dugaljak és kapcsolók pontos helyét, majd tételes írásos árajánlatot adunk.' },
      { q: 'Adnak garanciát a beépített hálózatra?', a: 'Igen, a teljes kiépített villamos hálózatra több év írásos garanciát vállalunk, átadáskor műszeres mérésekkel igazoljuk a biztonságos működést.' }
    ]
  },

  // 6. VBF FELÜLVIZSGÁLAT
  {
    fileName: 'villamos-szabvanyositas-vbf.html',
    title: 'Villamos Szabványosítás & VBF Felülvizsgálat Budapest | Villux',
    metaDesc: 'Villamos biztonsági felülvizsgálat (VBF), jegyzőkönyv készítés és villamos szabványosítás Budapesten és Pest megyében. Ingatlan eladáshoz, bérbeadáshoz, hatósági előírásokhoz.',
    metaKeywords: 'vbf felülvizsgálat budapest, villamos biztonsági felülvizsgálat, villamos szabványosítás, vbf jegyzőkönyv, érintésvédelmi felülvizsgálat',
    heroBadge: '⚡ HIVATALOS MINŐSÍTŐ IRAT & MÉRÉSEK',
    heroTitle: 'Villamos Biztonsági Felülvizsgálat (VBF) – <span class="text-gold">& Szabványosítás</span>',
    heroSubtitle: 'Szakszerű VBF felülvizsgálat lakások, házak és vállalkozások számára. Hivatalos minősítő irat ingatlaneladáshoz, bérbeadáshoz, biztosítókhoz és szabványossági hibajavítás.',
    formServiceVal: 'Egyéb villanyszerelés',
    services: {
      badge: 'VBF Felülvizsgálat',
      title: 'Hivatalos VBF Mérések <span class="text-gold">& Minősítő Iratok</span>',
      desc: 'A villamos biztonsági felülvizsgálat igazolja ingatlana életvédelmi és tűzvédelmi megfelelőségét. Gyors kiszállás és hivatalos dokumentáció.',
      cards: [
        {
          img: 'images/panel-work.avif',
          title: 'Lakossági VBF Ingatlaneladáshoz',
          desc: 'Adásvételi szerződéshez kötelezően előírt villamos biztonsági felülvizsgálat és hivatalos jegyzőkönyv kiállítása.',
          features: ['Érintésvédelmi műszeres mérés', 'Szigetelésellenállás vizsgálat', 'Hivatalos minősítő irat 48h alatt'],
          priceLabel: 'Munkadíj',
          priceVal: '35 000 Ft-tól',
          ctaText: 'Megrendelés ↗',
          ctaLink: '#kapcsolat'
        },
        {
          img: 'images/eloszto.avif',
          title: 'Bérbeadási VBF Felülvizsgálat',
          desc: 'Bérlők biztonsága és a tulajdonos jogi védelme érdekében végzett vizsgálat bérbeadás előtt álló lakásokhoz.',
          features: ['FI-relé leoldási idő mérés', 'Védővezetők folytonosság vizsgálata', 'Feltárt hibák dokumentálása'],
          priceLabel: 'Munkadíj',
          priceVal: '35 000 Ft-tól',
          ctaText: 'Megrendelés ↗',
          ctaLink: '#kapcsolat'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Céges & Üzlethelyiség Időszakos VBF',
          desc: 'Munkavédelmi és katasztrófavédelmi előírások szerinti kötelező időszakos ellenőrzés irodákba, üzletekbe.',
          features: ['Munkavédelmi megfelelőség', 'Tűzvédelmi felülvizsgálat', 'Tételes mérési jegyzőkönyv'],
          priceLabel: 'Munkadíj',
          priceVal: '55 000 Ft-tól',
          ctaText: 'Árajánlat kérése ↗',
          ctaLink: '#kapcsolat'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Feltárt Hibák Szabványosítása',
          desc: 'A vizsgálat során talált hiányosságok (hiányzó földelés, elavult tábla, túlterhelt kötések) szakszerű helyszíni kijavítása.',
          features: ['FI-relé azonnali beépítése', 'Földelés hiányának pótlása', 'Szabványos minősítés megszerzése'],
          priceLabel: 'Munkadíj',
          priceVal: '15 000 Ft-tól',
          ctaText: 'Időpontfoglalás ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'VBF Árlista',
      title: 'VBF Felülvizsgálati <span class="text-gold">Díjak</span>',
      desc: 'Hivatalos minősítő irat kiállítása gyors határidővel.',
      cards: [
        {
          cat: 'vbf-lakossag',
          title: 'Lakossági VBF Csomagok',
          sub: 'Adásvételhez és bérbeadáshoz',
          items: [
            { name: 'Lakás VBF felülvizsgálat (60 m2-ig)', price: '35 000 Ft' },
            { name: 'Lakás VBF felülvizsgálat (60–120 m2)', price: '45 000 Ft' },
            { name: 'Családi ház VBF felülvizsgálat (150 m2-ig)', price: '55 000 Ft' },
            { name: 'EPH jegyzőkönyv gázkészülék átadáshoz', price: '28 000 Ft' },
            { name: 'Sürgősségi jegyzőkönyv kiállítás 24h belül', price: '+15 000 Ft' }
          ]
        },
        {
          cat: 'szabvanyositas',
          title: 'Szabványosítási Munkák',
          sub: 'Feltárt hiányosságok javítása',
          items: [
            { name: 'Életvédelmi FI-relé beépítése VBF-hez', price: '24 000 Ft' },
            { name: 'Szabványosítási kismegszakító pótlás', price: '7 500 Ft / db' },
            { name: 'Földelés hiányának megszüntetése kiállásonként', price: '9 500 Ft / db' },
            { name: 'Földelőszonda telepítés és bekötés', price: '35 000 Ft' },
            { name: 'EPH gerincvezeték kiépítés', price: '22 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'VBF Kalkulátor',
      title: 'VBF & Szabványosítás <span class="text-gold">Kalkulátor</span>',
      desc: 'Számítsa ki ingatlana felülvizsgálati díját!',
      options: [
        { name: 'Lakás VBF felülvizsgálat jegyzőkönyvvel (60 m2-ig)', price: 35000, priceFormatted: '35 000 Ft' },
        { name: 'Lakás VBF felülvizsgálat jegyzőkönyvvel (60–120 m2)', price: 45000, priceFormatted: '45 000 Ft' },
        { name: 'Családi ház VBF felülvizsgálat (150 m2-ig)', price: 55000, priceFormatted: '55 000 Ft' },
        { name: 'EPH bekötés és gázkazán jegyzőkönyv', price: 28000, priceFormatted: '28 000 Ft' }
      ],
      counters: [
        { type: 'breaker-fix', name: 'Szabványosítási kismegszakító pótlás', unitPrice: 7500, priceFormatted: '7 500 Ft / db' },
        { type: 'fi-fix', name: 'Hiányzó életvédelmi FI-relé beépítése VBF-hez', unitPrice: 24000, priceFormatted: '24 000 Ft / db' },
        { type: 'ground-fix', name: 'Földelés hiányának megszüntetése kiállásonként', unitPrice: 9500, priceFormatted: '9 500 Ft / db' }
      ]
    },
    projects: [
      {
        isBeforeAfter: false,
        img: 'images/panel-work.avif',
        location: 'Budapest, II. kerület',
        date: '2026. április',
        title: 'Családi ház VBF felülvizsgálat eladás előtt',
        desc: 'Műszeres hurokimpedancia és szigetelésvizsgálat, hivatalos jegyzőkönyv átadása az adásvételi szerződéshez.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Budapest, VI. kerület',
        date: '2026. március',
        title: 'Bérbeadott lakás villamos szabványosítása',
        desc: 'Feltárt érintésvédelmi hiányosságok megszüntetése, új földelővezeték kiépítése a fürdőszobába és FI-relé beépítése.'
      },
      {
        isBeforeAfter: false,
        img: 'images/hibajavitas.avif',
        location: 'Budaörs, Irodahelyiség',
        date: '2026. április',
        title: 'Időszakos munkahelyi VBF felülvizsgálat',
        desc: 'Munkavédelmi előírások szerinti időszakos ellenőrzés, hibaáram-védelmi tesztek dokumentálása.'
      }
    ],
    faqs: [
      { q: 'Mikor kötelező a VBF felülvizsgálat lakásoknál?', a: 'A hatályos jogszabályok szerint lakóingatlan bérbeadásakor és tulajdonosváltásakor (adásvétel) kötelező a villamos biztonsági felülvizsgálat elvégzése, amennyiben az ingatlan nem rendelkezik érvényes felülvizsgálattal.' },
      { q: 'Mit tartalmaz a VBF minősítő irat?', a: 'A hivatalos dokumentáció tartalmazza a szigetelésellenállás méréseket, a védővezetők folytonosságának ellenőrzését, a FI-relé leoldási idejét és áramát, valamint a feltárt hibák listáját és minősítését.' },
      { q: 'Mi a különbség a VBF és a szabványosítás között?', a: 'A VBF a műszeres ellenőrzést és a jegyzőkönyv kiállítását jelenti. A szabványosítás a felülvizsgálat során feltárt hibák (pl. hiányzó földelés, elavult biztosítékok) szakszerű fizikai kijavítását jelenti.' },
      { q: 'Vállalják a jegyzőkönyvben feltárt hibák kijavítását is?', a: 'Igen! Teljeskörű szolgáltatást nyújtunk: a felülvizsgálat után elvégezzük a szükséges szabványosítási javításokat, és kiállítjuk a megfelelő minősítést.' },
      { q: 'Hány munkanap alatt készül el a jegyzőkönyv?', a: 'A helyszíni mérések után a hivatalos minősítő iratot 24–48 órán belül átadjuk elektronikus és nyomtatott formában.' }
    ]
  },

  // 7. LAKÁSVILLANYSZERELÉS & ÉPÜLETVILLAMOSSÁG
  {
    fileName: 'lakasvillanyszereles-epuletvillamossag.html',
    title: 'Lakásvillanyszerelés & Épületvillamosság Budapest | Villux',
    metaDesc: 'Lakásfelújítás és épületvillamosság Budapesten és Pest megyében. Új elektromos kiállások, elosztótáblák, modern világítás és komplett vezetékezés garanciával.',
    metaKeywords: 'lakásvillanyszerelés budapest, épületvillamosság, lakásfelújítás villanyszerelő, elektromos kiállások, elosztó csere, épületvillamossági kivitelezés',
    heroBadge: '⚡ MINŐSÉGI KIVITELEZÉS & ÉPÜLETVILLAMOSSÁG',
    heroTitle: 'Lakásvillanyszerelés & Épületvillamosság – <span class="text-gold">Budapesten</span>',
    heroSubtitle: 'Lakásfelújítás előtti és alatti villanyszerelés: új dugaljak és világítási kiállások, modern elosztók, klíma és konyhagépek áramkörei pormentes horonymarással és garanciával.',
    formServiceVal: 'Hálózatfelújítás / Épületvillamosság',
    services: {
      badge: 'Épületvillamosság',
      title: 'Komplett & Részleges <span class="text-gold">Lakásvillanyszerelés</span>',
      desc: 'A fali véséstől a szerelvényekig precíz, tiszta munkát végzünk a megrendelő és a lakberendező igényei szerint.',
      cards: [
        {
          img: 'images/panel-work.avif',
          title: 'Lakásfelújítás Teljes Alapszerelése',
          desc: 'Új védőcsövezés, dobozolás, vezetékek behúzása és áramköri szétosztás vakolás és festés előtt.',
          features: ['Pontos nyomvonal tervek alapján', 'Pormentes horonymarás', 'Szabványos méretezés nagygépekhez'],
          priceLabel: 'Munkadíj',
          priceVal: 'Egyedi felmérés alapján',
          ctaText: 'Felmérés kérése ↗',
          ctaLink: '#kapcsolat'
        },
        {
          img: 'images/fozolap.avif',
          title: 'Konyhafelújítás Villamos Átalakítása',
          desc: 'Új konyhai konnektorok, pultvilágítás, indukciós lap, sütő és elszívó dedikált vezetékezése.',
          features: ['Nagy terhelhetőségű rézkábelek', 'Konyhasziget áramellátás', 'Egyeztetés konyhatervezővel'],
          priceLabel: 'Munkadíj',
          priceVal: '65 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Szerelvényezés Festés Után',
          desc: 'Kapcsolók, dugaljak, termosztátok és lámpatestek precíz, karcmentes felszerelése minőségi szerelvényekkel.',
          features: ['Schneider Asfora / Legrand Valena', 'Vízmértékes pontos illesztés', 'Zárlatmentes próbaüzem'],
          priceLabel: 'Munkadíj',
          priceVal: '3 500 Ft / db-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/lighting.avif',
          title: 'Világítástechnika & Csillárszerelés',
          desc: 'Design függesztékek, nehéz csillárok, mennyezeti LED panelek és gipszkarton spotok felszerelése.',
          features: ['Biztonságos fali és födém rögzítés', 'Fényerőszabályzó dimmer bekötés', 'Váltó- és keresztkapcsolások'],
          priceLabel: 'Munkadíj',
          priceVal: '7 000 Ft / db-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        }
      ]
    },
    pricing: {
      badge: 'Épületvillamosság Árlista',
      title: 'Lakásvillanyszerelési <span class="text-gold">Munkadíjak</span>',
      desc: 'Átlátható díjszabás felújításokhoz és átalakításokhoz.',
      cards: [
        {
          cat: 'alapszereles',
          title: 'Alapszerelés & Kiállások',
          sub: 'Vésés, csövezés és kábelezés',
          items: [
            { name: 'Konyhafelújítás komplett villamos áramkörei', price: '65 000 Ft-tól' },
            { name: 'Új konnektor kiépítése véséssel, dobozolással', price: '22 000 Ft / kiállás' },
            { name: 'Új kapcsoló kiépítése lámpa kiállással', price: '18 000 Ft / kiállás' },
            { name: 'Lakáselosztó szekrény csere felújításkor', price: '58 000 Ft' },
            { name: 'Fürdőszobai EPH kialakítás és mérés', price: '25 000 Ft' }
          ]
        },
        {
          cat: 'szerelvenyezes',
          title: 'Szerelvényezés & Lámpák',
          sub: 'Finomszerelés és beüzemelés',
          items: [
            { name: 'Konnektor vagy kapcsoló felszerelése festés után', price: '3 500 Ft / db' },
            { name: 'Mennyezeti lámpa / spot felszerelése', price: '7 000 Ft / db' },
            { name: 'Csillár / függesztett design lámpa szerelése', price: '14 000 Ft / db' },
            { name: 'Fali forgatógombos dimmer szerelése', price: '12 000 Ft' },
            { name: 'Mozgásérzékelős világításvezérlő', price: '15 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Lakásvillamossági Kalkulátor',
      title: 'Lakásfelújítás <span class="text-gold">Kalkulátor</span>',
      desc: 'Számolja ki a felújítás villanyszerelési munkadíját!',
      options: [
        { name: 'Konyhafelújítás komplett villamos áramkörei', price: 65000, priceFormatted: '65 000 Ft' },
        { name: 'Lakáselosztó korszerűsítés felújítás alatt', price: 58000, priceFormatted: '58 000 Ft' },
        { name: 'Fürdőszobai érintésvédelmi hálózat és FI-relé', price: 35000, priceFormatted: '35 000 Ft' }
      ],
      counters: [
        { type: 'outlet-box', name: 'Új dugalj / kapcsoló kiállás kiépítése', unitPrice: 22000, priceFormatted: '22 000 Ft / db' },
        { type: 'install-switch', name: 'Festés utáni szerelvényezés (dugalj/kapcsoló)', unitPrice: 3500, priceFormatted: '3 500 Ft / db' },
        { type: 'lamp-install', name: 'Mennyezeti lámpa / spot felszerelése', unitPrice: 7000, priceFormatted: '7 000 Ft / db' },
        { type: 'chandelier-install', name: 'Csillár felszerelés és bekötés', unitPrice: 14000, priceFormatted: '14 000 Ft / db' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/hero-img-1.avif',
        location: 'Budapest, XI. kerület',
        date: '2026. április',
        title: '68 m2-es téglalakás generál villanyszerelése',
        desc: 'Komplett alapszerelés, 38 új kiállás, elosztó építés és modern Schneider szerelvényezés.'
      },
      {
        isBeforeAfter: false,
        img: 'images/lighting.avif',
        location: 'Budapest, XIII. kerület',
        date: '2026. március',
        title: 'Konyha- és nappali átalakítás villamos munkái',
        desc: 'Konyhapult feletti új konnektorok vésése és konyhasziget áramellátásának padlócsövezése.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Vecsés, Családi ház',
        date: '2026. április',
        title: 'Családi ház elektromos bővítése tetőtér beépítésnél',
        desc: 'Tetőtéri alelosztó kialakítása, szobánkénti áramkörök és füstérzékelő hálózat kiépítése.'
      }
    ],
    faqs: [
      { q: 'Milyen fázisokban történik a lakásvillanyszerelés felújításkor?', a: '1. fázis az alapszerelés (vésés, csövezés, dobozolás, vezetékezés vakolás előtt). 2. fázis a festés/burkolás utáni szerelvényezés (kapcsolók, konnektorok, lámpák felszerelése és mérések).' },
      { q: 'Segítenek a kapcsolók és konnektorok helyének megtervezésében?', a: 'Igen! Tapasztalt szakemberként segítünk megtervezni a bútorokhoz és konyhagépekhez illeszkedő ideális dugaljszámot és magasságokat.' },
      { q: 'Tudnak együttműködni más szakemberekkel (kőműves, festő)?', a: 'Természetesen, rugalmasan alkalmazkodunk a felújítás ütemtervéhez, hogy a többi szakember zavartalanul haladhasson a munkával.' },
      { q: 'Milyen szerelvénycsaládokat ajánlanak?', a: 'Leggyakrabban a megbízható Schneider Asfora / Sedna, Legrand Valena Life és Niko termékeket szereljük, de bármilyen egyedi dizájnszerelvényt is fel tudunk szerelni.' },
      { q: 'Mennyi ideig tart egy lakás alapszerelése?', a: 'Ingatlan méretétől függően 2–5 munkanap alatt elkészül a komplett védőcsövezés és vezetékezés.' }
    ]
  },

  // 8. LED VILÁGÍTÁS
  {
    fileName: 'led-vilagitas-tervezes-kivitelezes.html',
    title: 'LED Világítás Tervezés & Kivitelezés Budapest | Villux',
    metaDesc: 'Modern LED világítás tervezése és szakszerű kivitelezése lakásokba és üzletekbe Budapesten. Rejtett világítás, aluprofilos LED szalagok, okos dimmelés, tápegységek garanciával.',
    metaKeywords: 'led világítás tervezés, led szalag szerelés budapest, rejtett világítás kivitelezés, gipszkarton led világítás, led világítás villanyszerelő',
    heroBadge: '⚡ HANGULATOS & MODERN FÉNYEK',
    heroTitle: 'LED Világítás Tervezés & Kivitelezés – <span class="text-gold">Budapesten</span>',
    heroSubtitle: 'Rejtett gipszkarton LED világítások, aluprofilos munkapult és lépcsőfények, spotlámpák és intelligens vezérlésű rendszerek megtervezése és kiépítése MeanWell tápegységekkel.',
    formServiceVal: 'Világítástervezés, lámpaszerelés',
    services: {
      badge: 'LED Világítástechnika',
      title: 'Prémium Világítási <span class="text-gold">Megoldások</span>',
      desc: 'A jól megtervezett LED világítás energiatakarékos, modern és elegáns hangulatot kölcsönöz otthonának.',
      cards: [
        {
          img: 'images/lighting.avif',
          title: 'Mennyezeti Rejtett Világítás',
          desc: 'Gipszkarton szigetekbe és stukkókba rejtett indirekt LED fénysávok kiépítése egyenletes, vakításmentes fénnyel.',
          features: ['Pontmentes COB / SMD LED szalagok', 'Alumínium hűtőprofilos tartós beépítés', 'Dimmelhető melegfehér / CCT fények'],
          priceLabel: 'Munkadíj',
          priceVal: '4 500 Ft / m-től',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/panel-work.avif',
          title: 'Konyhapult Munkapult Világítás',
          desc: 'Felső szekrény aljára mart vagy felragasztott eloxált aluprofilos LED csík, érintésmentes kézlegyintős kapcsolóval.',
          features: ['Erős, árnyékmentes munkalap megvilágítás', 'Érintésmentes higiénikus vezérlés', 'Páraálló opál bura'],
          priceLabel: 'Munkadíj',
          priceVal: '25 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Okosvezérlés & Fényerőszabályzás',
          desc: 'Fali forgatógombos dimmerek, többzónás távirányítók és okosotthonos (WiFi / Zigbee) vezérlők beüzemelése.',
          features: ['Fokozatmentes fényerőszabályzás', 'Színhőmérséklet (CCT) állítás', 'Okostelefonos és hangvezérlés'],
          priceLabel: 'Munkadíj',
          priceVal: '15 000 Ft-tól',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Ipari Tápegységek & Mágneses Sínek',
          desc: 'Zajmentes MeanWell tápegységek szellőző elhelyezése és modern mágneses sínrendszeres spotok telepítése.',
          features: ['Túlmelegedés és zárlat elleni védelem', 'Prémium mágneses spotsínek', 'Hosszú élettartam garanciával'],
          priceLabel: 'Munkadíj',
          priceVal: '12 000 Ft-tól',
          ctaText: 'Ajánlatkérés ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'Világítás Árlista',
      title: 'LED Világítás Kivitelezési <span class="text-gold">Árak</span>',
      desc: 'Professzionális LED szerelés minőségi hűtőprofilokkal és tápegységekkel.',
      cards: [
        {
          cat: 'led-profil',
          title: 'LED Szalag & Profil Munkák',
          sub: 'Méter- és darabáras tételek',
          items: [
            { name: 'Konyhapult LED munkapult világítás komplett szerelése', price: '25 000 Ft' },
            { name: 'Rejtett mennyezeti LED profil szerelés (méterenként)', price: '4 500 Ft / m' },
            { name: 'Lépcsőfok / gardrób LED profil szerelés', price: '5 500 Ft / m' },
            { name: 'Ipari MeanWell tápegység beépítése és bekötése', price: '12 000 Ft' },
            { name: 'Fali forgatógombos LED dimmer beépítése', price: '15 000 Ft' }
          ]
        },
        {
          cat: 'lampak',
          title: 'Lámpatestek & Csillárok',
          sub: 'Hagyományos és design világítás',
          items: [
            { name: 'Mennyezeti spotlámpa / LED panel felszerelése', price: '7 000 Ft / db' },
            { name: 'Csillár / függesztett design lámpa szerelése', price: '14 000 Ft / db' },
            { name: 'Mágneses sínrendszer tápellátásának kiépítése', price: '28 000 Ft' },
            { name: 'Fali karos olvasólámpa felszerelése', price: '8 500 Ft / db' },
            { name: 'Mozgásérzékelős alkonykapcsoló bekötése', price: '15 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Világítás Kalkulátor',
      title: 'LED Világítás <span class="text-gold">Kalkulátor</span>',
      desc: 'Állítsa össze a szükséges LED fénysávokat és lámpatesteket!',
      options: [
        { name: 'Konyhapult LED munkapult világítás komplett szerelése', price: 25000, priceFormatted: '25 000 Ft' },
        { name: 'Ipari MeanWell hűtött tápegység beépítése', price: 12000, priceFormatted: '12 000 Ft' },
        { name: 'Fali LED dimmer / fényerőszabályzó bekötése', price: 15000, priceFormatted: '15 000 Ft' },
        { name: 'Mágneses sínrendszer tápellátásának kiépítése', price: 28000, priceFormatted: '28 000 Ft' }
      ],
      counters: [
        { type: 'led-strip', name: 'Rejtett LED szalag + aluprofil szerelés (méterenként)', unitPrice: 4500, priceFormatted: '4 500 Ft / m' },
        { type: 'spot-lamp', name: 'Mennyezeti spotlámpa / LED panel felszerelése', unitPrice: 7000, priceFormatted: '7 000 Ft / db' },
        { type: 'chandelier', name: 'Design csillár / függeszték felszerelése', unitPrice: 14000, priceFormatted: '14 000 Ft / db' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/lighting.avif',
        imgAfter: 'images/hero-img-1.avif',
        location: 'Budapest, II. kerület',
        date: '2026. április',
        title: 'Nappali mennyezeti indirekt rejtett LED világítás',
        desc: '22 méter 3000K melegfehér COB LED szalag süllyesztett aluprofilban, fali dimmerrel vezérelve.'
      },
      {
        isBeforeAfter: false,
        img: 'images/lighting.avif',
        location: 'Budaörs, Családi ház',
        date: '2026. április',
        title: 'Konyhai munkapult alatti érintésmentes LED profil',
        desc: 'Fekete eloxált sarokprofil, kézlegyintéses mozgásérzékelő szenzoros kapcsolóval.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/lighting.avif',
        location: 'Budapest, XII. kerület',
        date: '2026. március',
        title: 'Lépcsőfok világítás és mágneses sínrendszer',
        desc: 'Lépcsőfokok alatti rejtett világítás alkonykapcsolóval és design mennyezeti mágneses spotsínekkel.'
      }
    ],
    faqs: [
      { q: 'Miért szükséges hűtőprofil a LED szalagokhoz?', a: 'A nagy teljesítményű LED szalagok melegszenek. Alumínium profil nélkül a chipek gyorsan veszítenek fényerejükből és tönkremennek. A profil biztosítja a tartós, pontmentes homogén fényt.' },
      { q: 'Szabályozható a LED világítás fényereje (dimmelés)?', a: 'Igen! Fali forgatógombos dimmerrel, távirányítóval vagy okostelefonos alkalmazással (Zigbee / WiFi) fokozatmentesen szabályozható a fényerő és a színhőmérséklet.' },
      { q: 'Hova érdemes elhelyezni a tápegységet?', a: 'A tápegységet jól szellőző, de rejtett és karbantartás céljából hozzáférhető helyre (pl. gipszkarton revíziós ajtó mögé, konyhaszekrény tetejére) telepítjük.' },
      { q: 'Milyen LED szalagokat és tápegységeket használnak?', a: 'Kizárólag magas színvisszaadású (CRI > 90), prémium COB vagy SMD LED szalagokat és megbízható ipari MeanWell tápegységeket építünk be.' },
      { q: 'Vállalnak meglévő lámpatestek és csillárok felszerelését is?', a: 'Igen, nehéz kristálycsillárok, mennyezeti LED panelek, sínrendszeres spotok és fali karok szakszerű felszerelését is végezzük.' }
    ]
  },

  // 9. ELEKTROMOS AUTÓ TÖLTŐ
  {
    fileName: 'elektromos-auto-tolto-kiepites.html',
    title: 'Elektromos Autó Töltő Kiépítés & Telepítés Budapest | Villux',
    metaDesc: 'Otthoni és telephelyi elektromos autó töltő (Wallbox) szakszerű telepítése és hálózatkiépítése Budapesten és Pest megyében. Helyszíni felmérés, dedikált védelem, garancia.',
    metaKeywords: 'elektromos autó töltő kiépítés, ev töltő telepítés budapest, fali töltő villanyszerelő, wallbox bekötés, otthoni autótöltő szerelés',
    heroBadge: '⚡ BIZTONSÁGOS OTTHONI & CÉGES TÖLTÉS',
    heroTitle: 'Elektromos Autó Töltő Kiépítés – <span class="text-gold">és Telepítés Budapesten</span>',
    heroSubtitle: 'Otthoni garázsok, kocsibeállók és céges parkolók fali gyorstöltőinek (11 kW / 22 kW Wallbox) biztonságos villamos kiépítése. Hálózatfelmérés, B típusú védelem és beüzemelés.',
    formServiceVal: 'Egyéb villanyszerelés',
    services: {
      badge: 'EV Töltőtelepítés',
      title: 'Biztonságos & Gyors <span class="text-gold">Elektromosautó-töltés</span>',
      desc: 'Ne terhelje túl otthoni konnektorait! Egy szakszerűen kiépített Wallbox akár 3-szor gyorsabb és 100%-ban tűzbiztos töltést nyújt.',
      cards: [
        {
          img: 'images/panel-work.avif',
          title: 'Otthoni Wallbox Fali Töltő Bekötés',
          desc: '11 kW vagy 22 kW fali gyorstöltő berendezések mechanikai és villamos rögzítése garázsban vagy kocsibeállón.',
          features: ['Tesla, Webasto, Fronius stb. töltők', 'Type 2 szabványos csatlakozás', 'Hivatalos beüzemelési jegyzőkönyv'],
          priceLabel: 'Fix munkadíj',
          priceVal: '45 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/eloszto.avif',
          title: 'B Típusú / EV Speciális Védelem',
          desc: 'Egyenáramú szivárgást érzékelő speciális FI-relé és túláramvédelmi kismegszakító beépítése a lakáselosztóba.',
          features: ['DC 6mA hibaáram-érzékelés', 'Megvédi az otthoni hálózatot', 'Szabványos kötelező védelem'],
          priceLabel: 'Munkadíj',
          priceVal: '38 000 Ft',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hibajavitas.avif',
          title: 'Méretezett Tápkábel Kiépítés',
          desc: 'Főelosztótól induló dedikált 5x2.5 vagy 5x6 mm2 réz tápvezeték nyomvonalának szakszerű kiépítése.',
          features: ['Tűzálló merev/flexibilis kábelezés', 'Védőcsövezés vagy földkábel fektetés', 'Terhelhetőségi próbamérés'],
          priceLabel: 'Munkadíj',
          priceVal: '4 500 Ft / m',
          ctaText: 'Kalkuláció ↗',
          ctaLink: '#kalkulator'
        },
        {
          img: 'images/hero-img-1.avif',
          title: 'Társasházi Mélygarázs Kiépítés',
          desc: 'Központi méretlen/mért fővezetékről egyedi almérős töltőpont kiépítése közös képviseleti engedélyeztetéssel.',
          features: ['Hitelesített almérő beépítés', 'Kulcsos vészkapcsoló', 'Katasztrófavédelmi megfelelőség'],
          priceLabel: 'Munkadíj',
          priceVal: '65 000 Ft-tól',
          ctaText: 'Felmérés kérése ↗',
          ctaLink: '#kapcsolat'
        }
      ]
    },
    pricing: {
      badge: 'Töltő Árlista',
      title: 'Elektromosautó-töltő <span class="text-gold">Munkadíjak</span>',
      desc: 'Biztonságos, szabványos töltőkiépítés garanciával.',
      cards: [
        {
          cat: 'tolto',
          title: 'Töltőtelepítés & Mérések',
          sub: 'Fix munkadíjak garanciával',
          items: [
            { name: 'Wallbox fali töltő mechanikai rögzítése és bekötése', price: '45 000 Ft' },
            { name: 'Meglévő hálózat alkalmassági felmérése és terhelésmérés', price: '15 000 Ft' },
            { name: 'B típusú / EV speciális FI-relé beépítése', price: '38 000 Ft' },
            { name: 'Külön 3 fázisú kismegszakító beépítése elosztóba', price: '12 000 Ft' },
            { name: 'Társasházi almérős elosztódoboz kiépítése', price: '45 000 Ft' }
          ]
        },
        {
          cat: 'nyomvonal',
          title: 'Kábelezési Munkák',
          sub: 'Nyomvonal és segédanyagok',
          items: [
            { name: 'Méretezett réz tápvezeték nyomvonal (méterenként)', price: '4 500 Ft / m' },
            { name: 'Zárható vészkapcsoló beépítése a töltő mellé', price: '16 000 Ft' },
            { name: 'Kábelvédő csatorna / védőcső kiépítés', price: '3 000 Ft / m' },
            { name: 'Földkábeles árokásás és visszatemetés', price: '5 500 Ft / m' },
            { name: 'Fali konzol / oszlop betonozása és rögzítése', price: '25 000 Ft' }
          ]
        }
      ]
    },
    calc: {
      badge: 'Autótöltő Kalkulátor',
      title: 'Elektromosautó-töltő <span class="text-gold">Kalkulátor</span>',
      desc: 'Számítsa ki a Wallbox töltő telepítésének munkadíját!',
      options: [
        { name: 'Wallbox fali töltő szakszerű felszerelése és bekötése', price: 45000, priceFormatted: '45 000 Ft' },
        { name: 'Helyszíni kapacitásfelmérés és műszeres terhelésmérés', price: 15000, priceFormatted: '15 000 Ft' },
        { name: 'B típusú EV életvédelmi áramvédő kapcsoló beépítése', price: 38000, priceFormatted: '38 000 Ft' },
        { name: 'Táblába épített 3 fázisú védelmi kismegszakító', price: 12000, priceFormatted: '12 000 Ft' }
      ],
      counters: [
        { type: 'cable-m', name: 'Méretezett réz tápvezeték nyomvonal (méterenként)', unitPrice: 4500, priceFormatted: '4 500 Ft / m' },
        { type: 'ev-switch', name: 'Zárható vészkapcsoló beépítése a töltő mellé', unitPrice: 16000, priceFormatted: '16 000 Ft / db' },
        { type: 'pipe-m', name: 'Kábelvédő csatorna vagy védőcső kiépítés (méterenként)', unitPrice: 3000, priceFormatted: '3 000 Ft / m' }
      ]
    },
    projects: [
      {
        isBeforeAfter: true,
        imgBefore: 'images/panel-work.avif',
        imgAfter: 'images/hero-img-1.avif',
        location: 'Budapest, II/A kerület',
        date: '2026. április',
        title: 'Tesla Wall Connector 11 kW kiépítés garázsban',
        desc: 'Dedikált 5x4 mm2 tűzálló tápkábel kiépítése az elosztótól, B típusú FI-relé és fali tartó konzol rögzítése.'
      },
      {
        isBeforeAfter: false,
        img: 'images/eloszto.avif',
        location: 'Budaörs, Családi ház',
        date: '2026. április',
        title: 'Kültéri kocsibeálló 22 kW töltőoszlop telepítés',
        desc: 'Földkábeles nyomvonal kiépítése védőcsőben, oszlop rögzítése és dinamikus terhelésmenedzsment beállítása.'
      },
      {
        isBeforeAfter: true,
        imgBefore: 'images/eloszto.avif',
        imgAfter: 'images/panel-work.avif',
        location: 'Budapest, XI. kerület',
        date: '2026. március',
        title: 'Társasházi mélygarázs beálló autótöltő bekötés',
        desc: 'Központi mérőtől vezetett külön áramkör almérővel, zárható vészkapcsolóval és hivatalos jegyzőkönyvvel.'
      }
    ],
    faqs: [
      { q: 'Miért nem biztonságos sima 230V konnektorról tölteni az autót?', a: 'A normál fali aljzatok nem tartós, 10–16 Amperes folyamatos terhelésre készültek. Órák alatt túlmelegszenek, a kötések megolvadhatnak, ami súlyos tűzveszélyt okoz.' },
      { q: 'Milyen feltételek szükségesek egy 11 kW-os fali töltőhöz?', a: 'Egy 11 kW-os töltőhöz 3 fázisra (3x16 Amper) és a főelosztótól kiépített, dedikált 5x2.5 vagy 5x4 mm2 keresztmetszetű rézkábelre van szükség.' },
      { q: 'Mit tartalmaz a töltő kiépítésének munkája?', a: 'Helyszíni hálózatfelmérést, a megfelelő keresztmetszetű tápvezeték nyomvonalának kiépítését, túláram- és speciális B típusú / EV DC hibaáram-védelem beépítését és a fali töltő rögzítését, bekötését, tesztelését.' },
      { q: 'Társasházi mélygarázsba is tudnak töltőt telepíteni?', a: 'Igen, a társasházi közös képviselet hozzájárulása után kiépítjük az egyedi almérős vagy a lakás villanyórájától induló dedikált tápkábelt.' },
      { q: 'Milyen márkájú fali töltőket tudnak bekötni?', a: 'Bármilyen európai típusú Type 2 csatlakozós fali töltőt bekötünk: Tesla Wall Connector, Fronius, Webasto, Schneider EVlink, Wallbox Pulsar stb.' }
    ]
  }
];

pages.forEach(p => {
  let html = masterHtml;

  // 1. Meta & Title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title}</title>`);
  html = html.replace(/<meta name="description"[\s\S]*?>/, `<meta name="description"\n    content="${p.metaDesc}">`);
  html = html.replace(/<meta name="keywords"[\s\S]*?>/, `<meta name="keywords"\n    content="${p.metaKeywords}">`);
  html = html.replace(/<meta property="og:url" content="https:\/\/www\.villux\.hu\/">/, `<meta property="og:url" content="https://www.villux.hu/${p.fileName}">`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?">/, `<meta property="og:title" content="${p.title}">`);
  html = html.replace(/<meta property="og:description"[\s\S]*?>/, `<meta property="og:description"\n    content="${p.metaDesc}">`);
  html = html.replace(/"url": "https:\/\/www\.villux\.hu"/, `"url": "https://www.villux.hu/${p.fileName}"`);

  // 2. Hero Section
  html = html.replace(/<div class="hero-badge">[\s\S]*?<\/div>/, `<div class="hero-badge" data-dynamic-hero-badge>\n          <span class="pulse-dot"></span>\n          <span>${p.heroBadge}</span>\n        </div>`);
  html = html.replace(/<h1 class="hero-title">[\s\S]*?<\/h1>/, `<h1 class="hero-title" data-dynamic-hero-title>\n          ${p.heroTitle}\n        </h1>`);
  html = html.replace(/<p class="hero-subtitle">[\s\S]*?<\/p>/, `<p class="hero-subtitle" data-dynamic-hero-subtitle>\n          ${p.heroSubtitle}\n        </p>`);

  // 3. SECTIONS REPLACEMENT WITH DETERMINISTIC INDEXOF
  // Services
  const newServices = buildServicesSection(p.services.badge, p.services.title, p.services.desc, p.services.cards);
  html = replaceSection(html, '<section class="services-section" id="szolgaltatasok">', newServices);

  // Pricing
  const newPricing = buildPricingSection(p.pricing.badge, p.pricing.title, p.pricing.desc, p.pricing.cards);
  html = replaceSection(html, '<section class="pricing-section" id="arak">', newPricing);

  // Calculator
  const newCalc = buildCalcSection(p.calc.badge, p.calc.title, p.calc.desc, p.calc.options, p.calc.counters);
  html = replaceSection(html, '<section class="calc-section" id="kalkulator">', newCalc);

  // Projects / References
  const newProjects = buildProjectsSection('Valódi Referenciák', 'Nemrég Elvégzett <span class="text-gold">Munkáink</span>', 'Pillantsunk be néhány sikeresen átadott projektünkbe:', p.projects);
  html = replaceSection(html, '<section class="projects-section" id="referenciak">', newProjects);

  // FAQ
  const newFaq = buildFaqSection('Gyakran Ismételt Kérdések', 'Minden Kérdésére <span class="text-gold">Válaszolunk</span>', 'Kérdése van? Az alábbiakban összegyűjtöttük a legfontosabb válaszokat:', p.faqs);
  html = replaceSection(html, '<section class="faq-section" id="gyik">', newFaq);

  // 4. Form pre-selected service
  html = html.replace(/value="⚡ ÚJ VILLUX SOS AJÁNLATKÉRÉS \/ VISSZAHÍVÁS"/, `value="⚡ ÚJ AJÁNLATKÉRÉS (${p.fileName})"`);
  if (p.formServiceVal) {
    const optRegex = new RegExp(`(<option value="${p.formServiceVal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}")`, 'g');
    html = html.replace(optRegex, '$1 selected');
  }

  // 5. Script landing-param.js
  if (!html.includes('js/landing-param.js')) {
    html = html.replace('</body>', '  <!-- Dinamikus URL paraméter és kulcsszó illesztő script -->\n  <script src="js/landing-param.js"></script>\n</body>');
  }

  const outPath = path.join(__dirname, p.fileName);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Generated perfect page: ${p.fileName} (${html.length} bytes)`);
});

