document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('claim-modal');
  const claimsBody = document.getElementById('dash-claims-body');
  if (!modal || !claimsBody) return; // not on dashboard

  const user = slCurrentUser();
  if (!user) return;

  const policies = slGet(DB.POLICIES, []);
  const select = document.getElementById('claim-policy');

  function myApprovedApps() {
    return slGet(DB.USER_POLICIES, []).filter(up => up.userId === user.id && up.status === 'approved');
  }

  function renderClaimsTable() {
    const claims = slGet(DB.CLAIMS, []).filter(c => c.userId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const apps = slGet(DB.USER_POLICIES, []);

    if (claims.length === 0) {
      claimsBody.innerHTML = `<tr><td colspan="5"><div class="empty-state">No claims filed yet.</div></td></tr>`;
      return;
    }

    claimsBody.innerHTML = claims.map(c => {
      const app = apps.find(a => a.id === c.userPolicyId);
      const p = app ? policies.find(pl => pl.id === app.policyId) : null;
      const sealClass = c.status === 'approved' ? 'seal-approved' : c.status === 'rejected' ? 'seal-rejected' : 'seal-pending';
      return `
      <tr class="border-t border-[var(--hairline)]">
        <td class="py-3 px-5">${slEscape(p ? p.name : 'Unknown policy')}</td>
        <td class="py-3 px-5 text-gray-500">${slEscape(c.reason)}</td>
        <td class="py-3 px-5 font-mono">${slFormatMoney(c.amount)}</td>
        <td class="py-3 px-5 font-mono text-xs text-gray-400">${slFormatDate(c.date)}</td>
        <td class="py-3 px-5"><span class="seal ${sealClass}">${c.status}</span></td>
      </tr>`;
    }).join('');
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-file-claim]');
    if (!btn) return;
    const apps = myApprovedApps();
    if (apps.length === 0) {
      slToast('You need an approved policy before filing a claim.', 'error');
      return;
    }
    select.innerHTML = apps.map(a => {
      const p = policies.find(pl => pl.id === a.policyId);
      return `<option value="${a.id}" ${a.id === btn.dataset.fileClaim ? 'selected' : ''}>${slEscape(p ? p.name : 'Policy')}</option>`;
    }).join('');
    modal.classList.remove('hidden');
  });

  document.getElementById('claim-cancel').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('claim-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userPolicyId = select.value;
    const amount = document.getElementById('claim-amount').value;
    const reason = document.getElementById('claim-reason').value.trim();
    if (!userPolicyId || !amount || !reason) return;

    const claims = slGet(DB.CLAIMS, []);
    claims.push({
      id: slId('clm'),
      userId: user.id,
      userPolicyId,
      amount: Number(amount),
      reason,
      status: 'pending',
      date: new Date().toISOString(),
    });
    slSet(DB.CLAIMS, claims);
    slNotify(user.id, `Your claim of ${slFormatMoney(amount)} has been submitted and is under review.`, 'info');

    modal.classList.add('hidden');
    document.getElementById('claim-form').reset();
    slToast('Claim submitted successfully.', 'success');
    renderClaimsTable();
  });

  renderClaimsTable();
});
