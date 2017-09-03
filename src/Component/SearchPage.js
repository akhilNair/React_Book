import React from 'react';
import '../App.css';
import { Link, Route } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../api/BooksAPI'

class SearchPage extends React.Component {
  state = {
    query: '',
    results: [],
    error: false,
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.search);
  }

  clearList = (query) => {
    this.setState({results: []});
  }

  search() {
    if(this.state.query === '') {
      this.clearList();
      return;
    }
	BooksAPI.search(this.state.query.trim(), 5).then((books) => {
      if(books.error && books.error === 'empty query') {
        this.setState({error: true, results: []});
		}
      else {
        if(this.state.results !== books) {
          this.setState({results: books});
        }
        this.setState({error: false});
      }
    });
  }

  updateResults(book, shelf){
    this.setState(() => {
      var index = this.state.results.indexOf(book);
      this.state.results[index].shelf = shelf;
    });
  }

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
              <input type='text' placeholder='Search by title or author' value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.results.length > 0 && this.state.results.map((book, index) => (
              <Book updateResults={this.updateResults.bind(this)}  
				book={book} 
				shelf={book.shelf} 
				key={book.id} 
				id={book.id} 
				imgurl={book.imageLinks === undefined ? '' : book.imageLinks.thumbnail} 
				title={book.title} author={book.authors} />
            ))}
			
			
          </ol>
          {this.state.error && <p>No records exist</p>}
        </div>
      </div>
    )
  }
}

export default SearchPage
