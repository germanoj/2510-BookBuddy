import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <div>
      <nav>
        <Link to="/books">Books</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/account">Account</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BooksPage token={token} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route
          path="/register"
          element={<RegisterPage setToken={setToken} />}
        />
        <Route path="/account" element={<AccountPage token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
