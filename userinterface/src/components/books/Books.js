import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Books.css';
import Navbar from '../navbar/Navbar';
import { BASE_URL } from '../../config';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async () => {
    if (title && author && description && code && selectedGenre) {
      const newBook = {
        title,
        author,
        description,
        code,
        genre: selectedGenre,
      };

      try {
        const response = await axios.post(`${BASE_URL}/books`, newBook);
        const addedBook = response.data; // Assuming the response contains the added book
        setBooks([...books, addedBook]); // Add the new book to the existing books array
        setTitle('');
        setAuthor('');
        setDescription('');
        setCode('');
        setSelectedGenre('');

        // Fetch the updated books data again
        fetchBooks();
      } catch (error) {
        console.error('Error adding book:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`${BASE_URL}/books/${bookId}`);
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const editBook = async (bookId) => {
    const bookToEdit = books.find((book) => book._id === bookId);
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setDescription(bookToEdit.description);
      setCode(bookToEdit.code);
      setSelectedGenre(bookToEdit.genre);
      deleteBook(bookId); // Delete the existing book from the backend
    }
  };
  
  const genres = [
    'All Books',
    'Adventure',
    'Mystery',
    'Fantasy',
    'Romance',
    'Sci-Fi',
    'History',
    'Poetry',
    'Children',
  ];

  return (
    <div className="books-page">
      <Navbar />
      <h1 className="page-title">Books Page</h1>

      <div className="add-book-form">
        <h2>Add Book</h2>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Book Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Book Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="genre-dropdown">
          <label htmlFor="genre-select">Genre:</label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <button className="add-book-button" onClick={addBook}>
          Add Book
        </button>
      </div>

      <div className="table2">
        <div className="table-row2 table-header">
          <div className="table-cell2">Book Title</div>
          <div className="table-cell2">Book Author</div>
          <div className="table-cell2">Book Description</div>
          <div className="table-cell2">Book Code</div>
          <div className="table-cell2">Genre</div>
          <div className="table-cell2">Actions</div>
        </div>
        <div className="table-body2">
          {books.length > 0 ? (
            books.map((book) => {
              if (
                selectedGenre === '' ||
                selectedGenre === 'All Books' ||
                selectedGenre === book.genre
              ) {
                return (
                  <div className="table-row" key={book._id}>
                    <div className="table-cell3">{book.title}</div>
                    <div className="table-cell3">{book.author}</div>
                    <div className="table-cell3">{book.description}</div>
                    <div className="table-cell3">{book.code}</div>
                    <div className="table-cell3">{book.genre}</div>
                    <div className="table-cell3">
                      <button onClick={() => deleteBook(book._id)}>Delete</button>
                      <button onClick={() => editBook(book._id)}>Edit</button>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
