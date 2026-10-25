# Villux 0–24 Villanyszerelő Gyorsszolgálat - Hirdetési Landing Page

Prémium minőségű, rendkívül gyors és magas konverziójú érkezőoldal (Google Ads és Meta hirdetésekhez), a **koncepció 1 és 2** dizájntervei, az **araink.png** árjegyzék és a **villux.hu** hivatalos adatai alapján elkészítve.

---

## 🚀 Főbb Jellemzők

1. **Dizájn Koncepció 1 & 2 megvalósítása**:
   - Mély smaragdzöld (`#041711` / `#07261d`) és elektromos arany-sárga (`#f6ba13`) prémium színvilág
   - Outfit és Plus Jakarta Sans modern tipográfia
   - Valósághű, professzionális fotók a Villux szakembereiről, szervizautójáról és munkáiról
   - Lebegő statisztikai kártyák (10 000+ elvégzett javítás, Google 5.0 értékelések, 95% kiérkezés 60 percen belül)

2. **Átfogó Hivatalos Árlista (`araink.png` alapján)**:
   - Hibajavítás (Diagnosztika: 10 000 Ft, Zárlat: 12 000 Ft-tól, FI-relé: 10 000 Ft-tól, Biztosító: 5 000 Ft-tól...)
   - Telepítés és szerelés (Hálózatépítés: 10 000–15 000 Ft/m², Konnektor: 8 000–20 000 Ft/db, Elosztótábla: 35 000 Ft-tól...)
   - Kiszállási díjak (Budapest: 5 000 Ft, Pest megye: 7 000 Ft-tól, Hétvége: +30%, Éjszaka: +50%)
   - Biztonsági rendszerek (Kamerarendszer, Riasztórendszer és szerviz)
   - Kategória szűrő gombokkal azonnal áttekinthető

3. **Interaktív Villamossági Árkalkulátor**:
   - Az érdeklődők kiválaszthatják a hibákat, konnektorok/lámpák darabszámát, helyszínt és időpontot
   - Valós idejű, automatikus összegszámítás
   - Egy kattintással átmásolható az árajánlatkérő űrlaphoz

4. **Hirdetésre Optimalizált Konverziós Elemek**:
   - **Rögzített 0-24 SOS Hívássáv** (mobil és asztali nézetben is mindig látható)
   - 1-kattintásos azonnali hívás (`tel:+36703068409`)
   - Lebegő WhatsApp gomb előre kitöltött üzenettel
   - Gyors űrlap sürgősségi jelölővel és azonnali visszajelző modallal
   - Interaktív GYIK harmonika a leggyakoribb kérdésekkel

---

## 🌐 Feltöltés és Futattás Vercelen

A projekt tiszta, modern és villámgyors kódbázisra épül, így **0 másodperc build idővel, 100%-os megbízhatósággal** fut Vercelen.

### 1. Módszer: Feltöltés GitHubon keresztül (Ajánlott)
1. Töltse fel ezt a mappát a GitHub fiókjába (egy új privát vagy publikus repóként).
2. Nyissa meg a [vercel.com](https://vercel.com) oldalt, és kattintson az **"Add New..." -> "Project"** gombra.
3. Válassza ki a GitHub repót, a keretrendszernél hagyja **"Other"** beállításon.
4. Kattintson a **"Deploy"** gombra.
5. Pár másodperc múlva a weboldal már él is a Vercel által adott címen vagy a saját saját domainjén (`villux.hu`)!

### 2. Módszer: Vercel CLI segítségével
1. Telepítse a Vercel parancssori eszközt:
   ```bash
   npm i -g vercel
   ```
2. Lépjen be a mappába és futtassa:
   ```bash
   vercel
   ```
3. Kövesse a képernyőn megjelenő utasításokat az élesítéshez.

---

## ⚙️ Saját Domain Beállítása Vercelen
1. Lépjen a Vercel vezérlőpultján a projekt **Settings -> Domains** fülére.
2. Adja hozzá a kívánt domaint (pl. `villux.hu` vagy aldomaint pl. `sos.villux.hu`).
3. Állítsa be a DNS rekordokat a domain regisztrátoránál a Vercel által mutatott értékekre.

---

## 📊 Google Ads Konverziókövetés (AW-18536371813)
A Google Ads konverziómérés és a webhelycímke aktívan be van építve az `index.html` fejlécébe és a `js/main.js` fájlba:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18536371813"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18536371813');
</script>
```

### Automatikus konverziómérések:
1. **Hívásindítás és telefonszám kattintások (`tel:+36703068409`)**:
   - Minden fejléc, hero, árkártya, lábléc és lebegő SOS gomb (`headerPhoneBtn`, `heroCallNowBtn`, `stickyCallBtn` stb.) kattintásakor automatikusan lefut a konverzióküldés a Google Ads felé (`gtag('event', 'conversion')`).
   - A telefonszám kimásolásakor (`data-copy-phone`) szintén rögzül a hívási szándék.
2. **Ajánlatkérő űrlap beküldése**:
   - Sikeres beküldéskor `form_submit` konverzió és `generate_lead` esemény indul.
3. **Egyedi konverziós címkék (Conversion Label)**:
   - Amennyiben a Google Ads felületén külön címkét hoz létre (pl. `AW-18536371813/AbCdEfGhIj`), a `js/main.js`-ben lévő `window.VILLUX_ADS_CONFIG` objektumban közvetlenül megadható.

---

## 📁 Mappa Struktúra
```text
villux/
├── css/
│   └── style.css            # Teljes dizájn rendszer (koncepció színek & animációk)
├── js/
│   └── main.js              # Árkalkulátor, harmonikák, űrlapkezelő, vágólap másolás
├── images/
│   ├── hero-electrician.jpg # Főhős villanyszerelő kép sárga sisakkal
│   ├── panel-work.jpg       # Műszeres hibakeresés az elosztószekrényben
│   ├── team.jpg             # Szakértő villanyszerelő csapat tervrajzzal
│   ├── van.jpg              # Villux szervizautó Budapest utcáin
│   ├── security-camera.jpg  # Kamerarendszer telepítés referencia
│   ├── lighting.jpg         # Modern design és LED világítás
│   └── fusebox.jpg          # Hager elosztótábla korszerűsítés
├── index.html               # Főoldal
├── vercel.json              # Vercel konfiguráció (gyorsítótár & biztonsági fejlécek)
├── package.json             # NPM szkriptek
└── README.md                # Dokumentáció
```
