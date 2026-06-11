// Pages qui cachent la bottom nav
const PAGES_WITHOUT_NAV = ['page-validations', 'page-connexion'];

// Navigation entre pages
function showPage(id) {
  // Masquer toutes les pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Afficher la page cible
  document.getElementById(id).classList.add('active');

  // Mettre à jour la bottom nav (activer le bon bouton)
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.nav-btn[data-page="${id}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  // Mettre à jour la date dynamique si on va sur validations
  if (id === 'page-validations') updateRecentValidationDate();

  // Afficher ou masquer la bottom nav
  const nav = document.querySelector('.bottom-nav');
  if (PAGES_WITHOUT_NAV.includes(id)) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }

  // Remonter en haut de la page
  const scroll = document.querySelector(`#${id} .page-scroll`);
  if (scroll) scroll.scrollTop = 0;
}

// Afficher/masquer le mot de passe
function togglePassword() {
  const input = document.getElementById('cx-pw-input');
  if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

// Fermer la bannière info
function dismissBanner(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// Service Worker (PWA offline)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// Mettre à jour la date de la première validation (maintenant - 6 min)
function updateRecentValidationDate() {
  const el = document.getElementById('val-date-recent');
  if (!el) return;
  const now = new Date();
  now.setMinutes(now.getMinutes() - 6);
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  el.textContent = `Le ${day}/${month}/${year} à ${hours}h${minutes}`;
}

// Démarrage sur la page Titres
showPage('page-titres');
