import React from 'react'
import Header from './Header'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BooksGrid'
import SearchButton from './SearchButton'

class HomePage extends React.Component {

    state = {
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

        BooksAPI.update(id, targetVal)
      }

      render() {
        return(
            <div className="list-books">
                <Header />
                <div className="list-books-content">
                    <BookGrid gridType={"current"} books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)}/>
                    <BookGrid gridType={"wantToRead"} books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)}/>
                    <BookGrid gridType={"read"} books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)}/>
                </div>
                <SearchButton/>
            </div>
        )
      }
}

export default HomePage

