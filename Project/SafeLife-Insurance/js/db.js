/**
 * SafeLife Insurance - Core Data Store & UI Utilities
 * Database Engine using LocalStorage
 */

const DB_KEYS = {
  USERS: 'safelife_users',
  SESSION: 'safelife_current_user',
  POLICIES: 'safelife_policies',
  USER_POLICIES: 'safelife_user_policies',
  CLAIMS: 'safelife_claims',
  FEEDBACK: 'safelife_feedback',
  MESSAGES: 'safelife_messages',
  NOTIFICATIONS: 'safelife_notifications'
};

// Initial Seed Data
const INITIAL_DATA = {
  USERS: [
    {
      id: 'usr_admin_1',
      name: 'Eleanor Vance (Admin)',
      email: 'admin@safelife.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1 (555) 019-2834',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      joinedDate: '2024-01-10'
    },
    {
      id: 'usr_demo_1',
      name: 'Alexander Wright',
      email: 'user@safelife.com',
      password: 'password123',
      role: 'user',
      phone: '+1 (555) 392-8172',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      joinedDate: '2024-03-15'
    },
    {
      id: 'usr_demo_2',
      name: 'Sophia Martinez',
      email: 'sophia@example.com',
      password: 'password123',
      role: 'user',
      phone: '+1 (555) 782-9011',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      joinedDate: '2024-05-20'
    }
  ],

  POLICIES: [
    {
      id: 'pol_1',
      title: 'Ultimate Health Shield Plus',
      category: 'Health',
      coverageAmount: 500000,
      monthlyPremium: 149,
      termYears: 1,
      description: 'Comprehensive cash-less hospitalization, critical illness coverage, and free annual wellness checkups.',
      badge: 'Popular',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      features: ['Cashless Hospitalization in 5,000+ centers', 'Critical Illness Cover up to $250,000', 'Zero Deductible Options', 'Free Teleconsultations 24/7']
    },
    {
      id: 'pol_2',
      title: 'Evergreen Term Life Secure',
      category: 'Life',
      coverageAmount: 1000000,
      monthlyPremium: 89,
      termYears: 20,
      description: 'High-value financial defense for your family with fixed premiums and accidental disability add-ons.',
      badge: 'Best Value',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
      features: ['Guaranteed Death Benefit', 'Terminal Illness Early Payout', 'Tax Savings Eligibility', 'Flexible Premium Payments']
    },
    {
      id: 'pol_3',
      title: 'Total Auto Guard Deluxe',
      category: 'Vehicle',
      coverageAmount: 75000,
      monthlyPremium: 75,
      termYears: 1,
      description: 'Complete zero-depreciation cover for your automobile including roadside emergency & rental car assistance.',
      badge: 'Trending',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80',
      features: ['24/7 Towing & Roadside Repair', 'Zero Depreciation Protection', 'Personal Accident Insurance for Driver', 'Third Party Liability Shield']
    },
    {
      id: 'pol_4',
      title: 'Haven Home & Property Protection',
      category: 'Home',
      coverageAmount: 350000,
      monthlyPremium: 65,
      termYears: 5,
      description: 'Safeguard your sanctuary against fire, natural catastrophes, burglary, and structural damages.',
      badge: 'Essential',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80',
      features: ['Building Structure & Contents Coverage', 'Natural Disaster Protection', 'Alternative Accommodation Support', 'Electronic Appliances Warranty']
    },
    {
      id: 'pol_5',
      title: 'Global Voyager Travel Insurance',
      category: 'Travel',
      coverageAmount: 100000,
      monthlyPremium: 29,
      termYears: 1,
      description: 'Stress-free international journeys with medical emergency coverage, trip cancellation refund, and lost baggage compensation.',
      badge: 'Flexible',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
      features: ['Worldwide Emergency Medical Support', 'Flight Delay & Cancellation Compensation', 'Baggage Loss Reimbursement', 'Passport Replacement Cover']
    }
  ],

  USER_POLICIES: [
    {
      id: 'up_101',
      userId: 'usr_demo_1',
      userName: 'Alexander Wright',
      userEmail: 'user@safelife.com',
      policyId: 'pol_1',
      policyTitle: 'Ultimate Health Shield Plus',
      category: 'Health',
      coverageAmount: 500000,
      monthlyPremium: 149,
      startDate: '2024-04-01',
      endDate: '2025-04-01',
      status: 'Approved',
      nominee: 'Sarah Wright (Wife)',
      appliedDate: '2024-03-28'
    },
    {
      id: 'up_102',
      userId: 'usr_demo_1',
      userName: 'Alexander Wright',
      userEmail: 'user@safelife.com',
      policyId: 'pol_3',
      policyTitle: 'Total Auto Guard Deluxe',
      category: 'Vehicle',
      coverageAmount: 75000,
      monthlyPremium: 75,
      startDate: '2024-06-10',
      endDate: '2025-06-10',
      status: 'Approved',
      nominee: 'Alexander Wright',
      appliedDate: '2024-06-05'
    },
    {
      id: 'up_103',
      userId: 'usr_demo_2',
      userName: 'Sophia Martinez',
      userEmail: 'sophia@example.com',
      policyId: 'pol_2',
      policyTitle: 'Evergreen Term Life Secure',
      category: 'Life',
      coverageAmount: 1000000,
      monthlyPremium: 89,
      startDate: '2024-05-25',
      endDate: '2044-05-25',
      status: 'Pending',
      nominee: 'Carlos Martinez (Brother)',
      appliedDate: '2024-05-25'
    }
  ],

  CLAIMS: [
    {
      id: 'clm_501',
      userId: 'usr_demo_1',
      userName: 'Alexander Wright',
      userEmail: 'user@safelife.com',
      userPolicyId: 'up_101',
      policyTitle: 'Ultimate Health Shield Plus',
      claimAmount: 4200,
      reason: 'Emergency Appendectomy Surgery at City General Hospital',
      dateSubmitted: '2024-07-12',
      status: 'Approved',
      approvedAmount: 4200,
      adminNotes: 'All medical vouchers verified. Claim approved in full.',
      documentUrl: 'medical_report_appendectomy.pdf'
    },
    {
      id: 'clm_502',
      userId: 'usr_demo_1',
      userName: 'Alexander Wright',
      userEmail: 'user@safelife.com',
      userPolicyId: 'up_102',
      policyTitle: 'Total Auto Guard Deluxe',
      claimAmount: 1850,
      reason: 'Fender damage repair following minor parking lot collision',
      dateSubmitted: '2024-08-02',
      status: 'Pending',
      approvedAmount: 0,
      adminNotes: 'Inspection photos requested from garage.',
      documentUrl: 'car_repair_estimate.pdf'
    }
  ],

  FEEDBACK: [
    {
      id: 'fb_1',
      userId: 'usr_demo_1',
      userName: 'Alexander Wright',
      rating: 5,
      comment: 'SafeLife processed my medical claim in under 48 hours! The customer support team guided me seamlessly through every step.',
      date: '2024-07-15',
      featured: true
    },
    {
      id: 'fb_2',
      userId: 'usr_demo_2',
      userName: 'Sophia Martinez',
      rating: 5,
      comment: 'Extremely transparent policies and transparent pricing. The user dashboard makes tracking my renewals effortlessly simple.',
      date: '2024-06-01',
      featured: true
    }
  ],

  MESSAGES: [
    {
      id: 'msg_901',
      name: 'David Miller',
      email: 'david.m@outlook.com',
      subject: 'Inquiry regarding Commercial Business Policy',
      message: 'Hello, I represent a mid-sized IT company. Do you offer customized group health covers for 50+ employees?',
      date: '2024-08-01',
      status: 'Unread'
    },
    {
      id: 'msg_902',
      name: 'Jessica Alba',
      email: 'jessica@techcorp.io',
      subject: 'Policy Transfer Assistance',
      message: 'Can I transfer my auto insurance from my previous insurer to SafeLife without losing my No Claim Bonus discount?',
      date: '2024-08-04',
      status: 'Read'
    }
  ],

  NOTIFICATIONS: [
    {
      id: 'ntf_1',
      userId: 'usr_demo_1',
      title: 'Claim Approved!',
      message: 'Your health claim #clm_501 for $4,200 has been approved and transferred to your bank.',
      date: '2024-07-14',
      read: false,
      type: 'success'
    },
    {
      id: 'ntf_2',
      userId: 'usr_demo_1',
      title: 'Policy Renewal Reminder',
      message: 'Your Ultimate Health Shield Plus policy is active. Next payment due on 2024-09-01.',
      date: '2024-08-01',
      read: true,
      type: 'info'
    }
  ]
};

