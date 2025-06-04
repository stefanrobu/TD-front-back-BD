import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulare login
    if (username === 'user' && password === 'password') {
      alert('Login reușit!');
      // Redirect sau setare context autentificare
    } else {
      setError('Username sau parola incorectă');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
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

        <label className="block mb-4 font-semibold">
          Parola
          <input
            type="password"
            className="w-full border px-3 py-2 mt-1 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Loghează-te
        </button>
      </form>
    </div>
  );
};

export default Login;
// Adaugă asta la sfârșitul fișierului
export {};
