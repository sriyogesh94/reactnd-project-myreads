import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {
    state = {
        prevBooks : [],
        books : [],
        finalBooks : [],
        bookId : [],
        queryBookId : [],
        matchId : []
    }

    componentDidMount() {
        BooksAPI.getAll().then((res) => (
            this.setState({
                prevBooks: [].concat(res)
            }))).then((res) => (
                this.setState((prevState) => ({
                    bookId : prevState.prevBooks.map((a) => a.id)
                }))))
    }

    searchHandler(e) {
        let query = e.target.value;
    
        if(query) {
            // BooksAPI.search(query, 20).then((res) => console.log(res))
            BooksAPI.search(query, 8).then((res) => (
                this.setState({
                    books: [].concat(res)
                }))
            ).then((res) => (
                this.setState((prevState) => ({
                    queryBookId : prevState.books.map((a) => a.id)
                })))).then((res) => (
                this.setState((prevState) => ({
                    matchId : prevState.queryBookId.filter((id) => prevState.bookId.includes(id))
                }))
            )).then((res) => (
                this.setState((prevState) => ({
                    finalBooks : prevState.prevBooks.filter(
                        (book) => prevState.matchId.includes(book.id)).concat(
                            prevState.books.filter(
                                (book) => !prevState.matchId.includes(book.id)))  
                }))
            )).then(() => console.log(this.state.finalBooks))

        }

    }

    changeBookShelf(id, e) {
        let bookId = id
        let targetVal = e.target.value
        BooksAPI.update(bookId, targetVal)
      }

    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <Debounce time="400" handler="onChange">
                    <input type="text" placeholder="Search by title or author" onChange={this.searchHandler.bind(this)}/>
                </Debounce>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.finalBooks.map((book, index) => (
                    <Book key={book.id + index} book={book} eventHandler={this.changeBookShelf.bind(this, book.id)}/>
                ))}             
              </ol>
            </div>
          </div>
        )
    }
    
}

export default SearchPage;