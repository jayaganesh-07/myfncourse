document.addEventListener('DOMContentLoaded', () => {
  if (!SL_STORAGE_OK) {
    const errorEl = document.getElementById('admin-login-error');
    errorEl.textContent = 'Local storage is unavailable in this browser for this page — see the notice above. Try opening the site through a local server instead.';
    errorEl.classList.remove('hidden');
  }

  if (slIsAdmin()) {
    window.location.href = 'admin.html';
    return;
  }

  const form = document.getElementById('admin-login-form');
  const errorEl = document.getElementById('admin-login-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');

    if (!SL_STORAGE_OK) {
      errorEl.textContent = 'Local storage is unavailable in this browser for this page. Please open the site through a local server and try again.';
      errorEl.classList.remove('hidden');
      return;
    }

    const email = document.getElementById('a-email').value.trim().toLowerCase();
    const password = document.getElementById('a-password').value;
    const admin = slGet(DB.ADMIN, null);

    if (!admin || !admin.email) {
      errorEl.textContent = 'Admin account data could not be loaded. Please refresh the page and try again.';
      errorEl.classList.remove('hidden');
      return;
    }

    if (email !== admin.email.toLowerCase() || password !== admin.password) {
      errorEl.textContent = 'Incorrect admin email or password.';
      errorEl.classList.remove('hidden');
      return;
    }

    try {
      localStorage.setItem(DB.CURRENT_ADMIN, 'true');
    } catch (err) {
      errorEl.textContent = 'Could not save your session in this browser. Please try a different browser or open the site through a local server.';
      errorEl.classList.remove('hidden');
      return;
    }
    window.location.href = 'admin.html';
  });
});
