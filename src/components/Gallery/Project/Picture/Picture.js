import React from 'react';
import './Picture.css';

export default function Picture (props) {
	console.log(props);
	const backgroundUrl = `url(${props.url})`;
	console.log(backgroundUrl);

	return (
		<div className='Picture' >
			<div className='Picture__info'>
				<div><pre>Hole   60x80          acrylic on canvas   2017</pre></div>
				
			</div>
			<div className='Picture__img' style={{backgroundImage: backgroundUrl}} />
		</div>
	)
}