document.addEventListener('DOMContentLoaded', () => {
  slRequireAdmin();
  slInitLayout('users.html');

  const tbody = document.getElementById('users-table-body');
  const countEl = document.getElementById('user-count');
  const searchInput = document.getElementById('user-search');
  const modal = document.getElementById('edit-user-modal');
  let query = '';

  function render() {
    const users = slGet(DB.USERS, []);
    const userPolicies = slGet(DB.USER_POLICIES, []);
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
    );
    countEl.textContent = users.length;

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">No users match that search.</div></td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(u => {
      const count = userPolicies.filter(up => up.userId === u.id && up.status === 'approved').length;
      return `
      <tr class="border-t border-[var(--hairline)]">
        <td class="py-3 px-5 font-medium">${slEscape(u.name)}</td>
        <td class="py-3 px-5 text-gray-500">${slEscape(u.email)}</td>
        <td class="py-3 px-5 text-gray-500">${slEscape(u.phone || '—')}</td>
        <td class="py-3 px-5 text-gray-500">${slEscape(u.address || '—')}</td>
        <td class="py-3 px-5">${count}</td>
        <td class="py-3 px-5 font-mono text-xs text-gray-400">${slFormatDate(u.createdAt)}</td>
        <td class="py-3 px-5 whitespace-nowrap">
          <button data-edit="${u.id}" class="text-xs font-semibold text-[var(--teal)] hover:underline mr-3">Edit</button>
          <button data-delete="${u.id}" class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
        </td>
      </tr>`;
    }).join('');
  }

  searchInput.addEventListener('input', () => {
    query = searchInput.value.trim().toLowerCase();
    render();
  });

  tbody.addEventListener('click', (e) => {
    const editBtn = e.target.closest('button[data-edit]');
    const delBtn = e.target.closest('button[data-delete]');

    if (editBtn) {
      const u = slGet(DB.USERS, []).find(x => x.id === editBtn.dataset.edit);
      if (!u) return;
      document.getElementById('eu-id').value = u.id;
      document.getElementById('eu-name').value = u.name;
      document.getElementById('eu-email').value = u.email;
      document.getElementById('eu-phone').value = u.phone || '';
      document.getElementById('eu-address').value = u.address || '';
      modal.classList.remove('hidden');
    }

    if (delBtn) {
      if (!confirm('Delete this user and all their policies, claims and notifications?')) return;
      const id = delBtn.dataset.delete;
      slSet(DB.USERS, slGet(DB.USERS, []).filter(u => u.id !== id));
      slSet(DB.USER_POLICIES, slGet(DB.USER_POLICIES, []).filter(up => up.userId !== id));
      slSet(DB.CLAIMS, slGet(DB.CLAIMS, []).filter(c => c.userId !== id));
      slSet(DB.NOTIFICATIONS, slGet(DB.NOTIFICATIONS, []).filter(n => n.userId !== id));
      slToast('User deleted.', 'success');
      render();
    }
  });

  document.getElementById('eu-cancel').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('edit-user-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('eu-id').value;
    const users = slGet(DB.USERS, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return;

    const newEmail = document.getElementById('eu-email').value.trim().toLowerCase();
    if (users.some(u => u.id !== id && u.email.toLowerCase() === newEmail)) {
      slToast('That email is already used by another user.', 'error');
      return;
    }

    users[idx].name = document.getElementById('eu-name').value.trim();
    users[idx].email = newEmail;
    users[idx].phone = document.getElementById('eu-phone').value.trim();
    users[idx].address = document.getElementById('eu-address').value.trim();
    slSet(DB.USERS, users);
    modal.classList.add('hidden');
    slToast('User updated.', 'success');
    render();
  });

  render();
});
