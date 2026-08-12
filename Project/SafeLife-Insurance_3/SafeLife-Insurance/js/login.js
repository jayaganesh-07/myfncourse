document.addEventListener('DOMContentLoaded', () => {
  slInitLayout('login.html');

  const errorEl = document.getElementById('login-error');
  if (!SL_STORAGE_OK) {
    errorEl.textContent = 'Local storage is unavailable in this browser for this page — see the notice above. Try opening the site through a local server instead.';
    errorEl.classList.remove('hidden');
  }

  if (slCurrentUser()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const form = document.getElementById('login-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');

    if (!SL_STORAGE_OK) {
      errorEl.textContent = 'Local storage is unavailable in this browser for this page. Please open the site through a local server and try again.';
      errorEl.classList.remove('hidden');
      return;
    }

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const users = slGet(DB.USERS, []);
    const match = users.find(u => u.email.toLowerCase() === email && u.password === password);

    if (!match) {
      errorEl.textContent = 'No account matches that email and password. Please try again or register.';
      errorEl.classList.remove('hidden');
      return;
    }

    try {
      localStorage.setItem(DB.CURRENT_USER, match.id);
    } catch (e) {
      errorEl.textContent = 'Could not save your session in this browser. Please try a different browser or open the site through a local server.';
      errorEl.classList.remove('hidden');
      return;
    }
    slToast('Welcome back, ' + match.name.split(' ')[0] + '!', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 400);
  });
});
