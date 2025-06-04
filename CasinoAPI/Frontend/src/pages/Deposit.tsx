import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Deposit: React.FC = () => {
  const [suma, setSuma] = useState<number | ''>('');
  const [mesaj, setMesaj] = useState<string>('');
  const [istoric, setIstoric] = useState<number[]>([]);
  const [soldCurent, setSoldCurent] = useState<number | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchSoldCurent();
    }
  }, []);

  const fetchSoldCurent = async () => {
    try {
      const response = await fetch('https://localhost:7201/api/profile/sold', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Eroare la obținerea soldului.');

      const data = await response.json();
      setSoldCurent(data.sold);
    } catch (err: any) {
      setMesaj(err.message);
    }
  };

  const handleDepunere = async () => {
    if (typeof suma !== 'number' || suma <= 0) {
      setMesaj('Introdu o sumă validă.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7201/api/casino/depunere', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ suma }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Depunerea a eșuat.');
      }

      const result = await response.json();
      setMesaj(`✅ Depunere reușită. Sold nou: ${result.nouSold} RON.`);
      setSoldCurent(result.nouSold);
      setIstoric((prev) => [suma, ...prev]);
      setSuma('');
    } catch (err: any) {
      setMesaj(err.message || 'Eroare la depunere.');
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
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          userSelect: 'none',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#059669',
          }}
        >
          💰 Depunere Fonduri
        </h1>

        {soldCurent !== null && (
          <p style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: '600', color: '#374151' }}>
            Sold actual: <span style={{ color: '#059669' }}>{soldCurent.toFixed(2)} RON</span>
          </p>
        )}

        <label
          htmlFor="suma"
          style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#374151',
          }}
        >
          Sumă (RON):
        </label>
        <input
          id="suma"
          type="number"
          value={suma}
          onChange={(e) => {
            const val = e.target.value;
            setSuma(val === '' ? '' : parseFloat(val));
          }}
          placeholder="Introdu suma..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: '1px solid #d1d5db',
            fontSize: '1rem',
            marginBottom: '1.25rem',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#059669')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
        />

        <button
          onClick={handleDepunere}
          style={{
            width: '100%',
            backgroundColor: '#059669',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            border: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
        >
          Depune
        </button>

        {mesaj && (
          <p
            style={{
              marginTop: '1rem',
              textAlign: 'center',
              color: '#059669',
              fontWeight: '600',
              userSelect: 'text',
            }}
          >
            {mesaj}
          </p>
        )}

        {istoric.length > 0 && (
          <div
            style={{
              marginTop: '2.5rem',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              backgroundColor: 'white',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <caption
                style={{
                  captionSide: 'top',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  padding: '12px 0',
                  color: '#059669',
                }}
              >
                📜 Istoric Depuneri
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
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Nr.
                  </th>
                  <th
                    style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Sumă Depusă (RON)
                  </th>
                </tr>
              </thead>
              <tbody>
                {istoric.map((dep, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8fafc')}
                  >
                    <td
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#374151',
                      }}
                    >
                      {istoric.length - index}
                    </td>
                    <td
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: '#059669',
                      }}
                    >
                      {dep.toLocaleString('ro-RO', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposit;
