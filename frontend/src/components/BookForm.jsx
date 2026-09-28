import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  author: "",
  category: "",
  isbn: "",
  publishedYear: "",
  status: "Available"
};

export default function BookForm({ selectedBook, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedBook) {
      setForm({
        title: selectedBook.title || "",
        author: selectedBook.author || "",
        category: selectedBook.category || "",
        isbn: selectedBook.isbn || "",
        publishedYear: selectedBook.publishedYear || "",
        status: selectedBook.status || "Available"
      });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [selectedBook]);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.category.trim() || !form.isbn.trim()) {
      setError("Please fill all required fields.");
      return;
    }
    onSave({
      ...form,
      publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined
    });
  };

  return (
    <form className="book-form" onSubmit={submit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{selectedBook ? "EDIT RECORD" : "NEW RECORD"}</p>
          <h2>{selectedBook ? "Update Book" : "Add a Book"}</h2>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <label>Book Title *</label>
      <input name="title" value={form.title} onChange={change} placeholder="Enter book title" />

      <label>Author *</label>
      <input name="author" value={form.author} onChange={change} placeholder="Enter author name" />

      <label>Category *</label>
      <input name="category" value={form.category} onChange={change} placeholder="e.g. Fiction" />

      <label>ISBN *</label>
      <input name="isbn" value={form.isbn} onChange={change} placeholder="Enter ISBN" />

      <label>Published Year</label>
      <input type="number" name="publishedYear" value={form.publishedYear} onChange={change} placeholder="2026" />

      <label>Status</label>
      <select name="status" value={form.status} onChange={change}>
        <option>Available</option>
        <option>Borrowed</option>
      </select>

      <div className="form-actions">
        <button className="primary" type="submit">
          {selectedBook ? "Update Book" : "Add Book"}
        </button>
        {selectedBook && (
          <button className="secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}