// Header turns solid once you scroll past the hero's top edge
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('solid', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  header.classList.add('solid');
});
nav.addEventListener('click', e => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    onScroll();
  }
});

// Tabbed menu
const MENU = {
  'From the fire': [
    ['Ember-charred chicken legs', 16, 'Chilli and yoghurt marinade, lime, red onion'],
    ['Oak-grilled prawns', 18, 'Garlic butter, charred lemon, flatbread'],
    ['Hearth-roasted cauliflower', 12, 'Smoked tahini, toasted seeds, herbs'],
    ['Slow-fired lamb ribs', 24, 'Pomegranate glaze, pickled shallots']
  ],
  'Pizza and sides': [
    ['Oak-board cheese pizza', 14, 'Three cheeses, chilli flakes'],
    ['Smoked chilli fries', 7, 'House tomato sauce'],
    ['Wood-fired flatbread', 6, 'Sea salt, olive oil, rosemary'],
    ['Charred greens', 8, 'Garlic, lemon, chilli oil']
  ],
  'Sweet': [
    ['Chocolate-glazed caramel custard', 8, 'Whipped cream, cherry'],
    ['Smoked honey ice cream', 7, 'Oak-smoked honey, sea salt'],
    ['Burnt orange tart', 9, 'Cream, caramelised peel']
  ],
  'Drinks': [
    ['Oak old fashioned', 13, 'Bourbon, smoked sugar, bitters'],
    ['Charred pineapple soda', 6, 'No alcohol, sparkling'],
    ['Cold-brew with cinnamon', 5, 'Served over ice']
  ]
};

const tabs = document.querySelector('.tabs');
const list = document.getElementById('menu-list');

function showSection(name) {
  tabs.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', String(t.dataset.name === name)));
  list.innerHTML = MENU[name].map(([n, p, d]) =>
    `<li><b>${n}</b><span class="price">$${p}</span><em>${d}</em></li>`).join('');
}

Object.keys(MENU).forEach((name, i) => {
  const b = document.createElement('button');
  b.className = 'tab';
  b.type = 'button';
  b.role = 'tab';
  b.textContent = name;
  b.dataset.name = name;
  b.addEventListener('click', () => showSection(name));
  tabs.appendChild(b);
  if (i === 0) showSection(name);
});

// Reservation form (demo only: no data is sent anywhere)
const form = document.getElementById('reserve-form');
const msg = document.getElementById('form-msg');
const dateInput = form.elements.date;
dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

form.addEventListener('submit', e => {
  e.preventDefault();
  const labels = { name: 'your name', contact: 'a phone number or email', date: 'a date', time: 'a time', guests: 'a party size' };
  let missing = null;
  Object.keys(labels).forEach(k => {
    const field = form.elements[k];
    const bad = !field.value.trim() || (k === 'date' && field.value < dateInput.min);
    field.setAttribute('aria-invalid', String(bad));
    if (bad && !missing) missing = k;
  });
  msg.className = 'form-msg';
  if (missing) {
    msg.classList.add('err');
    msg.textContent = missing === 'date' && dateInput.value
      ? 'Choose today’s date or a later one.'
      : `Please add ${labels[missing]}.`;
    form.elements[missing].focus();
    return;
  }
  const d = new Date(dateInput.value + 'T12:00');
  const when = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  const g = form.elements.guests.value;
  msg.classList.add('ok');
  msg.textContent = `Table requested, ${form.elements.name.value.trim()}. ${g} ${g === '1' ? 'guest' : 'guests'} on ${when} at ${form.elements.time.value}. We’ll confirm shortly.`;
  form.reset();
});
