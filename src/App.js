import React from 'react'
import Header from './Header'
import SearchPage from './Search'
import BookGrid from './BooksGrid'
import SearchButton from './SearchButton'
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
    books : []
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
          <div className="list-books">
            <Header />
            <div className="list-books-content">
                <BookGrid books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)} gridType={"current"} />
                <BookGrid books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)} gridType={"wantToRead"} />
                <BookGrid books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)} gridType={"read"} />
            </div>
            <SearchButton/>
          </div>
      </div>
    )
  }
}

export default BooksApp
