import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import API from "./api/axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false,
  );

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await API.post("/logout");
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("token");

    setIsLoggedIn(false);

    setLoading(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard handleLogout={handleLogout} loading={loading} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
