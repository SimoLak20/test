import { useNavigate } from 'react-router-dom';
import React from 'react';

const GOLD = '#C9A84C';
const GOLD_LIGHT = 'rgba(201,168,76,0.08)';
const GOLD_DIM = 'rgba(201,168,76,0.4)';

// ─── Geometric SVG icons (no emoji) ────────────────────────────────────────
const IconGrad = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" strokeLinecap="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>
);
const IconProf = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconRoom = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD_DIM} strokeWidth="1.5" strokeLinecap="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconCal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconRes = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconBell = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconLogout = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconDash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconReport = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

// ─── Corner bracket component ───────────────────────────────────────────────
const Brackets = ({ size = 16, color = GOLD_DIM }: { size?: number; color?: string }) => (
  <>
    {[
      { top: 0, left: 0, bTop: true, bLeft: true },
      { top: 0, right: 0, bTop: true, bRight: true },
      { bottom: 0, left: 0, bBot: true, bLeft: true },
      { bottom: 0, right: 0, bBot: true, bRight: true },
    ].map((c, i) => (
      <div key={i} style={{
        position: 'absolute',
        top: c.top, bottom: c.bottom, left: c.left, right: c.right,
        width: size, height: size,
        borderTop: c.bTop ? `1px solid ${color}` : 'none',
        borderBottom: c.bBot ? `1px solid ${color}` : 'none',
        borderLeft: c.bLeft ? `1px solid ${color}` : 'none',
        borderRight: c.bRight ? `1px solid ${color}` : 'none',
        pointerEvents: 'none',
      }} />
    ))}
  </>
);

