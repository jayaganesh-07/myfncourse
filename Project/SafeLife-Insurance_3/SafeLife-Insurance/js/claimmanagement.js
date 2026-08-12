document.addEventListener('DOMContentLoaded', () => {
  slRequireAdmin();
  slInitLayout('claimmanagement.html');

  const filterBar = document.getElementById('claim-filters');
  const tbody = document.getElementById('claims-table-body');
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
    const userPolicies = slGet(DB.USER_POLICIES, []);
    const claims = slGet(DB.CLAIMS, [])
      .filter(c => active === 'all' ? true : c.status === active)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (claims.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">No ${active === 'all' ? '' : active} claims right now.</div></td></tr>`;
      return;
    }

    tbody.innerHTML = claims.map(c => {
      const u = users.find(x => x.id === c.userId);
      const up = userPolicies.find(x => x.id === c.userPolicyId);
      const p = up ? policies.find(x => x.id === up.policyId) : null;
      const sealClass = c.status === 'approved' ? 'seal-approved' : c.status === 'rejected' ? 'seal-rejected' : 'seal-pending';
      return `
      <tr class="border-t border-[var(--hairline)] align-top">
        <td class="py-3 px-5">
          <p class="font-medium">${slEscape(u ? u.name : 'Unknown')}</p>
          <p class="text-xs text-gray-400">${slEscape(u ? u.email : '')}</p>
        </td>
        <td class="py-3 px-5">${slEscape(p ? p.name : '—')}</td>
        <td class="py-3 px-5 max-w-[240px] text-gray-500">${slEscape(c.reason)}</td>
        <td class="py-3 px-5 font-mono">${slFormatMoney(c.amount)}</td>
        <td class="py-3 px-5 font-mono text-xs text-gray-400 whitespace-nowrap">${slFormatDate(c.date)}</td>
        <td class="py-3 px-5"><span class="seal ${sealClass}">${c.status}</span></td>
        <td class="py-3 px-5 whitespace-nowrap">
          ${c.status === 'pending' ? `
            <button data-approve="${c.id}" class="text-xs font-semibold text-[var(--teal)] hover:underline mr-3">Approve</button>
            <button data-reject="${c.id}" class="text-xs font-semibold text-red-500 hover:underline">Reject</button>
          ` : '<span class="text-xs text-gray-300">—</span>'}
        </td>
      </tr>`;
    }).join('');
  }

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-tab]');
    if (!btn) return;
    active = btn.dataset.tab;
    renderFilters();
    render();
  });

  tbody.addEventListener('click', (e) => {
    const approveBtn = e.target.closest('button[data-approve]');
    const rejectBtn = e.target.closest('button[data-reject]');
    if (!approveBtn && !rejectBtn) return;

    const id = approveBtn ? approveBtn.dataset.approve : rejectBtn.dataset.reject;
    const claims = slGet(DB.CLAIMS, []);
    const idx = claims.findIndex(c => c.id === id);
    if (idx === -1) return;

    if (approveBtn) {
      claims[idx].status = 'approved';
      slNotify(claims[idx].userId, `Your claim of ${slFormatMoney(claims[idx].amount)} has been approved.`, 'success');
      slToast('Claim approved.', 'success');
    } else {
      claims[idx].status = 'rejected';
      slNotify(claims[idx].userId, `Your claim of ${slFormatMoney(claims[idx].amount)} was not approved.`, 'error');
      slToast('Claim rejected.', 'success');
    }
    slSet(DB.CLAIMS, claims);
    render();
  });

  renderFilters();
  render();
});
