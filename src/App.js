import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import {Link,Route} from 'react-router-dom'
import LandingPage from './Component/LandingPage'
import SearchPage from './Component/SearchPage'


class BooksApp extends React.Component {
	
	render() {
		return (
			<div className='app'>
				<Route exact path='/' render={() => (
					<LandingPage/>
				)}/>
		        
				<Route exact path='/search' render={() => (
					<SearchPage/>
				)}/>
			</div>
			)
		}
	}

export default BooksApp
