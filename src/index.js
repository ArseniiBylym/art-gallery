//Node modules
import React from 'react';
import ReactDOM from 'react-dom';

//Styles
import './index.css';

//Components
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

//Scripts


	ReactDOM.render(<App />, document.getElementById('root'));
	registerServiceWorker();
