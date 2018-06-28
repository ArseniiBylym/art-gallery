import React from 'react';
import './Picture.css';

export default function Picture (props) {
	
	const backgroundUrl = `url(${props.url})`;
	let classList = 'Picture';
	if (props.pos == 0) {
		classList += ' current';
	}

	return (
		<div className={classList}>
			<div className='Picture__info'>
				<div><p>{props.info}</p></div>
			</div>
			<div className='Picture__img' style={{backgroundImage: backgroundUrl}} />
		</div>
	)
}