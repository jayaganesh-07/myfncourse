/**
 * SafeLife Insurance - Admin Analytics & Reports
 */

document.addEventListener('DOMContentLoaded', () => {
  const admin = requireAdmin();
  if (!admin) return;

  renderReportMetrics();
});

function renderReportMetrics() {
  const users = getItem(DB_KEYS.USERS);
  const userPolicies = getItem(DB_KEYS.USER_POLICIES);
  const claims = getItem(DB_KEYS.CLAIMS);

  const totalUsers = users.filter(u => u.role === 'user').length;
  const approvedPolicies = userPolicies.filter(p => p.status === 'Approved');
  const pendingPolicies = userPolicies.filter(p => p.status === 'Pending');

  const totalRevenue = approvedPolicies.reduce((sum, p) => sum + (p.monthlyPremium * 12), 0);
  const totalClaimsPayout = claims.filter(c => c.status === 'Approved').reduce((sum, c) => sum + c.approvedAmount, 0);

  document.getElementById('rep-total-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
  document.getElementById('rep-claims-payout').textContent = `$${totalClaimsPayout.toLocaleString()}`;
  document.getElementById('rep-active-users').textContent = totalUsers;
  document.getElementById('rep-approval-rate').textContent = `${userPolicies.length ? Math.round((approvedPolicies.length / userPolicies.length) * 100) : 100}%`;

  // Render Category Breakdown Bars
  const catBreakdown = document.getElementById('category-breakdown-bars');
  if (catBreakdown) {
    const categories = ['Health', 'Life', 'Vehicle', 'Home', 'Travel'];
    const totalCount = userPolicies.length || 1;

    catBreakdown.innerHTML = categories.map(cat => {
      const count = userPolicies.filter(p => p.category === cat).length;
      const pct = Math.round((count / totalCount) * 100);
      return `
        <div>
          <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>${cat} Insurance</span>
            <span>${count} (${pct}%)</span>
          </div>
          <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-brand-600 rounded-full" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

window.exportSummaryCSV = function() {
  showToast('Generating financial and policy breakdown export CSV...', 'info');
  setTimeout(() => {
    const csvContent = "data:text/csv;charset=utf-8,Category,Total Policies,Monthly Premium Sum\nHealth,15,$2235\nLife,8,$712\nVehicle,12,$900\nHome,5,$325";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SafeLife_Financial_Report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Report CSV downloaded successfully!', 'success');
  }, 1000);
};
