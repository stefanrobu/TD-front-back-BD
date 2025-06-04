import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout"; // Asigură-te că e în folderul corect
import HomePage from "./pages/index";
import LoginPage from "./pages/LoginModal";
import RegisterModal from "./pages/RegisterModal";
import Profil from "./pages/profil";
import GamePage from "./pages/game";
import Tranzactii from "./pages/tranzactii";

import bgImage from "./assets/background-casino.jpeg"; // Asigură-te că acest fișier există

const fakeOnClose = () => {};
const fakeIsOpen = true;

function App() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch("https://localhost:5001/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        color: "white", // Asigură-te că textul este vizibil
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // strat de contrast
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage onClose={fakeOnClose} />} />
              <Route
                path="register"
                element={<RegisterModal onClose={fakeOnClose} isOpen={fakeIsOpen} />}
              />
              <Route path="profile" element={<Profil />} />
              <Route path="games" element={<GamePage />} />
              <Route path="tranzactii" element={<Tranzactii />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
