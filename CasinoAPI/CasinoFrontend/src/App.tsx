// src/App.tsx
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/deposit";
import HomePage from "./pages/index";
import LoginPage from "./pages/LoginModal";      
import RegisterPage from "./pages/RegisterModal"       ;
import Profil from "./pages/profil";
import GamePage from "./pages/game";
import RegisterModal from './pages/RegisterModal';
import Tranzactii from './pages/tranzactii';

<Route path="/games" element={<GamePage />} />

interface ApiResponse {
  message: string;
}

function App() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch("https://localhost:5001/api/hello")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setData(data.message);
      })
      .catch((err) => console.error("API fetch error:", err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="flights" element={<FlightsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkin" element={<CheckInPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterModal />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
