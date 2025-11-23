import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api.js";

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
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const data = await registerUser(form);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/account");
    } catch (err) {
      setError("Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <label>
        First name
        <input
          name="firstname"
          value={form.firstname}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name
        <input name="lastname" value={form.lastname} onChange={handleChange} />
      </label>
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
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default RegisterPage;
