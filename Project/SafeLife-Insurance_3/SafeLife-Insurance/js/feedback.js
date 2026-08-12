document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const grid = document.getElementById('feedback-grid');

  /* ---- submission widget (dashboard.html) ---- */
  if (form) {
    const starsWrap = document.getElementById('feedback-stars');
    const ratingInput = document.getElementById('feedback-rating');
    let rating = 5;

    function drawStars() {
      starsWrap.innerHTML = [1, 2, 3, 4, 5].map(n => `
        <button type="button" data-star="${n}" class="${n <= rating ? 'text-[var(--gold)]' : 'text-gray-300'}">★</button>
      `).join('');
    }
    starsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-star]');
      if (!btn) return;
      rating = Number(btn.dataset.star);
      ratingInput.value = rating;
      drawStars();
    });
    drawStars();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = slCurrentUser();
      if (!user) return;
      const list = slGet(DB.FEEDBACK, []);
      list.unshift({
        id: slId('fb'),
        userId: user.id,
        name: user.name,
        rating,
        message: document.getElementById('feedback-message').value.trim(),
        date: new Date().toISOString(),
      });
      slSet(DB.FEEDBACK, list);
      form.reset();
      rating = 5;
      ratingInput.value = 5;
      drawStars();
      slToast('Thanks for your feedback!', 'success');
    });
  }

  /* ---- admin gallery (feedback.html) ---- */
  if (grid) {
    slRequireAdmin();
    slInitLayout('feedback.html');

    const list = slGet(DB.FEEDBACK, []).sort((a, b) => new Date(b.date) - new Date(a.date));
    const avgEl = document.getElementById('feedback-avg');
    if (list.length > 0) {
      const avg = list.reduce((s, f) => s + f.rating, 0) / list.length;
      avgEl.textContent = avg.toFixed(1) + ' ★';
    } else {
      avgEl.textContent = '—';
    }

    grid.innerHTML = list.length === 0
      ? `<div class="col-span-full empty-state">No feedback submitted yet.</div>`
      : list.map(f => `
        <div class="policy-card p-6">
          <div class="flex justify-between items-start">
            <p class="font-medium">${slEscape(f.name)}</p>
            <p class="text-[var(--gold)] text-sm">${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</p>
          </div>
          <p class="text-sm text-gray-500 mt-3">${slEscape(f.message)}</p>
          <p class="font-mono text-[11px] text-gray-400 mt-4">${slFormatDate(f.date)}</p>
        </div>
      `).join('');
  }
});
