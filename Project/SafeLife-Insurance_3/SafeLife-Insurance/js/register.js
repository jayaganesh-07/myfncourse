document.addEventListener('DOMContentLoaded', () => {
  slInitLayout('register.html');

  const errorEl = document.getElementById('register-error');
  if (!SL_STORAGE_OK) {
    errorEl.textContent = 'Local storage is unavailable in this browser for this page — see the notice above. Try opening the site through a local server instead.';
    errorEl.classList.remove('hidden');
  }

  if (slCurrentUser()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const form = document.getElementById('register-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorEl.classList.add('hidden');

    if (!SL_STORAGE_OK) {
      showError('Local storage is unavailable in this browser for this page. Please open the site through a local server and try again.');
      return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (password.length < 6) {
      return showError('Password must be at least 6 characters.');
    }
    if (password !== confirm) {
      return showError('Passwords do not match.');
    }

    const users = slGet(DB.USERS, []);
    if (users.some(u => u.email.toLowerCase() === email)) {
      return showError('An account with that email already exists. Try logging in instead.');
    }

    const newUser = {
      id: slId('usr'),
      name, email, phone, address, password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    slSet(DB.USERS, users);

    slNotify(newUser.id, 'Welcome to SafeLife Insurance! Your account was created successfully.', 'success');

    try {
      localStorage.setItem(DB.CURRENT_USER, newUser.id);
    } catch (e) {
      return showError('Could not save your session in this browser. Please try a different browser or open the site through a local server.');
    }
    slToast('Account created — welcome, ' + name.split(' ')[0] + '!', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 500);

    function showError(msg) {
      errorEl.textContent = msg;
      errorEl.classList.remove('hidden');
    }
  });
});
