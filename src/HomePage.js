import React from 'react'
import Header from './Header'
import BookGrid from './BooksGrid'
import SearchButton from './SearchButton'

const HomePage = (props) => {
    return(
        <div className="list-books">
            <Header />
            <div className="list-books-content">
                <BookGrid books={props.books} changeBookShelf={props.changeBookShelf} gridType={"current"} />
                <BookGrid books={props.books} changeBookShelf={props.changeBookShelf} gridType={"wantToRead"} />
                <BookGrid books={props.books} changeBookShelf={props.changeBookShelf} gridType={"read"} />
            </div>
            <SearchButton/>
        </div>
    )
}

export default HomePage

