import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api.js";

function LoginPage({ setToken }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const data = await loginUser(form);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/account");
    } catch (err) {
      setError("Login failed. Check your email/password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      {error && <p>{error}</p>}
      <label>
        Email
        <input name="email" value={form.email} onChange={handleChange} />
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
      <button type="submit">Log In</button>
      <p>
        Need an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default LoginPage;
