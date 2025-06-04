import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pentru click rapid pe logo
  const [logoClicks, setLogoClicks] = useState(0);
  useEffect(() => {
    if (logoClicks === 5) {
      alert("🎉 Încă un click și decolez fără tine! 🚀✈️");
      setLogoClicks(0);
    }
    if (logoClicks > 0) {
      const timer = setTimeout(() => setLogoClicks(0), 1500);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  // Pentru click multiple pe butonul Profil
  const [profileClicks, setProfileClicks] = useState(0);
  useEffect(() => {
    if (profileClicks === 7) {
      alert("🛠️ Vrei să-ți vezi profilul sau să strici butonul? 🤔");
      setProfileClicks(0);
    }
    if (profileClicks > 0) {
      const timer = setTimeout(() => setProfileClicks(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [profileClicks]);

  // Dark mode toggle la Ctrl+Shift+D
  const [darkMode, setDarkMode] = useState(false);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
        setDarkMode((prev) => !prev);
        alert(darkMode ? "☀️ Mod light activat" : "🌙 Welcome to the dark side");
      }
    },
    [darkMode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const pages = [
    { name: "Deposit", path: "/deposit" },
    { name: "Jocuri", path: "/games"},
    { name: "Home", path: "/index" },
    { name: "Autentificare", path: "/LoginModal" },
    { name: "Inregistrare", path: "/RegisterModal" },
    { name: "Profil", path: "/profil" },
    { name: "Tranzactii", path: "/tranzactii" },
  
  ];

  return (
    <nav
      style={{
        padding: "1rem",
        background: darkMode
          ? "linear-gradient(90deg, #0b0c10, #1f2833, #45a29e)"
          : "linear-gradient(90deg, #87CEEB 0%, #00BFFF 50%, #1E90FF 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        color: darkMode ? "#c5c6c7" : undefined,
        userSelect: "none",
      }}
    >
      <h1
        onClick={() => setLogoClicks((c) => c + 1)}
        style={{
          marginBottom: "0.75rem",
          color: darkMode ? "#66fcf1" : "#fff",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.8rem",
          cursor: "pointer",
        }}
        title="Apasă rapid de 5 ori pentru un secret"
      >
        ✈️ AirSwift
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {pages.map(({ name, path }) => {
          const isActive = location.pathname === path;
          const baseStyle = {
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: "pointer",
            border: "none",
            minWidth: "100px",
            transition: "background-color 0.3s, color 0.3s",
            backgroundColor: isActive
              ? darkMode
                ? "#66fcf1"
                : "#004080"
              : darkMode
              ? "#1f2833"
              : "#e0f0ff",
            color: isActive ? (darkMode ? "#0b0c10" : "#fff") : darkMode ? "#c5c6c7" : "#004080",
            userSelect: "none",
          };

          return (
            <button
              key={path}
              style={baseStyle as React.CSSProperties}
              onClick={() => {
                if (name === "Profil") setProfileClicks((c) => c + 1);
                navigate(path);
              }}
              title={`Navighează la ${name}`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <footer
        style={{
          marginTop: "1rem",
          textAlign: "center",
          fontSize: "0.8rem",
          color: darkMode ? "#45a29e" : "#004080",
          cursor: "default",
          userSelect: "none",
          paddingTop: "0.5rem",
          borderTop: darkMode ? "1px solid #45a29e" : "1px solid #004080",
          position: "relative",
        }}
      >
        © 2025 AirSwift
      </footer>
    </nav>
  );
};

export default Navbar;
