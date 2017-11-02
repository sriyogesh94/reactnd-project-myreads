import React from 'react'
import HomePage from './HomePage'
import SearchPage from './Search'
import { Route } from 'react-router-dom'
import './App.css'

const BooksApp = () => {
  return(
      <div className="app">
          <Route exact path='/' component={HomePage} />
          <Route path='/search' component={SearchPage} />
      </div>
    )
}

export default BooksApp
