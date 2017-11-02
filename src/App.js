import React from 'react'
import HomePage from './HomePage'
import SearchPage from './Search'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

BooksAPI.getAll().then((val) => val.map((book) => console.log(book)))

class BooksApp extends React.Component {
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
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={
            () => {
              return (
                <HomePage books={this.state.books} changeBookShelf={this.changeBookShelf.bind(this)}/>
              )
            }
          } />
          <Route path='/search' component={SearchPage} />
      </div>
    )
  }
}

export default BooksApp
