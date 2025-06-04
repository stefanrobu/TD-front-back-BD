import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Client {
  idClient: number;
  emailClient: string;
  numeClient: string;
  prenumeClient: string;
}

const Profil = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [editNume, setEditNume] = useState("");
  const [editPrenume, setEditPrenume] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) return;

    axios.get(`https://localhost:7201/api/Client/${clientId}`)
      .then((response) => {
        setClient(response.data);
        setEditNume(response.data.numeClient);
        setEditPrenume(response.data.prenumeClient);
        setEditEmail(response.data.emailClient);
      })
      .catch((error) => {
        console.error("Eroare la preluarea datelor client:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("clientId");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (!client) return;

    axios.delete(`https://localhost:7201/api/Client/${client.idClient}`)
      .then(() => {
        localStorage.removeItem("clientId");
        navigate("/register");
      })
      .catch((error) => {
        console.error("Eroare la ștergerea contului:", error);
      });
  };

  const handleUpdateProfile = () => {
    if (!client) return;

    const updatedClient = {
      ...client,
      numeClient: editNume,
      prenumeClient: editPrenume,
      emailClient: editEmail,
    };

    axios.put(`https://localhost:7239/api/Client/${client.idClient}`, updatedClient)
      .then(() => {
        setClient(updatedClient);
        alert("Datele au fost actualizate cu succes.");
      })
      .catch((error) => {
        console.error("Eroare la actualizarea profilului:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Profilul Meu</h2>

      {client ? (
        <>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Nume:</label>
              <input
                type="text"
                value={editNume}
                onChange={(e) => setEditNume(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Introdu numele"
              />
            </div>
            <div>
              <label className="block font-semibold">Prenume:</label>
              <input
                type="text"
                value={editPrenume}
                onChange={(e) => setEditPrenume(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Introdu prenumele"
              />
            </div>
            <div>
              <label className="block font-semibold">Email:</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Introdu emailul"
              />
            </div>

            <button
              onClick={handleUpdateProfile}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Salvează modificările
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold mt-4"
            >
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold mt-2"
            >
              Șterge contul
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-6 italic">Nu ești autentificat. Te rugăm să te loghezi.</p>
      )}
    </div>
  );
};

export default Profil;