// Initialize LocalStorage Data Store
function initDB() {
  for (const [key, value] of Object.entries(DB_KEYS)) {
    if (!localStorage.getItem(value)) {
      const seedKey = key;
      if (INITIAL_DATA[seedKey]) {
        localStorage.setItem(value, JSON.stringify(INITIAL_DATA[seedKey]));
      }
    }
  }
}

// Storage Operations
function getItem(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Session Engine
function getCurrentUser() {
  const data = localStorage.getItem(DB_KEYS.SESSION);
  return data ? JSON.parse(data) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(DB_KEYS.SESSION);
  }
}

function logout() {
  localStorage.removeItem(DB_KEYS.SESSION);
  window.location.href = 'login.html';
}

// Auth Route Guards
function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = 'adminlogin.html';
    return null;
  }
  return user;
}

// Toast Alert System
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-slide-in pointer-events-auto p-4 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium transition-all transform ${
    type === 'success' ? 'bg-emerald-600 text-white' :
    type === 'error' ? 'bg-rose-600 text-white' :
    type === 'warning' ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
  }`;

  const iconClass = type === 'success' ? 'fa-circle-check' :
                    type === 'error' ? 'fa-triangle-exclamation' :
                    type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-lg"></i>
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="opacity-70 hover:opacity-100 transition-opacity">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Helper to push Notifications
function addNotification(userId, title, message, type = 'info') {
  const notifications = getItem(DB_KEYS.NOTIFICATIONS);
  const newNotif = {
    id: 'ntf_' + Date.now(),
    userId: userId,
    title: title,
    message: message,
    date: new Date().toISOString().split('T')[0],
    read: false,
    type: type
  };
  notifications.unshift(newNotif);
  setItem(DB_KEYS.NOTIFICATIONS, notifications);
}

// Auto-inject Navigation Bar
function renderNavbar() {
  const navContainer = document.getElementById('navbar-header');
  if (!navContainer) return;

  const user = getCurrentUser();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const userNotifications = user ? getItem(DB_KEYS.NOTIFICATIONS).filter(n => n.userId === user.id && !n.read) : [];
  const unreadBadge = userNotifications.length > 0 
    ? `<span class="bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">${userNotifications.length}</span>` 
    : '';

  const isUserLoggedIn = !!user;
  const isAdmin = user && user.role === 'admin';

  let navLinks = `
    <a href="index.html" class="${currentPage === 'index.html' ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-600'} transition-colors">Home</a>
    <a href="policies.html" class="${currentPage === 'policies.html' ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-600'} transition-colors">Policies</a>
    <a href="about.html" class="${currentPage === 'about.html' ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-600'} transition-colors">About Us</a>
    <a href="contact.html" class="${currentPage === 'contact.html' ? 'text-brand-600 font-semibold' : 'text-slate-600 hover:text-brand-600'} transition-colors">Contact</a>
  `;

  let authButtons = '';
  if (isUserLoggedIn) {
    if (isAdmin) {
      authButtons = `
        <a href="admin.html" class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all shadow-md">
          <i class="fa-solid fa-user-shield text-emerald-400"></i> Admin Panel
        </a>
        <a href="logout.html" class="p-2 text-slate-500 hover:text-rose-600 transition-colors" title="Logout">
          <i class="fa-solid fa-arrow-right-from-bracket text-lg"></i>
        </a>
      `;
    } else {
      authButtons = `
        <a href="notifications.html" class="relative p-2 text-slate-600 hover:text-brand-600 transition-colors" title="Notifications">
          <i class="fa-solid fa-bell text-lg"></i>
          ${unreadBadge ? `<span class="absolute top-1 right-1 flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span></span>` : ''}
        </a>
        <div class="relative group">
          <button class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-brand-500 transition-all bg-white shadow-sm">
            <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" class="w-8 h-8 rounded-full object-cover">
            <span class="text-sm font-semibold text-slate-700">${user.name.split(' ')[0]}</span>
            <i class="fa-solid fa-chevron-down text-xs text-slate-400"></i>
          </button>
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 hidden group-hover:block z-50 py-2">
            <div class="px-4 py-2 border-b border-slate-100">
              <p class="text-xs text-slate-400">Signed in as</p>
              <p class="text-sm font-bold text-slate-800 truncate">${user.email}</p>
            </div>
            <a href="dashboard.html" class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"><i class="fa-solid fa-chart-pie text-brand-500"></i> Dashboard</a>
            <a href="notifications.html" class="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <span><i class="fa-solid fa-bell text-amber-500 mr-2"></i> Notifications</span>
              ${unreadBadge}
            </a>
            <a href="settings.html" class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"><i class="fa-solid fa-gear text-slate-400"></i> Settings</a>
            <div class="border-t border-slate-100 my-1"></div>
            <a href="logout.html" class="flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
          </div>
        </div>
      `;
    }
  } else {
    authButtons = `
      <a href="login.html" class="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 transition-colors">Sign In</a>
      <a href="register.html" class="text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-500/20">Get Started</a>
    `;
  }

  navContainer.innerHTML = `
    <nav class="fixed top-0 left-0 right-0 z-40 glass-nav border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <a href="index.html" class="flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <i class="fa-solid fa-shield-heart text-xl"></i>
            </div>
            <div>
              <span class="text-xl font-black text-slate-900 tracking-tight">Safe<span class="text-brand-600">Life</span></span>
              <span class="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">Insurance Portal</span>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-8 font-medium">
            ${navLinks}
          </div>

          <div class="hidden md:flex items-center gap-4">
            ${authButtons}
          </div>

          <!-- Mobile Hamburger -->
          <div class="flex md:hidden items-center gap-2">
            <button id="mobile-menu-btn" class="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
              <i class="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div id="mobile-menu" class="hidden md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
        <div class="flex flex-col gap-2 font-medium">
          ${navLinks}
        </div>
        <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
          ${authButtons}
        </div>
      </div>
    </nav>
  `;

  // Hamburger Toggle Listener
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Auto-inject Footer
function renderFooter() {
  const footerContainer = document.getElementById('footer-section');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg">
                <i class="fa-solid fa-shield-heart text-xl"></i>
              </div>
              <span class="text-2xl font-black text-white tracking-tight">Safe<span class="text-brand-500">Life</span></span>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">
              Empowering families and businesses with instant, transparent, and comprehensive protection plans tailored for complete peace of mind.
            </p>
            <div class="flex gap-3 text-slate-400">
              <a href="#" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors"><i class="fa-brands fa-twitter"></i></a>
              <a href="#" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors"><i class="fa-brands fa-facebook"></i></a>
              <a href="#" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors"><i class="fa-brands fa-linkedin"></i></a>
              <a href="#" class="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-600 hover:text-white transition-colors"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h4 class="text-white font-bold text-base mb-4">Insurance Products</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="policies.html?cat=Health" class="hover:text-brand-400 transition-colors">Health Shield Plus</a></li>
              <li><a href="policies.html?cat=Life" class="hover:text-brand-400 transition-colors">Term Life Insurance</a></li>
              <li><a href="policies.html?cat=Vehicle" class="hover:text-brand-400 transition-colors">Auto Guard Deluxe</a></li>
              <li><a href="policies.html?cat=Home" class="hover:text-brand-400 transition-colors">Home & Property Care</a></li>
              <li><a href="policies.html?cat=Travel" class="hover:text-brand-400 transition-colors">Global Travel Cover</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold text-base mb-4">Quick Links</h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="about.html" class="hover:text-brand-400 transition-colors">About SafeLife</a></li>
              <li><a href="contact.html" class="hover:text-brand-400 transition-colors">Customer Support</a></li>
              <li><a href="dashboard.html" class="hover:text-brand-400 transition-colors">Customer Dashboard</a></li>
              <li><a href="adminlogin.html" class="hover:text-brand-400 transition-colors">Admin Portal</a></li>
              <li><a href="login.html" class="hover:text-brand-400 transition-colors">User Sign In</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold text-base mb-4">Contact & Support</h4>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot text-brand-500 mt-1"></i> <span>100 Financial Center Blvd, Suite 400, New York, NY 10005</span></li>
              <li class="flex items-center gap-3"><i class="fa-solid fa-phone text-brand-500"></i> <span>+1 (800) 555-SAFE</span></li>
              <li class="flex items-center gap-3"><i class="fa-solid fa-envelope text-brand-500"></i> <span>support@safelife.com</span></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© ${new Date().getFullYear()} SafeLife Insurance Group. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:underline">Privacy Policy</a>
            <a href="#" class="hover:underline">Terms of Service</a>
            <a href="#" class="hover:underline">Security Shield</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Auto Initialize DB and Render Header/Footer on script load
document.addEventListener('DOMContentLoaded', () => {
  initDB();
  renderNavbar();
  renderFooter();
});
