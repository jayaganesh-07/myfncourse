/**
 * SafeLife Insurance - Policy Catalog & Application Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  renderPolicies();
  setupFilterListeners();
});

let currentCategoryFilter = 'All';
let searchQuery = '';

function renderPolicies() {
  const gridContainer = document.getElementById('policies-grid');
  if (!gridContainer) return;

  const policies = getItem(DB_KEYS.POLICIES);

  let filtered = policies.filter(p => {
    const matchesCat = currentCategoryFilter === 'All' || p.category === currentCategoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 text-2xl">
          <i class="fa-solid fa-folder-open"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800">No Policies Found</h3>
        <p class="text-sm text-slate-500 max-w-sm mx-auto mt-1">Try adjusting your category filter or search query to find relevant protection plans.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(policy => `
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div class="relative h-48 overflow-hidden bg-slate-100">
        <img src="${policy.image}" alt="${policy.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <span class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          ${policy.category}
        </span>
        ${policy.badge ? `<span class="absolute top-4 right-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">${policy.badge}</span>` : ''}
      </div>

      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">${policy.title}</h3>
          <p class="text-sm text-slate-600 mt-2 line-clamp-2">${policy.description}</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-100">
          <div>
            <span class="text-xs text-slate-400 uppercase font-semibold block">Max Coverage</span>
            <span class="text-lg font-black text-slate-900">$${policy.coverageAmount.toLocaleString()}</span>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-400 uppercase font-semibold block">Premium</span>
            <span class="text-lg font-black text-brand-600">$${policy.monthlyPremium}<span class="text-xs text-slate-400 font-normal">/mo</span></span>
          </div>
        </div>

        <div class="space-y-2">
          ${policy.features.slice(0, 3).map(feat => `
            <div class="flex items-center gap-2 text-xs text-slate-600">
              <i class="fa-solid fa-circle-check text-emerald-500"></i>
              <span>${feat}</span>
            </div>
          `).join('')}
        </div>

        <div class="pt-2 flex gap-3">
          <button onclick="openPolicyModal('${policy.id}')" class="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            View Details
          </button>
          <button onclick="applyForPolicy('${policy.id}')" class="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFilterListeners() {
  const searchInput = document.getElementById('search-policies');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPolicies();
    });
  }

  const categoryBtns = document.querySelectorAll('.cat-filter-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('bg-brand-600', 'text-white'));
      categoryBtns.forEach(b => b.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-100'));
      btn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-100');
      btn.classList.add('bg-brand-600', 'text-white');

      currentCategoryFilter = btn.dataset.category;
      renderPolicies();
    });
  });

  // Check URL params for category filter (e.g., policies.html?cat=Health)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get('cat');
  if (paramCat) {
    currentCategoryFilter = paramCat;
    categoryBtns.forEach(b => {
      if (b.dataset.category === paramCat) {
        b.click();
      }
    });
  }
}

// Open Details Modal
window.openPolicyModal = function(policyId) {
  const policies = getItem(DB_KEYS.POLICIES);
  const policy = policies.find(p => p.id === policyId);
  if (!policy) return;

  let modal = document.getElementById('policy-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'policy-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-slate-100 animate-float max-h-[90vh] overflow-y-auto">
      <button onclick="document.getElementById('policy-modal').remove()" class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <div class="flex items-center gap-4 mb-6">
        <div class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl font-bold">
          <i class="fa-solid fa-shield-heart"></i>
        </div>
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">${policy.category}</span>
          <h2 class="text-2xl font-black text-slate-900 mt-1">${policy.title}</h2>
        </div>
      </div>

      <img src="${policy.image}" class="w-full h-56 object-cover rounded-2xl mb-6 shadow-md">

      <p class="text-slate-600 leading-relaxed mb-6">${policy.description}</p>

      <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
        <div>
          <span class="text-xs font-semibold text-slate-400 uppercase">Coverage Limit</span>
          <p class="text-xl font-black text-slate-900">$${policy.coverageAmount.toLocaleString()}</p>
        </div>
        <div>
          <span class="text-xs font-semibold text-slate-400 uppercase">Monthly Premium</span>
          <p class="text-xl font-black text-brand-600">$${policy.monthlyPremium} / month</p>
        </div>
      </div>

      <h4 class="font-bold text-slate-900 text-sm mb-3 uppercase tracking-wider">Key Policy Benefits</h4>
      <div class="space-y-2 mb-8">
        ${policy.features.map(f => `
          <div class="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50 text-emerald-900 text-sm font-medium">
            <i class="fa-solid fa-circle-check text-emerald-500 text-base"></i>
            <span>${f}</span>
          </div>
        `).join('')}
      </div>

      <div class="flex gap-4">
        <button onclick="document.getElementById('policy-modal').remove()" class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm">
          Close Window
        </button>
        <button onclick="applyForPolicy('${policy.id}')" class="flex-1 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all text-sm">
          Apply Now
        </button>
      </div>
    </div>
  `;
};

// Apply Flow
window.applyForPolicy = function(policyId) {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please sign in to apply for an insurance policy.', 'warning');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
    return;
  }

  const existingModal = document.getElementById('policy-modal');
  if (existingModal) existingModal.remove();

  const policies = getItem(DB_KEYS.POLICIES);
  const policy = policies.find(p => p.id === policyId);

  let applyModal = document.createElement('div');
  applyModal.id = 'apply-modal';
  applyModal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm';

  applyModal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-100">
      <button onclick="document.getElementById('apply-modal').remove()" class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <h2 class="text-2xl font-black text-slate-900 mb-1">Apply for Policy</h2>
      <p class="text-sm text-slate-500 mb-6">Confirm your coverage application details for <strong class="text-slate-800">${policy.title}</strong>.</p>

      <form id="apply-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Applicant Name</label>
          <input type="text" value="${user.name}" readonly class="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Nominee Full Name *</label>
          <input type="text" id="nominee-name" required placeholder="e.g. Sarah Wright (Spouse)" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-sm transition-all">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Policy Payment Cycle</label>
          <select id="payment-cycle" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-sm bg-white">
            <option value="Monthly">Monthly - $${policy.monthlyPremium}/mo</option>
            <option value="Annual">Annual (10% Discount) - $${Math.round(policy.monthlyPremium * 12 * 0.9)}/yr</option>
          </select>
        </div>

        <div class="p-4 bg-brand-50 rounded-2xl border border-brand-100 flex items-center justify-between">
          <span class="text-sm font-bold text-brand-900">Total Coverage Sum</span>
          <span class="text-lg font-black text-brand-600">$${policy.coverageAmount.toLocaleString()}</span>
        </div>

        <div class="pt-4 flex gap-3">
          <button type="button" onclick="document.getElementById('apply-modal').remove()" class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all text-sm">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(applyModal);

  document.getElementById('apply-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nominee = document.getElementById('nominee-name').value.trim();

    const userPolicies = getItem(DB_KEYS.USER_POLICIES);
    const newApp = {
      id: 'up_' + Date.now(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      policyId: policy.id,
      policyTitle: policy.title,
      category: policy.category,
      coverageAmount: policy.coverageAmount,
      monthlyPremium: policy.monthlyPremium,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
      status: 'Pending',
      nominee: nominee,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    userPolicies.push(newApp);
    setItem(DB_KEYS.USER_POLICIES, userPolicies);

    addNotification(user.id, 'Application Submitted', `Your policy application for ${policy.title} has been submitted for verification.`, 'info');

    applyModal.remove();
    showToast('Policy application submitted successfully! Pending admin approval.', 'success');
  });
};
