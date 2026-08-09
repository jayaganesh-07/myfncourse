/**
 * SafeLife Insurance - Feedback Manager (User Submission & Admin Review)
 */

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackList();
  setupFeedbackSubmission();
});

function renderFeedbackList() {
  const adminContainer = document.getElementById('admin-feedback-tbody');
  const userContainer = document.getElementById('homepage-testimonials');

  const feedbacks = getItem(DB_KEYS.FEEDBACK);

  // Admin View
  if (adminContainer) {
    if (feedbacks.length === 0) {
      adminContainer.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">No customer feedback submitted yet.</td></tr>`;
    } else {
      adminContainer.innerHTML = feedbacks.map(fb => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 text-sm">
          <td class="px-6 py-4 font-bold text-slate-900">${fb.userName}</td>
          <td class="px-6 py-4 text-amber-500 font-bold">
            ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)} (${fb.rating}/5)
          </td>
          <td class="px-6 py-4 text-slate-600 max-w-sm">${fb.comment}</td>
          <td class="px-6 py-4 text-xs text-slate-400">${fb.date}</td>
          <td class="px-6 py-4 text-right">
            <button onclick="toggleFeatureFeedback('${fb.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
              fb.featured ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
            } hover:opacity-80 transition-opacity">
              ${fb.featured ? 'Featured on Home' : 'Feature'}
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Home Page View
  if (userContainer) {
    const featuredFeedbacks = feedbacks.filter(f => f.featured);
    if (featuredFeedbacks.length === 0) return;

    userContainer.innerHTML = featuredFeedbacks.map(f => `
      <div class="glass-card p-8 rounded-3xl relative shadow-lg hover:shadow-xl transition-all">
        <div class="flex items-center gap-1 text-amber-400 mb-4 text-lg">
          ${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}
        </div>
        <p class="text-slate-600 leading-relaxed italic mb-6">"${f.comment}"</p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
            ${f.userName.charAt(0)}
          </div>
          <div>
            <h5 class="font-bold text-slate-900 text-sm">${f.userName}</h5>
            <span class="text-xs text-slate-400">Verified Policyholder</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function setupFeedbackSubmission() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = getCurrentUser();

    const rating = parseInt(document.getElementById('rating')?.value || '5');
    const comment = document.getElementById('comment').value.trim();
    const name = user ? user.name : (document.getElementById('feedback-name')?.value || 'Anonymous');

    const feedbacks = getItem(DB_KEYS.FEEDBACK);
    const newFb = {
      id: 'fb_' + Date.now(),
      userId: user ? user.id : 'anon',
      userName: name,
      rating: rating,
      comment: comment,
      date: new Date().toISOString().split('T')[0],
      featured: true
    };

    feedbacks.unshift(newFb);
    setItem(DB_KEYS.FEEDBACK, feedbacks);

    form.reset();
    showToast('Thank you! Your feedback has been submitted.', 'success');
    renderFeedbackList();
  });
}

window.toggleFeatureFeedback = function(feedbackId) {
  const feedbacks = getItem(DB_KEYS.FEEDBACK);
  const fb = feedbacks.find(f => f.id === feedbackId);
  if (!fb) return;

  fb.featured = !fb.featured;
  setItem(DB_KEYS.FEEDBACK, feedbacks);
  showToast(`Feedback feature status toggled.`, 'info');
  renderFeedbackList();
};
