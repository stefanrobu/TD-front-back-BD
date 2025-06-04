import React, { useState } from 'react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (username.trim().length < 3) {
      setError('Username trebuie să aibă cel puțin 3 caractere.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Adresa de email nu este validă.');
      return;
    }
    if (password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Parolele nu coincid.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7201/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Eroare la înregistrare.');
        setLoading(false);
        return;
      }

      setSuccess('Cont creat cu succes! Poți să te loghezi.');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Nu se poate conecta la server.');
    }

    setLoading(false);
  };

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
        userSelect: 'none',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.35)',
          padding: '2.5rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          userSelect: 'text',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '2rem',
            color: '#059669',
            textAlign: 'center',
            userSelect: 'text',
          }}
        >
          Înregistrare
        </h1>

        {error && (
          <p
            style={{
              color: '#b91c1c',
              fontWeight: '600',
              marginBottom: '1.5rem',
              userSelect: 'text',
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              color: '#065f46',
              fontWeight: '600',
              marginBottom: '1.5rem',
              userSelect: 'text',
            }}
          >
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <label
            htmlFor="username"
            style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#065f46',
              userSelect: 'text',
            }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            minLength={3}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '14px',
              border: '2px solid #d1d5db',
              fontSize: '1rem',
              marginBottom: '1.5rem',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'text',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.boxShadow = '0 0 8px #10b981';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
            spellCheck={false}
            autoComplete="username"
          />

          {/* Email */}
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#065f46',
              userSelect: 'text',
            }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '14px',
              border: '2px solid #d1d5db',
              fontSize: '1rem',
              marginBottom: '1.5rem',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'text',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.boxShadow = '0 0 8px #10b981';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
            autoComplete="email"
          />

          {/* Password */}
          <label
            htmlFor="password"
            style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#065f46',
              userSelect: 'text',
            }}
          >
            Parola
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '14px',
              border: '2px solid #d1d5db',
              fontSize: '1rem',
              marginBottom: '1.5rem',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'text',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.boxShadow = '0 0 8px #10b981';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <label
            htmlFor="confirmPassword"
            style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: error ? '0.5rem' : '1.5rem',
              color: '#065f46',
              userSelect: 'text',
            }}
          >
            Confirmă parola
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '14px',
              border: '2px solid #d1d5db',
              fontSize: '1rem',
              marginBottom: error ? '0.5rem' : '1.5rem',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'text',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.boxShadow = '0 0 8px #10b981';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.boxShadow = 'none';
            }}
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#6ee7b7' : '#10b981',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '14px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s ease',
              userSelect: 'none',
            }}
            onMouseEnter={e => {
              if (!loading) e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseLeave={e => {
              if (!loading) e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            {loading ? 'Înregistrare...' : 'Înregistrează-te'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
export {  };