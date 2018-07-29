//Node modules
import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseDB } from './functions/firebase';

//Styles
import './index.css';

//Components
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

//Scripts
import { defaultData } from './functions/database';


window.addEventListener('load',()=>{
	if('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('/art-gallery/sw.js')
		.then(()=>{
			console.log('Service worker is registered!');
		})
	}
})

let promiseImg = new Promise((resolve) => {
	let img = document.createElement('img');
	
	img.onload = function () {
		resolve();
	}
	img.src = "/art-gallery/static/media/img1_rsz.99d37f4f.jpg";
})

let promiseData = new Promise((resolve) => {

	if(window.navigator.onLine === false) {
		window.GLOBAL_DATA = defaultData();
		resolve();
		return;
	}
	console.log('online')

	window.GLOBAL_DATA = {};
	firebaseDB.ref('/commonData').once('value')
			.then((snapshot) => {

				let eventsArr = [];
				snapshot.child('events').forEach((event) => {
					eventsArr.push(event.val());
				})
				window.GLOBAL_DATA.EVENTS = eventsArr.reverse();

				
				let projectsArr = {};
				snapshot.child('projects').forEach((project) => {
					let projectArr = [];
					project.forEach((item) =>{
						projectArr.push(item.val());
					})
					projectsArr[project.key] = projectArr;
				});
				window.GLOBAL_DATA.PROJECTS = projectsArr;


				let projectsList = [];
				snapshot.child('projectsList').forEach((item) => {
					projectsList.push(item.val());
				})
				window.GLOBAL_DATA.PROJECT_LIST = projectsList;
				setTimeout(()=>{
					resolve();
				}, 3000)

				resolve();
			})
			.catch((e)=> {
				console.log(e.message);
			})
}) 

Promise.all([promiseImg, promiseData]).then(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
	registerServiceWorker();
})
