import React, { useState, useEffect } from "react";
import Book from './Book';
import * as BooksAPI from "../BooksAPI";

export default function SearchBooks(props) {

  const [query, setQuery] = useState("")
  const [searchedBooks, setSearchedBooks] = useState([])

  useEffect(() => {
    if (query) {
      BooksAPI.search(query).then(data => {

        // console.log('sds', data)
        setSearchedBooks(data)
        if (data.error) {
          // setSearchBooks([])
        } else {
          setSearchedBooks(data)
        }
      })
    }

    return () => {
      // setSearchBooks([])
    }

  }, [query])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => { props.setShowSearchPage(false) }}>Close</button>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
       
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map(b => (
            <li key={b.id}>
              <Book book={b} changeShelf={props.updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
