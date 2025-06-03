import { useState } from "react";

interface Tranzactie {
  id: number;
  data: string;
  suma: number;
  descriere: string;
  tip: "Plată" | "Încasare";
}

// --- COMPONENTA RegisterPage ca pop-up ---
const RegisterPage = ({ onClose }: { onClose: () => void }) => {
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
      const response = await fetch("https://localhost:7239/api/Client", {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
          aria-label="Închide"
        >
          &times;
        </button>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-green-700">
          Înregistrare Client
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="prenume"
            placeholder="Prenume"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />
          <input
            name="nume"
            placeholder="Nume"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />
          <input
            name="parola"
            type="password"
            placeholder="Parolă"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
          />
          {errorMsg && (
            <p className="text-red-600 font-semibold text-center">{errorMsg}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition duration-300"
          >
            Înregistrează-te
          </button>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTA Tranzactii ---
const Tranzactii = () => {
  const [tranzactii, setTranzactii] = useState<Tranzactie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch simulare tranzacții
  useState(() => {
    const fetchTranzactii = async () => {
      try {
        const data: Tranzactie[] = [
          {
            id: 1,
            data: "2025-06-01",
            suma: 100,
            descriere: "Plată curs caiac",
            tip: "Plată",
          },
          {
            id: 2,
            data: "2025-06-02",
            suma: 250,
            descriere: "Încasare rambursare tabără",
            tip: "Încasare",
          },
        ];
        setTranzactii(data);
      } catch (err) {
        console.error(err);
        setError("Eroare la încărcarea tranzacțiilor.");
      } finally {
        setLoading(false);
      }
    };
    fetchTranzactii();
  });

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Tranzacțiile Mele
      </h1>

      {loading && <p className="text-center text-gray-500">Se încarcă...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && tranzactii.length === 0 && (
        <p className="text-center text-gray-500">Nu există tranzacții.</p>
      )}

      {!loading && tranzactii.length > 0 && (
        <div className="space-y-4">
          {tranzactii.map((t) => (
            <div
              key={t.id}
              className={`flex justify-between items-center border-l-4 ${
                t.tip === "Plată" ? "border-red-500" : "border-green-500"
              } bg-gray-50 p-4 rounded-xl shadow-sm`}
            >
              <div>
                <p className="text-lg font-semibold">{t.descriere}</p>
                <p className="text-sm text-gray-500">{t.data}</p>
              </div>
              <div
                className={`text-lg font-bold ${
                  t.tip === "Plată" ? "text-red-500" : "text-green-600"
                }`}
              >
                {t.tip === "Plată" ? "-" : "+"}${t.suma.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- COMPONENTA PRINCIPALĂ INDEX ---
const IndexPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [page, setPage] = useState<"tranzactii" | "home">("home");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-200 to-blue-300 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-green-700">Contul Meu</h1>
        <nav className="space-x-4">
          <button
            onClick={() => setPage("home")}
            className={`font-semibold px-3 py-1 rounded-md ${
              page === "home"
                ? "bg-green-600 text-white"
                : "text-green-700 hover:bg-green-100"
            }`}
          >
            Acasă
          </button>
          <button
            onClick={() => setPage("tranzactii")}
            className={`font-semibold px-3 py-1 rounded-md ${
              page === "tranzactii"
                ? "bg-green-600 text-white"
                : "text-green-700 hover:bg-green-100"
            }`}
          >
            Tranzacții
          </button>
          <button
            onClick={() => setShowRegister(true)}
            className="font-semibold px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Înregistrare Client
          </button>
        </nav>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-6">
        {page === "home" && (
          <div className="text-center text-green-900 text-xl font-semibold">
            Bine ai venit în contul tău!
            <br />
            Folosește meniul de sus pentru a naviga.
          </div>
        )}

        {page === "tranzactii" && <Tranzactii />}
      </main>

      {showRegister && <RegisterPage onClose={() => setShowRegister(false)} />}
    </div>
  );
};

export default IndexPage;
