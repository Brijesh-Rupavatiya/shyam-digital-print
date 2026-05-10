import { useState } from "react";

export default function Dashboard({ setIsLoggedIn }) {
  const API = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    await fetch(`${API}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");

    setIsLoggedIn(false);

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <h1 className="text-white text-3xl font-bold mb-6">Admin Dashboard</h1>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
