import React from 'react';
import './Header.css';
import Nav from './Nav/Nav.js';

function header(props) {
	return(
		<header className='Header' id='Home__Header'>
				<Nav />
				<div className='Header__title'>
					<h1>Maryna <br />Herasymenko</h1>
					<p>Art</p>
				</div>
		</header>
	)
}

export default header;