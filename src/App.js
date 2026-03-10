import { useState, useEffect } from "react";
import logo from "./assets/logo.png";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; }

  .ss-root {
    background: #0C0F1A;
    min-height: 100vh;
    color: #F1F5F9;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .ss-bg {
    position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
  }
  .ss-bg-orb {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18;
  }
  .ss-bg-orb-1 { width: 600px; height: 600px; background: #F97316; top: -200px; right: -100px; animation: drift1 12s ease-in-out infinite; }
  .ss-bg-orb-2 { width: 400px; height: 400px; background: #1D4ED8; bottom: -100px; left: -80px; animation: drift2 15s ease-in-out infinite; }
  .ss-bg-orb-3 { width: 300px; height: 300px; background: #F97316; top: 50%; left: 40%; opacity: 0.08; animation: drift3 18s ease-in-out infinite; }

  @keyframes drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px, 40px) scale(1.1); } }
  @keyframes drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px, -30px) scale(1.05); } }
  @keyframes drift3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px, 20px); } }

  .ss-nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(12,15,26,0.85); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(249,115,22,0.15);
    padding: 0 32px; height: 64px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .ss-logo {
    display: flex; align-items: center; gap: 10px;
  }
  .ss-logo-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #F97316, #EA580C);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; color: #fff; font-size: 16px;
    box-shadow: 0 0 20px rgba(249,115,22,0.5);
  }
  .ss-logo-text { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
  .ss-logo-tag { font-size: 10px; color: #F97316; font-weight: 500; letter-spacing: 0.05em; }

  .ss-nav-tabs {
    display: flex; gap: 4px;
    background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px;
  }
  .ss-tab {
    padding: 7px 18px; border: none; border-radius: 9px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    transition: all 0.25s ease;
  }
  .ss-tab-active { background: linear-gradient(135deg, #F97316, #EA580C); color: #fff; box-shadow: 0 4px 12px rgba(249,115,22,0.4); }
  .ss-tab-inactive { background: transparent; color: #94A3B8; }
  .ss-tab-inactive:hover { color: #F1F5F9; background: rgba(255,255,255,0.06); }

  .ss-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #1D4ED8, #3B82F6);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 13px; font-weight: 700;
    box-shadow: 0 0 12px rgba(59,130,246,0.4); cursor: pointer;
  }

  .ss-main { max-width: 960px; margin: 0 auto; padding: 32px 24px; position: relative; z-index: 1; }

  .ss-hero {
    text-align: center; padding: 40px 0 32px;
  }
  .ss-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(249,115,22,0.12); border: 1px solid rgba(249,115,22,0.3);
    padding: 5px 14px; border-radius: 20px; margin-bottom: 20px;
    font-size: 12px; color: #F97316; font-weight: 500; letter-spacing: 0.04em;
  }
  .ss-hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #F97316; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform: scale(1); } 50% { opacity:0.5; transform: scale(1.3); } }

  .ss-hero h1 {
    font-family: 'Sora', sans-serif; font-weight: 800;
    font-size: clamp(28px, 5vw, 44px); line-height: 1.1;
    margin-bottom: 14px;
  }
  .ss-hero h1 span { 
    background: linear-gradient(135deg, #F97316, #FBBF24);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .ss-hero p { font-size: 15px; color: #94A3B8; max-width: 420px; margin: 0 auto 28px; line-height: 1.6; }

  .ss-search-wrap {
    max-width: 520px; margin: 0 auto;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; padding: 8px; display: flex; gap: 8px;
    transition: border-color 0.3s; 
  }
  .ss-search-wrap:focus-within { border-color: rgba(249,115,22,0.5); box-shadow: 0 0 0 4px rgba(249,115,22,0.08); }
  .ss-search-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: #F1F5F9; font-size: 14px; padding: 8px 12px;
    font-family: 'DM Sans', sans-serif;
  }
  .ss-search-input::placeholder { color: #475569; }
  .ss-search-btn {
    padding: 10px 22px; background: linear-gradient(135deg, #F97316, #EA580C);
    border: none; border-radius: 10px; color: #fff; font-size: 13px;
    font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(249,115,22,0.35);
  }
  .ss-search-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(249,115,22,0.5); }

  .ss-stats {
    display: flex; gap: 10px; margin: 28px 0 24px; justify-content: center;
  }
  .ss-stat {
    flex: 1; max-width: 150px; padding: 16px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px; text-align: center;
    transition: border-color 0.3s, transform 0.3s;
  }
  .ss-stat:hover { border-color: rgba(249,115,22,0.3); transform: translateY(-2px); }
  .ss-stat-val { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; color: #F97316; }
  .ss-stat-label { font-size: 11px; color: #64748B; margin-top: 2px; }

  .ss-cats {
    display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;
  }
  .ss-cat {
    padding: 6px 16px; border-radius: 20px; border: 1px solid; cursor: pointer;
    font-size: 12px; font-weight: 500; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }

  .ss-gigs { display: flex; flex-direction: column; gap: 12px; }

  .ss-gig {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 20px 24px;
    display: flex; align-items: center; gap: 16px;
    transition: all 0.3s ease; cursor: default;
    animation: slideIn 0.4s ease backwards;
  }
  .ss-gig:hover { 
    background: rgba(249,115,22,0.06); 
    border-color: rgba(249,115,22,0.25); 
    transform: translateX(4px);
    box-shadow: 0 4px 24px rgba(249,115,22,0.08);
  }

  @keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .ss-gig-icon {
    width: 46px; height: 46px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .ss-gig-title { font-family: 'Sora', sans-serif; font-weight: 600; font-size: 14px; margin-bottom: 3px; color: #F1F5F9; }
  .ss-gig-meta { font-size: 12px; color: #64748B; margin-bottom: 8px; }
  .ss-gig-skills { display: flex; gap: 6px; flex-wrap: wrap; }
  .ss-skill-tag {
    font-size: 11px; padding: 3px 10px;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px; color: #94A3B8;
  }
  .ss-cat-badge {
    font-size: 11px; padding: 2px 10px; border-radius: 12px; font-weight: 600;
  }
  .ss-gig-pay { font-family: 'Sora', sans-serif; font-size: 18px; font-weight: 700; color: #F97316; }
  .ss-gig-deadline { font-size: 11px; color: #64748B; margin-bottom: 10px; }

  .ss-apply-btn {
    padding: 9px 20px; background: linear-gradient(135deg, #F97316, #EA580C);
    border: none; border-radius: 10px; color: #fff; font-size: 12px;
    font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.25s; white-space: nowrap;
    box-shadow: 0 4px 10px rgba(249,115,22,0.3);
  }
  .ss-apply-btn:hover { transform: scale(1.04); box-shadow: 0 6px 16px rgba(249,115,22,0.5); }

  .ss-modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; z-index: 200;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .ss-modal {
    background: #151829; border: 1px solid rgba(249,115,22,0.2);
    border-radius: 20px; padding: 28px; max-width: 420px; width: 90%;
    animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes popIn { from { opacity: 0; transform: scale(0.88) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .ss-modal-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 17px; margin-bottom: 4px; }
  .ss-modal-sub { font-size: 13px; color: #64748B; margin-bottom: 18px; }
  .ss-modal-info {
    background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.2);
    border-radius: 12px; padding: 14px; margin-bottom: 18px;
    display: flex; gap: 16px;
  }
  .ss-modal-info-item { font-size: 12px; color: #94A3B8; }
  .ss-modal-info-val { font-weight: 600; color: #F1F5F9; margin-top: 2px; }

  .ss-textarea {
    width: 100%; padding: 12px 14px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; color: #F1F5F9; font-size: 13px;
    outline: none; resize: none; margin-bottom: 16px;
    font-family: 'DM Sans', sans-serif; transition: border-color 0.3s;
  }
  .ss-textarea:focus { border-color: rgba(249,115,22,0.5); }
  .ss-textarea::placeholder { color: #374151; }

  .ss-modal-actions { display: flex; gap: 10px; }
  .ss-btn-cancel {
    flex: 1; padding: 11px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; color: #94A3B8; font-size: 13px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .ss-btn-cancel:hover { background: rgba(255,255,255,0.1); color: #F1F5F9; }
  .ss-btn-submit {
    flex: 2; padding: 11px; background: linear-gradient(135deg, #F97316, #EA580C);
    border: none; border-radius: 12px; color: #fff; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(249,115,22,0.35);
  }
  .ss-btn-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(249,115,22,0.5); }

  .ss-profile-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; overflow: hidden;
  }
  .ss-profile-banner {
    height: 100px; background: linear-gradient(135deg, rgba(249,115,22,0.3), rgba(29,78,216,0.3));
    position: relative;
  }
  .ss-profile-avatar {
    position: absolute; bottom: -30px; left: 24px;
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #1D4ED8, #3B82F6);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 22px; font-weight: 700;
    border: 3px solid #0C0F1A; box-shadow: 0 0 20px rgba(59,130,246,0.4);
  }
  .ss-profile-body { padding: 40px 24px 24px; }
  .ss-profile-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 18px; }
  .ss-profile-role { font-size: 13px; color: #64748B; margin-top: 2px; }
  .ss-available { font-size: 11px; color: #10B981; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
  .ss-avail-dot { width: 6px; height: 6px; border-radius: 50%; background: #10B981; box-shadow: 0 0 6px #10B981; }

  .ss-profile-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;
  }
  .ss-pstat {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px; padding: 14px; transition: all 0.3s;
  }
  .ss-pstat:hover { border-color: rgba(249,115,22,0.3); transform: translateY(-2px); }
  .ss-pstat-val { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700; color: #F97316; }
  .ss-pstat-label { font-size: 11px; color: #64748B; margin-top: 2px; }

  .ss-skills-title { font-family: 'Sora', sans-serif; font-weight: 600; font-size: 13px; margin-bottom: 10px; color: #94A3B8; letter-spacing: 0.06em; text-transform: uppercase; }
  .ss-skills { display: flex; gap: 8px; flex-wrap: wrap; }
  .ss-skill-verified {
    padding: 5px 14px; border-radius: 20px;
    background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.3);
    color: #F97316; font-size: 12px; font-weight: 600;
    display: flex; align-items: center; gap: 5px;
  }

  .ss-post-form {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 28px; max-width: 560px;
  }
  .ss-post-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 4px; }
  .ss-post-sub { font-size: 13px; color: #64748B; margin-bottom: 24px; }
  .ss-field { margin-bottom: 16px; }
  .ss-label { display: block; font-size: 12px; font-weight: 500; color: #94A3B8; margin-bottom: 6px; letter-spacing: 0.03em; text-transform: uppercase; }
  .ss-input {
    width: 100%; padding: 11px 14px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; color: #F1F5F9; font-size: 13px;
    outline: none; font-family: 'DM Sans', sans-serif; transition: border-color 0.3s;
  }
  .ss-input:focus { border-color: rgba(249,115,22,0.5); background: rgba(249,115,22,0.04); }
  .ss-input::placeholder { color: #334155; }
  .ss-select {
    width: 100%; padding: 11px 14px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; color: #F1F5F9; font-size: 13px;
    outline: none; font-family: 'DM Sans', sans-serif; cursor: pointer;
  }
  .ss-submit-btn {
    width: 100%; padding: 14px; margin-top: 8px;
    background: linear-gradient(135deg, #F97316, #EA580C);
    border: none; border-radius: 14px; color: #fff;
    font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.02em;
    box-shadow: 0 6px 20px rgba(249,115,22,0.4);
    transition: all 0.3s;
  }
  .ss-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(249,115,22,0.55); }

  .ss-success {
    text-align: center; padding: 40px 20px;
  }
  .ss-check { font-size: 48px; margin-bottom: 16px; animation: bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes bounceIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .ss-success-title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 18px; margin-bottom: 6px; }
  .ss-success-sub { color: #64748B; font-size: 13px; }
`;

const GIGS = [
  { id: 1, title: "Design Social Media Posts", company: "Kape ni Mang Jose", category: "Design", pay: "₱500", skills: ["Canva", "Photoshop"], deadline: "3 days", icon: "🎨", color: "#3B82F6" },
  { id: 2, title: "Fix WordPress Website Bug", company: "LagTech Solutions", category: "Tech", pay: "₱800", skills: ["HTML", "CSS", "WordPress"], deadline: "2 days", icon: "💻", color: "#8B5CF6" },
  { id: 3, title: "Write Product Descriptions", company: "CabuyaoMart", category: "Writing", pay: "₱300", skills: ["Copywriting", "SEO"], deadline: "5 days", icon: "✍️", color: "#10B981" },
  { id: 4, title: "Data Entry & Excel Reports", company: "Laguna Fabricators Inc.", category: "Admin", pay: "₱400", skills: ["Excel", "Google Sheets"], deadline: "4 days", icon: "📊", color: "#F59E0B" },
  { id: 5, title: "Setup Google My Business", company: "Rizal St. Bakery", category: "Marketing", pay: "₱600", skills: ["Google Ads", "SEO"], deadline: "1 day", icon: "📣", color: "#EF4444" },
  { id: 6, title: "Create Simple Inventory App", company: "Cabuyao Hardware", category: "Tech", pay: "₱1,200", skills: ["Python", "Google Sheets"], deadline: "7 days", icon: "🛠️", color: "#8B5CF6" },
];

const CATEGORIES = ["All", "Design", "Tech", "Writing", "Admin", "Marketing"];
const CAT_COLORS = { Design: "#3B82F6", Tech: "#8B5CF6", Writing: "#10B981", Admin: "#F59E0B", Marketing: "#EF4444" };

export default function SkillSyncMLP() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedGig, setSelectedGig] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const filtered = GIGS.filter((g) => {
    const matchCat = selectedCat === "All" || g.category === selectedCat;
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.company.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleApply = (gig) => { setSelectedGig(gig); setShowModal(true); setSubmitted(false); };

  return (
    <>
      <style>{style}</style>
      <div className="ss-root">
        <div className="ss-bg">
          <div className="ss-bg-orb ss-bg-orb-1" />
          <div className="ss-bg-orb ss-bg-orb-2" />
          <div className="ss-bg-orb ss-bg-orb-3" />
        </div>

        {/* Nav */}
        <nav className="ss-nav">
          <div className="ss-logo">
            <img src={logo} alt="Skill-Sync" style={{ height: 36, objectFit: "contain" }} />
            <div>
              <div className="ss-logo-text">Skill-Sync</div>
              <div className="ss-logo-tag">Connect. Complete. Grow.</div>
            </div>
          </div>
          <div className="ss-nav-tabs">
            {[["browse", "Browse"], ["profile", "Profile"], ["post", "Post Gig"]].map(([key, label]) => (
              <button key={key} className={`ss-tab ${activeTab === key ? "ss-tab-active" : "ss-tab-inactive"}`} onClick={() => setActiveTab(key)}>
                {label}
              </button>
            ))}
          </div>
          <div className="ss-avatar">BA</div>
        </nav>

        <main className="ss-main">

          {/* BROWSE TAB */}
          {activeTab === "browse" && (
            <>
              <div className="ss-hero">
                <div className="ss-hero-badge">
                  <span className="ss-hero-badge-dot" />
                  180+ students earning in Cabuyao
                </div>
                <h1>Connect. Complete.<span> Grow</span>.<br />Start growing today.</h1>
                <p>Hyper-local gigs matched to your skills. Build your portfolio while helping local businesses grow.</p>
                <div className="ss-search-wrap">
                  <input className="ss-search-input" placeholder="Search for gigs, companies, or skills..." value={search} onChange={(e) => setSearch(e.target.value)} />
                  <button className="ss-search-btn">Find Gigs →</button>
                </div>
              </div>

              <div className="ss-stats">
                {[["6", "Active Gigs"], ["42", "MSMEs"], ["180", "Students"], ["₱312K", "Total Earned"]].map(([val, label]) => (
                  <div key={label} className="ss-stat">
                    <div className="ss-stat-val">{val}</div>
                    <div className="ss-stat-label">{label}</div>
                  </div>
                ))}
              </div>

              <div className="ss-cats">
                {CATEGORIES.map((cat) => {
                  const color = cat === "All" ? "#F97316" : CAT_COLORS[cat];
                  const active = selectedCat === cat;
                  return (
                    <button key={cat} className="ss-cat" onClick={() => setSelectedCat(cat)}
                      style={{ borderColor: active ? color : "rgba(255,255,255,0.1)", color: active ? color : "#64748B", background: active ? `${color}15` : "transparent" }}>
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="ss-gigs">
                {filtered.map((gig, i) => (
                  <div key={gig.id} className="ss-gig" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ss-gig-icon" style={{ background: `${gig.color}18` }}>{gig.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span className="ss-gig-title">{gig.title}</span>
                        <span className="ss-cat-badge" style={{ background: `${CAT_COLORS[gig.category]}15`, color: CAT_COLORS[gig.category] }}>{gig.category}</span>
                      </div>
                      <div className="ss-gig-meta">{gig.company} &nbsp;·&nbsp; ⏱ Due in {gig.deadline}</div>
                      <div className="ss-gig-skills">
                        {gig.skills.map((s) => <span key={s} className="ss-skill-tag">{s}</span>)}
                      </div>
                    </div>
                    <div style={{ textAlign: "right", marginLeft: 16 }}>
                      <div className="ss-gig-pay">{gig.pay}</div>
                      <div className="ss-gig-deadline">per project</div>
                      <button className="ss-apply-btn" onClick={() => handleApply(gig)}>Apply Now →</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div style={{ maxWidth: 560, margin: "0 auto" }}>
              <div className="ss-profile-card">
                <div className="ss-profile-banner">
                  <div className="ss-profile-avatar">BA</div>
                </div>
                <div className="ss-profile-body">
                  <div className="ss-profile-name">Benedict Abania</div>
                  <div className="ss-profile-role">BS Computer Science · University of Cabuyao</div>
                  <div className="ss-available"><span className="ss-avail-dot" /> Available for gigs</div>
                  <div className="ss-profile-stats">
                    {[["7", "Gigs Done"], ["₱4,200", "Earned"], ["4.9★", "Rating"], ["82%", "Portfolio"]].map(([val, label]) => (
                      <div key={label} className="ss-pstat">
                        <div className="ss-pstat-val">{val}</div>
                        <div className="ss-pstat-label">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="ss-skills-title">Verified Skills</div>
                  <div className="ss-skills">
                    {["React", "Figma", "Canva", "Python", "Copywriting"].map((s) => (
                      <span key={s} className="ss-skill-verified">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POST TAB */}
          {activeTab === "post" && (
            <div style={{ maxWidth: 560, margin: "0 auto" }}>
              {postSuccess ? (
                <div className="ss-post-form">
                  <div className="ss-success">
                    <div className="ss-check">🎉</div>
                    <div className="ss-success-title">Gig Posted Successfully!</div>
                    <div className="ss-success-sub">We'll match you with the best students in Cabuyao shortly.</div>
                    <button className="ss-submit-btn" style={{ marginTop: 20, width: "auto", padding: "11px 28px" }} onClick={() => { setPostSuccess(false); setActiveTab("browse"); }}>
                      Browse Gigs →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ss-post-form">
                  <div className="ss-post-title">Post a Micro-Gig</div>
                  <div className="ss-post-sub">Connect instantly with pre-vetted student talent in Cabuyao</div>
                  {[["Gig Title", "e.g. Design our store banner"], ["Company Name", "Your business name"], ["Budget (₱)", "e.g. 500"]].map(([label, ph]) => (
                    <div key={label} className="ss-field">
                      <label className="ss-label">{label}</label>
                      <input className="ss-input" placeholder={ph} />
                    </div>
                  ))}
                  <div className="ss-field">
                    <label className="ss-label">Category</label>
                    <select className="ss-select">
                      {["Design", "Tech", "Writing", "Admin", "Marketing"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="ss-field">
                    <label className="ss-label">Description</label>
                    <textarea className="ss-textarea" rows={4} placeholder="What exactly do you need done?" style={{ marginBottom: 0 }} />
                  </div>
                  <button className="ss-submit-btn" onClick={() => setPostSuccess(true)}>
                    🚀 Post Gig & Find Talent
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Apply Modal */}
        {showModal && selectedGig && (
          <div className="ss-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="ss-modal" onClick={(e) => e.stopPropagation()}>
              {submitted ? (
                <div className="ss-success">
                  <div className="ss-check">🚀</div>
                  <div className="ss-success-title">Application Sent!</div>
                  <div className="ss-success-sub">You'll hear back from {selectedGig.company} soon. This goes straight to your portfolio!</div>
                  <button className="ss-submit-btn" style={{ marginTop: 20 }} onClick={() => setShowModal(false)}>Done</button>
                </div>
              ) : (
                <>
                  <div className="ss-modal-title">Apply to this Gig</div>
                  <div className="ss-modal-sub">{selectedGig.title} · {selectedGig.company}</div>
                  <div className="ss-modal-info">
                    <div className="ss-modal-info-item"><div>Pay</div><div className="ss-modal-info-val">{selectedGig.pay}</div></div>
                    <div className="ss-modal-info-item"><div>Deadline</div><div className="ss-modal-info-val">{selectedGig.deadline}</div></div>
                    <div className="ss-modal-info-item"><div>Category</div><div className="ss-modal-info-val">{selectedGig.category}</div></div>
                  </div>
                  <textarea className="ss-textarea" rows={3} placeholder="Tell them why you're the perfect fit..." />
                  <div className="ss-modal-actions">
                    <button className="ss-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="ss-btn-submit" onClick={() => setSubmitted(true)}>Send Application 🚀</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}