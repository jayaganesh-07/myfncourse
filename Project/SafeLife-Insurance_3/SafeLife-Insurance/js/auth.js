/* ============================================================
   SafeLife Insurance — auth.js
   Session helpers + dynamic navbar/footer injection.
   Supports many users on the same browser: each successful login
   simply overwrites sl_currentUser, and logout clears it — any
   registered account can log in and out independently.
   ============================================================ */

function slCurrentUser() {
  try {
    const id = localStorage.getItem(DB.CURRENT_USER);
    if (!id) return null;
    const users = slGet(DB.USERS, []);
    return users.find(u => u.id === id) || null;
  } catch (e) {
    return null;
  }
}

function slIsAdmin() {
  try {
    return localStorage.getItem(DB.CURRENT_ADMIN) === 'true';
  } catch (e) {
    return false;
  }
}

function slLogoutUser() {
  try { localStorage.removeItem(DB.CURRENT_USER); } catch (e) { /* no-op */ }
}

function slLogoutAdmin() {
  try { localStorage.removeItem(DB.CURRENT_ADMIN); } catch (e) { /* no-op */ }
}

/* Redirect helpers — call at top of protected pages */
function slRequireUser() {
  if (!slCurrentUser()) {
    window.location.href = 'login.html';
  }
}
function slRequireAdmin() {
  if (!slIsAdmin()) {
    window.location.href = 'adminlogin.html';
  }
}

/* ---------- Layout injection ---------- */
function slInitLayout(active) {
  const navMount = document.getElementById('site-navbar');
  const footMount = document.getElementById('site-footer');
  const user = slCurrentUser();
  const admin = slIsAdmin();

  if (navMount) navMount.innerHTML = slNavbarHTML(active, user, admin);
  if (footMount) footMount.innerHTML = slFooterHTML();

  const menuBtn = document.getElementById('sl-menu-btn');
  const mobileMenu = document.getElementById('sl-mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  const logoutBtn = document.getElementById('sl-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      slLogoutUser();
      window.location.href = 'logout.html';
    });
  }
  const adminLogoutBtn = document.getElementById('sl-admin-logout-btn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      slLogoutAdmin();
      window.location.href = 'logout.html';
    });
  }

  const bell = document.getElementById('sl-notif-bell');
  if (bell && user) {
    const unread = slGet(DB.NOTIFICATIONS, []).filter(n => n.userId === user.id && !n.read).length;
    const dot = document.getElementById('sl-notif-dot');
    if (dot) dot.classList.toggle('hidden', unread === 0);
  }
}

function slNavLink(href, label, active) {
  const isActive = active === href;
  return `<a href="${href}" class="nav-link text-sm font-medium ${isActive ? 'text-[var(--gold)]' : 'text-white/85 hover:text-white'}">${label}</a>`;
}

