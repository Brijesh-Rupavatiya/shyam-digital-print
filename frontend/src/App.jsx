import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const API = import.meta.env.VITE_API_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false,
  );

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
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        loading={loading}
      />

      {isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}

export default App;
