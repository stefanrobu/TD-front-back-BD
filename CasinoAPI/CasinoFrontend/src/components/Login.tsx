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
      const response = await fetch("https://localhost:7239/api/Client/login", {
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

      // Store client ID or token
      localStorage.setItem("clientId", data.idClient);
      setSuccess("Autentificare reușită!");
      setEmail("");
      setPassword("");

      // Redirect after login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Eroare la conectarea cu serverul.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">Autentificare</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Autentifică-te
      </button>
    </div>
  );
};

export default Login;
