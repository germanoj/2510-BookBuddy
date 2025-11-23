import { Link } from "react-router-dom";

function NavBar({ user, onLogout }) {
  return (
    <nav>
      <Link to="/books">Book Buddy</Link>
      <Link to="/books">Books</Link>
      <Link to="/account">Account</Link>
      {user ? (
        <>
          <span>Hi, {user.firstname}</span>
          <button onClick={onLogout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
