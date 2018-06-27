import React from 'react';
import './Arrow.css';

export default function arrow(props) {
	const fullClassName = `Arrow ${props.dirrection}`;
	return(
		<div className={fullClassName} />
	)
}