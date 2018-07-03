import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';


// Components
import Home from './Home/Home.js';
import Gallery from './Gallery/Gallery.js';
import Project from './Gallery/Project/Project.js';
import About__Contact from './About/About__Contacts';

class App extends Component {

	
  render() {
    return (
    	<BrowserRouter>
	      	<div className="App">
	      		<Route path='/Home' component={Home}/>
		    	<Route path='/Gallery' component={Gallery}/>
		    	<Route path='/Grid-project' render={(props) => (
		    		<Project {...props} projectName='grid' />
		    		)}
		    	/>
		    	<Route path='/Connection' render={(props) => (
		    		<Project {...props} projectName='connection' />
		    		)}
		    	/>
	      		<Route path='/About' render={(props) => (
	      			<About__Contact {...props} side='left' />
	      			)}
	      		/>
	      		<Route path='/Contact' render={(props) => (
	      			<About__Contact {...props} side='right' />
	      			)}
	      		/>
	      		<Route path='/' exact component={Home} />

	      	</div>
      	</BrowserRouter>
    );
  }
}

export default App;
