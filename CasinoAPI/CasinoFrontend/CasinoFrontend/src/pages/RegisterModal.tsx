import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    prenume: "",
    nume: "",
    email: "",
    parola: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !formData.prenume.trim() ||
      !formData.nume.trim() ||
      !formData.email.trim() ||
      !formData.parola.trim()
    ) {
      setErrorMsg("Prenume, nume, email, parola sunt obligatorii!");
      return;
    }

    try {
      const response = await fetch("https://localhost:7201/api/Client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmailClient: formData.email,
          ParolaClient: formData.parola,
          NumeClient: formData.nume,
          PrenumeClient: formData.prenume,
        }),
      });

      if (response.status === 400) {
        const text = await response.text();
        setErrorMsg(text);
        return;
      }

      if (response.status === 409) {
        setErrorMsg("Email-ul există deja!");
        return;
      }

      if (!response.ok) {
        setErrorMsg("Eroare la înregistrare!");
        return;
      }

      alert("Înregistrare reușită!");
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg("Eroare la înregistrare!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Înregistrare Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="prenume"
            placeholder="Prenume"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            name="nume"
            placeholder="Nume"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
          />
          <input
            name="parola"
            type="password"
            placeholder="Parolă"
            className="w-full p-3 border border-gray-300 rounded"
            onChange={handleChange}
          />

          {errorMsg && (
            <p className="text-red-600 text-center font-medium">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Înregistrează-te
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
