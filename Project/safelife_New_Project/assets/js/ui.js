/* Shared UI chrome: public navbar, user sidebar, admin sidebar, toast */
function toast(msg, kind){
  const el = document.createElement('div');
  el.className = 'toast';
  const icon = kind==='error' ? '⚠️' : (kind==='success' ? '✅' : 'ℹ️');
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 2600);
}

function renderPublicNav(active){
  const user = SL.currentUser();
  const links = [
    ['index.html','Home'],['policies.html','Policies'],['about.html','About'],['contact.html','Contact']
  ];
  const linkHTML = links.map(([href,label])=>`
    <a href="${href}" class="text-sm font-medium px-1 pb-1 border-b-2 ${active===href? 'border-[var(--sl-gold-400)] text-[var(--sl-teal-950)]':'border-transparent text-[var(--sl-teal-800)] hover:text-[var(--sl-teal-950)]'}">${label}</a>
  `).join('');
  const rightHTML = user
    ? `<a href="dashboard.html" class="btn-primary px-4 py-2 rounded-lg text-sm font-semibold">My Dashboard</a>`
    : `<a href="login.html" class="text-sm font-semibold text-[var(--sl-teal-800)] hover:text-[var(--sl-teal-950)]">Log in</a>
       <a href="register.html" class="btn-gold px-4 py-2 rounded-lg text-sm font-semibold">Get Covered</a>`;

  document.getElementById('site-nav').innerHTML = `
  <div class="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
    <a href="index.html" class="flex items-center gap-3">
      <span class="shield"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" fill="currentColor"/></svg></span>
      <span class="font-display text-xl font-semibold tracking-tight text-[var(--sl-teal-950)]">SafeLife</span>
    </a>
    <nav class="hidden md:flex items-center gap-8">${linkHTML}</nav>
    <div class="flex items-center gap-4">${rightHTML}</div>
  </div>`;
}

function renderFooter(){
  const el = document.getElementById('site-footer');
  if(!el) return;
  el.innerHTML = `
  <div class="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="shield" style="--s:.85"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" fill="currentColor"/></svg></span>
        <span class="font-display text-lg font-semibold text-white">SafeLife</span>
      </div>
      <p class="text-sm text-[#B9CBC5] leading-relaxed">Straightforward insurance for health, life, vehicle and travel — underwritten for real life, not fine print.</p>
    </div>
    <div>
      <p class="text-xs font-semibold tracking-widest text-[#7FA79C] mb-3">EXPLORE</p>
      <ul class="space-y-2 text-sm text-[#D7E4DF]">
        <li><a href="policies.html" class="hover:text-white">Policies</a></li>
        <li><a href="about.html" class="hover:text-white">About us</a></li>
        <li><a href="contact.html" class="hover:text-white">Contact</a></li>
      </ul>
    </div>
    <div>
      <p class="text-xs font-semibold tracking-widest text-[#7FA79C] mb-3">ACCOUNT</p>
      <ul class="space-y-2 text-sm text-[#D7E4DF]">
        <li><a href="login.html" class="hover:text-white">Log in</a></li>
        <li><a href="register.html" class="hover:text-white">Create account</a></li>
        <li><a href="adminlogin.html" class="hover:text-white">Admin portal</a></li>
      </ul>
    </div>
    <div>
      <p class="text-xs font-semibold tracking-widest text-[#7FA79C] mb-3">REACH US</p>
      <ul class="space-y-2 text-sm text-[#D7E4DF]">
        <li>support@safelife.example</li>
        <li>1800-209-4636 (toll-free)</li>
        <li>Chennai · Mumbai · Delhi</li>
      </ul>
    </div>
  </div>
  <div class="border-t border-white/10 py-5 text-center text-xs text-[#7FA79C]">© 2026 SafeLife Insurance. All policy figures on this demo are illustrative.</div>`;
}

