import React, { useState } from "react";

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Te rog completează toate câmpurile.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://localhost:7239/api/Client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ EmailClient: email, ParolaClient: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Datele de autentificare sunt incorecte.");
        setLoading(false);
        return;
      }

      // Login reușit
      setError(null);
      setEmail("");
      setPassword("");
      if (onLoginSuccess) onLoginSuccess();

    } catch (err) {
      setError("Eroare la conectarea cu serverul.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Autentificare</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label className="block mb-2 font-semibold" htmlFor="password">
          Parolă
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Se autentifică..." : "Autentificare"}
        </button>
      </form>
    </div>
  );
};

export default Login;
// Adaugă asta la sfârșitul fișierului
export {};
