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
	img.src = "/static/media/img1_rsz.99d37f4f.jpg";
	resolve()
})

promise.then(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
	registerServiceWorker();
})
