import React, { useState } from 'react';

const Deposit: React.FC = () => {
  const [suma, setSuma] = useState<number>(0);
  const [mesaj, setMesaj] = useState<string>('');

  const handleDepunere = () => {
    if (suma <= 0) {
      setMesaj('Introdu o sumă validă.');
      return;
    }

    // Aici în mod normal ai trimite request către server.
    console.log(`Depus: ${suma} RON`);
    setMesaj(`Ai depus cu succes ${suma.toFixed(2)} RON.`);
    setSuma(0);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Depunere fonduri</h1>
      <label className="block mb-2 font-semibold">Sumă (RON):</label>
      <input
        type="number"
        value={suma}
        onChange={(e) => setSuma(parseFloat(e.target.value))}
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Introdu suma..."
      />
      <button
        onClick={handleDepunere}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Depune
      </button>
      {mesaj && (
        <p className="mt-4 text-center text-green-700 font-medium">{mesaj}</p>
      )}
    </div>
  );
};

export default Deposit;
