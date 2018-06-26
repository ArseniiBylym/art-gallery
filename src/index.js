//Node modules
import React from 'react';
import ReactDOM from 'react-dom';

//Styles
import './index.css';

//Components
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

//Scripts
import run from './functions/functions.js';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

run();