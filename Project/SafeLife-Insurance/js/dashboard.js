/**
 * SafeLife Insurance - User Dashboard Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  const user = requireAuth();
  if (!user) return;

  renderUserSummary(user);
  renderUserPolicies(user);
  renderUserClaims(user);
  setupClaimModal(user);
});

function renderUserSummary(user) {
  document.getElementById('user-welcome-name').textContent = user.name;
  
  const userPolicies = getItem(DB_KEYS.USER_POLICIES).filter(p => p.userId === user.id && p.status === 'Approved');
  const userClaims = getItem(DB_KEYS.CLAIMS).filter(c => c.userId === user.id);
  
  let totalCoverage = userPolicies.reduce((sum, p) => sum + p.coverageAmount, 0);
  let totalMonthlyPremium = userPolicies.reduce((sum, p) => sum + p.monthlyPremium, 0);
  let totalClaimsCount = userClaims.length;

  document.getElementById('stat-total-coverage').textContent = `$${totalCoverage.toLocaleString()}`;
  document.getElementById('stat-active-policies').textContent = userPolicies.length;
  document.getElementById('stat-monthly-premium').textContent = `$${totalMonthlyPremium}/mo`;
  document.getElementById('stat-claims-submitted').textContent = totalClaimsCount;
}

function renderUserPolicies(user) {
  const container = document.getElementById('user-policies-list');
  if (!container) return;

  const userPolicies = getItem(DB_KEYS.USER_POLICIES).filter(p => p.userId === user.id);

  if (userPolicies.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <i class="fa-solid fa-shield-heart text-3xl text-slate-300 mb-3"></i>
        <h4 class="font-bold text-slate-700">No Active Insurance Policies</h4>
        <p class="text-xs text-slate-400 mt-1 mb-4">Protect yourself and your family today by exploring our plans.</p>
        <a href="policies.html" class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-brand-700 transition-all">
          <i class="fa-solid fa-plus"></i> Browse Policies
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = userPolicies.map(pol => `
    <div class="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl ${pol.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} flex items-center justify-center text-xl font-bold">
          <i class="fa-solid ${pol.category === 'Health' ? 'fa-heart-pulse' : pol.category === 'Vehicle' ? 'fa-car' : pol.category === 'Home' ? 'fa-house' : 'fa-shield'}"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-slate-900 text-base">${pol.policyTitle}</h4>
            <span class="px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
              pol.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
              pol.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }">${pol.status}</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Nominee: ${pol.nominee || 'N/A'} • Coverage: <strong>$${pol.coverageAmount.toLocaleString()}</strong></p>
        </div>
      </div>

      <div class="flex items-center gap-6 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
        <div class="text-left md:text-right">
          <span class="text-[10px] uppercase font-bold text-slate-400 block">Premium</span>
          <span class="text-sm font-black text-brand-600">$${pol.monthlyPremium}/mo</span>
        </div>
        <button onclick="downloadPolicyReceipt('${pol.id}')" class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2">
          <i class="fa-solid fa-download text-brand-600"></i> Certificate
        </button>
      </div>
    </div>
  `).join('');
}

function renderUserClaims(user) {
  const container = document.getElementById('user-claims-list');
  if (!container) return;

  const claims = getItem(DB_KEYS.CLAIMS).filter(c => c.userId === user.id);

  if (claims.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
        <p class="text-xs text-slate-400">No claims submitted yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = claims.map(c => `
    <div class="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-sm">
      <div>
        <h5 class="font-bold text-slate-800">${c.policyTitle}</h5>
        <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${c.reason}</p>
        <span class="text-[10px] text-slate-400">Date: ${c.dateSubmitted}</span>
      </div>
      <div class="text-right">
        <span class="text-sm font-black text-slate-900 block">$${c.claimAmount.toLocaleString()}</span>
        <span class="px-2 py-0.5 text-[10px] font-bold rounded-full ${
          c.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
          c.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
        }">${c.status}</span>
      </div>
    </div>
  `).join('');
}

function setupClaimModal(user) {
  const claimBtn = document.getElementById('file-claim-btn');
  if (!claimBtn) return;

  claimBtn.addEventListener('click', () => {
    const userPolicies = getItem(DB_KEYS.USER_POLICIES).filter(p => p.userId === user.id && p.status === 'Approved');

    if (userPolicies.length === 0) {
      showToast('You must have an approved policy before filing a claim.', 'warning');
      return;
    }

    let modal = document.createElement('div');
    modal.id = 'claim-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-100">
        <button onclick="document.getElementById('claim-modal').remove()" class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="text-2xl font-black text-slate-900 mb-1">File an Insurance Claim</h2>
        <p class="text-sm text-slate-500 mb-6">Submit claim details and expenses for evaluation.</p>

        <form id="claim-form" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Select Policy *</label>
            <select id="claim-policy" required class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-white">
              ${userPolicies.map(p => `<option value="${p.id}">${p.policyTitle} (Coverage: $${p.coverageAmount.toLocaleString()})</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Claim Amount ($) *</label>
            <input type="number" id="claim-amount" required placeholder="e.g. 2500" min="10" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm">
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Reason / Description *</label>
            <textarea id="claim-reason" required rows="3" placeholder="Describe the medical emergency, incident, or property damage..." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm"></textarea>
          </div>

          <div class="pt-4 flex gap-3">
            <button type="button" onclick="document.getElementById('claim-modal').remove()" class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm">
              Cancel
            </button>
            <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all text-sm">
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('claim-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const userPolicyId = document.getElementById('claim-policy').value;
      const amount = parseFloat(document.getElementById('claim-amount').value);
      const reason = document.getElementById('claim-reason').value.trim();

      const selectedPol = userPolicies.find(p => p.id === userPolicyId);

      const claims = getItem(DB_KEYS.CLAIMS);
      const newClaim = {
        id: 'clm_' + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPolicyId: userPolicyId,
        policyTitle: selectedPol.policyTitle,
        claimAmount: amount,
        reason: reason,
        dateSubmitted: new Date().toISOString().split('T')[0],
        status: 'Pending',
        approvedAmount: 0,
        adminNotes: 'Submitted for verification by policyholder.'
      };

      claims.unshift(newClaim);
      setItem(DB_KEYS.CLAIMS, claims);

      addNotification(user.id, 'Claim Submitted', `Claim #${newClaim.id} for $${amount.toLocaleString()} has been filed.`, 'info');

      modal.remove();
      showToast('Insurance claim submitted successfully!', 'success');
      renderUserSummary(user);
      renderUserClaims(user);
    });
  });
}

window.downloadPolicyReceipt = function(userPolicyId) {
  const userPolicies = getItem(DB_KEYS.USER_POLICIES);
  const pol = userPolicies.find(p => p.id === userPolicyId);
  if (!pol) return;

  showToast(`Generating Certificate for ${pol.policyTitle}...`, 'info');

  setTimeout(() => {
    alert(`=========================================\n       SAFELIFE INSURANCE CERTIFICATE\n=========================================\nPolicy Title: ${pol.policyTitle}\nPolicyholder: ${pol.userName}\nNominee: ${pol.nominee}\nCoverage Sum: $${pol.coverageAmount.toLocaleString()}\nStatus: ${pol.status}\nValid Until: ${pol.endDate}\n=========================================`);
  }, 500);
};
