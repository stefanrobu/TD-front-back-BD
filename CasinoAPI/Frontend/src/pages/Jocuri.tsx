import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Joc {
  IDJoc: number;
  NumeLoc: string;
  TipJoc: string;
  PariuMinim: number;
  PariuMaxim: number;
}

const Jocuri: React.FC = () => {
  const [jocuri, setJocuri] = useState<Joc[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData: Joc[] = [
      {
        IDJoc: 1,
        NumeLoc: 'Masa Blackjack 1',
        TipJoc: 'Blackjack',
        PariuMinim: 10,
        PariuMaxim: 500,
      },
      {
        IDJoc: 2,
        NumeLoc: 'Ruletă VIP',
        TipJoc: 'Ruletă',
        PariuMinim: 50,
        PariuMaxim: 1000,
      },
      {
        IDJoc: 3,
        NumeLoc: 'Sloturi - Lucky 7',
        TipJoc: 'Slot',
        PariuMinim: 5,
        PariuMaxim: 100,
      },
    ];

    setJocuri(mockData);
  }, []);

  const getGameIcon = (tipJoc: string) => {
    switch (tipJoc) {
      case 'Blackjack':
        return '♠️';
      case 'Ruletă':
        return '🎲';
      case 'Slot':
        return '🎰';
      default:
        return '🎮';
    }
  };

  const getGameColor = (tipJoc: string) => {
    switch (tipJoc) {
      case 'Blackjack':
        return '#1f2937';
      case 'Ruletă':
        return '#dc2626';
      case 'Slot':
        return '#7c3aed';
      default:
        return '#374151';
    }
  };

  const handleRowClick = (tipJoc: string) => {
    switch (tipJoc) {
      case 'Blackjack':
        navigate('/blackjack');
        break;
      case 'Ruletă':
        navigate('/ruleta');
        break;
      case 'Slot':
        navigate('/slot');
        break;
      default:
        // Poți adăuga pagină default sau alert
        alert('Jocul nu este implementat încă.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/images/background-casino.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <div className="max-w-4xl w-full p-6 bg-white bg-opacity-90 shadow-md rounded-md">
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
            }}
          >
            <caption
              style={{
                captionSide: 'top',
                textAlign: 'center',
                padding: '12px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: '#059669',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              🎮 Jocuri Disponibile
            </caption>
            <thead>
              <tr
                style={{
                  background: 'linear-gradient(90deg, #059669 0%, #047857 100%)',
                  color: 'white',
                }}
              >
                <th
                  style={{
                    padding: '20px 24px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Nume Joc
                </th>
                <th
                  style={{
                    padding: '20px 24px',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Tip Joc
                </th>
                <th
                  style={{
                    padding: '20px 24px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Pariu Minim
                </th>
                <th
                  style={{
                    padding: '20px 24px',
                    textAlign: 'right',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Pariu Maxim
                </th>
              </tr>
            </thead>
            <tbody>
              {jocuri.map((joc, index) => (
                <tr
                  key={joc.IDJoc}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleRowClick(joc.TipJoc)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                    e.currentTarget.style.transform = 'scale(1.01)';
                    e.currentTarget.style.boxShadow =
                      '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? 'white' : '#f8fafc';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* ... restul celulelor rămâne neschimbat */}
                  <td style={{ padding: '20px 24px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: getGameColor(joc.TipJoc),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {getGameIcon(joc.TipJoc)}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '4px',
                          }}
                        >
                          {joc.NumeLoc}
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            fontWeight: '500',
                          }}
                        >
                          ID: {joc.IDJoc}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '20px 24px',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'white',
                        backgroundColor: getGameColor(joc.TipJoc),
                      }}
                    >
                      {joc.TipJoc}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '20px 24px',
                      textAlign: 'right',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#059669',
                      }}
                    >
                      {joc.PariuMinim.toLocaleString('ro-RO')} RON
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        fontWeight: '500',
                        marginTop: '2px',
                      }}
                    >
                      minim
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '20px 24px',
                      textAlign: 'right',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#dc2626',
                      }}
                    >
                      {joc.PariuMaxim.toLocaleString('ro-RO')} RON
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        fontWeight: '500',
                        marginTop: '2px',
                      }}
                    >
                      maxim
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jocuri;
