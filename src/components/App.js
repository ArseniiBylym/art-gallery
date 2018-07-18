import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';


// Components
import Home from './Home/Home.js';
import Projects from './Projects/Projects.js';
import Project from './Projects/Project/Project.js';
import About__Contacts from './About__Contacts/About__Contacts';
import Events from './Events/Events';
import Admin from './Admin/Admin';



class App extends Component {
  render() {
    return (
    	<BrowserRouter basename="/art-gallery/">
	      	<div className="App">
      			<Switch>
			      	<Route path='/Home' component={Home}/>
				    	<Route path='/Projects' exact component={Projects}/>
				    	<Route path='/Projects/:projectName' component={Project} />
				    	<Route path='/Events' component={Events} />
		      		<Route path='/About__Contacts/:side' component={About__Contacts} /> 
		      		<Route path='/Admin' component={Admin} />
		      		<Redirect from='/' to='/Home' />
	      		</Switch>
	      	</div>
      	</BrowserRouter>
    )
  }
}

export default App;
