import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Te rog completează toate câmpurile.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://localhost:7201/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username, Password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Datele de autentificare sunt incorecte.");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUsername("");
        setPassword("");
        setError(null);
        navigate("/profil");
      } else {
        setError("Token-ul nu a fost primit de la server.");
      }
    } catch {
      setError("Eroare la conectarea cu serverul.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/background-casino.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#374151",
        userSelect: "none",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.35)",
          padding: "2.5rem 2rem",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          userSelect: "text",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "2rem",
            color: "#059669",
            textAlign: "center",
          }}
        >
          Loghează-te
        </h1>

        {error && (
          <p
            style={{
              color: "#b91c1c",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="username"
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#065f46",
            }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            minLength={3}
            autoComplete="username"
            spellCheck={false}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "14px",
              border: "2px solid #d1d5db",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              outline: "none",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#059669";
              e.currentTarget.style.boxShadow = "0 0 8px #10b981";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "#065f46",
            }}
          >
            Parola
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "14px",
              border: "2px solid #d1d5db",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              outline: "none",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#059669";
              e.currentTarget.style.boxShadow = "0 0 8px #10b981";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#059669",
              color: "white",
              padding: "0.85rem",
              fontWeight: "700",
              fontSize: "1.15rem",
              borderRadius: "14px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              userSelect: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              transition: "background-color 0.3s ease, transform 0.1s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#047857";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#059669";
            }}
            onMouseDown={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(1)";
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {loading ? "Se conectează..." : "Loghează-te"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
