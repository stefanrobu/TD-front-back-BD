import React from 'react';

const Home: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white" 
      style={{ backgroundImage: "url('/images/background-casino.jpg')" }}
    >
      <header className="mb-10 flex items-center space-x-4">
        <img 
          src="/images/casino-logo192.png" 
          alt="Casino Logo" 
          className="w-20 h-20 rounded"
        />
        <h1 className="text-5xl font-bold drop-shadow-lg">Bun venit la Casino Online</h1>
      </header>

      <p className="text-lg max-w-xl text-center drop-shadow-md">
        Joacă cele mai tari jocuri de cazino: Blackjack, Poker, Ruletă, Slot Machines și multe altele!
      </p>

      <div className="mt-12 flex space-x-6">
        <img src="/images/blackjack.jpg" alt="Blackjack" className="w-40 h-24 rounded shadow-lg hover:scale-105 transition-transform cursor-pointer" />
        <img src="/images/poker-table.jpg" alt="Poker" className="w-40 h-24 rounded shadow-lg hover:scale-105 transition-transform cursor-pointer" />
        <img src="/images/roulette-wheel.jpg" alt="Ruletă" className="w-40 h-24 rounded shadow-lg hover:scale-105 transition-transform cursor-pointer" />
        <img src="/images/slot-machine.jpg" alt="Slot Machine" className="w-40 h-24 rounded shadow-lg hover:scale-105 transition-transform cursor-pointer" />
      </div>
    </div>
  );
};

export default Home;
// Adaugă asta la sfârșitul fișierului
export {};
