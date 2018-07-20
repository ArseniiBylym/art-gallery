//Node modules
import React from 'react';
import ReactDOM from 'react-dom';

//Styles
import './index.css';

//Components
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

//Scripts

let promise = new Promise((resolve) => {
	let img = document.createElement('img');
	img.src = "./static/media/img1_rsz.99d37f4f.jpg";
	resolve()
})

promise.then(() => {
	let height = Math.min(window.screen.height, 
											 window.screen.availHeight,
											 document.documentElement.clientHeight);
	ReactDOM.render(<App height={height}/>, document.getElementById('root'));
	registerServiceWorker();
	
})
