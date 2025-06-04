import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Email și parola sunt obligatorii.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7201/api/Client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmailClient: email,
          ParolaClient: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Eroare la autentificare.");
        return;
      }

      localStorage.setItem("clientId", data.idClient);
      setSuccess("Autentificare reușită!");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      console.error("Eroare:", err);
      setError("Eroare la conectarea cu serverul.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white bg-opacity-90 p-6 rounded shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Autentificare</h2>

      {error && <p className="text-red-600 mb-3 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 mb-3 text-sm text-center">{success}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-200"
      >
        Autentifică-te
      </button>
    </div>
  );
};

export default Login;
