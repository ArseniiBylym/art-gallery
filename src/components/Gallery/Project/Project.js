import React, {Component} from 'react';
import './Project.css';
import Picture from './Picture/Picture.js';
import {projects} from '../../../functions/dataObjects.js';
import MenuButton from '../../MenuButton/MenuButton.js';

export default class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pictures: projects[this.props.projectName].pictures,
			currentPictureIndex: 0,
			isFullSize: false
		};
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

	fullSizeImg = () => {
		let container = document.getElementById('Project');
		container.classList.toggle('Project--zoomed');
		let button = document.getElementById('MenuOpenButton').classList.toggle('hide-menuButton');
	}

	render() {
		let images = null;
		if (this.state.pictures) {
			images = this.state.pictures.map((img, i) => {
				return (
					<Picture key={img.url} url={img.url} info={img.info} pos={i} click={this.fullSizeImg}/>	
				)
			})
		}

		return(
		<React.Fragment>
			<MenuButton color='black'/>
			<div className='zoomWrapper'>
				<div className='Wrapper'>
					<div id="Project" className='Project' onWheel={this.scrollImages}>
						<div className='Project__name'>
							<h1>Project: </h1>
							<p>{this.props.projectName}</p>
						</div>
						<div className='Project__description'> 
							<p>{this.state.pictures[this.state.currentPictureIndex].name}</p>
							<p>{this.state.pictures[this.state.currentPictureIndex].info}</p>
						</div>
						<div className='Project__wrapper'>
							<div className='Project__wrapper--logo'> 
								<p>Maryna Herasymenko</p>
							</div>
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
				</div>
			</div>
		</React.Fragment>
		)
	}
}