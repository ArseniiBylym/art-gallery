import React, {Component} from 'react';
import './Arrow.css';

export default class Arrow extends Component {
	constructor(props) {
		super(props);

		this.fullClassName = `Arrow ${this.props.dirrection}`;

		this.screens = null; 
	}

	
	scrollToScreen = (event) => {
		let screensArr = getScreensCoords();
		let currentElem = null;

		screensArr.forEach((item, i, arr) => {
			if(item.top < event.clientY && item.bottom > event.clientY) {
				currentElem = i;
			}
		});

		if(event.target.classList.contains('arrowUp')) {
			screensArr[currentElem-1].elem.scrollIntoView();
		}
		if(event.target.classList.contains('arrowDown')) {
			screensArr[currentElem + 1].elem.scrollIntoView();	
		}
	}

	render() {
		return(
			<div className={this.fullClassName} onClick={this.scrollToScreen}/>
		)
	}
}


function getScreensCoords() {
	return [
		{
			elem: document.getElementById('Home__Header'),
			top: parseInt(document.getElementById('Home__Header').getBoundingClientRect().top, 10),
			bottom: parseInt(document.getElementById('Home__Header').getBoundingClientRect().bottom, 10)
		},	
		{
			elem: document.getElementById('Home__Gallery'),
			top: parseInt(document.getElementById('Home__Gallery').getBoundingClientRect().top, 10),
			bottom: parseInt(document.getElementById('Home__Gallery').getBoundingClientRect().bottom, 10)
		},
		{
			elem: document.getElementById('Home__EventsPre'),
			top: parseInt(document.getElementById('Home__EventsPre').getBoundingClientRect().top, 10),
			bottom: parseInt(document.getElementById('Home__EventsPre').getBoundingClientRect().bottom, 10)
		},
		{
			elem: document.getElementById('Home__AboutPre'),
			top: parseInt(document.getElementById('Home__AboutPre').getBoundingClientRect().top, 10),
			bottom: parseInt(document.getElementById('Home__AboutPre').getBoundingClientRect().bottom, 10)
		},
		{
			elem: document.getElementById('Home__FooterPre'),
			top: document.getElementById('Home__FooterPre').getBoundingClientRect().top,
			bottom: document.getElementById('Home__FooterPre').getBoundingClientRect().bottom
		}
	];
}