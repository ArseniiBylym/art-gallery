import React from 'react';
import './Picture.css';

export default function picture (props) {
	return(
		<div className='Home__Gallery__Picture'>
			{props.children}
			<img src={props.src} alt='immage'/>
		</div>

	) 
}