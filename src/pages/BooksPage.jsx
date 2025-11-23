import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../api.js";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadBooks();
  }, []);

  if (error) return <p>{error}</p>;
  if (!books.length) return <p>Loading books...</p>;

  return (
    <div className="books-grid">
      {books.map((book) => (
        <Link key={book.id} to={`/books/${book.id}`} className="book-card">
          <img src={book.coverimage} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.available ? "Available" : "Reserved"}</p>
        </Link>
      ))}
    </div>
  );
}

export default BooksPage;
