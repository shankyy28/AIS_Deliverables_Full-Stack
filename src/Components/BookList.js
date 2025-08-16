import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, deleteBook, getNameOfAuthorByBooks } from './BookService';
import '../Styling/Book.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorNames, setAuthorNames] = useState({});

  useEffect(() => {
    const fetchAuthorNames = async () => {
      const map = {};
      await Promise.all(books.map(async (book) => {
        map[book.authorId] = (await getNameOfAuthorByBooks(book.authorId));
      }));
      setAuthorNames(map);
    };

    if (books.length) {
      fetchAuthorNames();
    }
  }, [books]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please check the API connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (err) {
        alert('Book id does not exist.');
      }
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="book-list-container">
      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author ID</th>
              <th>Author Name</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authorId}</td>
                <td>{authorNames[book.authorId]}</td>
                <td>{book.isbn}</td>
                <td className="actions-cell">
                  <Link to={`/books/${book.id}`} className="action-btn view">View</Link>
                  <Link to={`/update/${book.id}`} className="action-btn edit">Update</Link>
                  <button onClick={() => handleDelete(book.id)} className="action-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;