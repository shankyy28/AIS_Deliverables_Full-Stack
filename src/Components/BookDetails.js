import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById } from './BookService';
import '../Styling/Book.css';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError('Book not found or API error.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!book) return <p className="error">Book not found.</p>;

  return (
    <div className="book-details-container">
      <h2>Book Details</h2>
      <div className="details-card">
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author ID:</strong> {book.authorId}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Price:</strong> {book.price}</p>
        <p><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
        <p><strong>Available:</strong> {book.isAvailable ? 'Yes' : 'No'}</p>
      </div>
      <Link to="/books" className="back-btn">Back to All Books</Link>
      <Link to="/search" className="search-back-btn">Back to Search Books</Link>
    </div>
  );
}

export default BookDetails;