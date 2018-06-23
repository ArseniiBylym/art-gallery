import React from 'react';
import './Event.css';

function event(props) {
	return (
		<div className='Event'>
			<div className='Event__photo'>
			</div>
			<div className='Event__text'>
				<h3>{props.header}</h3>
				<p className='date'>{props.date}</p>
				<p>{props.text}</p>
				<button>Read more</button>
			</div>
		</div>
	)
}

export default event;