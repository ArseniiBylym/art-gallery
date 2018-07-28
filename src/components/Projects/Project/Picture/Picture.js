import React from 'react';
import './Picture.css';

export default function picture (props) {
	
	let classList = 'Picture';
	// let url = '';

	if(props.pos < props.currentIndex) {
		classList += ' prev';
	}
	if(props.pos === props.currentIndex) {
		classList += ' current';
		// url = props.dataUrl
	}

	return (
		<div className={classList} >
			<div className='Picture__img' 
				data-position={props.pos}
				data-url={props.url}
				onClick={props.click}
				>
			</div>	
		</div>
	)
}
