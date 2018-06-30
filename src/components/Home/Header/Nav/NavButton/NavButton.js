import React from 'react';
import './NavButton.css';
import {Link} from 'react-router-dom';

function navButton(props) {
	return (
		<div className='navButton'>
			<Link to={props.href}>
				<p>{props.text}</p>
			</Link>
		</div>
	)
}

export default navButton;