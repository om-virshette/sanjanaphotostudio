// Sanjana Photo Studio — WhatsApp destination (India country code + number)
const WHATSAPP_NUMBER = '919850418032';
const whatsappLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

// Reveal sections smoothly as the visitor scrolls
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Multi-select inquiry form -> WhatsApp pre-filled message
const inquiryForm = document.getElementById('inquiryForm');
inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const ceremonies = data.getAll('ceremonies');
  if (!ceremonies.length) {
    alert('Please select at least one ceremony or photography service.');
    document.querySelector('.ceremony-field').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  const message = [
    ' Hello Sanjana Photo Studio! I would like to enquire about a booking.',
    '',
    `Name: ${data.get('name')}`,
    `WhatsApp / Phone: ${data.get('phone')}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Selected services: ${ceremonies.join(', ')}`,
    `Wedding date: ${data.get('weddingDate') || 'Not decided yet'}`,
    `Wedding venue / city: ${data.get('venue') || 'Not decided yet'}`,
    `Additional details: ${data.get('message') || 'Please share your packages and availability.'}`,
    '',
    'Contact person: Ravindra Virshette',
    'Sanjana Photo Studio'
  ].join('\n');
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear()