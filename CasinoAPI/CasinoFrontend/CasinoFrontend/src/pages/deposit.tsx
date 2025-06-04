import { useState } from "react";

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Introdu o sumă validă.");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch("/api/casino/depunere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Eroare la depunere.");
      }

      const data = await response.json();
      console.log("Depunere efectuată:", data);

      setSuccess(true);
      setAmount("");
    } catch (err: any) {
      setError(err.message || "Eroare neașteptată.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-12">
      <h2 className="text-4xl font-extrabold text-emerald-700 mb-10 relative after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-emerald-400 after:rounded-sm after:mt-2">
        Depunere Fonduri
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <input
          type="number"
          name="amount"
          placeholder="Sumă (RON)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-emerald-300 transition"
          required
          min="0.01"
          step="0.01"
          disabled={loading}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-white py-3 px-10 rounded-xl shadow-md hover:bg-emerald-700 hover:shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Se procesează..." : "Depune"}
          </button>
        </div>

        {success && (
          <p className="text-green-600 text-center font-semibold">
            Depunere efectuată cu succes!
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center font-semibold">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default DepositPage;
