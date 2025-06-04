import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Parolele nu coincid.');
      return;
    }

    // Simulare înregistrare
    alert('Înregistrare realizată cu succes!');
    // Aici faci request API real
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Înregistrare</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">
          Username
          <input
            type="text"
            className="w-full border px-3 py-2 mt-1 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2 font-semibold">
          Email
          <input
            type="email"
            className="w-full border px-3 py-2 mt-1 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2 font-semibold">
          Parola
          <input
            type="password"
            className="w-full border px-3 py-2 mt-1 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4 font-semibold">
          Confirmă parola
          <input
            type="password"
            className="w-full border px-3 py-2 mt-1 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Înregistrează-te
        </button>
      </form>
    </div>
  );
};

export default Register;
// Adaugă asta la sfârșitul fișierului
export {};
