import React, { useState } from 'react';

const redNumbers = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];

const Ruleta: React.FC = () => {
  const [selectedBet, setSelectedBet] = useState<'red' | 'black' | 'even' | 'odd' | 'number'>('red');
  const [betNumber, setBetNumber] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const spinRoulette = () => {
    const roll = Math.floor(Math.random() * 37); // 0-36
    setResult(roll);

    const isRed = redNumbers.includes(roll);
    const isBlack = roll !== 0 && !isRed;
    const isEven = roll !== 0 && roll % 2 === 0;
    const isOdd = roll % 2 === 1;

    let won = false;
    let payout = 0;

    switch (selectedBet) {
      case 'red':
        won = isRed;
        payout = 2;
        break;
      case 'black':
        won = isBlack;
        payout = 2;
        break;
      case 'even':
        won = isEven;
        payout = 2;
        break;
      case 'odd':
        won = isOdd;
        payout = 2;
        break;
      case 'number':
        won = Number(betNumber) === roll;
        payout = 36;
        break;
    }

    if (won) {
      setMessage(`Ai câștigat! 🎉 Câștig x${payout}`);
    } else {
      setMessage('Ai pierdut 😢');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>🎡 Ruletă</h1>

      <div style={styles.section}>
        <label htmlFor="bet-type-select" style={styles.label}>
          Tip pariu:
        </label>
        <select
          id="bet-type-select"
          value={selectedBet}
          onChange={(e) => setSelectedBet(e.target.value as any)}
          style={styles.select}
        >
          <option value="red">Roșu 🔴</option>
          <option value="black">Negru ⚫</option>
          <option value="even">Par ♻️</option>
          <option value="odd">Impar ☝️</option>
          <option value="number">Număr exact 🔢</option>
        </select>
      </div>

      {selectedBet === 'number' && (
        <div style={styles.section}>
          <label htmlFor="bet-number" style={styles.label}>
            Număr (0 - 36):
          </label>
          <input
            id="bet-number"
            type="number"
            min={0}
            max={36}
            value={betNumber}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') setBetNumber('');
              else {
                const num = Number(val);
                if (num >= 0 && num <= 36) setBetNumber(num);
              }
            }}
            style={styles.input}
            placeholder="Introdu un număr"
            title="Introdu un număr între 0 și 36"
          />
        </div>
      )}

      <button onClick={spinRoulette} style={styles.button}>
        Rulează roata! 🎰
      </button>

      {result !== null && (
        <div style={styles.result}>
          Rezultat: <strong>{result}</strong>{' '}
          {result === 0 ? '🟢' : redNumbers.includes(result) ? '🔴' : '⚫'}
        </div>
      )}

      {message && <div style={styles.message}>{message}</div>}

      {/* Fundal texturat subtil */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        <defs>
          <pattern
            id="texturePattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="10" y="10" width="10" height="10" fill="rgba(255,255,255,0.03)" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: '100vh',
    padding: '2rem',
    color: '#f0f0f0',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2c3e2f', // verde închis elegant
    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05) 1px,
        transparent 2px,
        transparent 10px
      )
    `,
    position: 'relative',
  },
  title: {
    fontWeight: 700,
    fontSize: '3rem',
    marginBottom: '2rem',
    textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
  },
  section: {
    marginBottom: '1.5rem',
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: 600,
    fontSize: '1.1rem',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1.5px solid #3a5a40',
    fontSize: '1rem',
    backgroundColor: '#2c3e2f',
    color: '#d0d8ce',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1.5px solid #3a5a40',
    fontSize: '1rem',
    backgroundColor: '#2c3e2f',
    color: '#d0d8ce',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
    outline: 'none',
    width: '100%',
  },
  button: {
    padding: '12px 28px',
    backgroundColor: '#16a085',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.2rem',
    cursor: 'pointer',
    boxShadow: '0 5px 12px rgba(22,160,133,0.6)',
    transition: 'background-color 0.3s ease',
    alignSelf: 'center',
    marginTop: '1rem',
  },
  result: {
    marginTop: '2rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#f0f0f0',
    textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
  },
  message: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#adebad',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  },
};

export default Ruleta;
