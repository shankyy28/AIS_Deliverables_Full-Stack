import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, updateBook, getBookById } from './BookService';
import '../Styling/Book.css';

const initialFormState = {
  title: '',
  isbn: '',
  pages: 0,
  price: 0,
  publishedDate: '',
  isAvailable: false,
  authorId: 0
};

function BookForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for update

  const isUpdate = !!id;  // False means its a create, else its an update

  useEffect(() => {
    if (isUpdate) {
      setLoading(true);
      getBookById(id)
      .then(data => {
        setFormData({
          title: data.title,
          isbn: data.isbn,
          pages: data.pages,
          price: data.price,
          publishedDate: data.publishedDate.split('T')[0],
          isAvailable: data.isAvailable,
          authorId: data.authorId,
        });
      })
      .catch(() => setError('Failed to fetch book for update.'))
      .finally(() => setLoading(false));
    } else {
      setFormData(initialFormState);
    }
  }, [id, isUpdate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const bookData = {
        ...formData,
        pages: parseInt(formData.pages),
        price: parseFloat(formData.price),
        authorId: parseInt(formData.authorId),
      };

      if (isUpdate) {
        await updateBook(id, bookData);
        alert('Book updated successfully!');
      } else {
        await createBook(bookData);
        alert('Book created successfully!');
      }
      navigate('/books');
    } catch (err) {
      setError(`Failed to ${isUpdate ? 'update' : 'create'} book. Check the form data and API connection.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isUpdate) return <p>Loading book details for update...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="form-container">
      <h2>{isUpdate ? 'Update Book' : 'Create New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ISBN (13 digits):</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            minLength="13"
            maxLength="13"
            pattern="[0-9]{13}"
            required
          />
        </div>
        <div className="form-group">
          <label>Pages:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label>Published Date:</label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            Is Available
          </label>
        </div>
        <div className="form-group">
          <label>Author ID:</label>
          <input
            type="number"
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : isUpdate ? 'Update Book' : 'Create Book'}
        </button>
      </form>
    </div>
  );
}

export default BookForm;