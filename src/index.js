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
window.addEventListener('load',()=>{
	if('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('/sw.js')
		.then(()=>{
			console.log('Service worker is registered!');
		})
	}
})

let promiseImg = new Promise((resolve) => {
	console.log(window.navigator.onLine)
	let img = document.createElement('img');
	
	img.onload = function () {
		resolve();
	}
	img.src = "/static/media/img1_rsz.99d37f4f.jpg";
})

// let promiseData = new Promise((resolve) => {
// 	window.GLOBAL_DATA = {};
// 	firebaseDB.ref('/commonData').once('value')
// 			.then((snapshot) => {

// 				let eventsArr = [];
// 				snapshot.child('events').forEach((event) => {
// 					eventsArr.push(event.val());
// 				})
// 				window.GLOBAL_DATA.EVENTS = eventsArr.reverse();

				
// 				let projectsArr = {};
// 				snapshot.child('projects').forEach((project) => {
// 					let projectArr = [];
// 					project.forEach((item) =>{
// 						projectArr.push(item.val());
// 					})
// 					projectsArr[project.key] = projectArr;
// 				});
// 				window.GLOBAL_DATA.PROJECTS = projectsArr;


// 				let projectsList = [];
// 				snapshot.child('projectsList').forEach((item) => {
// 					projectsList.push(item.val());
// 				})
// 				window.GLOBAL_DATA.PROJECT_LIST = projectsList;


// 				console.log(window.GLOBAL_DATA);
// 				resolve();
// 			})
// }) 

Promise.all([promiseImg]).then(() => {
	ReactDOM.render(<App />, document.getElementById('root'));
	registerServiceWorker();
})
