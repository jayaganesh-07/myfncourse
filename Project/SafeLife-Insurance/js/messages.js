/**
 * SafeLife Insurance - Contact Messages & Admin Inbox Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  renderAdminMessages();
});

function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please complete all message fields.', 'error');
      return;
    }

    const messages = getItem(DB_KEYS.MESSAGES);
    const newMsg = {
      id: 'msg_' + Date.now(),
      name: name,
      email: email,
      subject: subject,
      message: message,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };

    messages.unshift(newMsg);
    setItem(DB_KEYS.MESSAGES, messages);

    contactForm.reset();
    showToast('Your message has been sent successfully! Our team will respond shortly.', 'success');
  });
}

function renderAdminMessages() {
  const tbody = document.getElementById('admin-messages-tbody');
  if (!tbody) return;

  const messages = getItem(DB_KEYS.MESSAGES);

  if (messages.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-400">No contact messages in inbox.</td></tr>`;
    return;
  }

  tbody.innerHTML = messages.map(msg => `
    <tr class="border-b border-slate-100 hover:bg-slate-50 text-sm ${msg.status === 'Unread' ? 'bg-brand-50/30 font-semibold' : ''}">
      <td class="px-6 py-4">
        <h5 class="font-bold text-slate-900">${msg.name}</h5>
        <span class="text-xs text-slate-400 font-normal">${msg.email}</span>
      </td>
      <td class="px-6 py-4 text-slate-800">${msg.subject}</td>
      <td class="px-6 py-4 text-xs text-slate-500 max-w-sm truncate">${msg.message}</td>
      <td class="px-6 py-4 text-xs text-slate-400">${msg.date}</td>
      <td class="px-6 py-4">
        <span class="px-2.5 py-1 text-xs font-bold rounded-full ${
          msg.status === 'Unread' ? 'bg-amber-100 text-amber-800' :
          msg.status === 'Replied' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
        }">${msg.status}</span>
      </td>
      <td class="px-6 py-4 text-right space-x-2">
        <button onclick="replyMessageModal('${msg.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition-colors">
          Reply
        </button>
        <button onclick="deleteMessage('${msg.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

window.replyMessageModal = function(msgId) {
  const messages = getItem(DB_KEYS.MESSAGES);
  const msg = messages.find(m => m.id === msgId);
  if (!msg) return;

  msg.status = 'Read';
  setItem(DB_KEYS.MESSAGES, messages);

  let modal = document.createElement('div');
  modal.id = 'reply-msg-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm';

  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-100">
      <button onclick="document.getElementById('reply-msg-modal').remove()" class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <h2 class="text-2xl font-black text-slate-900 mb-1">Reply to Inquiry</h2>
      <p class="text-sm text-slate-500 mb-4">Recipient: <strong class="text-slate-800">${msg.name}</strong> (${msg.email})</p>

      <div class="p-3 bg-slate-50 rounded-xl mb-4 text-xs text-slate-600 border border-slate-100">
        <strong>Subject:</strong> ${msg.subject}<br>
        <strong>Original Message:</strong> ${msg.message}
      </div>

      <form id="reply-form" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Response Message</label>
          <textarea id="reply-text" required rows="4" placeholder="Type your official response..." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none text-sm"></textarea>
        </div>

        <div class="pt-2 flex gap-3">
          <button type="button" onclick="document.getElementById('reply-msg-modal').remove()" class="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" class="flex-1 py-3 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all text-sm">
            Send Reply Email
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('reply-form').addEventListener('submit', (e) => {
    e.preventDefault();
    msg.status = 'Replied';
    setItem(DB_KEYS.MESSAGES, messages);

    modal.remove();
    showToast(`Reply dispatched to ${msg.email}!`, 'success');
    renderAdminMessages();
  });
};

window.deleteMessage = function(msgId) {
  let messages = getItem(DB_KEYS.MESSAGES);
  messages = messages.filter(m => m.id !== msgId);
  setItem(DB_KEYS.MESSAGES, messages);

  showToast('Contact message deleted.', 'info');
  renderAdminMessages();
};
