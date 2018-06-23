import React from 'react';
import './Header.css';
import Nav from './Nav/Nav.js';

function header(props) {
	return(
		<header className='Header'>
			<Nav />
			<div className='title'>
				<h1>Marina <br />Gerasimenko</h1>
				<p>Art</p>
			</div>
		</header>
	)
}

export default header;