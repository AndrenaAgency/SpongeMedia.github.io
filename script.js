const contentCards = [...document.querySelectorAll('[data-content]')];
const managementCards = [...document.querySelectorAll('[data-management]')];
const builderContent = document.getElementById('builder-content');
const builderManagement = document.getElementById('builder-management');
const builderTotal = document.getElementById('builder-total');
const builderWhatsapp = document.getElementById('builder-whatsapp');
const clearBuilder = document.getElementById('clear-builder');

let selectedContent = null;
let selectedManagement = null;

function money(value) {
  return `R${Number(value).toLocaleString('en-ZA')}`;
}

function updateBuilder() {
  const contentPrice = selectedContent ? selectedContent.price : 0;
  const managementPrice = selectedManagement ? selectedManagement.price : 0;
  const total = contentPrice + managementPrice;

  builderContent.textContent = selectedContent
    ? `${selectedContent.name} — ${money(contentPrice)}`
    : 'Not selected';

  builderManagement.textContent = selectedManagement
    ? `${selectedManagement.name} — ${money(managementPrice)}`
    : 'None';

  builderTotal.textContent = money(total);

  let message;
  if (selectedContent && selectedManagement) {
    message = `Hi SpongeMedia, I found you through your website and I'm interested in the ${selectedContent.name} content package + ${selectedManagement.name} at ${money(total)}/month. I'd like to discuss this setup for my business.`;
  } else if (selectedContent) {
    message = `Hi SpongeMedia, I found you through your website and I'm interested in the ${selectedContent.name} content package at ${money(contentPrice)}/month. I'd like to discuss content for my business.`;
  } else if (selectedManagement) {
    message = `Hi SpongeMedia, I found you through your website and I'm interested in ${selectedManagement.name} at ${money(managementPrice)}/month as a standalone service. I'd like to discuss social media management for my business.`;
  } else {
    message = `Hi SpongeMedia, I found you through your website and I'd like to discuss content creation or social media management for my business.`;
  }

  builderWhatsapp.href = `https://wa.me/27659630951?text=${encodeURIComponent(message)}`;
}

function scrollToBuilder() {
  document.getElementById('build-package').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

contentCards.forEach(card => {
  const button = card.querySelector('.package-select');
  button.addEventListener('click', () => {
    contentCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedContent = {
      name: card.dataset.content,
      price: Number(card.dataset.contentPrice)
    };
    updateBuilder();
    scrollToBuilder();
  });
});

managementCards.forEach(card => {
  const button = card.querySelector('.management-select');
  button.addEventListener('click', () => {
    managementCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedManagement = {
      name: card.dataset.management,
      price: Number(card.dataset.managementPrice)
    };
    updateBuilder();
    scrollToBuilder();
  });
});

clearBuilder.addEventListener('click', () => {
  selectedContent = null;
  selectedManagement = null;
  contentCards.forEach(c => c.classList.remove('selected'));
  managementCards.forEach(c => c.classList.remove('selected'));
  updateBuilder();
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
updateBuilder();
