import { useEffect, useState } from "react";

interface Game {
  id: number;
  nume: string;
  imagineUrl: string;
  jackpot: number;
}

const GamePage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("/api/casino/games"); // endpoint backend pentru jocuri
        if (!response.ok) {
          throw new Error("Eroare la încărcarea jocurilor.");
        }
        const data: Game[] = await response.json();
        setGames(data);
      } catch (err: any) {
        setError(err.message || "Eroare neașteptată.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-600 text-xl font-semibold">
        Se încarcă jocurile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 px-6 py-12">
      <h2 className="text-4xl font-extrabold text-orange-700 mb-10 text-center relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-orange-400 after:rounded-sm after:mt-2">
        Jocuri de Noroc
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={game.imagineUrl}
              alt={game.nume}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{game.nume}</h3>
            <p className="text-orange-600 font-semibold mt-2">
              Jackpot:{" "}
              {game.jackpot.toLocaleString("ro-RO", {
                style: "currency",
                currency: "RON",
              })}
            </p>
            <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl shadow hover:bg-orange-600 transition">
              Joacă acum
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
