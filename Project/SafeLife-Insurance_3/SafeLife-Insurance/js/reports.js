document.addEventListener('DOMContentLoaded', () => {
  slRequireAdmin();
  slInitLayout('reports.html');

  const users = slGet(DB.USERS, []);
  const policies = slGet(DB.POLICIES, []);
  const userPolicies = slGet(DB.USER_POLICIES, []);
  const claims = slGet(DB.CLAIMS, []);

  const approvedApps = userPolicies.filter(a => a.status === 'approved');
  const revenue = approvedApps.reduce((sum, a) => {
    const p = policies.find(x => x.id === a.policyId);
    return sum + (p ? p.premium : 0);
  }, 0);
  const claimedTotal = claims.filter(c => c.status === 'approved').reduce((s, c) => s + Number(c.amount), 0);

  document.getElementById('report-stats').innerHTML = `
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Total users</p>
      <p class="font-display text-3xl mt-1">${users.length}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Active policies</p>
      <p class="font-display text-3xl mt-1">${approvedApps.length}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Annual premium revenue</p>
      <p class="font-display text-3xl mt-1">${slFormatMoney(revenue)}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Total claims paid out</p>
      <p class="font-display text-3xl mt-1">${slFormatMoney(claimedTotal)}</p>
    </div>
  `;

  /* category chart */
  const catCounts = {};
  userPolicies.forEach(a => {
    const p = policies.find(x => x.id === a.policyId);
    if (!p) return;
    catCounts[p.category] = (catCounts[p.category] || 0) + 1;
  });
  const maxCat = Math.max(1, ...Object.values(catCounts));
  const catEl = document.getElementById('chart-category');
  const catEntries = Object.entries(catCounts);
  catEl.innerHTML = catEntries.length === 0
    ? `<div class="empty-state">No applications recorded yet.</div>`
    : catEntries.map(([cat, count]) => `
      <div>
        <div class="flex justify-between text-xs text-gray-500 mb-1"><span>${slEscape(cat)}</span><span>${count}</span></div>
        <div class="gauge-track"><div class="gauge-fill" style="width:${(count / maxCat) * 100}%"></div></div>
      </div>
    `).join('');

  /* claims status chart */
  const statusCounts = { pending: 0, approved: 0, rejected: 0 };
  claims.forEach(c => { statusCounts[c.status] = (statusCounts[c.status] || 0) + 1; });
  const maxStatus = Math.max(1, ...Object.values(statusCounts));
  const claimsEl = document.getElementById('chart-claims');
  const colorMap = { pending: '#C89B3C', approved: '#14746F', rejected: '#B91C1C' };
  claimsEl.innerHTML = claims.length === 0
    ? `<div class="empty-state">No claims filed yet.</div>`
    : Object.entries(statusCounts).map(([status, count]) => `
      <div>
        <div class="flex justify-between text-xs text-gray-500 mb-1 capitalize"><span>${status}</span><span>${count}</span></div>
        <div class="gauge-track"><div style="width:${(count / maxStatus) * 100}%; background:${colorMap[status]}" class="h-full rounded-full"></div></div>
      </div>
    `).join('');

  /* funnel */
  const funnelEl = document.getElementById('chart-funnel');
  const total = userPolicies.length;
  const pending = userPolicies.filter(a => a.status === 'pending').length;
  const rejected = userPolicies.filter(a => a.status === 'rejected').length;
  funnelEl.innerHTML = `
    <div>
      <p class="font-display text-2xl">${total}</p>
      <p class="text-xs text-gray-400 uppercase tracking-widest font-mono mt-1">Total applied</p>
    </div>
    <div>
      <p class="font-display text-2xl text-[var(--gold)]">${pending}</p>
      <p class="text-xs text-gray-400 uppercase tracking-widest font-mono mt-1">Pending review</p>
    </div>
    <div>
      <p class="font-display text-2xl text-[var(--teal)]">${approvedApps.length}</p>
      <p class="text-xs text-gray-400 uppercase tracking-widest font-mono mt-1">Approved (${rejected} rejected)</p>
    </div>
  `;
});
