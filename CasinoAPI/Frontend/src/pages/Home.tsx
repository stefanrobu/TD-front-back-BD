import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const games = [
  { src: '/images/blackjack.jpg', alt: 'Blackjack', name: 'Blackjack', route: '/blackjack' },
  { src: '/images/poker-table.jpg', alt: 'Poker', name: 'Poker', route: null }, // fără link momentan
  { src: '/images/roulette-wheel.jpg', alt: 'Ruletă', name: 'Ruletă', route: '/ruleta' },
  { src: '/images/slot-machine.jpg', alt: 'Slot Machine', name: 'Slot Machine', route: '/slot' },
];

// Particule Canvas Background Component
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles: { x: number; y: number; size: number; speedY: number; opacity: number; }[] = [];

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1 + Math.random() * 3,
          speedY: 0.3 + Math.random() * 0.7,
          opacity: 0.2 + Math.random() * 0.8,
        });
      }
    };
    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = height + p.size;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 40, 40, ${p.opacity})`;
        ctx.shadowColor = 'rgba(255, 80, 80, 0.7)';
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, #2a0000, #000000 90%)',
      }}
    />
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayClick = (route: string | null) => {
    if (route) {
      navigate(route);
    } else {
      alert('Acest joc nu este disponibil momentan.');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflowX: 'hidden',
        fontFamily: "'Orbitron', sans-serif",
        color: '#fff',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1500px',
        textAlign: 'center',
        zIndex: 10,
      }}
    >
      <ParticleBackground />

      {/* Logo + titlu + text */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginBottom: '70px',
          userSelect: 'none',
        }}
      >
        <img
          src="/images/casino-logo192.png"
          alt="Casino Logo"
          style={{
            width: '130px',
            height: '130px',
            borderRadius: '30px',
            boxShadow: '0 0 40px 15px #ff1a1a',
            filter: 'drop-shadow(0 0 15px #ff3b3b)',
            animation: 'glowLogo 4s ease-in-out infinite alternate',
            marginBottom: '25px',
          }}
        />
        <h1
          style={{
            fontSize: '5rem',
            fontWeight: '900',
            letterSpacing: '6px',
            background:
              'linear-gradient(90deg, #00f0ff, #00bcd4, #00f0ff)',
            backgroundSize: '300% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            animation: 'gradientText 6s linear infinite',
            textShadow:
              '0 0 25px #00e5ff, 0 0 40px #00bcd4, 0 0 60px #0097a7',
            marginBottom: '15px',
          }}
        >
          Bun venit la Cazinou BetON – Câștiguri garantate!
        </h1>
        <p
          style={{
            fontSize: '1.7rem',
            maxWidth: '700px',
            margin: '0 auto',
            fontWeight: '600',
            color: '#99eaff',
            textShadow: '0 0 15px rgba(0, 220, 255, 0.8)',
          }}
        >
          Joacă cele mai tari jocuri de cazino: Blackjack, Poker, Ruletă, Slot Machines și multe altele!
        </p>
      </div>

      {/* Carduri jocuri cu scroll orizontal + efect 3D */}
      <div
        style={{
          display: 'flex',
          gap: '35px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '30px',
          maxWidth: '100%',
          paddingLeft: '10px',
          paddingRight: '10px',
          zIndex: 10,
          scrollbarWidth: 'none', // Firefox
        }}
        className="gameCardsContainer"
      >
        {games.map((game) => (
          <div
            key={game.name}
            style={{
              minWidth: '240px',
              flexShrink: 0,
              borderRadius: '24px',
              background: 'linear-gradient(145deg, #330000, #550000)',
              boxShadow:
                '0 0 40px 5px #ff2c2c, inset 0 0 25px #b22222',
              cursor: 'pointer',
              scrollSnapAlign: 'center',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotateY(15deg) scale(1.15)';
              e.currentTarget.style.boxShadow =
                '0 0 70px 15px #ff4d4d, inset 0 0 35px #ff1111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 0 40px 5px #ff2c2c, inset 0 0 25px #b22222';
            }}
          >
            <img
              src={game.src}
              alt={game.alt}
              style={{
                width: '100%',
                height: '160px',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                objectFit: 'cover',
                boxShadow: 'inset 0 0 15px #ff6666',
                display: 'block',
              }}
            />
            <div
              style={{
                padding: '20px',
                position: 'relative',
              }}
            >
              <p
                style={{
                  fontWeight: '900',
                  fontSize: '1.5rem',
                  color: '#ffbbbb',
                  marginBottom: '18px',
                  textShadow: '0 0 12px #ff4d4d',
                }}
              >
                {game.name}
              </p>

              {/* Buton Play neon */}
              <button
                style={{
                  padding: '12px 38px',
                  borderRadius: '40px',
                  border: 'none',
                  background:
                    'linear-gradient(90deg, #ff3300, #ff0000, #ff3300)',
                  color: '#fff',
                  fontWeight: '900',
                  fontSize: '1.15rem',
                  cursor: game.route ? 'pointer' : 'not-allowed',
                  boxShadow:
                    '0 0 25px #ff3300, 0 0 40px #ff1a1a, inset 0 0 15px #ff4d4d',
                  transition: 'all 0.3s ease',
                  userSelect: 'none',
                  textTransform: 'uppercase',
                }}
                onClick={() => handlePlayClick(game.route)}
                onMouseEnter={(e) => {
                  if (game.route) {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #ff0000, #ff3300, #ff0000)';
                    e.currentTarget.style.boxShadow =
                      '0 0 40px #ff0000, 0 0 60px #ff3300, inset 0 0 30px #ff6b6b';
                    e.currentTarget.style.transform = 'scale(1.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(90deg, #ff3300, #ff0000, #ff3300)';
                  e.currentTarget.style.boxShadow =
                    '0 0 25px #ff3300, 0 0 40px #ff1a1a, inset 0 0 15px #ff4d4d';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                disabled={!game.route}
              >
                Joacă
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Animații CSS */}
      <style>{`
        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes glowLogo {
          0% {
            filter: drop-shadow(0 0 15px #ff3b3b);
            box-shadow: 0 0 40px 15px #ff1a1a;
          }
          100% {
            filter: drop-shadow(0 0 30px #ff6b6b);
            box-shadow: 0 0 80px 35px #ff4d4d;
          }
        }
        /* Scrollbar hidden for Webkit */
        .gameCardsContainer::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