function slNavbarHTML(active, user, admin) {
  if (admin) {
    const links = [
      ['admin.html', 'Overview'],
      ['users.html', 'Users'],
      ['approvepolicy.html', 'Approvals'],
      ['claimmanagement.html', 'Claims'],
      ['reports.html', 'Reports'],
      ['feedback.html', 'Feedback'],
      ['messages.html', 'Messages'],
    ];
    return `
    <nav class="bg-[var(--harbor)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="admin.html" class="flex items-center gap-2">
            <span class="font-display text-xl text-white">SafeLife <span class="text-[var(--gold)]">Admin</span></span>
          </a>
          <div class="hidden md:flex items-center gap-6">
            ${links.map(([h, l]) => slNavLink(h, l, active)).join('')}
          </div>
          <div class="hidden md:flex items-center gap-4">
            <span class="font-mono text-xs text-white/60">Console</span>
            <a href="#" id="sl-admin-logout-btn" class="text-sm font-semibold bg-[var(--gold)] text-[var(--harbor)] px-4 py-2 rounded-full hover:brightness-95">Sign out</a>
          </div>
          <button id="sl-menu-btn" class="md:hidden text-white" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        <div id="sl-mobile-menu" class="hidden md:hidden pb-4 flex flex-col gap-3">
          ${links.map(([h, l]) => slNavLink(h, l, active)).join('')}
          <a href="#" id="sl-admin-logout-btn" class="text-sm font-semibold bg-[var(--gold)] text-[var(--harbor)] px-4 py-2 rounded-full text-center">Sign out</a>
        </div>
      </div>
    </nav>`;
  }

  const publicLinks = [
    ['index.html', 'Home'],
    ['policies.html', 'Policies'],
    ['about.html', 'About'],
    ['contact.html', 'Contact'],
  ];

  const rightSide = user ? `
      <div class="hidden md:flex items-center gap-5">
        <a href="notifications.html" id="sl-notif-bell" class="relative text-white/85 hover:text-white" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span id="sl-notif-dot" class="hidden absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[var(--gold)]"></span>
        </a>
        ${slNavLink('dashboard.html', 'Dashboard', active)}
        ${slNavLink('settings.html', 'Settings', active)}
        <span class="font-mono text-xs text-white/50">Hi, ${slEscape(user.name.split(' ')[0])}</span>
        <a href="#" id="sl-logout-btn" class="text-sm font-semibold bg-[var(--gold)] text-[var(--harbor)] px-4 py-2 rounded-full hover:brightness-95">Sign out</a>
      </div>` : `
      <div class="hidden md:flex items-center gap-4">
        <a href="login.html" class="text-sm font-medium text-white/85 hover:text-white">Log in</a>
        <a href="register.html" class="text-sm font-semibold bg-[var(--gold)] text-[var(--harbor)] px-4 py-2 rounded-full hover:brightness-95">Get covered</a>
      </div>`;

  const mobileExtra = user ? `
        ${slNavLink('dashboard.html', 'Dashboard', active)}
        ${slNavLink('notifications.html', 'Notifications', active)}
        ${slNavLink('settings.html', 'Settings', active)}
        <a href="#" id="sl-logout-btn" class="text-sm font-semibold bg-[var(--gold)] text-[var(--harbor)] px-4 py-2 rounded-full text-center">Sign out</a>` : `
        <a href="login.html" class="text-sm font-medium text-white/85">Log in</a>
        <a href="register.html" class="text-sm font-semibold bg-[var(--gold)] text-[var(--harbor)] px-4 py-2 rounded-full text-center">Get covered</a>`;

  return `
    <nav class="bg-[var(--harbor)] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="index.html" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12.75l1.5 1.5L15 9.75M12 3l7.5 3v5.25c0 4.72-3.13 8.85-7.5 10.5-4.37-1.65-7.5-5.78-7.5-10.5V6L12 3z" /></svg>
            <span class="font-display text-xl text-white tracking-tight">SafeLife <span class="text-[var(--gold)]">Insurance</span></span>
          </a>
          <div class="hidden md:flex items-center gap-6">
            ${publicLinks.map(([h, l]) => slNavLink(h, l, active)).join('')}
          </div>
          ${rightSide}
          <button id="sl-menu-btn" class="md:hidden text-white" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        <div id="sl-mobile-menu" class="hidden md:hidden pb-4 flex flex-col gap-3">
          ${publicLinks.map(([h, l]) => slNavLink(h, l, active)).join('')}
          ${mobileExtra}
        </div>
      </div>
    </nav>`;
}

function slFooterHTML() {
  const year = new Date().getFullYear();
  return `
    <footer class="bg-[var(--harbor)] text-white/70 mt-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span class="font-display text-xl text-white">SafeLife <span class="text-[var(--gold)]">Insurance</span></span>
          <p class="mt-3 text-sm leading-relaxed">Straightforward life cover, issued and managed entirely online — built for families who'd rather spend time living than reading fine print.</p>
        </div>
        <div>
          <h4 class="font-mono text-xs tracking-widest text-white/40 uppercase mb-3">Company</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="about.html" class="hover:text-white">About us</a></li>
            <li><a href="policies.html" class="hover:text-white">Our policies</a></li>
            <li><a href="contact.html" class="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-mono text-xs tracking-widest text-white/40 uppercase mb-3">Account</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="login.html" class="hover:text-white">Log in</a></li>
            <li><a href="register.html" class="hover:text-white">Create account</a></li>
            <li><a href="adminlogin.html" class="hover:text-white">Admin console</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-mono text-xs tracking-widest text-white/40 uppercase mb-3">Reach us</h4>
          <ul class="space-y-2 text-sm">
            <li>support@safelife.example</li>
            <li>+91 44 4000 1200</li>
            <li>Chennai, Tamil Nadu, India</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © ${year} SafeLife Insurance. A demo project — not a real insurer. All data stays in your browser.
      </div>
    </footer>`;
}
