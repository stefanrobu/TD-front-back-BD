import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Dark mode simplu, toggle prin click pe buton (opțional)
  const [darkMode, setDarkMode] = useState(false);

  const pages = [
    { name: "Deposit", path: "/deposit" },
    { name: "Jocuri", path: "/games" },
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
        style={{
          marginBottom: "0.75rem",
          color: darkMode ? "#66fcf1" : "#fff",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.8rem",
          cursor: "default",
        }}
      >
        BetonHot
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
            color: isActive
              ? darkMode
                ? "#0b0c10"
                : "#fff"
              : darkMode
              ? "#c5c6c7"
              : "#004080",
            userSelect: "none",
          };

          return (
            <button
              key={path}
              style={baseStyle as React.CSSProperties}
              onClick={() => navigate(path)}
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
        © 2025 BetonHot
      </footer>
    </nav>
  );
};

export default Navbar;
