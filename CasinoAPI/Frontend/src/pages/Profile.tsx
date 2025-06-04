import React from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  sold: number;
}

const dummyUser: User = {
  id: 1,
  username: 'alex23',
  email: 'alex23@example.com',
  sold: 250.75,
};

const Profile: React.FC = () => {
  // În realitate, ai lua datele utilizatorului din context/global state sau API
  const user = dummyUser;

  const handleLogout = () => {
    // Logica de logout: ex: șterge token, redirecționează la login etc.
    alert('Logout realizat.');
    // window.location.href = '/login'; // exemplu redirect
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-6">Profil utilizator</h1>

      <div className="mb-4">
        <strong>Username:</strong> <span>{user.username}</span>
      </div>

      <div className="mb-4">
        <strong>Email:</strong> <span>{user.email}</span>
      </div>

      <div className="mb-6">
        <strong>Sold cont:</strong> <span>{user.sold.toFixed(2)} RON</span>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
// Adaugă asta la sfârșitul fișierului
export {};
