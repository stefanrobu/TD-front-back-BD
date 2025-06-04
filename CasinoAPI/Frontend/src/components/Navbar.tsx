import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../components/UserContext'; // ajustează calea dacă e diferită

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser(); // obținem userul din context

  const privatePages = [
    { name: 'Tranzactii', path: '/tranzactii' },
    { name: 'Profil', path: '/profil' },
  ];

  const publicPages = [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  const commonPages = [
    { name: 'Home', path: '/' },
    { name: 'Pariuri', path: '/pariuri' },
    { name: 'Jocuri', path: '/jocuri' },
  ];

  return (
    <>
      <style>{`
        @keyframes pulseBorder {
          0%, 100% {
            box-shadow: 0 0 8px #ffcc00, 0 0 12px #ffcc00 inset;
          }
          50% {
            box-shadow: 0 0 16px #ffd633, 0 0 24px #ffd633 inset;
          }
        }

        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .betonro-title {
          margin-bottom: 0.75rem;
          color: #ffcc00;
          text-align: center;
          font-weight: 900;
          font-size: 3rem;
          cursor: default;
          user-select: none;
          padding: 0.5rem 1.5rem;
          border: 3px solid #ffcc00;
          border-radius: 12px;
          animation: pulseBorder 3s ease-in-out infinite;
          background: linear-gradient(270deg, #ffcc00, #ffd633, #ffcc00);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: gradientText 5s linear infinite;
          box-sizing: border-box;
          text-shadow: 0 0 8px #ffcc00;
          letter-spacing: 2px;
          position: relative;
          z-index: 1;
        }

        .user-info {
          position: absolute;
          top: 1.4rem;
          right: 1.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffcc00;
          user-select: none;
          cursor: default;
          font-weight: 600;
          font-size: 0.85rem;
          text-shadow: 0 0 4px black;
          z-index: 10;
          transform: translateX(-1rem) translateY(0.5rem);
        }

        .avatar-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #1a1a1a;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: pulseBorder 3s ease-in-out infinite;
          box-shadow: 0 0 8px #ffcc00;
          margin-bottom: 6px;
          font-size: 26px;
          color: #ffcc00;
          font-weight: 900;
          user-select: none;
          overflow: hidden;
          border: 3px solid #ffcc00;
        }

        .avatar-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>

      <nav
        style={{
          position: 'relative',
          padding: '1rem',
          background: `linear-gradient(
            135deg,
            rgba(10, 10, 30, 0.95),
            rgba(20, 20, 60, 0.95),
            rgba(30, 30, 80, 0.95)
          )`,
          backgroundBlendMode: 'overlay',
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          color: '#f0f0f0',
          userSelect: 'none',
          borderBottom: '2px solid #ffcc00',
        }}
      >
        <h1 className="betonro-title">BetonRO</h1>

        {/* Avatar + username în colț dacă e logat */}
        {user && (
          <div className="user-info" title={`Logged in as ${user.username}`}>
            <div className="avatar-circle" aria-label="User avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={`${user.username} avatar`} />
              ) : (
                user.username.charAt(0).toUpperCase()
              )}
            </div>
            <div>{user.username}</div>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
          }}
        >
          {[...commonPages, ...(user ? privatePages : publicPages)].map(
            ({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  title={`Navighează la ${name}`}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: '1px solid #ffcc00',
                    backgroundColor: isActive ? '#ffcc00' : 'transparent',
                    color: isActive ? '#1a1a1a' : '#f0f0f0',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {name}
                </button>
              );
            }
          )}
        </div>

        <footer
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#cccccc',
            paddingTop: '0.75rem',
            borderTop: '1px solid #444',
          }}
        >
          © 2025 CasinoApp
        </footer>
      </nav>
    </>
  );
};

export default Navbar;
