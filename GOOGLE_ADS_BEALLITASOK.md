# Villux Google Ads Beállítási Útmutató & URL Katalógus

Ez a dokumentum a Villux weboldal **mind a 11 landing oldalához** tartalmazza a pontos Google Ads beállításokat. 
A hirdetések beállításakor csak másold ki az adott hirdetéscsoporthoz tartozó mezőket!

---

## 📌 Alapszabály a Google Ads felületén

A Google Ads hirdetés szerkesztésekor két mezőt kell kitöltened:
1. **Végső URL (Final URL):** A tiszta oldal linkje (pl. `https://www.villux.hu/sos-villanyszerelo-budapest.html`).
2. **Végső URL utótagja (Final URL suffix):** A hirdetés alján a *„Hirdetési URL-beállítások”* lenyíló részben található mező. Ide **TILOS kérdőjelet (`?`) tenni**, csak a paramétereket másold be!

A `{keyword}` egy automatikus Google ValueTrack kód, amit a Google a kattintás pillanatában magától kicserél a keresett szóra, a weboldal pedig azonnal átváltja a címsort és a jelvényt.

---

## 1. 0–24 SOS Villanyszerelő Gyorsszolgálat (Budapest)

* **Milyen keresésekhez?** `sos villanyszerelő`, `0-24 villanyszerelő budapest`, `éjszakai villanyszerelő`, `villanyszerelő gyorsszolgálat budapest`, `elment az áram`, `leveri a biztosítékot`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/sos-villanyszerelo-budapest.html
  ```
* **Végső URL utótagja (Final URL suffix) – Általános:**
  ```text
  tema=sos&keyword={keyword}
  ```
* **Végső URL utótagja – Zárlatos keresésekhez:**
  ```text
  tema=zarlat&keyword={keyword}
  ```
* **Végső URL utótagja – Áramszünet keresésekhez:**
  ```text
  tema=aramszunet&keyword={keyword}
  ```
* **Kerületspecifikus példa (pl. 13. kerület):**
  ```text
  tema=sos&kerulet=13&keyword={keyword}
  ```

---

## 2. Villanyszerelő Gyorsszolgálat (Pest Megye & Általános)

* **Milyen keresésekhez?** `villanyszerelő pest megye`, `villanyszerelő érd`, `villanyszerelő dunaharaszti`, `villanyszerelő budaörs`, `villanyszerelő szentendre`, `villanyszerelő gödöllő`, `villanyszerelő árak`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/villanyszerelo.html
  ```
* **Végső URL utótagja (Final URL suffix) – Általános Pest megye:**
  ```text
  keyword={keyword}
  ```
* **Városspecifikus utótagok (Hirdetéscsoport szinten):**
  * Érd: `kerulet=erd&keyword={keyword}`
  * Dunaharaszti: `kerulet=dunaharaszti&keyword={keyword}`
  * Budaörs: `kerulet=budaors&keyword={keyword}`
  * Szigetszentmiklós: `kerulet=szigetszentmiklos&keyword={keyword}`
  * Dunakeszi: `kerulet=dunakeszi&keyword={keyword}`
  * Gödöllő: `kerulet=godollo&keyword={keyword}`
  * Szentendre: `kerulet=szentendre&keyword={keyword}`
  * Gyál: `kerulet=gyal&keyword={keyword}`
  * Vecsés: `kerulet=vecses&keyword={keyword}`
  * Fót: `kerulet=fot&keyword={keyword}`
  * Vác: `kerulet=vac&keyword={keyword}`

---

## 3. Lakossági Villanyszerelő (Budapest)

* **Milyen keresésekhez?** `villanyszerelő budapest`, `lakossági villanyszerelő budapest`, `villanyszerelő 11 kerület`, `villanyszerelő óbuda`, `villanyszerelő zugló`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/villanyszerelo-budapest.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  keyword={keyword}
  ```
* **Kerületi hirdetéscsoportokhoz (pl. 11. kerület):**
  ```text
  kerulet=11&keyword={keyword}
  ```

---

## 4. Főzőlap, Sütő & Tűzhely Bekötés

* **Milyen keresésekhez?** `indukciós főzőlap bekötés`, `főzőlap bekötés árak`, `villanytűzhely bekötés`, `elektromos sütő bekötés`, `főzőlap bekötés garanciával`, `bosch főzőlap bekötés`, `electrolux gépbekötés`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/fozolap-bekotes.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  tema=fozolap-bekotes&keyword={keyword}
  ```
* **Ha városra/kerületre célzol (pl. Dunaharaszti vagy 14. kerület):**
  * Dunaharaszti: `tema=fozolap-bekotes&kerulet=dunaharaszti&keyword={keyword}`
  * 14. kerület: `tema=fozolap-bekotes&kerulet=14&keyword={keyword}`

---

## 5. Biztosítéktábla Csere & FI-relé Beépítés

