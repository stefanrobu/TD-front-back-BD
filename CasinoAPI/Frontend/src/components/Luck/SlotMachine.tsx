import React, { useState } from 'react';

const SYMBOLS = ['🍒', '🍋', '🍇', '🔔', '🍉', '⭐', '👑', '7️⃣'];
const REELS = 5; // coloane
const ROWS = 3;  // linii

type ColorChoice = 'red' | 'black';

const StoneSlot: React.FC = () => {
  // Matrice 5x3 simboluri
  const [reels, setReels] = useState<string[][]>(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: REELS }, () => getRandomSymbol())
    )
  );

  const [spinning, setSpinning] = useState(false);
  const [canCollect, setCanCollect] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [doublingActive, setDoublingActive] = useState(false);
  const [doubleCount, setDoubleCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  function getRandomSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }

  const checkWin = (currentReels: string[][]): number => {
    const middleRow = currentReels[1]; // linia 2 (index 1)
    let maxSeq = 0;
    let currentSeq = 0;

    for (let i = 0; i < REELS; i++) {
      if (middleRow[i] === '7️⃣') {
        currentSeq++;
        if (currentSeq > maxSeq) maxSeq = currentSeq;
      } else {
        currentSeq = 0;
      }
    }

    if (maxSeq >= 3) {
      return maxSeq * 10; // câștig 10 monede pe simbol 7️⃣ consecutiv
    }
    return 0;
  };

  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    setCanCollect(false);
    setDoublingActive(false);
    setMessage(null);
    setDoubleCount(0);
    setWinAmount(0);

    let spinsLeft = REELS; // câte coloane mai trebuie sa se opreasca

    // Copiem array-ul pentru update incremental
    let currentReels = Array.from({ length: ROWS }, () =>
      Array.from({ length: REELS }, () => getRandomSymbol())
    );

    setReels(currentReels);

    const intervals: NodeJS.Timeout[] = [];

    for (let col = 0; col < REELS; col++) {
      let spinCount = 0;
      const maxSpinCount = 15 + col * 5; // fiecare col stopeaza mai târziu

      intervals[col] = setInterval(() => {
        if (spinCount >= maxSpinCount) {
          clearInterval(intervals[col]);
          spinsLeft--;

          if (spinsLeft === 0) {
            setSpinning(false);
            const win = checkWin(currentReels);
            if (win > 0) {
              setWinAmount(win);
              setMessage(`Ai câștigat ${win} monede! 🎉`);
              setCanCollect(true);
            } else {
              setMessage('Nu ai câștigat, încearcă din nou!');
            }
          }
          return;
        }

        for (let row = 0; row < ROWS; row++) {
          currentReels[row][col] = getRandomSymbol();
        }
        setReels(currentReels.map(row => [...row]));

        spinCount++;
      }, 75);
    }
  };

  const collect = () => {
    setCanCollect(false);
    setMessage(null);
    setWinAmount(0);
  };

  const doubleGuess = (choice: ColorChoice) => {
    const colors: ColorChoice[] = ['red', 'black'];
    const actual = colors[Math.floor(Math.random() * colors.length)];

    if (choice === actual) {
      const newCount = doubleCount + 1;
      const newWin = winAmount * 2;
      setDoubleCount(newCount);
      setWinAmount(newWin);
      setMessage(`Corect! Câștig dublat x${2 ** newCount}!`);

      if (newCount >= 5) {
        setMessage(`Felicitări! Ai dublat maxim x${2 ** newCount}.`);
        setDoublingActive(false);
        setCanCollect(true);
      }
    } else {
      setMessage('Mai încearcă! Ai pierdut dublarea.');
      setDoublingActive(false);
      setCanCollect(true);
    }
  };

  const startDoubling = () => {
    if (winAmount > 0) {
      setDoublingActive(true);
      setCanCollect(false);
      setMessage('Alege roșu sau negru pentru dublare!');
      setDoubleCount(0);
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: 50,
        color: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        padding: 20,
        // Fundal albastru cu textură subtilă grunge (nu negru)
        background: `radial-gradient(circle at center, #4a6fa5 0%, #1c3d6a 80%),
          url('https://www.transparenttextures.com/patterns/asfalt-dark.png') repeat`,
        backgroundBlendMode: 'multiply',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 20, textShadow: '0 0 15px #ffd700' }}>
        StoneSlot 🎰
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${REELS}, 80px)`,
          gridTemplateRows: `repeat(${ROWS}, 80px)`,
          gap: 14,
          justifyContent: 'center',
          marginBottom: 30,
          backgroundColor: 'rgba(60, 80, 130, 0.85)',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 0 25px 4px #ffd700',
          width: 'fit-content',
          marginLeft: 'auto',
          marginRight: 'auto',
          userSelect: 'none',
          border: '4px solid #b0a060',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)`,
          backgroundSize: '20px 20px',
        }}
      >
        {reels.map((row, rowIndex) =>
          row.map((symbol, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: 80,
                height: 80,
                fontSize: 46,
                backgroundColor: '#335089',
                color: 'gold',
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: spinning
                  ? 'inset 0 0 15px #facc15, 0 0 15px #facc15'
                  : 'inset 0 0 10px #b8a138',
                transition: 'box-shadow 0.3s ease-in-out',
                textShadow: '0 0 8px #ffdd55',
              }}
            >
              {symbol}
            </div>
          ))
        )}
      </div>

      {message && (
        <div
          style={{
            marginBottom: 20,
            fontWeight: 'bold',
            fontSize: 20,
            color: doublingActive ? '#ffeb3b' : '#90ee90',
            textShadow: '0 0 8px #000',
          }}
        >
          {message}
        </div>
      )}

      {!spinning && !canCollect && !doublingActive && (
        <button
          onClick={spin}
          style={{
            padding: '14px 32px',
            fontSize: 20,
            fontWeight: 'bold',
            backgroundColor: '#10b981',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 0 20px #10b981',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#059669')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#10b981')}
        >
          Rulează roata! 🎰
        </button>
      )}

      {canCollect && !doublingActive && (
        <>
          <button
            onClick={collect}
            style={{
              padding: '12px 28px',
              fontSize: 18,
              fontWeight: 'bold',
              backgroundColor: '#f59e0b',
              border: 'none',
              borderRadius: 12,
              color: 'black',
              cursor: 'pointer',
              boxShadow: '0 0 15px #f59e0b',
              marginRight: 16,
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d97706')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f59e0b')}
          >
            Încasează
          </button>

          <button
            onClick={startDoubling}
            style={{
              padding: '12px 28px',
              fontSize: 18,
              fontWeight: 'bold',
              backgroundColor: '#ef4444',
              border: 'none',
              borderRadius: 12,
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 0 15px #ef4444',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ef4444')}
          >
            Dublare?
          </button>
        </>
      )}

      {doublingActive && (
        <div style={{ marginTop: 24 }}>
          <p style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 14 }}>
            Alege culoarea cărții:
          </p>
          <button
            onClick={() => doubleGuess('red')}
            style={{
              backgroundColor: '#dc2626',
              border: 'none',
              color: 'white',
              padding: '16px 40px',
              fontSize: 22,
              fontWeight: 'bold',
              marginRight: 24,
              borderRadius: 14,
              cursor: 'pointer',
              boxShadow: '0 0 20px #dc2626',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#dc2626')}
          >
            Roșu
          </button>
          <button
            onClick={() => doubleGuess('black')}
            style={{
              backgroundColor: '#111827',
              border: 'none',
              color: 'white',
              padding: '16px 40px',
              fontSize: 22,
              fontWeight: 'bold',
              borderRadius: 14,
              cursor: 'pointer',
              boxShadow: '0 0 20px #374151',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1f2937')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}
          >
            Negru
          </button>
        </div>
      )}
    </div>
  );
};

export default StoneSlot;
