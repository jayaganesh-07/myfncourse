document.addEventListener('DOMContentLoaded', () => {
  slInitLayout('policies.html');

  const policies = slGet(DB.POLICIES, []);
  const grid = document.getElementById('policy-grid');
  const filterBar = document.getElementById('category-filters');
  const categories = ['All', ...new Set(policies.map(p => p.category))];
  let activeCategory = 'All';
  let pendingPolicyId = null;

  function renderFilters() {
    filterBar.innerHTML = categories.map(c => `
      <button data-cat="${slEscape(c)}" class="px-4 py-1.5 rounded-full text-sm font-medium border ${c === activeCategory ? 'bg-[var(--teal)] text-white border-[var(--teal)]' : 'border-[var(--hairline)] text-gray-600 hover:border-[var(--teal)]'}">${slEscape(c)}</button>
    `).join('');
  }

  function renderGrid() {
    const user = slCurrentUser();
    const myApplications = user ? slGet(DB.USER_POLICIES, []).filter(up => up.userId === user.id) : [];
    const list = activeCategory === 'All' ? policies : policies.filter(p => p.category === activeCategory);

    grid.innerHTML = list.map(p => {
      const existing = myApplications.find(a => a.policyId === p.id && a.status !== 'rejected');
      let actionHTML;
      if (existing) {
        actionHTML = `<span class="seal ${existing.status === 'approved' ? 'seal-approved' : 'seal-pending'}">${existing.status === 'approved' ? 'Already active' : 'Application pending'}</span>`;
      } else {
        actionHTML = `<button data-apply="${p.id}" class="bg-[var(--teal)] text-white text-sm font-semibold px-4 py-2 rounded-full hover:brightness-95">Apply now</button>`;
      }
      return `
      <div class="policy-card overflow-hidden flex flex-col">
        <img src="${p.image}" alt="${slEscape(p.name)}" class="h-44 w-full object-cover" />
        <div class="p-5 flex flex-col flex-1">
          <p class="font-mono text-[11px] text-[var(--teal)] uppercase tracking-widest">${slEscape(p.category)}</p>
          <h3 class="font-display text-lg mt-1">${slEscape(p.name)}</h3>
          <p class="text-sm text-gray-500 mt-2">${slEscape(p.description)}</p>
          <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div><p class="text-gray-400 text-xs">Coverage</p><p class="font-semibold">${slFormatMoney(p.coverage)}</p></div>
            <div><p class="text-gray-400 text-xs">Term</p><p class="font-semibold">${slEscape(p.term)}</p></div>
          </div>
          <div class="stub-divider my-4"></div>
          <div class="mt-auto flex items-center justify-between">
            <div>
              <p class="font-mono text-[11px] text-gray-400">Premium</p>
              <p class="font-display">${slFormatMoney(p.premium)} <span class="text-xs text-gray-400 font-sans">${p.premiumCycle}</span></p>
            </div>
            ${actionHTML}
          </div>
        </div>
      </div>`;
    }).join('') || `<div class="col-span-full empty-state">No policies in this category yet.</div>`;
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    renderFilters();
    renderGrid();
  });

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-apply]');
    if (!btn) return;
    if (!slCurrentUser()) {
      slToast('Please log in to apply for a policy.', 'error');
      setTimeout(() => window.location.href = 'login.html', 700);
      return;
    }
    pendingPolicyId = btn.dataset.apply;
    const policy = policies.find(p => p.id === pendingPolicyId);
    document.getElementById('apply-modal-text').textContent =
      `You're applying for "${policy.name}" — ${slFormatMoney(policy.premium)} ${policy.premiumCycle}. An admin will review your application shortly.`;
    document.getElementById('apply-modal').classList.remove('hidden');
  });

  document.getElementById('apply-cancel').addEventListener('click', () => {
    document.getElementById('apply-modal').classList.add('hidden');
  });

  document.getElementById('apply-confirm').addEventListener('click', () => {
    const user = slCurrentUser();
    const policy = policies.find(p => p.id === pendingPolicyId);
    const list = slGet(DB.USER_POLICIES, []);
    list.push({
      id: slId('upol'),
      userId: user.id,
      policyId: policy.id,
      status: 'pending',
      appliedDate: new Date().toISOString(),
      approvedDate: null,
    });
    slSet(DB.USER_POLICIES, list);
    slNotify(user.id, `Your application for "${policy.name}" has been submitted and is pending review.`, 'info');
    document.getElementById('apply-modal').classList.add('hidden');
    slToast('Application submitted!', 'success');
    renderGrid();
  });

  renderFilters();
  renderGrid();
});
