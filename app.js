/**
 * Grandview Architectural Signs & Illumination - Master Interactive Script
 * Handles: Calculator Engine, Modal System, Lightbox, FAQ Accordion, Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initModals();
  initFaq();
  initMobileNav();
});

// Interactive Working Diagnostic Calculator
function initCalculator() {
  const slider = document.getElementById('calcSlider1');
  const number = document.getElementById('calcNumber1');
  const select = document.getElementById('calcSelect2');
  const btn = document.getElementById('runCalcBtn');
  const res1 = document.getElementById('calcResult1');
  const res2 = document.getElementById('calcResult2');

  if (!slider || !number || !select || !res1 || !res2) return;

  function update() {
    const val = parseFloat(slider.value) || 2500;
    const severity = parseInt(select.value) || 2;
    number.value = val;

    // Custom formula per niche type
    const siteNum = 5039;
    let output1 = '';
    let output2 = '';

    if (siteNum === 5026) {
      // Epoxy
      const mils = severity === 1 ? '16–20 Mils' : severity === 2 ? '30–45 Mils' : severity === 3 ? '60–80 Mils' : '120+ Mils Mortar';
      const days = Math.ceil(val / 1500) + (severity > 2 ? 1 : 0);
      output1 = mils + ' (' + (val * 1.15).toFixed(0) + ' Sq. Ft. Resin)';
      output2 = days + ' Days Handover Window';
    } else if (siteNum === 5027) {
      // Pool
      const gallons = (val * 7.48 * (severity * 1.5 + 4)).toLocaleString('en-US', { maximumFractionDigits: 0 });
      const gpm = (val * 0.45 * severity).toFixed(0);
      output1 = gallons + ' Gallons Capacity';
      output2 = gpm + ' GPM Hydraulic Turnover';
    } else if (siteNum === 5028) {
      // Garage Door
      const cycles = (severity * 25000).toLocaleString() + ' Cycles';
      const hp = severity <= 2 ? '3/4 HP Belt Drive' : '1.5 HP Industrial Jackshaft';
      output1 = 'Wire ' + (0.225 + severity * 0.02).toFixed(3) + '" (' + cycles + ')';
      output2 = (18 / severity).toFixed(1) + ' Years Operational Life';
    } else if (siteNum === 5029) {
      // Septic
      const tankSize = (val * 0.85 + severity * 500).toFixed(0) + ' Gallons';
      const pumpMonths = (36 / severity).toFixed(0) + ' Months Pumping Cycle';
      output1 = tankSize + ' Multi-Chamber';
      output2 = 'Every ' + pumpMonths + ' Recommended';
    } else if (siteNum === 5030) {
      // Tree
      const tons = severity * 25 + (val > 3000 ? 30 : 0);
      output1 = 'Crane Class ' + (tons > 60 ? '90-Ton Boom' : '45-Ton Knuckle');
      output2 = (severity * 3 + 2) + ' Hours Total Extrication';
    } else if (siteNum === 5031) {
      // Fire
      const gpm = (val * (0.15 + severity * 0.05)).toFixed(0);
      const pipe = severity > 2 ? '6" Riser & Backflow' : '4" Wet Pipe Riser';
      output1 = gpm + ' GPM Hydraulic Density';
      output2 = pipe + ' NFPA 13 Certified';
    } else if (siteNum === 5032) {
      // Locksmith
      const doors = Math.ceil(val / 80);
      output1 = 'Tier ' + severity + ' Restricted Patent (' + doors + ' Cylinders)';
      output2 = 'ANSI Grade 1 Electrified Egress';
    } else if (siteNum === 5033) {
      // Foundation
      const piers = Math.ceil(val / 180) + severity * 2;
      output1 = piers + ' Heavy Steel Push Piers';
      output2 = (severity * 8 + 14) + ' Ft. Average Depth';
    } else if (siteNum === 5034) {
      // Gutters
      const gutterSize = val > 4000 || severity > 2 ? '7" Seamless Box Gutter' : '6" Seamless K-Style';
      const spouts = Math.ceil(val / 750) + severity;
      output1 = gutterSize + ' (.032 Heavy Aluminum)';
      output2 = spouts + ' Dedicated 4"x5" Outlets';
    } else if (siteNum === 5035) {
      // Insulation
      const inches = (severity * 1.5).toFixed(1);
      const savings = '$' + (val * 0.42 * severity).toFixed(0) + ' / Year';
      output1 = 'R-' + (inches * 7.0).toFixed(0) + ' (' + inches + '" Closed-Cell)';
      output2 = savings + ' Estimated Net Benefit';
    } else if (siteNum === 5036) {
      // Water Damage
      const pints = (val * 0.45 * severity).toFixed(0);
      const units = Math.ceil(val / 1200) + severity;
      output1 = pints + ' PPD Extraction Load';
      output2 = units + ' LGR Industrial Units + Desiccant';
    } else if (siteNum === 5037) {
      // Mold
      const cfm = (val * 0.8 * severity).toFixed(0);
      const scrubbers = Math.ceil(cfm / 1000);
      output1 = scrubbers + ' Commercial HEPA Scrubbers';
      output2 = cfm + ' CFM Negative Pressure Exhaust';
    } else if (siteNum === 5038) {
      // Kitchen Repair
      const windowHrs = severity === 4 ? '60–90 Minutes' : severity === 3 ? '2 Hours' : 'Same-Day 4 Hours';
      output1 = 'Priority ' + severity + ' Emergency Triage';
      output2 = windowHrs + ' Dispatch Guarantee';
    } else if (siteNum === 5039) {
      // Signage
      const inches = Math.ceil(val / 120) + severity * 4;
      const lumens = (inches * 450 * severity).toLocaleString();
      output1 = inches + ' Inch 3D Channel Letters';
      output2 = lumens + ' Lumens High-Nit LED';
    } else if (siteNum === 5040) {
      // Asphalt
      const depth = severity >= 3 ? '3.5" Heavy Hot-Mix' : '2.0" Surface Wearing Course';
      const tons = Math.ceil(val * (severity * 0.035 + 0.05));
      output1 = tons + ' Tons Hot-Mix Asphalt';
      output2 = depth + ' Laser Compaction';
    }

    res1.innerText = output1;
    res2.innerText = output2;
  }

  slider.addEventListener('input', update);
  number.addEventListener('input', () => {
    slider.value = number.value;
    update();
  });
  select.addEventListener('change', update);
  if (btn) btn.addEventListener('click', update);

  update();
}

// Modal System (Quote / Consultation)
function initModals() {
  const modal = document.getElementById('quoteModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const cancelBtn = document.getElementById('modalCancelBtn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service');
      if (service && document.getElementById('projectNotes')) {
        document.getElementById('projectNotes').value = 'Requesting specification for: ' + service;
      }
      if (modal) modal.classList.add('active');
    });
  });

  function close() {
    if (modal) modal.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (cancelBtn) cancelBtn.addEventListener('click', close);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('consultationForm');
  const successState = document.getElementById('modalSuccessState');
  if (form && successState) {
    form.style.display = 'none';
    successState.style.display = 'block';
  }
}

function resetModal() {
  const modal = document.getElementById('quoteModal');
  const form = document.getElementById('consultationForm');
  const successState = document.getElementById('modalSuccessState');
  if (modal) modal.classList.remove('active');
  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (successState) {
    successState.style.display = 'none';
  }
}

// Fullscreen Lightbox
function openLightbox(src, title) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (modal && img) {
    img.src = src;
    if (cap) cap.innerText = title;
    modal.classList.add('active');
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
}

// Working FAQ Accordion
function initFaq() {
  const cards = document.querySelectorAll('.faq-card');
  cards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        cards.forEach(c => c.classList.remove('active'));
        if (!isActive) {
          card.classList.add('active');
        }
      });
    }
  });
}

// Mobile Nav Drawer
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerClose');
  const links = document.querySelectorAll('.drawer-link');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => drawer.classList.add('active'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  }
  links.forEach(l => {
    l.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('active');
    });
  });
}
