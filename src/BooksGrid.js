import React from 'react'
import Book from './Book'
import './App.css'

class BookGrid extends React.component {
    render () {
        return(
            this.props.books.map( (book) => (
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                            <Book title={book.title} author={book.authors} url={book.imageLinks.thumbnail}/>
                        </li>
                    </ol>
                </div>
                ))
        )
    }
}

export default BookGrid