/**
 * SafeLife Insurance - Login Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const demoUserBtn = document.getElementById('demo-user-btn');
  const demoAdminBtn = document.getElementById('demo-admin-btn');

  // Fill Demo User Credentials
  if (demoUserBtn) {
    demoUserBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'user@safelife.com';
      document.getElementById('password').value = 'password123';
      showToast('Demo User credentials loaded!', 'info');
    });
  }

  // Fill Demo Admin Credentials
  if (demoAdminBtn) {
    demoAdminBtn.addEventListener('click', () => {
      document.getElementById('email').value = 'admin@safelife.com';
      document.getElementById('password').value = 'admin123';
      showToast('Demo Admin credentials loaded!', 'info');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      if (!email || !password) {
        showToast('Please enter both email and password', 'error');
        return;
      }

      const users = getItem(DB_KEYS.USERS);
      const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (!matchedUser) {
        showToast('Invalid email or password credentials', 'error');
        return;
      }

      if (matchedUser.status === 'Suspended') {
        showToast('Your account is currently suspended. Please contact support.', 'error');
        return;
      }

      // Save Session
      setCurrentUser(matchedUser);
      showToast(`Welcome back, ${matchedUser.name}! Redirecting...`, 'success');

      setTimeout(() => {
        if (matchedUser.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }, 1200);
    });
  }
});
