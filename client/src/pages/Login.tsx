import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GOLD = '#C9A84C';
const GOLD_DIM = 'rgba(201,168,76,0.5)';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('profile', JSON.stringify({ token: data.token, user: data.result }));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants incorrects.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px 13px 44px',
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, background 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle radial glow behind form */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Left: Branding panel */}
      <div style={{
        flex: 1,
        borderRight: '1px solid rgba(201,168,76,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3.5rem',
        position: 'relative',
        overflow: 'hidden',
      }} className="login-left-panel">
        {/* Fine diagonal lines texture */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <line key={i}
              x1={i * 90 - 300} y1="0"
              x2={i * 90 + 600} y2="1000"
              stroke={GOLD} strokeWidth="1" />
          ))}
        </svg>

        {/* Top: logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: `linear-gradient(135deg, ${GOLD}, #8B6200)`,
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>✦</div>
          <span style={{ color: GOLD, fontWeight: 700, fontSize: 13, letterSpacing: '0.05em' }}>
            HIGH TECH
          </span>
        </div>

        {/* Center: headline */}
        <div>
          <div style={{
            display: 'inline-block',
            background: `linear-gradient(90deg, ${GOLD}, transparent)`,
            height: 1, width: 50,
            marginBottom: 28,
          }} />
          <h2 style={{
            fontSize: 38, fontWeight: 800, color: '#fff',
            lineHeight: 1.2, letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            La gestion<br />
            <span style={{ color: GOLD }}>intelligente</span><br />
            de votre école.
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', lineHeight: 1.75, maxWidth: 300 }}>
            Emplois du temps générés par IA, gestion centralisée des ressources et suivi en temps réel.
          </p>
        </div>

        {/* Bottom: tagline */}
        <div style={{
          fontSize: 10, color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
        }}>
          École d'enseignement supérieur · Reconnu par l'état
        </div>
      </div>

      {/* Right: Login form */}
      <div style={{
        width: '100%',
        maxWidth: 460,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 3.5rem',
        position: 'relative',
      }}>
        {/* Corner brackets */}
        {[
          { top: 28, left: 28, borderTop: true, borderLeft: true },
          { top: 28, right: 28, borderTop: true, borderRight: true },
          { bottom: 28, left: 28, borderBottom: true, borderLeft: true },
          { bottom: 28, right: 28, borderBottom: true, borderRight: true },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            width: 18, height: 18,
            borderTop: c.borderTop ? `1px solid ${GOLD_DIM}` : 'none',
            borderBottom: c.borderBottom ? `1px solid ${GOLD_DIM}` : 'none',
            borderLeft: c.borderLeft ? `1px solid ${GOLD_DIM}` : 'none',
            borderRight: c.borderRight ? `1px solid ${GOLD_DIM}` : 'none',
          }} />
        ))}

        {/* School logo */}
        <div style={{ marginBottom: 44, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            padding: 2,
            background: `linear-gradient(135deg, ${GOLD}, #6B4C00)`,
            borderRadius: 12,
          }}>
            <img src="/images.png" alt="High Tech"
              style={{ width: 52, height: 52, borderRadius: 10, display: 'block', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 13, marginBottom: 2 }}>High Tech</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Smart Platform</p>
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: 26, fontWeight: 800, color: '#fff',
          letterSpacing: '-0.02em', marginBottom: 6,
        }}>
          Connexion
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 32 }}>
          Entrez vos identifiants pour accéder à la plateforme
        </p>

        {/* Error */}
        {error && (
          <div style={{
            padding: '11px 14px',
            background: 'rgba(239,68,68,0.07)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 8, marginBottom: 20,
            fontSize: 13, color: '#fca5a5', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: 'block', fontSize: 10.5, fontWeight: 600,
              color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Email institutionnel
            </label>
            <div style={{ position: 'relative' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke={GOLD_DIM} strokeWidth="2" strokeLinecap="round"
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input type="email" required placeholder="admin@hightech.ma"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = GOLD_DIM;
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{
                fontSize: 10.5, fontWeight: 600,
                color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                Mot de passe
              </label>
              <span style={{ fontSize: 11, color: GOLD_DIM, cursor: 'pointer', fontWeight: 500 }}>
                Mot de passe oublié ?
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke={GOLD_DIM} strokeWidth="2" strokeLinecap="round"
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                type={showPass ? 'text' : 'password'} required placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = GOLD_DIM;
                  e.currentTarget.style.background = 'rgba(201,168,76,0.04)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.25)', padding: 0, fontSize: 13,
              }}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" disabled={loading} style={{
            width: '100%',
            padding: '14px 20px',
            background: loading
              ? 'rgba(201,168,76,0.3)'
              : `linear-gradient(135deg, ${GOLD} 0%, #A07820 100%)`,
            border: 'none', borderRadius: 9,
            color: '#000', fontSize: 12, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'opacity 0.15s, transform 0.1s',
            fontFamily: 'inherit',
          }}>
            {loading ? (
              <>
                <svg className="spin-anim" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="rgba(0,0,0,0.3)" strokeWidth="3"/>
                  <path d="M12 3a9 9 0 0 1 9 9" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Vérification...
              </>
            ) : 'Se connecter →'}
          </button>
        </form>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: rgba(255,255,255,0.15) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-anim { animation: spin 0.75s linear infinite; }
        .login-left-panel { display: none; }
        @media (min-width: 900px) { .login-left-panel { display: flex; flex-direction: column; } }
      `}</style>
    </div>
  );
};

export default Login;
