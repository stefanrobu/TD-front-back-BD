import { useEffect, useState } from "react";

interface Tranzactie {
  id: number;
  data: string;
  suma: number;
  descriere: string;
  tip: "Plată" | "Încasare";
}

const Tranzactii = () => {
  const [tranzactii, setTranzactii] = useState<Tranzactie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTranzactii = async () => {
      try {
        // Simulare fetch. Înlocuiește cu API real:
        // const res = await fetch("https://localhost:7201/api/Tranzactii");
        // const data = await res.json();
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
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
    </div>
  );
};

export default Tranzactii;
