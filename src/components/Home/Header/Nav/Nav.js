import React from 'react';
import './Nav.css';
import NavButton from './NavButton/NavButton.js';

function nav (props) {

	const buttons = [
	{name: 'Home', href: '/Home'},
	{name: 'Gallery', href: '/Gallery'},
	{name: 'Events', href: '#Home__EventsPre'},
	{name: 'About', href: '#Home__AboutPre'},
	{name: 'Contacts', href: '#Home__FooterPre'}].map((i) => {
		return <NavButton key={i.name} text={i.name} href={i.href} />
	})
	
	return (
		<div className='Nav' id='Header__Nav'>
			{buttons}
		</div>
	)
}

export default nav;