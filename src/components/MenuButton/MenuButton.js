import React from 'react';
import './MenuButton.css';
import {Link} from 'react-router-dom';

export default function MenuButton (props) {

	return(
		
		<div id='NavMenuButton'>
			<div id='MenuOpenButton' className='MenuOpenButton' onClick={openMenu}>
				<div style={{background: props.color}}></div>
				<div style={{background: props.color}}></div>
				<div style={{background: props.color}}></div>
			</div>
			<div id='MenuOpenLayout' className='MenuOpenLayout' onClick={hideMenu}>
			</div>
			<div id='MenuContainer' className='MenuOpenLayout__container'>
				<div><Link to='/Home'>HOME</Link></div> 
				<div><Link to='/Gallery'>PROJECTS</Link></div> 
				<div><Link to='/Events'>EVENTS</Link></div> 
				<div><Link to='/About'>ABOUT</Link></div> 
				<div><Link to='/Contact'>CONTACT</Link></div> 
			</div>
		</div>
		
	)
} 

function openMenu(e) {
	zoomeLayoutIn();
	document.getElementById('MenuOpenButton').classList.add('hide-menuButton');
	document.getElementById('MenuOpenLayout').classList.add('show__layout');
	document.getElementById('MenuContainer').classList.add('show__menu');
}

function hideMenu(e) {
	zoomeLayoutOut();
	document.getElementById('MenuOpenButton').classList.remove('hide-menuButton');
	document.getElementById('MenuOpenLayout').classList.remove('show__layout');
	document.getElementById('MenuContainer').classList.remove('show__menu');
}

function zoomeLayoutIn() {
	let layout = document.getElementById('NavMenuButton').nextElementSibling.firstElementChild;
	layout.classList.add('zoomedLayout'); 
}

function zoomeLayoutOut() {
	let layout = document.getElementById('NavMenuButton').nextElementSibling.firstElementChild;
	layout.classList.remove('zoomedLayout');
}