export default function BookList({ books, loading, onEdit, onDelete, onToggleStatus }) {
  if (loading) return <div className="empty">Loading books...</div>;

  if (!books.length) {
    return (
      <div className="empty">
        <div className="empty-icon">📚</div>
        <h3>No books found</h3>
        <p>Add your first book using the form.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <article className="book-card" key={book._id}>
          <div className="book-cover">📖</div>
          <div className="book-info">
            <div className="book-title-row">
              <h3>{book.title}</h3>
              <span className={`badge ${book.status.toLowerCase()}`}>{book.status}</span>
            </div>
            <p className="author">by {book.author}</p>
            <div className="meta">
              <span>{book.category}</span>
              <span>ISBN: {book.isbn}</span>
              {book.publishedYear && <span>{book.publishedYear}</span>}
            </div>
            <div className="actions">
              <button onClick={() => onToggleStatus(book)}>
                {book.status === "Available" ? "Mark Borrowed" : "Mark Available"}
              </button>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button className="danger" onClick={() => onDelete(book._id)}>Delete</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}