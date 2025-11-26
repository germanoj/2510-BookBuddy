import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

function RegisterPage({ setToken }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
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
      const data = await registerUser(form);
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }
      navigate("/account");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        First name
        <input
          name="firstname"
          type="text"
          value={form.firstname}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Last name
        <input
          name="lastname"
          type="text"
          value={form.lastname}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Create account</button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default RegisterPage;
