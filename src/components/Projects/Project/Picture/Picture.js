import React from 'react';
import './Picture.css';

export default function picture (props) {
	
	let classList = props.pos === 0 ? 'Picture current' : 'Picture';

	return (
		<div className={classList} >
			<div className='Picture__img' 
				style={{backgroundImage: `url(${props.url})`}} 
				onClick={props.click}>
			</div>	
		</div>
	)
}
