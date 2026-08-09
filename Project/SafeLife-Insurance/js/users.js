/**
 * SafeLife Insurance - Admin User Management
 */

document.addEventListener('DOMContentLoaded', () => {
  const admin = requireAdmin();
  if (!admin) return;

  renderUserTable();
  setupUserSearch();
});

let userSearchQuery = '';

function renderUserTable() {
  const tableBody = document.getElementById('users-table-body');
  if (!tableBody) return;

  const users = getItem(DB_KEYS.USERS);
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-slate-400 text-sm">No users matching search query.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(u => `
    <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <img src="${u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-10 h-10 rounded-full object-cover border border-slate-200">
          <div>
            <h5 class="font-bold text-slate-900 text-sm">${u.name}</h5>
            <span class="text-xs text-slate-400">${u.email}</span>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 text-xs font-semibold text-slate-600">${u.phone || 'N/A'}</td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 text-xs font-bold rounded-full uppercase ${
          u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
        }">${u.role}</span>
      </td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 text-xs font-bold rounded-full ${
          u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }">${u.status}</span>
      </td>
      <td class="px-6 py-4 text-xs text-slate-400">${u.joinedDate || '2024-01-01'}</td>
      <td class="px-6 py-4 text-right space-x-2">
        ${u.role !== 'admin' ? `
          <button onclick="toggleUserStatus('${u.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
            u.status === 'Active' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          } transition-colors">
            ${u.status === 'Active' ? 'Suspend' : 'Activate'}
          </button>
          <button onclick="deleteUser('${u.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        ` : `<span class="text-xs font-bold text-slate-300">Protected</span>`}
      </td>
    </tr>
  `).join('');
}

function setupUserSearch() {
  const searchInput = document.getElementById('search-users');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      userSearchQuery = e.target.value;
      renderUserTable();
    });
  }
}

window.toggleUserStatus = function(userId) {
  const users = getItem(DB_KEYS.USERS);
  const user = users.find(u => u.id === userId);
  if (!user) return;

  user.status = user.status === 'Active' ? 'Suspended' : 'Active';
  setItem(DB_KEYS.USERS, users);

  showToast(`User ${user.name} status updated to ${user.status}`, 'info');
  renderUserTable();
};

window.deleteUser = function(userId) {
  if (!confirm('Are you sure you want to permanently delete this user account?')) return;

  let users = getItem(DB_KEYS.USERS);
  users = users.filter(u => u.id !== userId);
  setItem(DB_KEYS.USERS, users);

  showToast('User account deleted successfully.', 'success');
  renderUserTable();
};
