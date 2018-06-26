import React from 'react';
import './NavButton.css';

function navButton(props) {
	return (
		<div className='navButton'>
			<a href={props.href}>
				<p>{props.text}</p>
			</a>
		</div>
	)
}

export default navButton;