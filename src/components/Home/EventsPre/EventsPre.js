import React from 'react';
import './EventsPre.css';
import Event from './Event/Event.js';

function eventsPre(props) {

	const events = [
	{
		header: 'Event #1',
		date: '10/11/2018',
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
 		url: './img/img1.jpg' 
	},
	{
		header: 'Event #2',
		date: '1/12/2018',
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
 		url: './img/img2.jpg' 
	},
	{
		header: 'Event #3',
		date: '21/12/2018',
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
		url: './img/img3.jpg' 
	},
	];

	const eventList = events.map((e) => {
		return <Event key={e.header} header={e.header} 
					  date={e.date} text={e.text} url={e.url}/>
	})

	return (
		<div className='EventsPre'>
			<div className='EventsPre__title'><h1>Events</h1></div>
			<div className='events-wrapper'>
				{eventList}
			</div>
		</div>
	)
}

export default eventsPre;