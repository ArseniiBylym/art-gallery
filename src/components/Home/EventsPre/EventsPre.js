import React from 'react';
import './EventsPre.css';
import Event from './Event/Event.js';

function eventsPre(props) {

	const events = [
	{
		header: 'Exposition',
		date: '10/11/2018',
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
 		src: './img/Home/events/img1.jpg' 
	},
	{
		header: 'Master class',
		date: '1/12/2018',
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
 		src: './img/Home/events/img2.jpg' 
	},
	{
		header: 'Lecture',
		date: '21/12/2018',
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
		src: './img/Home/events/img3.jpg' 
	},
	];

	const eventList = events.map((e) => {
		return <Event key={e.header} header={e.header} 
					  date={e.date} text={e.text} src={e.src}/>
	})

	return (
		<div className='EventsPre' id='Home__EventsPre'>
			<div className='EventsPre__title'><h1>Events</h1></div>
			<div className='events-wrapper'>
				{eventList}
			</div>
			<div className='EventsPre__see-more'>See all events</div>
		</div>
	)
}

export default eventsPre;