import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component {
    state = {
        books : [] 
    }

    searchHandler(e) {
        let query = e.target.value;
        if(query) {
            // BooksAPI.search(query, 20).then((res) => console.log(res))
            BooksAPI.search(query, 8).then((res) => (
                this.setState({
                    books: [].concat(res)
                })
            ))

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
                <input type="text" placeholder="Search by title or author" onChange={this.searchHandler.bind(this)}/>
    
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books.map((book, index) => (
                    <Book key={book.id + index} book={book} eventHandler={this.changeBookShelf.bind(this, book.id)}/>
                ))}             
              </ol>
            </div>
          </div>
        )
    }
    
}

export default SearchPage;