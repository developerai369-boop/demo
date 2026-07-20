/* =========================================================
   MARISOL RESORT — interactivity
   Sections: nav, hero search, guest-story slider,
   room filter/search, booking form + validation, contact form
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- helpers ---------- */
  const todayISO = () => new Date().toISOString().split('T')[0];
  const money = (n) => '$' + n.toLocaleString('en-US');

  /* ---------- sticky nav + mobile burger ---------- */
  const nav = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  });

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('is-open'));
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- date defaults + hero search widget ---------- */
  const ciDate = document.getElementById('ciDate');
  const coDate = document.getElementById('coDate');
  const searchWidget = document.getElementById('searchWidget');
  const searchError = document.getElementById('searchError');

  const t = new Date();
  const inDate = new Date(t); inDate.setDate(t.getDate() + 7);
  const outDate = new Date(t); outDate.setDate(t.getDate() + 10);
  ciDate.min = todayISO();
  ciDate.value = inDate.toISOString().split('T')[0];
  coDate.min = inDate.toISOString().split('T')[0];
  coDate.value = outDate.toISOString().split('T')[0];

  ciDate.addEventListener('change', () => {
    coDate.min = ciDate.value;
    if (coDate.value <= ciDate.value){
      const next = new Date(ciDate.value); next.setDate(next.getDate() + 1);
      coDate.value = next.toISOString().split('T')[0];
    }
  });

  searchWidget.addEventListener('submit', (e) => {
    e.preventDefault();
    searchError.textContent = '';
    if (!ciDate.value || !coDate.value){
      searchError.textContent = 'Pick both a check-in and check-out date to continue.';
      return;
    }
    if (coDate.value <= ciDate.value){
      searchError.textContent = 'Check-out has to be after check-in.';
      return;
    }
    // hand the chosen guest count to the room filter, then scroll to it
    const guests = document.getElementById('guestSelect').value;
    const filterGuests = document.getElementById('filterGuests');
    filterGuests.value = guests === '4' ? '4' : guests;
    filterGuests.dispatchEvent(new Event('change'));
    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- guest stories slider ---------- */
  const track = document.getElementById('storyTrack');
  const slides = track.children;
  const dotsWrap = document.getElementById('storyDots');
  let storyIndex = 0;
  let storyTimer;

  Array.from(slides).forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToStory(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.children;

  function goToStory(i){
    storyIndex = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${storyIndex * 100}%)`;
    Array.from(dots).forEach((d, idx) => d.classList.toggle('is-active', idx === storyIndex));
  }
  function autoplay(){
    storyTimer = setInterval(() => goToStory(storyIndex + 1), 6000);
  }
  document.getElementById('storyNext').addEventListener('click', () => { goToStory(storyIndex + 1); clearInterval(storyTimer); autoplay(); });
  document.getElementById('storyPrev').addEventListener('click', () => { goToStory(storyIndex - 1); clearInterval(storyTimer); autoplay(); });
  autoplay();

  /* ---------- room filter & search ---------- */
  const chips = document.querySelectorAll('.chip');
  const priceRange = document.getElementById('priceRange');
  const priceRangeValue = document.getElementById('priceRangeValue');
  const filterGuests = document.getElementById('filterGuests');
  const roomCards = document.querySelectorAll('.room-card');
  const filtersEmpty = document.getElementById('filtersEmpty');
  let activeType = 'all';

  function applyFilters(){
    const maxPrice = Number(priceRange.value);
    const minGuests = Number(filterGuests.value);
    priceRangeValue.textContent = money(maxPrice);

    let visibleCount = 0;
    roomCards.forEach(card => {
      const type = card.dataset.type;
      const price = Number(card.dataset.price);
      const guests = Number(card.dataset.guests);
      const matches = (activeType === 'all' || type === activeType)
                    && price <= maxPrice
                    && guests >= minGuests;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });
    filtersEmpty.hidden = visibleCount !== 0;
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeType = chip.dataset.type;
      applyFilters();
    });
  });
  priceRange.addEventListener('input', applyFilters);
  filterGuests.addEventListener('change', applyFilters);
  applyFilters();

  /* room card "select" buttons -> jump to booking form pre-filled */
  const bRoom = document.getElementById('bRoom');
  document.querySelectorAll('.room-card__cta').forEach(btn => {
    btn.addEventListener('click', () => {
      bRoom.value = btn.dataset.room;
      bRoom.dispatchEvent(new Event('change'));
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- shared form validation helpers ---------- */
  function setError(input, message){
    const field = input.closest('.field');
    const errorEl = field?.querySelector('.field__error');
    if (errorEl) errorEl.textContent = message || '';
    field?.classList.toggle('has-error', Boolean(message));
  }
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = (v) => /^[0-9+()\-\s]{7,}$/.test(v);

  /* ---------- booking form ---------- */
  const bookingForm = document.getElementById('bookingForm');
  const bCheckin = document.getElementById('bCheckin');
  const bCheckout = document.getElementById('bCheckout');
  const bookingTotal = document.getElementById('bookingTotal');
  const bookingConfirm = document.getElementById('bookingConfirm');
  const confirmCode = document.getElementById('confirmCode');

  bCheckin.min = todayISO();
  bCheckin.value = ciDate.value;
  bCheckout.min = ciDate.value;
  bCheckout.value = coDate.value;

  function nightsBetween(){
    const inMs = new Date(bCheckin.value);
    const outMs = new Date(bCheckout.value);
    const diff = Math.round((outMs - inMs) / 86400000);
    return diff > 0 ? diff : 0;
  }
  function updateTotal(){
    const opt = bRoom.selectedOptions[0];
    const rate = opt ? Number(opt.dataset.price || 0) : 0;
    const nights = nightsBetween();
    bookingTotal.textContent = rate && nights ? money(rate * nights) : '$0';
  }
  bRoom.addEventListener('change', updateTotal);
  bCheckin.addEventListener('change', () => { bCheckout.min = bCheckin.value; updateTotal(); });
  bCheckout.addEventListener('change', updateTotal);
  updateTotal();

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!bRoom.value){ setError(bRoom, 'Choose a room to continue.'); valid = false; }
    else setError(bRoom, '');

    if (!bCheckin.value){ setError(bCheckin, 'Pick a check-in date.'); valid = false; }
    else setError(bCheckin, '');

    if (!bCheckout.value || bCheckout.value <= bCheckin.value){
      setError(bCheckout, 'Check-out must be after check-in.'); valid = false;
    } else setError(bCheckout, '');

    const bName = document.getElementById('bName');
    if (bName.value.trim().length < 2){ setError(bName, 'Enter your full name.'); valid = false; }
    else setError(bName, '');

    const bEmail = document.getElementById('bEmail');
    if (!isEmail(bEmail.value)){ setError(bEmail, 'Enter a valid email address.'); valid = false; }
    else setError(bEmail, '');

    const bPhone = document.getElementById('bPhone');
    if (!isPhone(bPhone.value)){ setError(bPhone, 'Enter a valid phone number.'); valid = false; }
    else setError(bPhone, '');

    if (!valid) return;

    const code = 'MRS-' + Math.floor(100000 + Math.random() * 900000);
    confirmCode.textContent = code;
    bookingForm.hidden = true;
    bookingConfirm.hidden = false;
  });

  document.getElementById('bookingReset').addEventListener('click', () => {
    bookingForm.reset();
    bookingForm.hidden = false;
    bookingConfirm.hidden = true;
    bCheckin.value = ciDate.value;
    bCheckout.value = coDate.value;
    updateTotal();
  });

  /* ---------- contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const cName = document.getElementById('cName');
    if (cName.value.trim().length < 2){ setError(cName, 'Enter your name.'); valid = false; }
    else setError(cName, '');

    const cEmail = document.getElementById('cEmail');
    if (!isEmail(cEmail.value)){ setError(cEmail, 'Enter a valid email address.'); valid = false; }
    else setError(cEmail, '');

    const cMessage = document.getElementById('cMessage');
    if (cMessage.value.trim().length < 5){ setError(cMessage, 'Message is a little short.'); valid = false; }
    else setError(cMessage, '');

    if (!valid) return;

    contactSuccess.hidden = false;
    contactForm.reset();
    setTimeout(() => { contactSuccess.hidden = true; }, 5000);
  });

});