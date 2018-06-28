import React, {Component} from 'react';
import './Gallery.css';
import Project from './Project/Project.js';

export default class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		return (
			<div className='Gallery'>
				<h1>Gallery</h1>
				<h2>All projects</h2>
				<ul>All projects<ul>
					<li><a href='/'>Grid</a></li>
					<li><a href='/'>Connection</a></li>
					<li><a href='/'>Oil</a></li>
				</ul>
				<Project projectName='Grid'/>
			</div>
		)
	}
}
