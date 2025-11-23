import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import BookDetailsPage from "./pages/BookDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import { fetchMe } from "./api.js";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Load user when token changes
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const me = await fetchMe(token);
        setUser(me);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };
    loadUser();
  }, [token]);

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetailsPage token={token} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route
          path="/register"
          element={<RegisterPage setToken={setToken} />}
        />
        <Route
          path="/account"
          element={<AccountPage token={token} user={user} />}
        />
      </Routes>
    </>
  );
}

export default App;
