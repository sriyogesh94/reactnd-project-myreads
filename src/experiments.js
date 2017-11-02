class BookGrid extends React.Component {
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
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ props.gridType === "current"? "Currently Reading" : 
                    props.gridType === "read" ? "Read" : "Want to Read"}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                   {props.gridType === "current" && props.books.map((book) => (book.shelf === "currentlyReading" && (
                        <Book key={book.id} book={book} eventHandler={props.changeBookShelf.bind(this, book.id)}/>)))}
                    {props.gridType === "read" && props.books.map((book) => (book.shelf === "read" && (
                        <Book key={book.id} book={book} eventHandler={props.changeBookShelf.bind(this, book.id)}/>)))}
                    {props.gridType === "wantToRead" && props.books.map((book) => (book.shelf === "wantToRead" && (
                        <Book key={book.id} book={book} eventHandler={props.changeBookShelf.bind(this, book.id)}/>)))}
                  </ol>
                </div>
            </div>
        )
      }
    
}
