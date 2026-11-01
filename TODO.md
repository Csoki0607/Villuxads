# Villux – Google Ads Landing Page Fejlesztési TODO Lista

Ez a dokumentum rögzíti a jóváhagyott fejlesztési feladatokat a `villux_google_ads_landing_page_brief.html` specifikáció és a kiegészítések alapján. A feladatok státuszát folyamatosan frissítjük.

---

## 📋 Feladatok Áttekintése

### 1. Fázis: Előkészítés & Dinamikus Komponensek
- [x] **1.1. Moduláris CSS & JS kiegészítések előkészítése**
  - Közös stílusok és landing-specifikus komponensek felkészítése (`css/style.css`, `js/main.js`).
- [x] **1.2. Dinamikus címsor / URL paraméter illesztő script (`landing-param.js`)**
  - `?tema=...` és `?utm_term=...` paraméterek lekezelése a Hero címsorok/kiemelések finomhangolására.
- [x] **1.3. „Kizáró mikro-blokk” komponens**
  - Információs sáv: miket NEM vállal a cég (pl. kisgépek, autóelektronika, 112-es vészhelyzeti figyelmeztetés).

---

## 2. Fázis: SOS / Sürgősségi Landing Page
- [x] **2.1. `sos-villanyszerelo-budapest.html` váz és Hero szekció**
  - H1: *SOS villanyszerelő Budapest – gyors segítség elektromos hibák esetén*.
  - Nagy, közvetlen `tel:+36703068409` hívógomb és 30-60 perces tájékoztató.
- [x] **2.2. SOS Problémablokkok kialakítása**
  - Áramkimaradás, zárlat / biztosíték leverődés, FI-relé leoldás, szikrázó/füstölő aljzat.
- [x] **2.3. SOS Bizalom, valós referenciák és GYIK**
  - Kiszállási és munkadíjak, folyamatleírás, biztonsági óvintézkedések.
- [x] **2.4. Mobilos fix alsó sáv**
  - Közvetlen hívásgombbal.

---

### 3. Fázis: Általános Villanyszerelő Landing Page
- [x] **3.1. `villanyszerelo-budapest.html` váz és Hero szekció**
  - H1: *Villanyszerelő Budapest – lakossági villanyszerelés*.
  - Kettős CTA (Telefonos kapcsolat + Ajánlatkérés).
- [x] **3.2. Fő lakossági szolgáltatások és árak blokk**
  - Biztosítéktábla, konnektor/kapcsoló, tűzhely/főzőlap, bojler, hálózatfelújítás.
- [x] **3.3. Ajánlatkérő űrlap integráció**
  - FormSubmit integráció, mezők ellenőrzése, mobilbarát kitöltés.
- [x] **3.4. Referenciák, folyamat és GYIK**

---

### 4. Fázis: További Szolgáltatási Céloldalak
- [x] **4.1. Biztosítéktábla szerelés (`/biztositektabla-szereles`)**
  - Dedikált céloldal lakáselosztó cserére, FI-relé beépítésre (`biztositektabla-szereles.html`).
- [x] **4.2. Főzőlap & tűzhely bekötés (`/fozolap-bekotes`)**
  - Indukciós főzőlap és elektromos sütő garanciális bekötési céloldal (`fozolap-bekotes.html`).
- [x] **4.3. Villamos hálózat felújítás (`/villamos-halozat-felujitas`)**
  - Panellakás és tégla lakás komplett/részleges vezetékezési céloldal (`villamos-halozat-felujitas.html`).
- [ ] **4.4. Különleges szolgáltatási oldalak** *(Jóváhagyást követően: VBF, Lakásvillamosság, LED, EV-töltő)*

---

### 5. Fázis: Ellenőrzés, Tesztelés & Mérés
- [x] **5.1. Google Tag & Konverziómérés ellenőrzése**
  - `phone_click` (`AW-18536371813/lCIeCOfhtqkdEOWs6oZF`) és FormSubmit űrlapbeküldés minden landing oldalon integrálva és ellenőrizve.
- [x] **5.2. Mobilos és asztali responzivitás, sebesség-ellenőrzés**
  - Reszponzív layoutok, mobil sticky alsó sáv (hívás + űrlap), könnyű AVIF képek és aszinkron betöltés.
- [x] **5.3. Végső átadás és riport**
  - Hirdetés–landing megfeleltetés frissítve a `google-ads-kampanyterv.md`-ben.
