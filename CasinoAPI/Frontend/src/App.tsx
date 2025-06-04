import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pariuri from './pages/Pariuri';
import Jocuri from './pages/Jocuri';
import Tranzactii from './pages/Tranzactii';
import Deposit from './pages/Deposit';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

import Ruleta from './components/Luck/Ruleta';
import Blackjack from './components/Luck/Blackjack';
import SlotMachine from './components/Luck/SlotMachine';

import { UserProvider } from './components/UserContext'; // 👈 importă contextul

interface ApiResponse {
  message: string;
}

function App() {
  const [apiMessage, setApiMessage] = useState<string>('');

  useEffect(() => {
    fetch('https://localhost:5001/api/hello') // modifică dacă ai endpoint diferit
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        setApiMessage(data.message);
      })
      .catch((err) => console.error('API fetch error:', err));
  }, []);

  return (
    <UserProvider> {/* 👈 Învelește aplicația cu UserProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pariuri" element={<Pariuri />} />
            <Route path="jocuri" element={<Jocuri />} />
            <Route path="tranzactii" element={<Tranzactii />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="profil" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Jocuri individuale */}
            <Route path="ruleta" element={<Ruleta />} />
            <Route path="blackjack" element={<Blackjack />} />
            <Route path="slot" element={<SlotMachine />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
