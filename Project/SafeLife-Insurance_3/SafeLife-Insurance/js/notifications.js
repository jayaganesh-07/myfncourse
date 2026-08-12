document.addEventListener('DOMContentLoaded', () => {
  slRequireUser();
  slInitLayout('notifications.html');

  const user = slCurrentUser();
  if (!user) return;

  const listEl = document.getElementById('notif-list');

  function render() {
    const all = slGet(DB.NOTIFICATIONS, []).filter(n => n.userId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    if (all.length === 0) {
      listEl.innerHTML = `<div class="empty-state">You have no notifications yet. Updates about your policies and claims will show up here.</div>`;
      return;
    }
    listEl.innerHTML = all.map(n => `
      <div class="policy-card p-5 flex items-start gap-4 ${n.read ? 'opacity-60' : ''}">
        <span class="mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${n.read ? 'bg-gray-300' : 'bg-[var(--gold)]'}"></span>
        <div class="flex-1">
          <p class="text-sm">${slEscape(n.message)}</p>
          <p class="font-mono text-[11px] text-gray-400 mt-1">${slFormatDate(n.date)}</p>
        </div>
        ${!n.read ? `<button data-id="${n.id}" class="text-xs font-semibold text-[var(--teal)] hover:underline flex-shrink-0">Mark read</button>` : ''}
      </div>
    `).join('');
  }

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const list = slGet(DB.NOTIFICATIONS, []);
    const item = list.find(n => n.id === btn.dataset.id);
    if (item) item.read = true;
    slSet(DB.NOTIFICATIONS, list);
    render();
  });

  document.getElementById('mark-all-read').addEventListener('click', () => {
    const list = slGet(DB.NOTIFICATIONS, []);
    list.forEach(n => { if (n.userId === user.id) n.read = true; });
    slSet(DB.NOTIFICATIONS, list);
    render();
    slToast('All notifications marked as read.', 'success');
  });

  render();
});
