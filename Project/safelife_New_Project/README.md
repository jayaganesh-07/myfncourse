# SafeLife Insurance — Policy Management System

A complete front-end demo (HTML + Tailwind CSS + vanilla JavaScript) for an insurance
policy management platform, with a public site, a user dashboard, and an admin console.
All data lives in the browser's localStorage — no backend or build step required.

## How to run
Just open `index.html` in a browser. For best results (and to avoid any browser
restrictions on local scripts), serve the folder with a simple static server, e.g.:

    python3 -m http.server 8000

then visit http://localhost:8000

## Demo accounts
- **User login:** demo@safelife.com / demo123
- **Admin login:** admin / admin123 (via adminlogin.html)

You can also register a brand-new user from register.html — it's created in
localStorage immediately and you're logged straight into the dashboard.

## Pages
**Public / user side:** index.html, policies.html, about.html, contact.html,
login.html, register.html, dashboard.html, settings.html, notifications.html

**Admin side:** adminlogin.html, admin.html, users.html, reports.html,
approvepolicy.html, claimmanagement.html, feedback.html, messages.html, logout.html

## How data flows
- `assets/js/data.js` — the entire data layer: seeds demo data on first load,
  and provides login/register/session + CRUD helpers, all backed by localStorage.
- `assets/js/ui.js` — shared navbar, sidebar and toast rendering used across pages.
- Users register/apply for policies on the public+dashboard side → applications land
  in `approvepolicy.html` for the admin to approve/reject → status changes generate
  a notification the user sees on `notifications.html`.
- Claims filed from the user dashboard land in `claimmanagement.html` for the admin
  to approve/reject, same notification loop.
- Contact form submissions land in `messages.html`; feedback (seeded demo data)
  shows in `feedback.html`.

## Notes
- This is a front-end-only demo: passwords are stored in plain text in localStorage
  for demo purposes and this should **never** be done in a real product.
- Clearing your browser's site data resets everything back to the seeded demo state.
