document.addEventListener('DOMContentLoaded', () => {
  slRequireUser();
  slInitLayout('dashboard.html');

  const user = slCurrentUser();
  if (!user) return;

  document.getElementById('dash-greeting').textContent = `Welcome back, ${user.name.split(' ')[0]}`;

  const policies = slGet(DB.POLICIES, []);
  const myApps = slGet(DB.USER_POLICIES, []).filter(up => up.userId === user.id);
  const claims = slGet(DB.CLAIMS, []).filter(c => c.userId === user.id);

  const activeCount = myApps.filter(a => a.status === 'approved').length;
  const pendingCount = myApps.filter(a => a.status === 'pending').length;
  const totalCoverage = myApps
    .filter(a => a.status === 'approved')
    .reduce((sum, a) => sum + ((policies.find(p => p.id === a.policyId) || {}).coverage || 0), 0);

  document.getElementById('dash-stats').innerHTML = `
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Active policies</p>
      <p class="font-display text-3xl mt-1">${activeCount}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Pending applications</p>
      <p class="font-display text-3xl mt-1">${pendingCount}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Total coverage</p>
      <p class="font-display text-3xl mt-1">${slFormatMoney(totalCoverage)}</p>
    </div>
  `;

  const grid = document.getElementById('my-policies');
  if (myApps.length === 0) {
    grid.innerHTML = `<div class="col-span-full empty-state">You haven't applied for any policy yet. <a href="policies.html" class="text-[var(--teal)] font-semibold hover:underline">Browse plans →</a></div>`;
    return;
  }

  grid.innerHTML = myApps.map(app => {
    const p = policies.find(pl => pl.id === app.policyId);
    if (!p) return '';
    const sealClass = app.status === 'approved' ? 'seal-approved' : app.status === 'rejected' ? 'seal-rejected' : 'seal-pending';
    const usedByClaims = claims.filter(c => c.userPolicyId === app.id && c.status !== 'rejected')
      .reduce((s, c) => s + Number(c.amount || 0), 0);
    const pct = Math.min(100, Math.round((usedByClaims / p.coverage) * 100)) || 0;
    return `
    <div class="policy-card overflow-hidden">
      <div class="p-5">
        <div class="flex justify-between items-start gap-2">
          <div>
            <p class="font-mono text-[11px] text-[var(--teal)] uppercase tracking-widest">${slEscape(p.category)}</p>
            <h3 class="font-display text-lg mt-1">${slEscape(p.name)}</h3>
          </div>
          <span class="seal ${sealClass}">${app.status}</span>
        </div>
        <p class="text-xs text-gray-400 mt-2">Applied ${slFormatDate(app.appliedDate)}</p>
        <div class="mt-4">
          <div class="flex justify-between text-xs text-gray-500 mb-1">
            <span>Claimed</span><span>${slFormatMoney(usedByClaims)} of ${slFormatMoney(p.coverage)}</span>
          </div>
          <div class="gauge-track"><div class="gauge-fill" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="stub-divider"></div>
      <div class="p-5 flex items-center justify-between">
        <p class="font-mono text-xs text-gray-400">Premium ${slFormatMoney(p.premium)} ${p.premiumCycle}</p>
        ${app.status === 'approved'
          ? `<button data-file-claim="${app.id}" class="text-sm font-semibold text-[var(--teal)] hover:underline">File a claim</button>`
          : `<span class="text-xs text-gray-400">Awaiting approval</span>`}
      </div>
    </div>`;
  }).join('');
});
