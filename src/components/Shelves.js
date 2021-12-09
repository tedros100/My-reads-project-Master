import React from 'react';
import Shelf from './Shelf';

export default function Shelves(props) {
    const getBooks = (bookShelfType)=>{
        return props.books.filter((book) => book.shelf === bookShelfType);
    }
 
    let shelvesArr = [{ title: "Currently Reading", books: getBooks('currentlyReading') },
    { title: "Want To Read", books: getBooks('wantToRead')  },
    { title: "Read", books:  getBooks('read') },]

    return (
        <>
            {shelvesArr.map((item, index) => {
                return <Shelf key={index} title={item.title} books={item.books} updateBookShelf={props.updateBookShelf} />
            })}
        </>
    )

}

