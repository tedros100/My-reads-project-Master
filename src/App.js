import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import Book from './components/Book'
import SearchBooks from './components/SearchBooks'

export default function BooksApp  ()  {

  /* TODO: Instead of using this state variable to keep track of which page
  * we're on, use the URL in the browser's address bar. This will ensure that
  * users can use the browser's back and forward buttons to navigate between
  * pages, as well as provide a good URL they can bookmark and share.
  */
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState([])
  const [mapOfBooks, setMapOfBooks] = useState(new Map());
  const [searchBooks, setSearchBooks] = useState([]);
  const [combinedBooks, setCombinedBooks] = useState([]);

  useEffect(() => {
    getAllBooks()
  }, [showSearchPage])

  const getAllBooks = ()=>{
    BooksAPI.getAll()
    .then(data => {
      setBooks(data) 
      setMapOfBooks(createMapOfBooks(data))
    }
    );
  }

  useEffect(() => {  
    setCombinedBooks(searchBooks.map(book => {
      if (mapOfBooks.has(book.id)) {
        return mapOfBooks.get(book.id);
      } else {
        return book;
      }
    }));
  }, [searchBooks])


  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const updateBookShelf = (book, moveTo) => {
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = moveTo;
        return book;
      }
      return b;
    })
    setBooks(updatedBooks);
    BooksAPI.update(book, moveTo);
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBooks setShowSearchPage={setShowSearchPage} updateBookShelf={updateBookShelf} />
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelves books={books} updateBookShelf={updateBookShelf} />
          </div>
          <div className="open-search">
            <button onClick={() => setShowSearchPage(true)}>Add a book</button>
          </div>
        </div>
      )}
    </div>
  )

}

