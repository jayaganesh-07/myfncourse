document.addEventListener('DOMContentLoaded', () => {
  slRequireAdmin();
  slInitLayout('admin.html');

  const users = slGet(DB.USERS, []);
  const policies = slGet(DB.POLICIES, []);
  const userPolicies = slGet(DB.USER_POLICIES, []);
  const claims = slGet(DB.CLAIMS, []);
  const feedback = slGet(DB.FEEDBACK, []);
  const messages = slGet(DB.MESSAGES, []);

  const pendingPolicies = userPolicies.filter(up => up.status === 'pending');
  const pendingClaims = claims.filter(c => c.status === 'pending');

  document.getElementById('admin-stats').innerHTML = `
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Total users</p>
      <p class="font-display text-3xl mt-1">${users.length}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Pending applications</p>
      <p class="font-display text-3xl mt-1">${pendingPolicies.length}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Pending claims</p>
      <p class="font-display text-3xl mt-1">${pendingClaims.length}</p>
    </div>
    <div class="policy-card p-6">
      <p class="font-mono text-[11px] text-gray-400 uppercase tracking-widest">Unread messages</p>
      <p class="font-display text-3xl mt-1">${messages.filter(m => !m.replied).length}</p>
    </div>
  `;

  const pendPolWrap = document.getElementById('admin-pending-policies');
  pendPolWrap.innerHTML = pendingPolicies.length === 0
    ? `<div class="empty-state">No applications waiting for review.</div>`
    : pendingPolicies.slice(0, 5).map(up => {
        const u = users.find(x => x.id === up.userId);
        const p = policies.find(x => x.id === up.policyId);
        return `<div class="policy-card p-4 flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">${slEscape(p ? p.name : 'Policy')}</p>
            <p class="text-xs text-gray-400">${slEscape(u ? u.name : 'Unknown user')} · ${slFormatDate(up.appliedDate)}</p>
          </div>
          <span class="seal seal-pending">Pending</span>
        </div>`;
      }).join('');

  const pendClaimWrap = document.getElementById('admin-pending-claims');
  pendClaimWrap.innerHTML = pendingClaims.length === 0
    ? `<div class="empty-state">No claims waiting for review.</div>`
    : pendingClaims.slice(0, 5).map(c => {
        const u = users.find(x => x.id === c.userId);
        return `<div class="policy-card p-4 flex items-center justify-between">
          <div>
            <p class="font-medium text-sm">${slFormatMoney(c.amount)}</p>
            <p class="text-xs text-gray-400">${slEscape(u ? u.name : 'Unknown user')} · ${slFormatDate(c.date)}</p>
          </div>
          <span class="seal seal-pending">Pending</span>
        </div>`;
      }).join('');

  const usersBody = document.getElementById('admin-users-body');
  const recent = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
  usersBody.innerHTML = recent.length === 0
    ? `<tr><td colspan="4"><div class="empty-state">No users have registered yet.</div></td></tr>`
    : recent.map(u => `
        <tr class="border-t border-[var(--hairline)]">
          <td class="py-3 px-5 font-medium">${slEscape(u.name)}</td>
          <td class="py-3 px-5 text-gray-500">${slEscape(u.email)}</td>
          <td class="py-3 px-5 text-gray-500">${slEscape(u.phone || '—')}</td>
          <td class="py-3 px-5 font-mono text-xs text-gray-400">${slFormatDate(u.createdAt)}</td>
        </tr>`).join('');
});
