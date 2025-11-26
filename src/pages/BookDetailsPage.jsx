import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, reserveBook } from "../api.js";

function BookDetailsPage({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadBook();
  }, [id]);

  const handleReserve = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await reserveBook(token, book.id);
      setMessage("Book reserved!");
      setBook({ ...book, available: false });
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading book...</p>;

  const disabled = !book.available;

  return (
    <div>
      <img src={book.coverimage} alt={book.title} />
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>{book.description}</p>
      <button onClick={handleReserve} disabled={disabled}>
        {disabled ? "Not Available" : "Reserve"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookDetailsPage;
