import React, {Component} from 'react';
import './Project.css';
import Picture from './Picture/Picture.js';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: './img/Gallery/GridProject/img1.jpg',
			// pictures: [
			// 	{
			// 		url: './img/Gallery/GridProject/img1.jpg',
			// 		info: 'Hole, 60x80, acrylic on canvas, 2017' 
			// 	},
			// 	{
			// 		url: './img/Gallery/GridProject/img2.jpg',
			// 		info: 'Hole, 60x80, acrylic on canvas, 2017' 
			// 	},
			// 	{
			// 		url: './img/Gallery/GridProject/img3.jpg',
			// 		info: 'Hole, 60x80, acrylic on canvas, 2017' 
			// 	},
			// 	{
			// 		url: './img/Gallery/GridProject/img4.jpg',
			// 		info: 'Hole, 60x80, acrylic on canvas, 2017' 
			// 	},
			// ]
		};
	}

	render() {
		// let images = null;
		// if (this.state.pictures) {
		// 	images = this.state.pictures.map((img, i, arr) => {
		// 		return (
		// 			<Picture key={img.url} url={img.url} info={img.info} pos={i}/>	
		// 		)
		// 	})
		// }

		return(
			<div className='Project'>
				<div className='Project__name'>
					<h1>Project: </h1>
					<p>{this.props.projectName}</p>
				</div>
				<div className='Project__wrapper'>
					<Picture url={this.state.url} />
					<div className='Project__controls'> 
						<div className='Project__controls--prev'>Prev</div>
						<div className='Project__controls--counter'><pre>1/3</pre></div>
						<div className='Project__controls--next'>Next</div>
						<div className='Project__controls--line left' />
						<div className='Project__controls--line right' />
					</div>
				</div>
			</div>
		)
	}
}