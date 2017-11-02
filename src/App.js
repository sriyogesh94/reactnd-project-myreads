import React from 'react'
import SearchPage from './Search'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

BooksAPI.getAll().then((val) => val.map((book) => console.log(book)))

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : [],
    showSearchPage: false
  }

  componentDidMount () {
    BooksAPI.getAll().then((val) => val.map((book) => (
      this.setState((prevState) => prevState.books = prevState.books.concat(book))
    )))
    
  }

  changeBookShelf(id, e) {
    let bookId = id
    let targetVal = e.target.value
    this.setState((prevState) => (
    prevState.books.filter((book) => (
      book.id === bookId
    ))[0].shelf = targetVal))
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {this.state.books.map((book) => (book.shelf === "currentlyReading" && (
                      <Book key={book.id} book={book} eventHandler={this.changeBookShelf.bind(this, book.id)}/>
                  )))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.map((book) => (book.shelf === "wantToRead" && (
                      <Book key={book.id} book={book} eventHandler={this.changeBookShelf.bind(this, book.id)}/>
                  )))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.map((book) => (book.shelf === "read" && (
                      <Book key={book.id} book={book} eventHandler={this.changeBookShelf.bind(this, book.id)}/>
                  )))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
