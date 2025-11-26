import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

function LoginPage({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/account");
    } catch (err) {
      setError(err.message || "Login failed. Check email/password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Log in</button>

      <p>
        Need an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default LoginPage;
