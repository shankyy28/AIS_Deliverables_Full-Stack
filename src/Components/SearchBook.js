import React, { useEffect, useState } from "react";
import { searchBookByTitle } from "./BookService";
import { Link } from 'react-router-dom';
import "../Styling/Book.css"

export default function SearchBook() {
    const [search, setSearch] = useState("");
    const [searchedTitles, setSearchedTitles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search.trim() === "") {
            setSearchedTitles([]);
            return;
        }
        fetchData(search);
    }, [search]);

    async function fetchData(name) {
        try {
            setLoading(true);
            setError("");
            const results = await searchBookByTitle(name);
            setSearchedTitles(results);
        } catch (e) {
            setSearchedTitles([]);
            setError("Failed to fetch books by title.");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div className="book-search">
            <label><strong>Find Book: </strong></label>
            <input
                type="text"
                id="search"
                value={search}
                onChange={handleChange}
                placeholder="Enter the title..."
            />

            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}

            {searchedTitles.length > 0 && (
                <ul>
                    {searchedTitles.map(book => (
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`} className="action-btn view">{book.title} - ISBN: {book.isbn}</Link>
                        </li>
                    ))}
                </ul>
            )}

            {search && searchedTitles.length === 0 && (
                <p>No books found.</p>
            )}
        </div>
    );
}