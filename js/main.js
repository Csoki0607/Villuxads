/* ==========================================================================
   VILLUX 0-24 GYORSSZOLGÁLAT - MAIN APPLICATION JAVASCRIPT
   Interactivity, Real-time Price Calculator, Smooth Filtering, FAQs & Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initWhyAccordion();
  initPricingFilter();
  initPriceCalculator();
  initQuoteForm();
  initPhoneCopy();
  initSmoothScroll();
  initGoogleAdsTracking();
  initCookieConsent();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking any nav link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   2. WHY CHOOSE US ACCORDION
   -------------------------------------------------------------------------- */
function initWhyAccordion() {
  const items = document.querySelectorAll('.why-accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. PRICING FILTER TABS
   -------------------------------------------------------------------------- */
function initPricingFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.pricing-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE PRICE CALCULATOR (VILLAMOSSÁGI ÁRKALKULÁTOR)
   -------------------------------------------------------------------------- */
function initPriceCalculator() {
  const optionCards = document.querySelectorAll('.calc-checkboxes .calc-option-card');
  const counterInputs = document.querySelectorAll('[data-counter-type]');
  const timeRadios = document.querySelectorAll('input[name="calc_time"]');
  const totalValEl = document.getElementById('calcTotalVal');
  const mobileTotalValEl = document.getElementById('calcMobileLiveVal');
  const summaryListEl = document.getElementById('calcSummaryList');
  const applyCalcBtn = document.getElementById('applyCalcToForm');

  if (!totalValEl || !summaryListEl) return;

  function updateRadioCards() {
    document.querySelectorAll('.calc-radio-card').forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  function calculate() {
    updateRadioCards();
    let total = 0;
    const selectedItems = [];

    // 1. Toggled Option Cards (Csak érvényes névvel és árral rendelkező fix tételek)
    optionCards.forEach(card => {
      if (card.classList.contains('selected')) {
        const name = card.getAttribute('data-name');
        const price = parseInt(card.getAttribute('data-price'), 10) || 0;
        if (name && price > 0) {
          total += price;
          selectedItems.push({ name, price, qty: 1 });
        }
      }
    });

    // 2. Quantity Counters
    counterInputs.forEach(box => {
      const qtyEl = box.querySelector('.counter-value');
      const qty = parseInt(qtyEl.textContent, 10) || 0;
      if (qty > 0) {
        const name = box.getAttribute('data-counter-name');
        const unitPrice = parseInt(box.getAttribute('data-unit-price'), 10) || 0;
        const subtotal = qty * unitPrice;
        total += subtotal;
        selectedItems.push({ name: `${name} (${qty} db)`, price: subtotal, qty });
      }
    });

    // 3. Time Multiplier (Normál munkaidő vagy Hétvégi pótlék +30%)
    let multiplier = 1.0;
    let timeNote = '';
    const selectedTime = document.querySelector('input[name="calc_time"]:checked');
    if (selectedTime) {
      multiplier = parseFloat(selectedTime.value) || 1.0;
      if (multiplier > 1.0) {
        const surcharge = Math.round((multiplier - 1.0) * 100);
        timeNote = ` (${selectedTime.getAttribute('data-label')}: +${surcharge}%)`;
      }
    }

    const finalTotal = Math.round(total * multiplier);

    // Update UI Total
    const formatted = formatCurrency(finalTotal);
    totalValEl.textContent = formatted;
    if (mobileTotalValEl) {
      mobileTotalValEl.textContent = formatted;
    }

    // Update Summary List
    summaryListEl.innerHTML = '';

    // Ha még nem választott semmilyen konkrét munkát
    if (selectedItems.length === 0) {
      const hintLi = document.createElement('li');
      hintLi.style.color = 'var(--text-muted)';
      hintLi.style.fontSize = '0.82rem';
      hintLi.style.fontStyle = 'italic';
      hintLi.style.paddingBottom = '6px';
      hintLi.style.borderBottom = '1px dashed rgba(255,255,255,0.08)';
      hintLi.textContent = 'Még nem választott konkrét munkát (kattintson a fenti tételekre)';
      summaryListEl.appendChild(hintLi);
    }

    selectedItems.forEach(item => {
      if (!item || !item.name || item.name === 'null') return;
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name}</span>
        <strong>${formatCurrency(item.price)}</strong>
      `;
      summaryListEl.appendChild(li);
    });

    if (multiplier > 1.0 && total > 0) {
      const surchargeLi = document.createElement('li');
      surchargeLi.style.color = 'var(--accent-gold)';
      surchargeLi.innerHTML = `
        <span>Időponti pótlék ${timeNote}</span>
        <strong>+${formatCurrency(finalTotal - total)}</strong>
      `;
      summaryListEl.appendChild(surchargeLi);
    }
  }

  // Option toggle click
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      calculate();
    });
  });

  // Counter plus/minus
  document.querySelectorAll('.btn-counter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('[data-counter-type]');
      const valEl = parent.querySelector('.counter-value');
      let currentVal = parseInt(valEl.textContent, 10) || 0;

      if (btn.classList.contains('btn-plus')) {
        currentVal++;
      } else if (btn.classList.contains('btn-minus') && currentVal > 0) {
        currentVal--;
      }

      valEl.textContent = currentVal;
      calculate();
    });
  });

  // Radios change
  timeRadios.forEach(radio => radio.addEventListener('change', () => {
    updateRadioCards();
    calculate();
  }));

  // Initial calculation
  calculate();

  // Apply to Contact Form
  if (applyCalcBtn) {
    applyCalcBtn.addEventListener('click', () => {
      const messageField = document.getElementById('formMessage');
      const serviceSelect = document.getElementById('formService');
      const quoteForm = document.getElementById('quoteForm');
      const nameInput = document.getElementById('formName');

      let summaryText = `[Kalkulált igények az oldalról]:\n`;
      summaryListEl.querySelectorAll('li').forEach(li => {
        summaryText += `- ${li.innerText}\n`;
      });
      summaryText += `Becsült összeg: ${totalValEl.textContent}\nKérem visszahívásukat az időpont egyeztetéshez!`;

      if (messageField) {
        messageField.value = summaryText;
      }
      if (serviceSelect) {
        serviceSelect.value = 'hibajavitas';
      }

      showToast('Kalkuláció átmásolva az űrlaphoz!');

      // Smooth scroll directly to form inputs (avoids scrolling to section top on mobile)
      if (quoteForm) {
        const headerOffset = 90;
        const formTop = quoteForm.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: formTop,
          behavior: 'smooth'
        });

        // Focus the first name input so user can start filling immediately
        setTimeout(() => {
          if (nameInput) {
            nameInput.focus({ preventScroll: true });
          }
        }, 550);
      } else {
        const contactSection = document.getElementById('kapcsolat');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
}

/* --------------------------------------------------------------------------
   6. CONTACT & QUOTE FORM HANDLING (EMAIL KÜLDÉS VILLUX024@GMAIL.COM-RA)
   -------------------------------------------------------------------------- */
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  const modal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const submitBtn = document.getElementById('submitFormBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Field extraction & trimming
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const addressInput = form.querySelector('[name="address"]');
    const serviceInput = form.querySelector('[name="service"]');
    const urgentInput = form.querySelector('[name="is_urgent"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';
    const service = serviceInput ? serviceInput.value : '';
    const isUrgent = urgentInput && urgentInput.checked ? '⚡ IGEN (Sürgős azonnali kiszállás / visszahívás szükséges!)' : 'Normál ajánlatkérés';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !phone) {
      alert('Kérjük adja meg nevét és telefonszámát a visszahíváshoz!');
      return;
    }

    // Set Loading State on Button
    let originalBtnHtml = '';
    if (submitBtn) {
      originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:18px;height:18px;animation:btnSpin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-linecap="round"></path>
        </svg>
        <span>Küldés folyamatban...</span>
      `;
    }

    const payload = {
      "Ügyfél_Neve": name,
      "Telefonszám": phone,
      "Email_Cím": email || 'Nem adott meg e-mail címet',
      "Település_Kerület": address || 'Nincs megadva cím',
      "Szolgáltatás_típusa": service,
      "Sürgős_visszahívás": isUrgent,
      "Hiba_Leírása_vagy_Kalkuláció": message || 'Nem adott meg külön hiba leírást',
      "_subject": `⚡ Új Villux Megkeresés: ${name} (${phone})`,
      "_template": "table",
      "_captcha": "false"
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/villux024@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // Show Confirmation Modal
      if (modal) {
        modal.classList.add('open');
      } else {
        showToast('Köszönjük! Ajánlatkérését sikeresen továbbítottuk.');
      }
      reportGoogleAdsConversion('form_submit', {
        label: `Ajánlatkérés: ${service || 'Általános'} (${isUrgent})`
      });
      form.reset();
    } catch (err) {
      console.warn('AJAX submit warning, fallback to direct form submission:', err);
      // Fallback: standard submit if network block
      form.submit();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (modalOkBtn && modal) {
    modalOkBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }
}

/* --------------------------------------------------------------------------
   7. COPY PHONE NUMBER & TOAST
   -------------------------------------------------------------------------- */
function initPhoneCopy() {
  const copyButtons = document.querySelectorAll('[data-copy-phone]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '+36703068409';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('Telefonszám kimásolva: +36 70 306 8409');
        reportGoogleAdsConversion('phone_call', {
          buttonId: 'copy-phone-btn',
          label: 'Telefonszám kimásolása'
        });
      }).catch(() => {
        window.location.href = `tel:${phone}`;
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M20 6L9 17l-5-5"></path>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* --------------------------------------------------------------------------
   8. SMOOTH SCROLLING FOR ALL ANCHOR LINKS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = window.innerWidth <= 768 ? 62 : 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. GOOGLE ADS CONVERSION & CALL TRACKING (AW-18536371813)
   -------------------------------------------------------------------------- */
const GOOGLE_ADS_ID = 'AW-18536371813';

// Globális konfigurációs objektum: ha a Google Ads-ben létrehozott külön
// konverziós műveletet (pl. "Hívások a webhelyről"), a hozzá tartozó címke (Conversion Label)
// megadható itt (pl. 'AW-18536371813/AbCdEfGhIj'):
window.VILLUX_ADS_CONFIG = {
  adsId: GOOGLE_ADS_ID,
  phoneConversionLabel: 'AW-18536371813/lCIeCOfhtqkdEOWs6oZF', // Telefonáló potenciális ügyfél
  formConversionLabel: ''   // Opcionális: pl. 'AW-18536371813/yyyyyyyyyy'
};

/**
 * Konverziós esemény küldése a Google Ads felé
 * @param {'phone_call' | 'form_submit'} type
 * @param {Object} details
 */
function reportGoogleAdsConversion(type, details = {}) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  const config = window.VILLUX_ADS_CONFIG || {};
  let sendTo = config.adsId || GOOGLE_ADS_ID;

  if (type === 'phone_call' && config.phoneConversionLabel) {
    sendTo = config.phoneConversionLabel;
  } else if (type === 'form_submit' && config.formConversionLabel) {
    sendTo = config.formConversionLabel;
  }

  // Google Ads fő konverzió esemény
  window.gtag('event', 'conversion', {
    'send_to': sendTo,
    'value': details.value || 1.0,
    'currency': details.currency || 'HUF',
    'event_category': type === 'phone_call' ? 'Hívás' : 'Ajánlatkérés',
    'event_label': details.label || (type === 'phone_call' ? 'Telefonos hívás indítás (+36 70 306 8409)' : 'Ajánlatkérés űrlap')
  });

  // Kiegészítő Google Ads / Analytics engagement események
  if (type === 'phone_call') {
    window.gtag('event', 'contact', {
      'method': 'Phone',
      'event_category': 'Engagement',
      'event_label': details.buttonId || 'Telefonhívás gomb kattintás'
    });
  } else if (type === 'form_submit') {
    window.gtag('event', 'generate_lead', {
      'event_category': 'Leads',
      'event_label': details.label || 'Ajánlatkérő űrlap beküldve'
    });
  }
}

/**
 * Szabványos Google Ads gtag_report_conversion segédfüggvény
 * @param {string} [url] - Opcionális átirányítási URL
 * @returns {boolean}
 */
window.gtag_report_conversion = function(url) {
  const callback = function () {
    if (typeof(url) !== 'undefined' && url) {
      window.location = url;
    }
  };

  if (typeof window.gtag === 'function') {
    const config = window.VILLUX_ADS_CONFIG || {};
    const sendTo = config.phoneConversionLabel || config.adsId || GOOGLE_ADS_ID;
    window.gtag('event', 'conversion', {
      'send_to': sendTo,
      'event_callback': callback
    });
  } else {
    callback();
  }
  return false;
};

/**
 * Kattintásfigyelő inicializálása az összes telefonhívás gombra
 */
function initGoogleAdsTracking() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', () => {
      const buttonId = link.id || (link.getAttribute('class') ? link.getAttribute('class').split(' ')[0] : 'tel-link');
      reportGoogleAdsConversion('phone_call', {
        buttonId: buttonId,
        label: `Kattintás hívásra: ${buttonId}`
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. MINIMAL COOKIE BANNER (NON-INTRUSIVE & GOOGLE CONSENT MODE V2)
   -------------------------------------------------------------------------- */
function initCookieConsent() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAcceptBtn');
  if (!banner || !acceptBtn) return;

  try {
    const consent = localStorage.getItem('villux_cookie_consent');
    if (consent === 'accepted') {
      banner.style.display = 'none';
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });
      }
      return;
    }
  } catch (e) { }

  banner.style.display = 'flex';
  banner.classList.remove('hidden');

  acceptBtn.addEventListener('click', () => {
    try {
      localStorage.setItem('villux_cookie_consent', 'accepted');
    } catch (e) { }

    banner.style.opacity = '0';
    banner.style.transform = 'translateY(12px)';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 280);

    // Google Ads Consent Mode v2 engedélyezése
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  });
}



