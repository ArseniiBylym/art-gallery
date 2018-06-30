import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';


// Components
import Home from './Home/Home.js';
import Gallery from './Gallery/Gallery.js';
import Project from './Gallery/Project/Project.js';

class App extends Component {

	
  render() {
    return (
    	<BrowserRouter>
	      	<div className="App">
	      		<Route path='/Home' component={Home}/>
		    	<Route path='/Gallery' component={Gallery}/>
		    	<Route path='/Grid-project' render={(props) => (
		    		<Project {...props} projectName='Grid' />
		    		)}
		    	/>
		    	<Route path='/Connection' render={(props) => (
		    		<Project {...props} projectName='Connection' />
		    		)}
		    	/>
	      		<Route path='/' exact component={Home} />
	      	</div>
      	</BrowserRouter>
    );
  }
}

export default App;
