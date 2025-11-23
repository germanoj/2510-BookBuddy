import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchReservations, returnReservation } from "../api.js";

function AccountPage({ token, user }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReservations = async () => {
      if (!token) return;
      try {
        const data = await fetchReservations(token);
        setReservations(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadReservations();
  }, [token]);

  if (!token) {
    return (
      <div>
        <p>You need to log in to view your account.</p>
        <Link to="/login">Log in</Link> or <Link to="/register">register</Link>
      </div>
    );
  }

  const handleReturn = async (reservationId) => {
    try {
      await returnReservation(token, reservationId);
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (err) {
      setError("Could not return book.");
    }
  };

  return (
    <div>
      <h2>Your Account</h2>
      {user && (
        <>
          <p>
            Name: {user.firstname} {user.lastname}
          </p>
          <p>Email: {user.email}</p>
        </>
      )}
      {error && <p>{error}</p>}

      <h3>Your Reservations</h3>
      {reservations.length === 0 ? (
        <p>You have no reserved books.</p>
      ) : (
        <ul>
          {reservations.map((res) => (
            <li key={res.id}>
              <strong>{res.title}</strong> by {res.author}
              <button onClick={() => handleReturn(res.id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccountPage;
