document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const adminTable = document.getElementById('messages-table-body');

  /* ---- public contact form (contact.html) ---- */
  if (contactForm) {
    slInitLayout('contact.html');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = {
        id: slId('msg'),
        name: document.getElementById('c-name').value.trim(),
        email: document.getElementById('c-email').value.trim(),
        subject: document.getElementById('c-subject').value.trim(),
        message: document.getElementById('c-message').value.trim(),
        date: new Date().toISOString(),
        replied: false,
      };
      const list = slGet(DB.MESSAGES, []);
      list.unshift(msg);
      slSet(DB.MESSAGES, list);
      contactForm.reset();
      slToast('Message sent — we will get back to you soon.', 'success');
    });
  }

  /* ---- admin inbox (messages.html) ---- */
  if (adminTable) {
    slRequireAdmin();
    slInitLayout('messages.html');
    renderMessages();

    adminTable.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const id = btn.dataset.id;
      const list = slGet(DB.MESSAGES, []);
      const idx = list.findIndex(m => m.id === id);
      if (idx === -1) return;

      if (btn.dataset.action === 'toggle') {
        list[idx].replied = !list[idx].replied;
        slSet(DB.MESSAGES, list);
        slToast(list[idx].replied ? 'Marked as replied.' : 'Marked as pending.', 'success');
      } else if (btn.dataset.action === 'delete') {
        if (!confirm('Delete this message permanently?')) return;
        list.splice(idx, 1);
        slSet(DB.MESSAGES, list);
        slToast('Message deleted.', 'success');
      }
      renderMessages();
    });
  }

  function renderMessages() {
    const list = slGet(DB.MESSAGES, []);
    const countEl = document.getElementById('messages-count');
    if (countEl) countEl.textContent = list.length;

    if (list.length === 0) {
      adminTable.innerHTML = `<tr><td colspan="6"><div class="empty-state">No messages yet. Submissions from the Contact page will appear here.</div></td></tr>`;
      return;
    }

    adminTable.innerHTML = list.map(m => `
      <tr class="border-b border-[var(--hairline)] align-top">
        <td class="py-3 pr-4">
          <p class="font-medium">${slEscape(m.name)}</p>
          <p class="text-xs text-gray-400">${slEscape(m.email)}</p>
        </td>
        <td class="py-3 pr-4 max-w-[220px]"><p class="font-medium">${slEscape(m.subject)}</p></td>
        <td class="py-3 pr-4 max-w-[320px] text-gray-600">${slEscape(m.message)}</td>
        <td class="py-3 pr-4 font-mono text-xs text-gray-400 whitespace-nowrap">${slFormatDate(m.date)}</td>
        <td class="py-3 pr-4"><span class="seal ${m.replied ? 'seal-approved' : 'seal-pending'}">${m.replied ? 'Replied' : 'Pending'}</span></td>
        <td class="py-3 pr-2 whitespace-nowrap">
          <button data-action="toggle" data-id="${m.id}" class="text-xs font-semibold text-[var(--teal)] hover:underline mr-3">${m.replied ? 'Mark pending' : 'Mark replied'}</button>
          <button data-action="delete" data-id="${m.id}" class="text-xs font-semibold text-red-500 hover:underline">Delete</button>
        </td>
      </tr>
    `).join('');
  }
});
