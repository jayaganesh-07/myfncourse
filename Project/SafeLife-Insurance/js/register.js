/**
 * SafeLife Insurance - User Registration Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const avatarUrl = document.getElementById('avatarUrl')?.value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';

      if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
      }

      const users = getItem(DB_KEYS.USERS);
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        showToast('An account with this email already exists!', 'warning');
        return;
      }

      const newUser = {
        id: 'usr_' + Date.now(),
        name: name,
        email: email,
        password: password,
        phone: phone || '+1 (555) 000-0000',
        role: 'user',
        avatar: avatarUrl,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0]
      };

      users.push(newUser);
      setItem(DB_KEYS.USERS, users);

      // Auto login user
      setCurrentUser(newUser);
      addNotification(newUser.id, 'Welcome to SafeLife!', 'Your account has been registered successfully. Explore our insurance policies to get protected today.', 'success');

      showToast('Registration successful! Redirecting to Dashboard...', 'success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }
});