* **Milyen keresésekhez?** `biztosítéktábla csere`, `lakáselosztó csere`, `fi relé beépítés`, `olvadóbiztosíték csere kismegszakítóra`, `biztosítéktábla szerelés árak`, `áramvédő kapcsoló szerelés`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/biztositektabla-szereles.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  tema=biztositektabla-szereles&keyword={keyword}
  ```
* **Pest megyei / Kerületi célzással (pl. Érd):**
  ```text
  tema=biztositektabla-szereles&kerulet=erd&keyword={keyword}
  ```

---

## 6. Villamos Biztonsági Felülvizsgálat (VBF)

* **Milyen keresésekhez?** `vbf felülvizsgálat`, `villamos biztonsági felülvizsgálat budapest`, `érintésvédelmi felülvizsgálat`, `vbf jegyzőkönyv eladáshoz`, `villamos szabványosítás`, `vbf minősítő irat`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/villamos-szabvanyositas-vbf.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  tema=vbf-felulvizsgalat&keyword={keyword}
  ```
* **Pest megyei / Városi célzással (pl. Dunaharaszti vagy Budaörs):**
  ```text
  tema=vbf-felulvizsgalat&kerulet=dunaharaszti&keyword={keyword}
  ```

---

## 7. Elektromos Autó Töltő (Wallbox) Kiépítés

* **Milyen keresésekhez?** `elektromos autó töltő kiépítés`, `wallbox telepítés`, `otthoni autótöltő bekötés`, `fali töltő villanyszerelés`, `ev töltő kábelezés`, `11 kw töltő bekötés`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/elektromos-auto-tolto-kiepites.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  tema=elektromos-auto-tolto&keyword={keyword}
  ```
* **Agglomerációs célzással (pl. Szentendre vagy Gödöllő):**
  ```text
  tema=elektromos-auto-tolto&kerulet=szentendre&keyword={keyword}
  ```

---

## 8. Villamos Hálózat Felújítás & Átvezetékezés

* **Milyen keresésekhez?** `villanyhálózat felújítás`, `panellakás villanyszerelés`, `vezeték újrahúzás`, `alumínium vezeték csere rézre`, `lakás átvezetékezés árak`, `pormentes falhoronymarás`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/villamos-halozat-felujitas.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  tema=villamos-halozat-felujitas&keyword={keyword}
  ```
* **Példa kerületi / agglomerációs célzásra (pl. 3. kerület):**
  ```text
  tema=villamos-halozat-felujitas&kerulet=3&keyword={keyword}
  ```

---

## 9. Lakásvillanyszerelés & Épületvillamosság

* **Milyen keresésekhez?** `lakásvillanyszerelés`, `épületvillamosság`, `új építésű villanyszerelés`, `családi ház villanyszerelés`, `villanyszerelő mester`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/lakasvillanyszereles-epuletvillamossag.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  keyword={keyword}
  ```

---

## 10. Modern LED Világítás Tervezés & Kivitelezés

* **Milyen keresésekhez?** `led világítás szerelés`, `rejtett led világítás kivitelezés`, `konyhapult led világítás`, `mennyezeti led szalag beépítés`, `okos világítás szerelés`
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/led-vilagitas-tervezes-kivitelezes.html
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  tema=led-vilagitas&keyword={keyword}
  ```

---

## 11. Főoldal (Általános márkakampányokhoz)

* **Milyen keresésekhez?** `villux`, `villux villanyszerelő`, `villux budapest`, általános márka és nem specifikus keresések
* **Végső URL (Final URL):**
  ```text
  https://www.villux.hu/
  ```
* **Végső URL utótagja (Final URL suffix):**
  ```text
  keyword={keyword}
  ```

---

## ⚡ Gyors Ellenőrző Lista a Google Ads indításához:

1. **Helycélzás beállítása:**  
   * Helyek: Budapest + Pest megye.  
   * **Nagyon fontos:** Helybeállítások $\rightarrow$ Jelöld be: **„Jelenlét: olyan emberek, akik a megcélzott helyen tartózkodnak vagy rendszeresen ott fordulnak meg”**!
2. **Kizáró kulcsszavak felvétele:**  
   * Ne felejtsd el kizárni a közműveket és az álláskeresőket: `elmu`, `elmü`, `eon`, `mvm`, `hibabejelento`, `ugyfelszolgalat`, `villanyora`, `állás`, `tanfolyam`, `ingyen`, `házilag`, `bojler`, `mosógép`.
3. **Végső URL utótag beillesztése:**  
   * Másold be a fenti kódok közül a megfelelőt az egyes hirdetéscsoportok URL-beállításaihoz!
4. **Híváshivatkozás (Call asset) hozzáadása:**  
   * Telefonszám: `+36 70 306 8409` – legyen hozzáadva minden kampányhoz hívásbővítményként!

