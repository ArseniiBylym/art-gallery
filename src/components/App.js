import React, { Component } from 'react';
import './App.css';


// Components
import Home from './Home/Home.js';
// import Gallery from './Gallery/Gallery.js';
import Project from './Gallery/Project/Project.js';

class App extends Component {

	
  render() {
    return (
      	<div className="App">
	    	<Project projectName='Grid' />
      	</div>
    );
  }
}

export default App;
