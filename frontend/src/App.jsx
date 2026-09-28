import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const API = https://library-management-system-6mx1.onrender.com/api/books

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API, { params: { search } });
      setBooks(response.data);
    } catch {
      setMessage("Cannot connect to backend. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadBooks, 250);
    return () => clearTimeout(timer);
  }, [search]);

  const saveBook = async (book) => {
    try {
      if (selectedBook) {
        await axios.put(`${API}/${selectedBook._id}`, book);
        setMessage("Book updated successfully.");
      } else {
        await axios.post(API, book);
        setMessage("Book added successfully.");
      }
      setSelectedBook(null);
      await loadBooks();
    } catch (error) {
      setMessage(error.response?.data?.message || "Operation failed.");
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      setMessage("Book deleted successfully.");
      await loadBooks();
    } catch {
      setMessage("Unable to delete book.");
    }
  };

  const toggleStatus = async (book) => {
    try {
      await axios.put(`${API}/${book._id}`, {
        ...book,
        status: book.status === "Available" ? "Borrowed" : "Available"
      });
      await loadBooks();
    } catch {
      setMessage("Unable to update book status.");
    }
  };

  const stats = useMemo(() => ({
    total: books.length,
    available: books.filter((b) => b.status === "Available").length,
    borrowed: books.filter((b) => b.status === "Borrowed").length
  }), [books]);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">📚</div>
          <div>
            <h1>LibraryHub</h1>
            <p>Library Management System</p>
          </div>
        </div>
        <div className="header-chip">MERN STACK</div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">LIBRARY DASHBOARD</p>
            <h2>Manage your collection</h2>
            <p>Add, update, search and manage books from one simple dashboard.</p>
          </div>
          <div className="stats">
            <div><strong>{stats.total}</strong><span>Total</span></div>
            <div><strong>{stats.available}</strong><span>Available</span></div>
            <div><strong>{stats.borrowed}</strong><span>Borrowed</span></div>
          </div>
        </section>

        {message && (
          <div className="notice">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}

        <section className="grid">
          <BookForm
            selectedBook={selectedBook}
            onSave={saveBook}
            onCancel={() => setSelectedBook(null)}
          />

          <div className="library-panel">
            <div className="panel-top">
              <div>
                <p className="eyebrow">COLLECTION</p>
                <h2>Books</h2>
              </div>
              <input
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔎 Search books..."
              />
            </div>
            <BookList
              books={books}
              loading={loading}
              onEdit={setSelectedBook}
              onDelete={deleteBook}
              onToggleStatus={toggleStatus}
            />
          </div>
        </section>
      </main>

      <footer>Library Management System • MERN Stack Project</footer>
    </div>
  );
}