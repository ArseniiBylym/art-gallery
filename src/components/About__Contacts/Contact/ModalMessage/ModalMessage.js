import React from 'react';
import './ModalMessage.css';

export default function ModalMessage(props) {
	return(
		
			<div onClick={props.click} className='ModalMessage'>
				{props.children} 
				<button>OK</button>
			</div>
	
	)
}