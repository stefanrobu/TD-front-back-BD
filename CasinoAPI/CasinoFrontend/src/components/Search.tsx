import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Game = {
  id: number;
  name: string;
  category: string;
  provider: string;
};

type GameSearchProps = {
  onSearch: (query: string) => void;
};

const GameSearch = ({ onSearch }: GameSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchGames = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://localhost:7239/api/CasinoGames?search=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch games");

      const data = await response.json();
      console.log("Received from backend:", data);

      const mappedGames = data.map((g: any) => ({
        id: g.idGame,
        name: g.name || "Unknown",
        category: g.category || "Unknown",
        provider: g.provider || "Unknown",
      }));

      setGames(mappedGames);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    fetchGames(searchTerm);
  };

  const playGame = (game: Game) => {
    // Optional auth check
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You need to log in to play games.");
      navigate("/login");
      return;
    }

    navigate(`/game?id=${game.id}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-grow gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search casino games..."
            className="flex-grow border px-4 py-2 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-6">
        {games.length > 0 ? (
          games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-100 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{game.name}</h3>
                <p className="text-sm text-gray-600">Category: {game.category}</p>
                <p className="text-sm text-gray-600">Provider: {game.provider}</p>
              </div>
              <button
                onClick={() => playGame(game)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Play
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No games found.</p>
        )}
      </div>
    </div>
  );
};

export default GameSearch;
