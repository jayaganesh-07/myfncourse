document.addEventListener('DOMContentLoaded', () => {
  slRequireAdmin();
  slInitLayout('approvepolicy.html');

  const filterBar = document.getElementById('approve-filters');
  const list = document.getElementById('approve-list');
  const tabs = ['pending', 'approved', 'rejected', 'all'];
  let active = 'pending';

  function renderFilters() {
    filterBar.innerHTML = tabs.map(t => `
      <button data-tab="${t}" class="px-4 py-1.5 rounded-full text-sm font-medium border capitalize ${t === active ? 'bg-[var(--teal)] text-white border-[var(--teal)]' : 'border-[var(--hairline)] text-gray-600 hover:border-[var(--teal)]'}">${t}</button>
    `).join('');
  }

  function render() {
    const users = slGet(DB.USERS, []);
    const policies = slGet(DB.POLICIES, []);
    const apps = slGet(DB.USER_POLICIES, [])
      .filter(a => active === 'all' ? true : a.status === active)
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

    if (apps.length === 0) {
      list.innerHTML = `<div class="col-span-full empty-state">No ${active === 'all' ? '' : active} applications right now.</div>`;
      return;
    }

    list.innerHTML = apps.map(a => {
      const u = users.find(x => x.id === a.userId);
      const p = policies.find(x => x.id === a.policyId);
      const sealClass = a.status === 'approved' ? 'seal-approved' : a.status === 'rejected' ? 'seal-rejected' : 'seal-pending';
      return `
      <div class="policy-card p-6">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-mono text-[11px] text-[var(--teal)] uppercase tracking-widest">${slEscape(p ? p.category : '')}</p>
            <h3 class="font-display text-lg mt-1">${slEscape(p ? p.name : 'Policy')}</h3>
            <p class="text-sm text-gray-500 mt-1">${slEscape(u ? u.name : 'Unknown user')} · ${slEscape(u ? u.email : '')}</p>
          </div>
          <span class="seal ${sealClass}">${a.status}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div><p class="text-gray-400 text-xs">Coverage</p><p class="font-semibold">${p ? slFormatMoney(p.coverage) : '—'}</p></div>
          <div><p class="text-gray-400 text-xs">Premium</p><p class="font-semibold">${p ? slFormatMoney(p.premium) + ' ' + p.premiumCycle : '—'}</p></div>
        </div>
        <p class="text-xs text-gray-400 mt-3">Applied ${slFormatDate(a.appliedDate)}</p>
        ${a.status === 'pending' ? `
        <div class="stub-divider my-4"></div>
        <div class="flex gap-3">
          <button data-approve="${a.id}" class="flex-1 bg-[var(--teal)] text-white text-sm font-semibold py-2 rounded-lg hover:brightness-95">Approve</button>
          <button data-reject="${a.id}" class="flex-1 border border-red-300 text-red-600 text-sm font-semibold py-2 rounded-lg hover:bg-red-50">Reject</button>
        </div>` : ''}
      </div>`;
    }).join('');
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-tab]');
    if (!btn) return;
    active = btn.dataset.tab;
    renderFilters();
    render();
  });

  list.addEventListener('click', (e) => {
    const approveBtn = e.target.closest('button[data-approve]');
    const rejectBtn = e.target.closest('button[data-reject]');
    if (!approveBtn && !rejectBtn) return;

    const id = (approveBtn || rejectBtn).dataset.approve || (approveBtn || rejectBtn).dataset.reject;
    const apps = slGet(DB.USER_POLICIES, []);
    const idx = apps.findIndex(a => a.id === id);
    if (idx === -1) return;

    const policies = slGet(DB.POLICIES, []);
    const p = policies.find(x => x.id === apps[idx].policyId);

    if (approveBtn) {
      apps[idx].status = 'approved';
      apps[idx].approvedDate = new Date().toISOString();
      slNotify(apps[idx].userId, `Great news! Your application for "${p ? p.name : 'your policy'}" has been approved.`, 'success');
      slToast('Application approved.', 'success');
    } else {
      apps[idx].status = 'rejected';
      slNotify(apps[idx].userId, `Your application for "${p ? p.name : 'your policy'}" was not approved this time.`, 'error');
      slToast('Application rejected.', 'success');
    }
    slSet(DB.USER_POLICIES, apps);
    render();
  });

  renderFilters();
  render();
});
