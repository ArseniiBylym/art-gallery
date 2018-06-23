import React from 'react';
import './NavButton.css';

function navButton(props) {
	return (
		<div className='navButton'>
			<div>
				<p>{props.text}</p>
			</div>
		</div>
	)
}

export default navButton;