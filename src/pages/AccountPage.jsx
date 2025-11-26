import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccount, returnReservation } from "../api";

function AccountPage({ token }) {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadAccount = async () => {
      try {
        setLoading(true);
        const data = await fetchAccount(token);
        setAccount(data);
      } catch (err) {
        setError(err.message || "Failed to load account");
      } finally {
        setLoading(false);
      }
    };

    loadAccount();
  }, [token, navigate]);

  const handleReturn = async (reservationId) => {
    try {
      await returnReservation(token, reservationId);
      setAccount((prev) => ({
        ...prev,
        reservations: prev.reservations.filter(
          (res) => res.id !== reservationId
        ),
      }));
    } catch (err) {
      setError(err.message || "Failed to return book");
    }
  };

  if (loading) return <p>Loading account...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!account) return <p>No account data.</p>;

  return (
    <div>
      <h2>Your Account</h2>
      <p>
        <strong>Name:</strong> {account.firstname} {account.lastname}
      </p>
      <p>
        <strong>Email:</strong> {account.email}
      </p>

      <h3>Your Reservations</h3>
      {(!account.reservations || account.reservations.length === 0) && (
        <p>You have no reserved books.</p>
      )}

      {account.reservations && account.reservations.length > 0 && (
        <ul>
          {account.reservations.map((res) => (
            <li key={res.id} style={{ marginBottom: "1rem" }}>
              <strong>{res.title}</strong> by {res.author}
              <br />
              <button onClick={() => handleReturn(res.id)}>
                Return this book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccountPage;