const USER_NAV = [
  ['dashboard.html','Dashboard','M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'],
  ['policies.html','Browse Policies','M9 12l2 2 4-4m5.6 1a9.6 9.6 0 11-19.2 0 9.6 9.6 0 0119.2 0z'],
  ['settings.html','Settings','M10.3 3.3a1 1 0 011.4 0l.7.7a1 1 0 00.9.3l1-.2a1 1 0 011.2.8l.2 1a1 1 0 00.6.7l.9.4a1 1 0 01.5 1.4l-.5.9a1 1 0 000 1l.5.9a1 1 0 01-.5 1.4l-.9.4a1 1 0 00-.6.7l-.2 1a1 1 0 01-1.2.8l-1-.2a1 1 0 00-.9.3l-.7.7a1 1 0 01-1.4 0l-.7-.7a1 1 0 00-.9-.3l-1 .2a1 1 0 01-1.2-.8l-.2-1a1 1 0 00-.6-.7l-.9-.4a1 1 0 01-.5-1.4l.5-.9a1 1 0 000-1l-.5-.9a1 1 0 01.5-1.4l.9-.4a1 1 0 00.6-.7l.2-1a1 1 0 011.2-.8l1 .2a1 1 0 00.9-.3l.7-.7z'],
  ['notifications.html','Notifications','M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9']
];
function renderUserSidebar(active){
  const user = SL.requireUser(); if(!user) return null;
  const links = USER_NAV.map(([href,label,path])=>`
    <a href="${href}" class="sidebar-link ${active===href?'active':''}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="${path}" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${label}
    </a>`).join('');
  document.getElementById('sidebar').innerHTML = `
    <div class="flex items-center gap-3 px-2 mb-8">
      <span class="shield"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" fill="currentColor"/></svg></span>
      <span class="font-display text-xl font-semibold text-white">SafeLife</span>
    </div>
    <nav class="flex flex-col gap-1">${links}</nav>
    <div class="mt-auto pt-6 border-t border-white/10">
      <div class="px-2 mb-3">
        <p class="text-sm font-semibold text-white truncate">${user.name}</p>
        <p class="text-xs text-[#8FB2AA] truncate">${user.email}</p>
      </div>
      <a href="logout.html" class="sidebar-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke-linecap="round" stroke-linejoin="round"/></svg>Log out</a>
    </div>`;
  const unread = SL.all('notifications').filter(n=>n.userId===user.id && !n.read).length;
  const bell = document.getElementById('topbar-bell-count');
  if(bell){ bell.textContent = unread; bell.classList.toggle('hidden', unread===0); }
  const nameEl = document.getElementById('topbar-username');
  if(nameEl) nameEl.textContent = user.name.split(' ')[0];
  return user;
}

const ADMIN_NAV = [
  ['admin.html','Dashboard','M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'],
  ['users.html','Users','M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-4a4 4 0 100-8 4 4 0 000 8zm7 0a4 4 0 10-4-4'],
  ['approvepolicy.html','Approve Policies','M9 12l2 2 4-4m5.6 1a9.6 9.6 0 11-19.2 0 9.6 9.6 0 0119.2 0z'],
  ['claimmanagement.html','Claims','M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 9l2 2 4-4'],
  ['reports.html','Reports','M8 17v-6M13 17V7m5 10v-4M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z'],
  ['feedback.html','Feedback','M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
  ['messages.html','Messages','M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z']
];
function renderAdminSidebar(active){
  if(!SL.requireAdmin()) return;
  const admin = SL.all('admin');
  const links = ADMIN_NAV.map(([href,label,path])=>`
    <a href="${href}" class="sidebar-link ${active===href?'active':''}">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="${path}" stroke-linecap="round" stroke-linejoin="round"/></svg>
      ${label}
    </a>`).join('');
  document.getElementById('sidebar').innerHTML = `
    <div class="flex items-center gap-3 px-2 mb-8">
      <span class="shield"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z" fill="currentColor"/></svg></span>
      <div>
        <span class="font-display text-xl font-semibold text-white block leading-none">SafeLife</span>
        <span class="text-[10px] tracking-widest text-[var(--sl-gold-400)] font-semibold">ADMIN CONSOLE</span>
      </div>
    </div>
    <nav class="flex flex-col gap-1">${links}</nav>
    <div class="mt-auto pt-6 border-t border-white/10">
      <div class="px-2 mb-3">
        <p class="text-sm font-semibold text-white truncate">${admin?.name || 'Administrator'}</p>
        <p class="text-xs text-[#8FB2AA] truncate">@${admin?.username || 'admin'}</p>
      </div>
      <a href="logout.html" class="sidebar-link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke-linecap="round" stroke-linejoin="round"/></svg>Log out</a>
    </div>`;
}
