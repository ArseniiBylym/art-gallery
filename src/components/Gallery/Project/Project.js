import React, {Component} from 'react';
import './Project.css';
import Picture from './Picture/Picture.js';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: './img/Gallery/GridProject/img1.jpg',
			pictures: [
				{
					url: './img/Gallery/GridProject/img1.jpg',
					info: 'Horizon 100x110 acrylic on canvas 2018' 
				},
				{
					url: './img/Gallery/GridProject/img2.jpg',
					info: 'Northern Lights 100x110 acrylic on canvas 2018' 
				},
				{
					url: './img/Gallery/GridProject/img3.jpg',
					info: 'Hole 60x80 acrylic on canvas 2017' 
				},
				{
					url: './img/Gallery/GridProject/img4.jpg',
					info: 'Frame 60x80 acrylic on canvas 2017' 
				},
			],
			currentPictureIndex: 0
		};
	}

	componentDidMount = () => {
		console.log(this.props);
	}

	showNext = () => {
		let images = [...document.getElementsByClassName('Picture')];

		if(this.state.currentPictureIndex == images.length - 1) return;

		images[this.state.currentPictureIndex].classList.remove("current");
		images[this.state.currentPictureIndex].classList.add("prev");
		images[this.state.currentPictureIndex + 1].classList.remove("next");
		images[this.state.currentPictureIndex + 1].classList.add("current");
		this.setState((prevState) => {
			return {currentPictureIndex: prevState.currentPictureIndex + 1}
		})
	
	};

	showPrev = () => {
		if(this.state.currentPictureIndex == 0) return;

		let images = [...document.getElementsByClassName('Picture')];

		images[this.state.currentPictureIndex].classList.remove("current");
		images[this.state.currentPictureIndex].classList.add("next");
		images[this.state.currentPictureIndex - 1].classList.add("current");
		images[this.state.currentPictureIndex - 1].classList.remove("prev");
		this.setState((prevState) => {
			return {currentPictureIndex: prevState.currentPictureIndex - 1}
		})
	};

	scrollImages = (e) => {
		if (e.deltaY > 0) {
			this.showNext();
		} else this.showPrev();
	}

	render() {
		let images = null;
		if (this.state.pictures) {
			images = this.state.pictures.map((img, i) => {
				return (
					<Picture key={img.url} url={img.url} info={img.info} pos={i}/>	
				)
			})
		}

		return(
			<div className='Project' onWheel={this.scrollImages}>
				<div className='Project__name'>
					<h1>Project: </h1>
					<p>{this.props.projectName}</p>
				</div>
				<div className='Project__wrapper'>
					{images}
					<div className='Project__controls'> 
						<div className='Project__controls--prev' onClick={this.showPrev}>Prev</div>
						<div className='Project__controls--counter'><pre>{this.state.currentPictureIndex + 1}/{this.state.pictures.length}</pre></div>
						<div className='Project__controls--next' onClick={this.showNext}>Next</div>
						<div className='Project__controls--line left' />
						<div className='Project__controls--line right' />
					</div>
				</div>
			</div>
		)
	}
}