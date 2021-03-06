import React from 'react';
import './EventInfo.css';

export default function EventInfo (props) {



	
		let showButton = null;
		let classForMenu = props.isOpen ? 'EventInfo open' : 'EventInfo';

		if (!props.isOpen) {
			showButton = (
				<div className='hideShowButton' onClick={props.click}>
					<p>Show info</p>
					<div><EventInfoAngleDown/></div>
				</div>
			)
		} else {
			showButton = (
				<div className='hideShowButton openButton' onClick={props.click}>
					<p>Hide info</p>
					<div><EventInfoAngleUp/></div>
				</div>
			)
		}

		return (
			<div className={classForMenu}>
				<div className='eventPlace'>
					<p>Place:</p>
					<p>{props.place}</p>
				</div>
				<div className='eventTime'>
					<p>Time:</p>
					<p>{new Date(props.date).toLocaleString('ru', {hour:'2-digit',minute:'2-digit'})}</p>
				</div>
				{showButton}
			</div>
		)
	
}

function EventInfoAngleUp() {
	return(
<svg role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
		)
}

function EventInfoAngleDown() {
	return(
<svg role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
		)
}