import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BookList from './Components/BookList';
import BookDetails from './Components/BookDetails';
import BookForm from './Components/BookForm';
import SearchBook from './Components/SearchBook';
import Introduction from './Components/Introduction';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/create" element={<BookForm />} />
            <Route path="/update/:id" element={<BookForm />} />
            <Route path="/search" element={<SearchBook />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;