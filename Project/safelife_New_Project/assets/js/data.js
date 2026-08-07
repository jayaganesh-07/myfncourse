/* SafeLife Insurance — shared data layer (localStorage) */
const SL = (() => {
  const KEYS = {
    users:'sl_users', session:'sl_session', catalog:'sl_catalog',
    userPolicies:'sl_user_policies', claims:'sl_claims',
    notifications:'sl_notifications', messages:'sl_messages',
    feedback:'sl_feedback', admin:'sl_admin', seeded:'sl_seeded'
  };

  function uid(prefix){ return prefix + '-' + Math.random().toString(36).slice(2,8).toUpperCase(); }
  function get(key){ try{ return JSON.parse(localStorage.getItem(key)) ?? []; }catch(e){ return []; } }
  function set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
  function nowISO(){ return new Date().toISOString(); }
  function fmtDate(iso){ return new Date(iso).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}); }

  function seed(){
    if(localStorage.getItem(KEYS.seeded)) return;

    set(KEYS.admin, { username:'admin', password:'admin123', name:'Priya Nair' });

    set(KEYS.catalog, [
      {id:'PLN-HLT1', type:'Health', name:'CarePlus Health Shield', premium:4999, coverage:500000, term:'1 Year', desc:'Cashless hospitalization across 8,500+ network hospitals, pre & post-hospitalization cover, annual health check-up included.'},
      {id:'PLN-HLT2', type:'Health', name:'Family Wellness Cover', premium:8999, coverage:1000000, term:'1 Year', desc:'Floater cover for the whole family, maternity benefits, and no-claim bonus up to 50%.'},
      {id:'PLN-LIF1', type:'Life', name:'SecureLife Term Plan', premium:6499, coverage:5000000, term:'20 Years', desc:'Pure term protection with high cover at low premium, accidental death benefit rider available.'},
      {id:'PLN-LIF2', type:'Life', name:'FutureSure Endowment', premium:12999, coverage:2500000, term:'15 Years', desc:'Life cover plus guaranteed maturity benefit — protection that also builds savings.'},
      {id:'PLN-VEH1', type:'Vehicle', name:'RoadGuard Car Insurance', premium:3499, coverage:800000, term:'1 Year', desc:'Comprehensive own-damage and third-party cover, zero depreciation add-on, 24x7 roadside assistance.'},
      {id:'PLN-VEH2', type:'Vehicle', name:'TwoWheeler Shield', premium:1299, coverage:150000, term:'1 Year', desc:'Affordable comprehensive cover for two-wheelers with quick claim settlement.'},
      {id:'PLN-TRV1', type:'Travel', name:'GlobeTrotter Travel Cover', premium:1899, coverage:1000000, term:'Per Trip', desc:'Medical emergencies abroad, trip cancellation, lost baggage — covered across 190+ countries.'},
      {id:'PLN-TRV2', type:'Travel', name:'Domestic Journey Cover', premium:499, coverage:200000, term:'Per Trip', desc:'Budget-friendly protection for trips within India, covering delays and medical emergencies.'}
    ]);

    const demoUserId = uid('USR');
    set(KEYS.users, [
      { id:demoUserId, name:'Arjun Mehta', email:'demo@safelife.com', password:'demo123', phone:'+91 98765 43210', joined: nowISO(), status:'active' }
    ]);

    set(KEYS.userPolicies, [
      { id:uid('UPL'), userId:demoUserId, policyId:'PLN-HLT1', policyNumber:'SL-HLT-88231', status:'approved', appliedDate:nowISO() },
      { id:uid('UPL'), userId:demoUserId, policyId:'PLN-VEH1', policyNumber:'SL-VEH-40217', status:'pending', appliedDate:nowISO() }
    ]);

    set(KEYS.claims, [
      { id:uid('CLM'), userId:demoUserId, claimNumber:'CLM-2026-0091', policyName:'CarePlus Health Shield', type:'Hospitalization', amount:42000, status:'approved', date:nowISO(), description:'Emergency appendix surgery at Apollo Hospital.' }
    ]);

    set(KEYS.notifications, [
      { id:uid('NTF'), userId:demoUserId, title:'Policy Approved', message:'Your CarePlus Health Shield policy has been approved.', date:nowISO(), read:false },
      { id:uid('NTF'), userId:demoUserId, title:'Claim Settled', message:'Your claim CLM-2026-0091 has been approved for ₹42,000.', date:nowISO(), read:false }
    ]);

    set(KEYS.messages, [
      { id:uid('MSG'), name:'Sana Iyer', email:'sana@example.com', subject:'Question about maternity cover', message:'Does the Family Wellness Cover include maternity from day one?', date:nowISO(), status:'open' }
    ]);

    set(KEYS.feedback, [
      { id:uid('FBK'), userId:demoUserId, name:'Arjun Mehta', rating:5, comment:'Claim settlement was fast and the support team was very responsive.', date:nowISO() }
    ]);

    localStorage.setItem(KEYS.seeded, '1');
  }

  // ---- Session ----
  function login(email, password){
    const users = get(KEYS.users);
    const u = users.find(x=>x.email.toLowerCase()===email.toLowerCase() && x.password===password);
    if(!u) return { ok:false, error:'Invalid email or password.' };
    if(u.status==='blocked') return { ok:false, error:'This account has been blocked. Contact support.' };
    set(KEYS.session, { type:'user', id:u.id });
    return { ok:true, user:u };
  }
  function adminLogin(username, password){
    const a = get(KEYS.admin);
    if(a && a.username===username && a.password===password){
      set(KEYS.session, { type:'admin', id:'admin' });
      return { ok:true };
    }
    return { ok:false, error:'Invalid admin credentials.' };
  }
  function register(data){
    const users = get(KEYS.users);
    if(users.some(u=>u.email.toLowerCase()===data.email.toLowerCase())){
      return { ok:false, error:'An account with this email already exists.' };
    }
    const newUser = { id:uid('USR'), name:data.name, email:data.email, password:data.password, phone:data.phone, joined:nowISO(), status:'active' };
    users.push(newUser); set(KEYS.users, users);
    set(KEYS.session, { type:'user', id:newUser.id });
    return { ok:true, user:newUser };
  }
  function logout(){ localStorage.removeItem(KEYS.session); }
  function getSession(){ try{ return JSON.parse(localStorage.getItem(KEYS.session)); }catch(e){ return null; } }
  function currentUser(){
    const s = getSession();
    if(!s || s.type!=='user') return null;
    return get(KEYS.users).find(u=>u.id===s.id) || null;
  }
  function requireUser(){
    const u = currentUser();
    if(!u){ window.location.href = 'login.html'; return null; }
    return u;
  }
  function requireAdmin(){
    const s = getSession();
    if(!s || s.type!=='admin'){ window.location.href = 'adminlogin.html'; return false; }
    return true;
  }

  // ---- Generic CRUD helpers ----
  function all(key){ return get(KEYS[key]); }
  function save(key, arr){ set(KEYS[key], arr); }

  function addNotification(userId, title, message){
    const n = get(KEYS.notifications);
    n.unshift({ id:uid('NTF'), userId, title, message, date:nowISO(), read:false });
    set(KEYS.notifications, n);
  }

  return { KEYS, uid, get, set, nowISO, fmtDate, seed, login, adminLogin, register, logout,
    getSession, currentUser, requireUser, requireAdmin, all, save, addNotification };
})();

document.addEventListener('DOMContentLoaded', SL.seed);
