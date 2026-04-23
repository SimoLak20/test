import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GOLD = '#C9A84C';
const GOLD_LIGHT = 'rgba(201,168,76,0.08)';
const GOLD_DIM = 'rgba(201,168,76,0.4)';

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const IconBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconSearch = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconRoom = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconEdit = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconDelete = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const IconEmpty = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GOLD_DIM} strokeWidth="1.2" strokeLinecap="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
  </svg>
);
const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── Corner bracket component ────────────────────────────────────────────────
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

type Room = { id: number; name: string; capacity: number; type: string; floor: string };

const ResourceManager = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'profs' | 'subjects'>('rooms');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [rooms] = useState<Room[]>([
    { id: 1, name: 'Salle 101', capacity: 30, type: 'Cours magistral', floor: 'Rez-de-chaussée' },
    { id: 2, name: 'Salle 202', capacity: 45, type: 'Travaux dirigés', floor: '2ème étage' },
    { id: 3, name: 'Laboratoire Info', capacity: 25, type: 'Laboratoire', floor: '1er étage' },
    { id: 4, name: 'Amphithéâtre A', capacity: 120, type: 'Amphithéâtre', floor: 'Rez-de-chaussée' },
  ]);

  const tabs = [
    { key: 'rooms', label: 'Salles', count: rooms.length },
    { key: 'profs', label: 'Professeurs', count: 0 },
    { key: 'subjects', label: 'Matières', count: 0 },
  ] as const;

  const typeMap: Record<string, { color: string; bg: string; border: string }> = {
    'Cours magistral': { color: '#93c5fd', bg: 'rgba(59,130,246,0.07)', border: 'rgba(59,130,246,0.18)' },
    'Travaux dirigés': { color: '#6ee7b7', bg: 'rgba(16,185,129,0.07)', border: 'rgba(16,185,129,0.18)' },
    'Laboratoire':     { color: '#c4b5fd', bg: 'rgba(139,92,246,0.07)', border: 'rgba(139,92,246,0.18)' },
    'Amphithéâtre':   { color: GOLD,       bg: GOLD_LIGHT,              border: GOLD_DIM },
  };

  const filtered = rooms.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase()) ||
    r.floor.toLowerCase().includes(search.toLowerCase())
  );

  const addLabel = activeTab === 'rooms' ? 'Ajouter une salle'
    : activeTab === 'profs' ? 'Ajouter un professeur'
    : 'Ajouter une matière';

  const tableInputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 8, color: '#fff', fontSize: 13,
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background radial glow */}
      <div style={{
        position: 'fixed', top: '30%', right: '15%',
        width: 500, height: 400,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* ── Top bar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        height: 58,
        background: 'rgba(5,5,5,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,168,76,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
      }}>
        {/* Left: back + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.3)', fontSize: 12.5, fontWeight: 500,
              fontFamily: 'inherit', padding: 0,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            <IconBack />
            Tableau de bord
          </button>

          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.08)' }} />

          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>
            Gestion des Ressources
          </span>
        </div>

        {/* Right: add button */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 18px',
            background: `linear-gradient(135deg, ${GOLD}, #9A7020)`,
            border: 'none', borderRadius: 8,
            color: '#000', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <IconPlus />
          {addLabel}
        </button>
      </header>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '3rem 2.5rem' }}>

        {/* Page header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(90deg, ${GOLD}, transparent)`,
            height: 1, width: 36, marginBottom: 18,
          }} />
          <p style={{
            fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10,
          }}>
            Administration · Ressources
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Gestion des Ressources
          </h1>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 2,
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 10, padding: 4,
          width: 'fit-content',
          marginBottom: 28,
        }}>
          {tabs.map(tab => (
            <button key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSearch(''); }}
              style={{
                padding: '8px 20px',
                borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600,
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.15s',
                background: activeTab === tab.key ? `linear-gradient(135deg, ${GOLD}, #9A7020)` : 'transparent',
                color: activeTab === tab.key ? '#000' : 'rgba(255,255,255,0.3)',
              }}
            >
              {tab.label}
              <span style={{
                fontSize: 10, fontWeight: 700,
                padding: '1px 6px', borderRadius: 20,
                background: activeTab === tab.key ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.key ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.2)',
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table card */}
        <div style={{
          background: '#080808',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 14, overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Subtle top accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent, ${GOLD_DIM}, transparent)`,
          }} />

          {/* Toolbar */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
                <IconSearch />
              </span>
              <input
                type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Rechercher dans ${tabs.find(t => t.key === activeTab)?.label}...`}
                style={{
                  padding: '9px 14px 9px 34px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8, color: '#fff', fontSize: 12.5,
                  width: 280, outline: 'none', fontFamily: 'inherit',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = GOLD_DIM)}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              />
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)', fontWeight: 500 }}>
              {filtered.length} entrée{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1.4fr 0.8fr 130px',
            alignItems: 'center',
            padding: '0 24px',
            height: 40,
            background: 'rgba(255,255,255,0.015)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            {['Désignation', 'Capacité', 'Type', 'Emplacement', 'Actions'].map((col, i) => (
              <div key={i} style={{
                fontSize: 9.5, fontWeight: 700,
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                textAlign: i === 4 ? 'right' : 'left',
              }}>
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {activeTab === 'rooms' && filtered.length > 0 ? (
            filtered.map((room) => <RoomRow key={room.id} room={room} typeMap={typeMap} />)
          ) : (
            <div style={{
              padding: '70px 0', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: GOLD_LIGHT, border: `1px solid ${GOLD_DIM}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Brackets size={10} color="rgba(201,168,76,0.3)" />
                <IconEmpty />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.28)', marginBottom: 5 }}>
                  {search ? `Aucun résultat pour "${search}"` : 'Aucune entrée'}
                </p>
                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.13)' }}>
                  {search ? 'Essayez un autre terme.' : `Cliquez sur "${addLabel}" pour commencer.`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#0e0e0e',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '2.25rem',
              width: '100%', maxWidth: 420,
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner brackets */}
            <Brackets size={18} color={GOLD_DIM} />

            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 70, height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }} />

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute', top: 18, right: 18,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.35)',
              }}
            >
              <IconClose />
            </button>

            {/* Gold rule */}
            <div style={{
              display: 'inline-block',
              background: `linear-gradient(90deg, ${GOLD}, transparent)`,
              height: 1, width: 30, marginBottom: 16,
            }} />

            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.015em', marginBottom: 4 }}>
              {addLabel}
            </h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginBottom: 24 }}>
              Remplissez les informations ci-dessous
            </p>

            {['Nom / Désignation', 'Capacité (personnes)', 'Type de salle', 'Étage'].map((lbl, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{
                  display: 'block', fontSize: 9.5, fontWeight: 700,
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 7,
                }}>
                  {lbl}
                </label>
                <input
                  placeholder={`Entrez ${lbl.toLowerCase()}`}
                  style={tableInputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = GOLD_DIM)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                />
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1, padding: '11px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8, color: 'rgba(255,255,255,0.35)',
                  fontSize: 11.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  letterSpacing: '0.06em',
                }}
              >
                Annuler
              </button>
              <button style={{
                flex: 1, padding: '11px',
                background: `linear-gradient(135deg, ${GOLD}, #9A7020)`,
                border: 'none', borderRadius: 8, color: '#000',
                fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder { color: rgba(255,255,255,0.13) !important; }
      `}</style>
    </div>
  );
};

const RoomRow = ({ room, typeMap }: { room: Room; typeMap: any }) => {
  const [hovered, setHovered] = useState(false);
  const t = typeMap[room.type] || { color: 'rgba(255,255,255,0.35)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.09)' };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1.4fr 0.8fr 130px',
        alignItems: 'center',
        padding: '0 24px',
        height: 58,
        borderBottom: '1px solid rgba(255,255,255,0.035)',
        background: hovered ? 'rgba(255,255,255,0.015)' : 'transparent',
        transition: 'background 0.15s',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: hovered ? GOLD_LIGHT : 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? GOLD_DIM : 'rgba(255,255,255,0.05)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.15s',
          color: hovered ? GOLD : 'rgba(255,255,255,0.3)',
        }}>
          <IconRoom />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: hovered ? '#fff' : 'rgba(255,255,255,0.85)', transition: 'color 0.15s' }}>
          {room.name}
        </span>
      </div>

      {/* Capacity */}
      <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
        {room.capacity} <span style={{ fontSize: 10, opacity: 0.6 }}>pers.</span>
      </span>

      {/* Type badge */}
      <div>
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 600,
          padding: '3px 10px', borderRadius: 20,
          background: t.bg, border: `1px solid ${t.border}`, color: t.color,
          letterSpacing: '0.04em',
        }}>
          {room.type}
        </span>
      </div>

      {/* Floor */}
      <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>
        {room.floor}
      </span>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 11px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 6, color: 'rgba(255,255,255,0.4)',
          fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 0.15s',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = GOLD_DIM;
            e.currentTarget.style.color = GOLD;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
          }}
        >
          <IconEdit />
          Modifier
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 11px',
          background: 'rgba(239,68,68,0.05)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 6, color: '#f87171',
          fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <IconDelete />
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default ResourceManager;
