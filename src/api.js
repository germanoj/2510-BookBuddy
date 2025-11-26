const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchBooks() {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) throw new Error("Error loading books");
  const data = await response.json();
  return data.books || data;
}

export async function fetchBookById(id) {
  const response = await fetch(`${API_URL}/books/${id}`);
  if (!response.ok) throw new Error("Error loading book");
  const data = await response.json();
  return data.book || data;
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export async function registerUser(form) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
}

export async function fetchAccount(token) {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to load account");
  return response.json();
}

export async function reserveBook(token, bookId) {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
  if (!response.ok) throw new Error("Failed to reserve book");
  return response.json();
}

export async function returnReservation(token, reservationId) {
  const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to return reservation");
}
