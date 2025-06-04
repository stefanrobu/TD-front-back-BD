import { useState, useEffect, useRef } from "react";
import axios from "axios";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus pe input la mount
    emailInputRef.current?.focus();

    // event listener Escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // previne multiple submit-uri

    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Te rog introdu un email valid.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7201/api/Auth/login",
        {
          Email: email,
          Parola: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data;
      localStorage.setItem("clientId", user.idClient);
      window.location.href = "/profile";
    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setErrorMsg("Parola incorectă.");
            break;
          case 404:
            setErrorMsg("Contul nu există.");
            break;
          case 400:
            setErrorMsg("Datele introduse sunt invalide.");
            break;
          default:
            setErrorMsg("Eroare necunoscută.");
        }
      } else {
        setErrorMsg("Serverul nu răspunde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
          aria-label="Închide fereastra de autentificare"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">
          Autentificare
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            ref={emailInputRef}
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Parolă"
            className="w-full p-3 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Parolă"
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-700 hover:bg-indigo-800"
            }`}
          >
            {isLoading ? "Se autentifică..." : "Autentifică-te"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Nu ai cont?{" "}
          <a href="/register" className="text-indigo-600 underline">
            Înregistrează-te
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
