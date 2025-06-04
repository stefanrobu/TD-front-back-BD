import React, { useState } from 'react';

interface RetragereProps {
  onSoldUpdate: (newSold: number) => void;
}

const Retragere: React.FC<RetragereProps> = ({ onSoldUpdate }) => {
  const [suma, setSuma] = useState<number>(0);
  const [cardId, setCardId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const retrageBani = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError('Nu ești autentificat.');
    return;
  }
  

  if (suma <= 0) {
    setError('Suma trebuie să fie pozitivă.');
    return;
  }

  if (cardId.trim().length < 4) {
    setError('ID Card invalid.');
    return;
  }

  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const res = await fetch('https://localhost:7201/api/Casino/retragere', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({suma}), // doar suma, conform backend
    });
if (res.status === 401) {
  setError('Sesiunea a expirat. Te rugăm să te autentifici din nou.');
  localStorage.removeItem('token');
  // eventual redirect către login
  return;
}
    if (!res.ok) {
      const msg = await res.text();
      setError(`Eroare: ${msg}`);
      setLoading(false);
      return;
    }

    const result = await res.json();
    setSuccess(`Retragere efectuată. Sold nou: ${result.soldNou.toFixed(2)} RON`);
    onSoldUpdate(result.soldNou);
    setSuma(0);
    setCardId('');
  } catch (err) {
    console.error(err);
    setError('Eroare la conectare cu serverul.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h3>Retragere Fonduri</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="number"
          placeholder="Sumă"
          value={suma}
         onChange={(e) => setSuma(Number(e.target.value) || 0)}
          min={0}
          style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="ID Card"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button
          onClick={retrageBani}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {loading ? 'Se procesează...' : 'Retrage'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Retragere;
