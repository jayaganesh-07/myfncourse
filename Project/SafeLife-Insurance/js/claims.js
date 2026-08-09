/**
 * SafeLife Insurance - Admin Claims Management
 */

document.addEventListener('DOMContentLoaded', () => {
  const admin = requireAdmin();
  if (!admin) return;

  renderAdminClaimsTable();
});

let claimFilter = 'All';

function renderAdminClaimsTable() {
  const container = document.getElementById('admin-claims-tbody');
  if (!container) return;

  const claims = getItem(DB_KEYS.CLAIMS);
  const filtered = claims.filter(c => claimFilter === 'All' || c.status === claimFilter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-400 text-sm">No insurance claims matching filter criteria.</td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => `
    <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100 text-sm">
      <td class="px-6 py-4 font-mono font-bold text-slate-700">${c.id}</td>
      <td class="px-6 py-4">
        <h5 class="font-bold text-slate-900">${c.userName}</h5>
        <span class="text-xs text-slate-400">${c.userEmail}</span>
      </td>
      <td class="px-6 py-4 font-semibold text-slate-800">${c.policyTitle}</td>
      <td class="px-6 py-4 font-black text-slate-900">$${c.claimAmount.toLocaleString()}</td>
      <td class="px-6 py-4 text-xs text-slate-500 max-w-xs truncate" title="${c.reason}">${c.reason}</td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 text-xs font-bold rounded-full ${
          c.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
          c.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
        }">${c.status}</span>
      </td>
      <td class="px-6 py-4 text-right space-x-2">
        ${c.status === 'Pending' ? `
          <button onclick="processClaimModal('${c.id}', 'Approved')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-colors">
            Approve
          </button>
          <button onclick="processClaimModal('${c.id}', 'Rejected')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition-colors">
            Reject
          </button>
        ` : `
          <span class="text-xs font-bold text-slate-400">Processed ($${c.approvedAmount.toLocaleString()})</span>
        `}
      </td>
    </tr>
  `).join('');
}

window.processClaimModal = function(claimId, targetStatus) {
  const claims = getItem(DB_KEYS.CLAIMS);
  const claim = claims.find(c => c.id === claimId);
  if (!claim) return;

  let modal = document.createElement('div');
  modal.id = 'process-claim-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm';

  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-slate-100">
      <button onclick="document.getElementById('process-claim-modal').remove()" class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <h2 class="text-2xl font-black text-slate-900 mb-1">${targetStatus} Claim</h2>
      <p class="text-sm text-slate-500 mb-6">Claim ID: <strong class="text-slate-800">${claim.id}</strong> by ${claim.userName}.</p>

      <form id="process-claim-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Approved Payout Amount ($)</label>
          <input type="number" id="payout-amount" value="${targetStatus === 'Approved' ? claim.claimAmount : 0}" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Admin Audit Notes / Feedback</label>
          <textarea id="admin-notes" rows="3" placeholder="Enter auditor comments..." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm">${targetStatus === 'Approved' ? 'Verified medical bills. Approved payout.' : 'Insufficient proof of loss.'}</textarea>
        </div>

        <div class="pt-4 flex gap-3">
          <button type="button" onclick="document.getElementById('process-claim-modal').remove()" class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white ${targetStatus === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'} shadow-lg transition-all text-sm">
            Confirm ${targetStatus}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('process-claim-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const payout = parseFloat(document.getElementById('payout-amount').value);
    const notes = document.getElementById('admin-notes').value.trim();

    claim.status = targetStatus;
    claim.approvedAmount = payout;
    claim.adminNotes = notes;

    setItem(DB_KEYS.CLAIMS, claims);

    addNotification(claim.userId, `Claim ${targetStatus}`, `Your claim #${claim.id} has been ${targetStatus.toLowerCase()}. Payout: $${payout.toLocaleString()}`, targetStatus === 'Approved' ? 'success' : 'error');

    modal.remove();
    showToast(`Claim #${claim.id} ${targetStatus.toLowerCase()} successfully!`, 'success');
    renderAdminClaimsTable();
  });
};
