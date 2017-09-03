import React from 'react';
import { Link, Route } from 'react-router-dom'

import '../App.css';
import * as BooksAPI from '../api/BooksAPI'


class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: props.shelf
    };
  }

  addBook(book, shelf){
    BooksAPI.update(book, shelf).then((books) => {
      this.setState({shelf: shelf});
      if(this.props.pageRefresh) {
        this.props.pageRefresh();
      }
      if(this.props.updateResults) {
        this.props.updateResults(book, shelf);
      }
    });
  }


  render() {
    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{ width: 130, height: 190, backgroundImage: `url(${this.props.imgurl})` }}></div>
          <div className='book-shelf-changer'>
            <select onChange={(event) => this.addBook(this.props.book, event.target.value)}>
              <option value='Return' disabled>Move to...</option>
              <option value='one'>None</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{this.props.title}</div>
        <div className='book-authors'>{this.props.author}</div>
      </div>
    )
  }
}

export default Book
