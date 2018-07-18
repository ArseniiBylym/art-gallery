import React from 'react';
import './ModalMessage.css';

export default function ModalMessage(props) {
	return(
		
			<div className='ModalMessage'>
				{props.children} 
				<button onClick={props.click}>OK</button>
			</div>
	
	)
}