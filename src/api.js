const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchBooks() {
  const res = await fetch(`${BASE_URL}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function fetchBookById(id) {
  const res = await fetch(`${BASE_URL}/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export async function registerUser(formData) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to register");
  return res.json();
}

export async function loginUser(formData) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to login");
  return res.json();
}

export async function fetchMe(token) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchReservations(token) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch reservations");
  return res.json();
}

export async function reserveBook(token, bookId) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookId }),
  });
  if (!res.ok) throw new Error("Failed to reserve book");
  return res.json();
}

export async function returnReservation(token, reservationId) {
  const res = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to return book");
}
