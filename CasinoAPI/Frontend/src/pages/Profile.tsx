import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Tranzactii from './Tranzactii';
import Retragere from '../components/Retragere';

interface User {
  id: number;
  username: string;
  email: string;
  sold: number;
  avatarUrl?: string;
}

const predefinedAvatars = [
  { id: 'user1', url: '/images/user1.png' },
  { id: 'user2', url: '/images/user2.png' },
  { id: 'user3', url: '/images/user3.png' },
  { id: 'user4', url: '/images/user4.png' },
];

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [soldUpdateAmount, setSoldUpdateAmount] = useState<string>('');
  const [updateMessage, setUpdateMessage] = useState<string>('');
  const [updateError, setUpdateError] = useState<string>('');
  const [showTranzactii, setShowTranzactii] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await fetch('https://localhost:7201/api/User/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Eroare la preluarea datelor user:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAvatarSelect = (url: string) => {
    if (!user) return;
    setUser({ ...user, avatarUrl: url });
    setUploadError(null);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Te rugăm să încarci un fișier imagine valid.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Fișierul este prea mare. Maxim 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && user) {
        setUser({ ...user, avatarUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSoldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSoldUpdateAmount(e.target.value);
    setUpdateError('');
    setUpdateMessage('');
  };

  const handleUpdateSold = async () => {
    setUpdateError('');
    setUpdateMessage('');

    const suma = parseFloat(soldUpdateAmount);
    if (isNaN(suma) || suma <= 0) {
      setUpdateError('Introdu o sumă validă, mai mare decât 0.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('https://localhost:7201/api/User/update-sold', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(suma),
      });

      if (!res.ok) {
        const text = await res.text();
        setUpdateError(`Eroare: ${text}`);
        return;
      }

      const data = await res.json();
      setUser((prev) => (prev ? { ...prev, sold: data.soldCurent } : prev));
      setUpdateMessage(data.mesaj || 'Sold actualizat cu succes.');
      setSoldUpdateAmount('');
    } catch (error) {
      console.error(error);
      setUpdateError('Eroare la actualizarea soldului.');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Se încarcă datele utilizatorului...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Utilizatorul nu este autentificat.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: "url('/images/background-casino.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#374151',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          userSelect: 'none',
          textAlign: 'center',
        }}
      >
        {/* Avatar */}
        <img
          src={user.avatarUrl || '/images/user-placeholder.png'}
          alt="Avatar"
          style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #059669',
            marginBottom: '1rem',
          }}
        />

        <h2>{user.username}</h2>
        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          E-mail: <strong>{user.email}</strong>
        </p>
        <p
          style={{
            fontWeight: '700',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
          }}
        >
          Sold: <span style={{ color: '#059669' }}>{user.sold.toFixed(2)} RON</span>
        </p>

        {/* Depunere */}
        <div
          style={{
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Sumă depozit"
            value={soldUpdateAmount}
            onChange={handleSoldChange}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '150px',
              fontSize: '1rem',
            }}
          />
          <button
            onClick={handleUpdateSold}
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '1rem',
            }}
          >
            Depune bani
          </button>
        </div>

        {updateError && <p style={{ color: '#dc2626' }}>{updateError}</p>}
        {updateMessage && <p style={{ color: '#059669' }}>{updateMessage}</p>}

        {/* Retragere */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Retragere
            onSoldUpdate={(newSold) =>
              setUser((prev) => (prev ? { ...prev, sold: newSold } : prev))
            }
          />
        </div>

        {/* Avatar Selection */}
        <div
          style={{
            marginTop: '1.5rem',
            marginBottom: '2rem',
            userSelect: 'none',
          }}
        >
          <p style={{ fontWeight: '700', marginBottom: '0.8rem' }}>
            Alege un avatar preset:
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap',
            }}
          >
            {predefinedAvatars.map(({ id, url }) => (
              <img
                key={id}
                src={url}
                alt={`Avatar ${id}`}
                onClick={() => handleAvatarSelect(url)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: user.avatarUrl === url ? '3px solid #059669' : '2px solid #ccc',
                  transition: 'border-color 0.3s ease',
                }}
                title="Selectează avatar"
              />
            ))}
          </div>
          {uploadError && <p style={{ color: '#dc2626' }}>{uploadError}</p>}

          <div style={{ marginTop: '1rem' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              placeholder="Încarcă un avatar"
              title="Încarcă un avatar"
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                border: '1px solid #ccc',
                padding: '0.4rem 0.6rem',
              }}
            />
          </div>
        </div>

        {/* Tranzactii toggle */}
        <button
          onClick={() => setShowTranzactii((prev) => !prev)}
          style={{
            marginBottom: '1rem',
            backgroundColor: '#059669',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
          }}
        >
          {showTranzactii ? 'Ascunde tranzacțiile' : 'Arată tranzacțiile'}
        </button>

        {showTranzactii && <Tranzactii />}

        <button
          onClick={handleLogout}
          style={{
            marginTop: '2rem',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
          }}
        >
          Deconectare
        </button>
      </div>
    </div>
  );
};

export default Profile;
