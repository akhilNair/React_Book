import React from 'react';
import { Link, Route } from 'react-router-dom'

import '../App.css';
import * as BooksAPI from '../api/BooksAPI'
import Book from './Book'

class LandingPage extends React.Component {
	
	constructor(props){
		super(props)
		this.state = {
			currentlyReading: [],
			wantToRead: [],
			alreadyRead: []
			}
		}	
		  
    componentDidMount() {
		this.getBookList();
	}

	getBookList() {
		BooksAPI.getAll().then((books) => {
			var currentlyReading = books.filter((book) => {
				console.log(book)
				return book.shelf === 'currentlyReading'
			});
		  
			var wantToRead = books.filter((book) => {
				return book.shelf === 'wantToRead'
			});
      
			var alreadyRead = books.filter((book) => {
				return book.shelf === 'read'
			});

		this.setState({
			currentlyReading: currentlyReading,
			wantToRead: wantToRead,
			alreadyRead: alreadyRead
		});
    });
  }

	pageRefresh() {
		this.getBookList();
		}



	render() {
		return (
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReads</h1>
				</div>
				<div className='list-books-content'>
					<div>
						<div className='bookshelf'>
							<h2 className='bookshelf-title'>Currently Reading</h2>
							<div className='bookshelf-books'>
								<ol className='books-grid'>
									{this.state.currentlyReading.length > 0 && 
									this.state.currentlyReading.map((book) => (
										<Book  
											book={book} 
											key={book.id} 
											id={book.id} 
											imgurl={book.imageLinks.thumbnail} 
											title={book.title} 
											author={book.authors} 
											pageRefresh={this.pageRefresh.bind(this)}/>
									))}
								</ol>
							</div>
						</div>

            <div className='bookshelf'>
				<h2 className='bookshelf-title'>Want to read</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{this.state.wantToRead.length > 0 && 
						this.state.wantToRead.map((book) => (
							<Book  book={book} 
								key={book.id} 
								id={book.id} 
								imgurl={book.imageLinks.thumbnail} 
								title={book.title} 
								author={book.authors} 
								pageRefresh={this.pageRefresh.bind(this)}/>
                ))}
					</ol>
				</div>
            </div>

            <div className='bookshelf'>
				<h2 className='bookshelf-title'>Already Read</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{this.state.alreadyRead.length > 0 && 
						this.state.alreadyRead.map((book) => (
							<Book book={book} 
								shelf={book.shelf} 
								key={book.id} id={book.id} 
								imgurl={book.imageLinks.thumbnail} 
								title={book.title} 
								author={book.authors} 
								pageRefresh={this.pageRefresh.bind(this)}/>
                ))}
					</ol>
				</div>
            </div>
         </div>
      </div>

        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default LandingPage
