document.addEventListener('DOMContentLoaded', () => {
  slRequireUser();
  slInitLayout('settings.html');

  const user = slCurrentUser();
  if (!user) return;

  document.getElementById('s-name').value = user.name;
  document.getElementById('s-email').value = user.email;
  document.getElementById('s-phone').value = user.phone || '';
  document.getElementById('s-address').value = user.address || '';

  document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const users = slGet(DB.USERS, []);
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;

    const newEmail = document.getElementById('s-email').value.trim().toLowerCase();
    if (users.some(u => u.id !== user.id && u.email.toLowerCase() === newEmail)) {
      slToast('That email is already used by another account.', 'error');
      return;
    }

    users[idx].name = document.getElementById('s-name').value.trim();
    users[idx].email = newEmail;
    users[idx].phone = document.getElementById('s-phone').value.trim();
    users[idx].address = document.getElementById('s-address').value.trim();
    slSet(DB.USERS, users);
    slToast('Profile updated.', 'success');
    setTimeout(() => window.location.reload(), 600);
  });

  document.getElementById('password-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const current = document.getElementById('s-current-pw').value;
    const next = document.getElementById('s-new-pw').value;
    const confirm = document.getElementById('s-confirm-pw').value;

    if (current !== user.password) {
      slToast('Current password is incorrect.', 'error');
      return;
    }
    if (next.length < 6) {
      slToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (next !== confirm) {
      slToast('New passwords do not match.', 'error');
      return;
    }

    const users = slGet(DB.USERS, []);
    const idx = users.findIndex(u => u.id === user.id);
    users[idx].password = next;
    slSet(DB.USERS, users);
    document.getElementById('password-form').reset();
    slToast('Password updated.', 'success');
  });

  document.getElementById('delete-account').addEventListener('click', () => {
    if (!confirm('This will permanently delete your account and all related data. Continue?')) return;

    slSet(DB.USERS, slGet(DB.USERS, []).filter(u => u.id !== user.id));
    slSet(DB.USER_POLICIES, slGet(DB.USER_POLICIES, []).filter(up => up.userId !== user.id));
    slSet(DB.CLAIMS, slGet(DB.CLAIMS, []).filter(c => c.userId !== user.id));
    slSet(DB.NOTIFICATIONS, slGet(DB.NOTIFICATIONS, []).filter(n => n.userId !== user.id));
    slLogoutUser();
    slToast('Account deleted.', 'success');
    setTimeout(() => window.location.href = 'index.html', 700);
  });
});
