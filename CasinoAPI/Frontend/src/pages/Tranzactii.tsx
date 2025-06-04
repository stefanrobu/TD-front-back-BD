import React, { useState, useEffect } from 'react';

interface Tranzactie {
  IDTranzactie: number;
  IDUtilizator?: number;
  suma: number;
  data: string;
  TipTranzactie: 'depunere' | 'retragere' | 'castig' | 'pierdere';
}

const Tranzactii: React.FC = () => {
  const [tranzactii, setTranzactii] = useState<Tranzactie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranzactii = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Nu ești autentificat.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('https://localhost:7201/api/Casino/tranzactii', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const msg = await res.text();
          setError(`Eroare la preluarea tranzacțiilor: ${msg}`);
          return;
        }

        const data = await res.json();
        setTranzactii(data);
      } catch (err) {
        setError('Eroare la preluarea tranzacțiilor.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTranzactii();
  }, []);

  const getTransactionIcon = (tip: string) => {
    switch (tip) {
      case 'depunere': return '💰';
      case 'retragere': return '💸';
      case 'castig': return '🎉';
      case 'pierdere': return '❌';
      default: return '🔁';
    }
  };

  const getTransactionColor = (tip: string) => {
    switch (tip) {
      case 'depunere': return '#059669';
      case 'retragere': return '#dc2626';
      case 'castig': return '#2563eb';
      case 'pierdere': return '#9ca3af';
      default: return '#6b7280';
    }
  };

  const getTransactionBgColor = (tip: string) => {
    switch (tip) {
      case 'depunere': return '#d1fae5';
      case 'retragere': return '#fee2e2';
      case 'castig': return '#dbeafe';
      case 'pierdere': return '#f3f4f6';
      default: return '#e5e7eb';
    }
  };

  const getTotalBalance = () => {
    return tranzactii.reduce((total, t) => {
      switch (t.TipTranzactie) {
        case 'depunere':
        case 'castig':
          return total + t.suma;
        case 'retragere':
        case 'pierdere':
          return total - t.suma;
        default:
          return total;
      }
    }, 0);
  };

  if (loading) {
    return <div style={{ padding: '2rem', color: 'white' }}>Se încarcă tranzacțiile...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;
  }

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
      <div className="p-6 max-w-4xl w-full bg-black bg-opacity-70 rounded-md shadow-md text-white">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            💳 Istoric Tranzacții
          </h1>

          <div style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: getTotalBalance() >= 0 ? '#dcfce7' : '#fee2e2',
            borderRadius: '12px',
            border: `2px solid ${getTotalBalance() >= 0 ? '#16a34a' : '#dc2626'}`,
            marginTop: '8px',
            color: getTotalBalance() >= 0 ? '#16a34a' : '#dc2626',
            fontWeight: '800',
            fontSize: '24px',
          }}>
            Sold Total: {getTotalBalance().toLocaleString('ro-RO')} RON
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                background: 'linear-gradient(90deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white'
              }}>
                <th style={headerCellStyle}>Tip Tranzacție</th>
                <th style={{ ...headerCellStyle, textAlign: 'right' }}>Suma</th>
                <th style={{ ...headerCellStyle, textAlign: 'center' }}>Data & Ora</th>
                <th style={{ ...headerCellStyle, textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tranzactii.map((t, index) => (
                <tr
                  key={t.IDTranzactie}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <td style={cellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: getTransactionBgColor(t.TipTranzactie),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        border: `2px solid ${getTransactionColor(t.TipTranzactie)}20`
                      }}>
                        {getTransactionIcon(t.TipTranzactie)}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: getTransactionColor(t.TipTranzactie),
                          marginBottom: '4px'
                        }}>
                          {t.TipTranzactie.charAt(0).toUpperCase() + t.TipTranzactie.slice(1)}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                          ID: #{t.IDTranzactie}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '800',
                      color: getTransactionColor(t.TipTranzactie),
                      marginBottom: '4px'
                    }}>
                      {(t.TipTranzactie === 'depunere' || t.TipTranzactie === 'castig' ? '+' : '-') + t.suma.toLocaleString('ro-RO')} RON
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>
                      {t.TipTranzactie === 'depunere' || t.TipTranzactie === 'castig' ? 'Creștere sold' : 'Scădere sold'}
                    </div>
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: '600', color: '#64748b' }}>
                    {new Date(t.data).toLocaleString('ro-RO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: '600', color: '#10b981' }}>
                    Procesată
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

// Stiluri reutilizabile
const headerCellStyle: React.CSSProperties = {
  padding: '20px 24px',
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.1em'
};

const cellStyle: React.CSSProperties = {
  padding: '20px 24px',
  color: 'black'
};

export default Tranzactii;
