/**
 * SafeLife Insurance - Enhanced & Robust Admin Claims Management
 */

document.addEventListener('DOMContentLoaded', () => {
  const admin = requireAdmin();
  if (!admin) return;

  renderAdminClaimsTable();
  setupClaimsFilters();
});

let claimFilterStatus = 'All';
let claimSearchQuery = '';

function renderAdminClaimsTable() {
  const container = document.getElementById('admin-claims-tbody');
  if (!container) return;

  const rawClaims = getItem(DB_KEYS.CLAIMS);
  const claims = Array.isArray(rawClaims) ? rawClaims : [];

  // Robust Stats Calculation
  const pendingCount = claims.filter(c => c && c.status === 'Pending').length;
  const rejectedCount = claims.filter(c => c && c.status === 'Rejected').length;
  
  const approvedPayouts = claims
    .filter(c => c && c.status === 'Approved')
    .reduce((sum, c) => {
      const amt = parseFloat(c.approvedAmount !== undefined && c.approvedAmount !== null && c.approvedAmount !== 0 ? c.approvedAmount : c.claimAmount);
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);

  if (document.getElementById('stat-claim-total')) {
    document.getElementById('stat-claim-total').textContent = claims.length;
    document.getElementById('stat-claim-pending').textContent = pendingCount;
    document.getElementById('stat-claim-payouts').textContent = `$${approvedPayouts.toLocaleString()}`;
    document.getElementById('stat-claim-rejected').textContent = rejectedCount;
  }

  // Safe Filter & Search Logic
  const query = (claimSearchQuery || '').toLowerCase().trim();

  let filtered = claims.filter(c => {
    if (!c) return false;
    
    const status = c.status || 'Pending';
    const matchesStatus = claimFilterStatus === 'All' || status.toLowerCase() === claimFilterStatus.toLowerCase();
    
    const idStr = String(c.id || '').toLowerCase();
    const nameStr = String(c.userName || '').toLowerCase();
    const titleStr = String(c.policyTitle || '').toLowerCase();
    const reasonStr = String(c.reason || '').toLowerCase();

    const matchesSearch = !query || 
                          idStr.includes(query) ||
                          nameStr.includes(query) ||
                          titleStr.includes(query) ||
                          reasonStr.includes(query);

    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-slate-400 text-sm">
          <i class="fa-solid fa-folder-open text-2xl text-slate-600 mb-2 block"></i>
          No insurance claims matching filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => {
    const claimAmt = parseFloat(c.claimAmount) || 0;
    const appAmt = parseFloat(c.approvedAmount) || 0;
    const currentStatus = c.status || 'Pending';

    return `
      <tr class="hover:bg-slate-800/60 transition-colors border-b border-slate-800 text-sm">
        <td class="px-6 py-4">
          <span class="font-mono font-bold text-indigo-400 block">${c.id || 'CL-UNKNOWN'}</span>
          <span class="text-[10px] text-slate-400">${c.dateSubmitted || 'Recent'}</span>
        </td>
        <td class="px-6 py-4">
          <h5 class="font-bold text-white text-sm">${c.userName || 'Unknown Applicant'}</h5>
          <span class="text-xs text-slate-400">${c.userEmail || 'N/A'}</span>
        </td>
        <td class="px-6 py-4 font-semibold text-slate-200">${c.policyTitle || 'General Cover'}</td>
        <td class="px-6 py-4 font-black text-white text-base">$${claimAmt.toLocaleString()}</td>
        <td class="px-6 py-4 text-xs text-slate-400 max-w-xs">
          <p class="truncate" title="${c.reason || ''}">${c.reason || 'No description provided'}</p>
          ${c.adminNotes ? `<span class="text-[10px] text-indigo-300 italic block mt-0.5">Auditor Note: ${c.adminNotes}</span>` : ''}
        </td>
        <td class="px-6 py-4">
          <span class="px-3 py-1 text-xs font-bold rounded-full uppercase ${
            currentStatus === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
            currentStatus === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }">${currentStatus}</span>
        </td>
        <td class="px-6 py-4 text-right space-x-2">
          <button onclick="processClaimModal('${c.id}', 'Approved')" class="px-3 py-1.5 rounded-xl text-xs font-bold ${currentStatus === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} shadow-md transition-all">
            ${currentStatus === 'Approved' ? '<i class="fa-solid fa-pen-to-square"></i> Edit Payout' : 'Approve'}
          </button>
          <button onclick="processClaimModal('${c.id}', 'Rejected')" class="px-3 py-1.5 rounded-xl text-xs font-bold ${currentStatus === 'Rejected' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-rose-600 hover:bg-rose-500 text-white'} shadow-md transition-all">
            Reject
          </button>
          <button onclick="deleteClaim('${c.id}')" class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors" title="Delete Record">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function setupClaimsFilters() {
  const searchInput = document.getElementById('search-claims');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      claimSearchQuery = e.target.value;
      renderAdminClaimsTable();
    });
  }

  const filterBtns = document.querySelectorAll('.claim-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('gradient-brand', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700');
      });

      btn.classList.remove('bg-slate-800', 'text-slate-300', 'border', 'border-slate-700');
      btn.classList.add('gradient-brand', 'text-white', 'shadow-md');

      claimFilterStatus = btn.dataset.status || 'All';
      renderAdminClaimsTable();
    });
  });
}

window.processClaimModal = function(claimId, targetStatus) {
  const claims = getItem(DB_KEYS.CLAIMS);
  const claim = claims.find(c => c && String(c.id) === String(claimId));
  if (!claim) {
    showToast('Claim record not found', 'error');
    return;
  }

  const existingModal = document.getElementById('process-claim-modal');
  if (existingModal) existingModal.remove();

  const currentAmt = parseFloat(claim.claimAmount) || 0;
  const currentApp = parseFloat(claim.approvedAmount) || currentAmt;

  let modal = document.createElement('div');
  modal.id = 'process-claim-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-slide-up';

  modal.innerHTML = `
    <div class="bg-slate-900 rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-slate-800 text-white">
      <button onclick="document.getElementById('process-claim-modal').remove()" class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-2xl ${targetStatus === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'} flex items-center justify-center text-xl font-bold">
          <i class="fa-solid ${targetStatus === 'Approved' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
        </div>
        <div>
          <h2 class="text-xl font-black text-white">${targetStatus} Claim</h2>
          <p class="text-xs text-slate-400">Claim ID: <strong class="text-indigo-400">${claim.id}</strong></p>
        </div>
      </div>

      <div class="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs space-y-1.5 mb-6">
        <p><strong>Applicant:</strong> ${claim.userName || 'User'} (${claim.userEmail || 'N/A'})</p>
        <p><strong>Policy Plan:</strong> ${claim.policyTitle || 'N/A'}</p>
        <p><strong>Requested Amount:</strong> <span class="text-emerald-400 font-bold">$${currentAmt.toLocaleString()}</span></p>
        <p class="text-slate-300"><strong>Reason:</strong> ${claim.reason || 'N/A'}</p>
      </div>

      <form id="process-claim-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Approved Payout Amount ($)</label>
          <input type="number" id="payout-amount" value="${targetStatus === 'Approved' ? currentApp : 0}" min="0" step="any" required class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Auditor Feedback Notes</label>
          <textarea id="admin-notes" rows="3" placeholder="Enter claims auditor feedback..." class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm">${claim.adminNotes || (targetStatus === 'Approved' ? 'Medical vouchers verified. Payout authorized.' : 'Documentation insufficient.')}</textarea>
        </div>

        <div class="pt-2 flex gap-3">
          <button type="button" onclick="document.getElementById('process-claim-modal').remove()" class="flex-1 py-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white ${targetStatus === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'} shadow-lg transition-all text-sm">
            Confirm ${targetStatus}
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('process-claim-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const payout = parseFloat(document.getElementById('payout-amount').value) || 0;
    const notes = document.getElementById('admin-notes').value.trim();

    claim.status = targetStatus;
    claim.approvedAmount = payout;
    claim.adminNotes = notes;

    setItem(DB_KEYS.CLAIMS, claims);

    if (claim.userId) {
      addNotification(claim.userId, `Claim ${targetStatus}`, `Your claim #${claim.id} status updated to ${targetStatus}. Approved Payout: $${payout.toLocaleString()}`, targetStatus === 'Approved' ? 'success' : 'error');
    }

    modal.remove();
    showToast(`Claim #${claim.id} ${targetStatus.toLowerCase()} successfully!`, 'success');
    renderAdminClaimsTable();
  });
};

window.deleteClaim = function(claimId) {
  if (!confirm(`Are you sure you want to delete claim record #${claimId}?`)) return;

  let claims = getItem(DB_KEYS.CLAIMS);
  claims = claims.filter(c => c && String(c.id) !== String(claimId));
  setItem(DB_KEYS.CLAIMS, claims);

  showToast(`Claim record #${claimId} deleted.`, 'info');
  renderAdminClaimsTable();
};
