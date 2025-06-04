import React, { useState, useEffect } from 'react';

interface Card {
  suit: string;
  value: string;
  weight: number;
}

const generateDeck = (): Card[] => {
  const suits = ['♠', '♥', '♦', '♣'];
  const values = [
    { value: 'A', weight: 11 },
    { value: '2', weight: 2 },
    { value: '3', weight: 3 },
    { value: '4', weight: 4 },
    { value: '5', weight: 5 },
    { value: '6', weight: 6 },
    { value: '7', weight: 7 },
    { value: '8', weight: 8 },
    { value: '9', weight: 9 },
    { value: '10', weight: 10 },
    { value: 'J', weight: 10 },
    { value: 'Q', weight: 10 },
    { value: 'K', weight: 10 },
  ];

  let deck: Card[] = [];
  suits.forEach((suit) => {
    values.forEach(({ value, weight }) => {
      deck.push({ suit, value, weight });
    });
  });

  // Shuffle deck
  return deck.sort(() => Math.random() - 0.5);
};

const calculateScore = (hand: Card[]): number => {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    total += card.weight;
    if (card.value === 'A') aces++;
  });

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
};

const Blackjack: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const drawCard = (currentDeck: Card[]): [Card, Card[]] => {
    const card = currentDeck[0];
    const remaining = currentDeck.slice(1);
    return [card, remaining];
  };

  const startNewGame = () => {
    const newDeck = generateDeck();
    let d = [...newDeck];

    const [playerCard1, d1] = drawCard(d);
    const [dealerCard1, d2] = drawCard(d1);
    const [playerCard2, d3] = drawCard(d2);
    const [dealerCard2, d4] = drawCard(d3);

    setPlayerHand([playerCard1, playerCard2]);
    setDealerHand([dealerCard1, dealerCard2]);
    setDeck(d4);
    setMessage('');
    setShowMessage(false);
    setGameOver(false);
  };

  const handleHit = () => {
    if (gameOver) return;

    const [newCard, newDeck] = drawCard(deck);
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    setDeck(newDeck);

    const score = calculateScore(newHand);
    if (score > 21) {
      showGameMessage('Ai pierdut! 😢');
      setGameOver(true);
    }
  };

  const handleStand = () => {
    if (gameOver) return;

    let dHand = [...dealerHand];
    let d = [...deck];

    while (calculateScore(dHand) < 17) {
      const [newCard, newDeck] = drawCard(d);
      dHand.push(newCard);
      d = newDeck;
    }

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dHand);

    let result = '';
    if (dealerScore > 21 || playerScore > dealerScore) {
      result = 'Ai câștigat! 🎉';
    } else if (playerScore < dealerScore) {
      result = 'Dealerul a câștigat! 😐';
    } else {
      result = 'Egalitate! 🤝';
    }

    setDealerHand(dHand);
    showGameMessage(result);
    setGameOver(true);
  };

  const showGameMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
  };

  const renderHand = (hand: Card[]) => (
    <div style={styles.handContainer}>
      {hand.map((card, i) => (
        <div
          key={i}
          style={{
            ...styles.card,
            color:
              card.suit === '♥' || card.suit === '♦' ? '#ff4d6d' : '#121212',
          }}
        >
          <div style={styles.cardValue}>{card.value}</div>
          <div style={styles.cardSuit}>{card.suit}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <div style={styles.pageContainer}>
        <h1 style={styles.title}>♠️ Blackjack</h1>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>
            🧑 Jucător - {calculateScore(playerHand)} puncte
          </h2>
          {renderHand(playerHand)}
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>
            🎲 Dealer - {gameOver ? calculateScore(dealerHand) : '??'} puncte
          </h2>
          {gameOver ? (
            renderHand(dealerHand)
          ) : (
            <p style={styles.hiddenCards}>Cărți ascunse...</p>
          )}
        </section>

        <div style={styles.buttonsContainer}>
          {!gameOver ? (
            <>
              <button onClick={handleHit} style={styles.buttonHit}>
                Hit 🃏
              </button>
              <button onClick={handleStand} style={styles.buttonStand}>
                Stand ✋
              </button>
            </>
          ) : (
            <button onClick={startNewGame} style={styles.buttonRestart}>
              Joacă din nou 🔁
            </button>
          )}
        </div>

        {showMessage && (
          <div style={{ ...styles.message, animation: 'fadeIn 0.7s ease forwards' }}>
            {message}
          </div>
        )}

        {/* SVG pattern și animații */}
        <style>{`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          button:hover {
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.6));
          }
        `}</style>

        {/* Fundal pattern cu simboluri */}
        <svg
          width="0"
          height="0"
          style={{ position: 'absolute' }}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern
              id="cardSymbolsPattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="10"
                y="40"
                fontSize="24"
                fill="rgba(255, 255, 255, 0.08)"
                fontFamily="Arial, sans-serif"
              >
                ♠
              </text>
              <text
                x="80"
                y="40"
                fontSize="24"
                fill="rgba(255, 255, 255, 0.08)"
                fontFamily="Arial, sans-serif"
              >
                ♥
              </text>
              <text
                x="10"
                y="90"
                fontSize="24"
                fill="rgba(255, 255, 255, 0.08)"
                fontFamily="Arial, sans-serif"
              >
                ♦
              </text>
              <text
                x="80"
                y="90"
                fontSize="24"
                fill="rgba(255, 255, 255, 0.08)"
                fontFamily="Arial, sans-serif"
              >
                ♣
              </text>
            </pattern>
          </defs>
        </svg>
      </div>
      <style>{`
        div[style*="pageContainer"] {
          background-image:
            linear-gradient(-45deg, #1f4037, #99f2c8, #0575e6, #00c6ff),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ctext x='10' y='40' font-size='24' fill='rgba(255, 255, 255, 0.08)' font-family='Arial, sans-serif'%3E♠%3C/text%3E%3Ctext x='80' y='40' font-size='24' fill='rgba(255, 255, 255, 0.08)' font-family='Arial, sans-serif'%3E♥%3C/text%3E%3Ctext x='10' y='90' font-size='24' fill='rgba(255, 255, 255, 0.08)' font-family='Arial, sans-serif'%3E♦%3C/text%3E%3Ctext x='80' y='90' font-size='24' fill='rgba(255, 255, 255, 0.08)' font-family='Arial, sans-serif'%3E♣%3C/text%3E%3C/svg%3E");
          background-size: 400% 400%, 120px 120px;
          animation: gradientBG 25s ease infinite;
        }
      `}</style>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: '100vh',
    padding: '20px',
    color: '#f0f0f0',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',

    // Fundal cu culoare caldă și textură ușoară
    backgroundColor: '#2c3e2f', // verde închis, elegant
    backgroundImage: `
      repeating-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05) 1px,
        transparent 2px,
        transparent 10px
      )
    `,
    backgroundSize: '20px 20px',
  },
  title: {
    fontWeight: 700,
    fontSize: '3rem',
    marginBottom: '10px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
  },
  subtitle: {
    fontWeight: 600,
    fontSize: '1.5rem',
    marginBottom: '12px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
  },
  section: {
    marginBottom: '30px',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  handContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  card: {
    width: '60px',
    height: '80px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '2px 3px 6px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '8px',
    fontWeight: 700,
    fontSize: '1.4rem',
    userSelect: 'none',
  },
  cardValue: {
    lineHeight: '1.1',
  },
  cardSuit: {
    fontSize: '1.6rem',
    textAlign: 'right',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  buttonHit: {
    backgroundColor: '#16a085',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '700',
    fontSize: '1rem',
    padding: '12px 25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonStand: {
    backgroundColor: '#c0392b',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '700',
    fontSize: '1rem',
    padding: '12px 25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonRestart: {
    backgroundColor: '#2980b9',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '700',
    fontSize: '1rem',
    padding: '12px 35px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  message: {
    fontWeight: 700,
    fontSize: '1.8rem',
    textAlign: 'center',
    marginTop: '10px',
    color: '#fff',
    textShadow: '2px 2px 4px #000',
  },
  hiddenCards: {
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.6)',
  },
};

export default Blackjack;
