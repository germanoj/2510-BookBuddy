import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../api";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(Array.isArray(data) ? data : data.books || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading books");
      }
    };

    loadBooks();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!books.length) {
    return <p>Loading books...</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.title} – {book.author}
            </Link>{" "}
            {book.available ? "(Available)" : "(Not available)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksPage;
