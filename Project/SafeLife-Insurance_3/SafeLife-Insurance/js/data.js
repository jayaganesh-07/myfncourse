/* ============================================================
   SafeLife Insurance — data.js
   Central localStorage schema, seed data and generic helpers.
   Every page includes this file before any page-specific script.
   ============================================================ */

const DB = {
  USERS: 'sl_users',
  CURRENT_USER: 'sl_currentUser',
  ADMIN: 'sl_admin',
  CURRENT_ADMIN: 'sl_currentAdmin',
  POLICIES: 'sl_policies',
  USER_POLICIES: 'sl_userPolicies',
  CLAIMS: 'sl_claims',
  NOTIFICATIONS: 'sl_notifications',
  FEEDBACK: 'sl_feedback',
  MESSAGES: 'sl_messages',
};

/* ---------- generic helpers ---------- */
function slGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : (fallback !== undefined ? fallback : null);
  } catch (e) {
    console.error('slGet error for', key, e);
    return fallback !== undefined ? fallback : null;
  }
}

function slSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('slSet error for', key, e);
    slShowStorageWarning();
    return false;
  }
}

function slId(prefix) {
  return prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function slFormatDate(d) {
  const date = d ? new Date(d) : new Date();
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function slFormatMoney(n) {
  const num = Number(n) || 0;
  return '₹' + num.toLocaleString('en-IN');
}

function slEscape(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* ---------- storage availability check ----------
   Some browsers (notably Safari) block localStorage when a page is
   opened directly via file:// instead of through a local server.
   We detect that up front and surface a clear banner instead of
   letting forms fail silently. */
const SL_STORAGE_OK = (function () {
  try {
    const testKey = '__sl_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
})();

function slShowStorageWarning() {
  if (SL_STORAGE_OK) return;
  if (document.getElementById('sl-storage-warning')) return;
  const banner = document.createElement('div');
  banner.id = 'sl-storage-warning';
  banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#B91C1C;color:#fff;padding:10px 16px;font:14px/1.5 sans-serif;text-align:center;';
  banner.innerHTML = 'This browser is blocking local storage on this page, so accounts, login and saved data won\'t work. Open this site through a local web server instead of double-clicking the file — e.g. run <code style="background:rgba(255,255,255,.15);padding:1px 5px;border-radius:4px;">python3 -m http.server</code> inside the project folder, then visit <code style="background:rgba(255,255,255,.15);padding:1px 5px;border-radius:4px;">http://localhost:8000</code> — or try a different browser.';
  document.body.prepend(banner);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', slShowStorageWarning);
} else {
  slShowStorageWarning();
}
function slToast(message, type) {
  let region = document.getElementById('toast-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'toast-region';
    document.body.appendChild(region);
  }
  const el = document.createElement('div');
  el.className = 'toast' + (type ? ' toast-' + type : '');
  el.textContent = message;
  region.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* ---------- seed data (runs once) ---------- */
function slSeed() {
  try {
    _slSeedInner();
  } catch (e) {
    console.error('slSeed error', e);
    slShowStorageWarning();
  }
}

function _slSeedInner() {
  const existingAdmin = slGet(DB.ADMIN, null);
  if (!existingAdmin || typeof existingAdmin !== 'object' || !existingAdmin.email || !existingAdmin.password) {
    slSet(DB.ADMIN, { email: 'admin@safelife.com', password: 'admin123', name: 'Site Administrator' });
  }

  const existingPolicies = slGet(DB.POLICIES, null);
  if (!Array.isArray(existingPolicies) || existingPolicies.length === 0) {
    slSet(DB.POLICIES, [
      {
        id: 'pol_term01',
        name: 'SafeLife Term Shield',
        category: 'Term Life',
        premium: 1499,
        premiumCycle: 'per year',
        coverage: 5000000,
        term: '20 years',
        description: 'Pure protection plan offering high life cover at an affordable premium — built for young earners securing their family\'s future.',
        image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'pol_whole02',
        name: 'SafeLife Whole Life Trust',
        category: 'Whole Life',
        premium: 3299,
        premiumCycle: 'per year',
        coverage: 3000000,
        term: 'Lifetime',
        description: 'Lifelong coverage combined with a maturity benefit — a policy that protects and builds a legacy at once.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'pol_child03',
        name: 'SafeLife Child Future Plan',
        category: 'Child Plan',
        premium: 1999,
        premiumCycle: 'per year',
        coverage: 1500000,
        term: '15 years',
        description: 'A dedicated savings-cum-protection plan that funds your child\'s education and big milestones.',
        image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'pol_health04',
        name: 'SafeLife Health Guard',
        category: 'Health Rider',
        premium: 999,
        premiumCycle: 'per year',
        coverage: 1000000,
        term: '1 year (renewable)',
        description: 'Critical-illness and hospitalisation cover that rides alongside any life policy for complete protection.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'pol_pension05',
        name: 'SafeLife Pension Horizon',
        category: 'Retirement',
        premium: 2599,
        premiumCycle: 'per year',
        coverage: 2500000,
        term: '25 years',
        description: 'A retirement-focused plan that converts steady savings into a guaranteed income for your later years.',
        image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'pol_women06',
        name: 'SafeLife Her Shield',
        category: 'Women Special',
        premium: 1299,
        premiumCycle: 'per year',
        coverage: 4000000,
        term: '20 years',
        description: 'A women-focused life plan with preferential premiums and maternity-linked critical illness cover.',
        image: 'https://images.unsplash.com/photo-1518183214770-9cffbec72538?q=80&w=800&auto=format&fit=crop',
      },
    ]);
  }

  ensureArray(DB.USERS);
  ensureArray(DB.USER_POLICIES);
  ensureArray(DB.CLAIMS);
  ensureArray(DB.NOTIFICATIONS);
  ensureArray(DB.FEEDBACK);
  ensureArray(DB.MESSAGES);
}

function ensureArray(key) {
  const val = slGet(key, null);
  if (!Array.isArray(val)) slSet(key, []);
}
slSeed();

/* ---------- notification helper ---------- */
function slNotify(userId, message, type) {
  const list = slGet(DB.NOTIFICATIONS, []);
  list.unshift({
    id: slId('ntf'),
    userId,
    message,
    type: type || 'info',
    date: new Date().toISOString(),
    read: false,
  });
  slSet(DB.NOTIFICATIONS, list);
}
