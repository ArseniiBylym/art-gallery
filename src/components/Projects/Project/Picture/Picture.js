import React from 'react';
import './Picture.css';

export default function picture (props) {
	
	let classList = 'Picture';

	if(props.pos < props.currentIndex) {
		classList += ' prev';
	}
	if(props.pos === props.currentIndex) {
		classList += ' current';
	}

	return (
		<div className={classList} >
			<div className='Picture__img' 
				style={{backgroundImage: `url(${props.url})`}} 
				onClick={props.click}>
			</div>	
		</div>
	)
}
