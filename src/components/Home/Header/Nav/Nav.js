import React from 'react';
import './Nav.css';
import NavButton from './NavButton/NavButton.js';

function nav (props) {

	const buttons = ['Home', 'Gallery', 'Events', 'About', 'Contacts'].map((i) => {
		return <NavButton key={i} text={i} />
	})
	
	return (
		<div className='Nav'>
			{buttons}
		</div>
	)
}

export default nav;