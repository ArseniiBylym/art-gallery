import React, {Component} from 'react';
import './SubMenuProjects.css';

export default function SubMenuProjects(props) {

		// return('hello');
		let relatedElem = document.querySelector('[data-path="/Projects"]');
		let top = relatedElem.getBoundingClientRect().top;

		return (
			<div id='MenuProjectsContainer' className='MenuOpenLayout__projects' 
					style={{top: `${top}px`}}
					onMouseEnter={props.show} onMouseLeave={props.hide}>
					
				{props.projects.map((project) => {
					return(
						<div key={project.name} data-path={`/Projects/${project.name}`} 
									onClick={props.click} >
							{project.name}
						</div> 
						)
				})}
			</div> 
		)
	
}