const Dashboard = () => {
  const session = JSON.parse(localStorage.getItem('profile') || '{}');
  const user = session.user;
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const stats = [
    { label: 'Étudiants inscrits', value: '348', delta: '+12 ce mois', Icon: IconGrad },
    { label: 'Professeurs actifs', value: '24', delta: '3 en attente', Icon: IconProf },
    { label: 'Salles disponibles', value: '18', delta: '2 libres aujourd\'hui', Icon: IconRoom },
    { label: 'Cours actifs', value: '62', delta: 'ce semestre', Icon: IconBook },
  ];

  const features = {
    Administrateur: [
      { title: 'AI Timetable', desc: "Génération automatique des emplois du temps sans conflits d'horaires.", Icon: IconCal, link: '/timetable-gen', tag: 'Intelligence Artificielle' },
      { title: 'Utilisateurs', desc: 'Gérer les comptes Professeurs, Étudiants et les inscriptions.', Icon: IconUsers, link: '/users', tag: 'Gestion des accès' },
      { title: 'Salles & Groupes', desc: "Configuration des salles, matières et ressources de l'école.", Icon: IconRes, link: '/resources', tag: 'Ressources' },
    ],
  };

  const currentFeatures = features[user?.role as keyof typeof features] || [];

  const navItems = [
    { Icon: IconDash, label: 'Tableau de bord', active: true },
    { Icon: IconSettings, label: 'Configuration', active: false },
    { Icon: IconReport, label: 'Rapports', active: false },
    { Icon: IconBell, label: 'Notifications', active: false, badge: '3' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      color: '#fff',
    }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 232,
        borderRight: '1px solid rgba(201,168,76,0.08)',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem',
        flexShrink: 0,
        position: 'relative',
      }}>
        {/* Diagonal texture */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.025, pointerEvents: 'none' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 80 - 200} y1="0" x2={i * 80 + 400} y2="800" stroke={GOLD} strokeWidth="1" />
          ))}
        </svg>

        {/* Logo */}
        <div style={{ marginBottom: 36, paddingLeft: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ padding: 2, background: `linear-gradient(135deg, ${GOLD}, #6B4C00)`, borderRadius: 9 }}>
              <img src="/images.png" alt="logo"
                style={{ width: 36, height: 36, borderRadius: 7, objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>High Tech</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', lineHeight: 1 }}>Smart Platform</p>
            </div>
          </div>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${GOLD_DIM}, transparent)` }} />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          <p style={{
            fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: 10, paddingLeft: 10,
          }}>Navigation</p>

          {navItems.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px',
              borderRadius: 8, marginBottom: 2, cursor: 'pointer',
              background: item.active ? GOLD_LIGHT : 'transparent',
              border: item.active ? `1px solid ${GOLD_DIM}` : '1px solid transparent',
              color: item.active ? GOLD : 'rgba(255,255,255,0.3)',
              fontSize: 12.5, fontWeight: item.active ? 600 : 400,
              transition: 'all 0.15s',
            }}>
              <item.Icon />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: 9, fontWeight: 700, color: GOLD,
                  background: GOLD_LIGHT, border: `1px solid ${GOLD_DIM}`,
                  padding: '2px 6px', borderRadius: 20,
                }}>{item.badge}</span>
              )}
            </div>
          ))}
        </nav>

        {/* User card */}
        <div style={{
          marginTop: 24, padding: '12px 14px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
          position: 'relative',
        }}>
          <Brackets size={10} color="rgba(201,168,76,0.2)" />
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: GOLD_LIGHT, border: `1px solid ${GOLD_DIM}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: GOLD, flexShrink: 0,
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Administrateur'}
            </p>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{user?.role}</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(8,8,8,0.95)',
          backdropFilter: 'blur(12px)',
          padding: '0 2.5rem',
          height: 58,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 50, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>Système opérationnel</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative', color: 'rgba(255,255,255,0.4)',
            }}>
              <IconBell />
              <div style={{
                position: 'absolute', top: 7, right: 7,
                width: 6, height: 6, borderRadius: '50%',
                background: GOLD, border: '1.5px solid #080808',
              }} />
            </div>

            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.06)' }} />

            <button
              onClick={() => { localStorage.clear(); navigate('/'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px',
                background: 'rgba(220,38,38,0.06)',
                border: '1px solid rgba(220,38,38,0.18)',
                borderRadius: 7, color: '#f87171',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              <IconLogout />
              Déconnexion
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: '2.5rem 3rem', flex: 1, overflowY: 'auto' }}>

          {/* Greeting */}
          <div style={{ marginBottom: 40 }}>
            {/* Gold rule */}
            <div style={{
              display: 'inline-block',
              background: `linear-gradient(90deg, ${GOLD}, transparent)`,
              height: 1, width: 40, marginBottom: 20,
            }} />
            <p style={{
              fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10,
            }}>{dateStr}</p>
            <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', color: '#fff', marginBottom: 6 }}>
              {greeting},{' '}
              <span style={{ color: GOLD }}>{user?.name || 'Administrateur'}</span>
            </h1>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
              Bienvenue sur votre espace de gestion intelligente.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 12, marginBottom: 44,
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12, padding: '20px 22px',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)`,
                }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: GOLD_LIGHT, border: `1px solid ${GOLD_DIM}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <s.Icon />
                  </div>
                  <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.2)', fontWeight: 500 }}>{s.delta}</span>
                </div>
                <p style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 2, height: 14, background: GOLD, borderRadius: 2 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Modules de gestion
            </span>
          </div>

          {/* Module cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
            {currentFeatures.map((f, i) => (
              <ModuleCard key={i} feature={f} onClick={() => navigate(f.link)} />
            ))}
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
};

const ModuleCard = ({ feature, onClick }: { feature: any; onClick: () => void }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 26px',
        background: hovered ? '#0e0e0e' : '#0a0a0a',
        border: `1px solid ${hovered ? GOLD_DIM : 'rgba(255,255,255,0.05)'}`,
        borderRadius: 14, cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Corner brackets on hover */}
      {hovered && <Brackets size={14} color="rgba(201,168,76,0.35)" />}

      {/* Top shine */}
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: 42, height: 42,
        background: hovered ? GOLD_LIGHT : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? GOLD_DIM : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 22, transition: 'all 0.2s',
        color: hovered ? GOLD : 'rgba(255,255,255,0.4)',
      }}>
        <feature.Icon />
      </div>

      {/* Tag */}
      <p style={{
        fontSize: 9.5, fontWeight: 700,
        color: hovered ? GOLD : 'rgba(255,255,255,0.2)',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        marginBottom: 8, transition: 'color 0.2s',
      }}>
        {feature.tag}
      </p>

      {/* Title */}
      <h3 style={{
        fontSize: 16, fontWeight: 700,
        color: hovered ? '#fff' : 'rgba(255,255,255,0.8)',
        letterSpacing: '-0.01em', marginBottom: 8, transition: 'color 0.2s',
      }}>
        {feature.title}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.28)', lineHeight: 1.7, marginBottom: 22, fontWeight: 400 }}>
        {feature.desc}
      </p>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 10.5, fontWeight: 700,
        color: hovered ? GOLD : 'rgba(255,255,255,0.2)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        transition: 'color 0.2s',
      }}>
        Accéder au module
        <span style={{ display: 'inline-block', transform: hovered ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }}>
          →
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
