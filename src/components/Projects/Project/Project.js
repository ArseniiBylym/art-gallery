import React, {Component} from 'react';
import './Project.css';
import Picture from './Picture/Picture.js';
import MenuButton from '../../MenuButton/MenuButton.js';

export default class Project extends Component {

	state = {
		pictures: window.GLOBAL_DATA.PROJECTS[this.props.match.params.projectName].pictures,
		currentPictureIndex: 0,
		isFullSize: false,
		isLoadTime: true,
	}

	componentWillUpdate = (prevState, prevProps) => {
		if (this.props.match.params.projectName !== prevState.match.params.projectName) {
	
			this.setState((prevState) => {
			return({pictures: window.GLOBAL_DATA.PROJECTS[this.props.match.params.projectName].pictures})
			})
		}
	}
	

	showNext = () => {
		if(this.state.currentPictureIndex === this.state.pictures - 1) return;

		this.setState((prevState) => {
			return {currentPictureIndex: prevState.currentPictureIndex + 1}
		})
	};

	showPrev = () => {
		if(this.state.currentPictureIndex === 0) return;

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
		document.getElementById('Project').classList.toggle('Project--zoomed');
		document.getElementById('MenuOpenButton').classList.toggle('hide-menuButton');
	}

	render() {
		let images = null;
		if (this.state.pictures && this.state.isLoadTime) {
			images = this.state.pictures.map((img, i) => {
				
				return (
					<Picture key={img.url} 
							 url={img.url}
							 info={img.info}
							 pos={i}
							 currentIndex={this.state.currentPictureIndex}
							 click={this.fullSizeImg}
					 />	
				)
			})
		}

		return(
			<div className='Project__MainWrapper Project__on-enter'>
				<MenuButton color='black'/>
				<div className='zoomWrapper'>
					<div id="Project" className='Project' onWheel={this.scrollImages}>
						<div className='Project__name'>
							<div>
								<p>Project</p>
								<p><span>{this.props.match.params.projectName}</span></p>
							</div>
						</div>
						<div className='Project__description'> 
							<div>
								<p>{this.state.pictures[this.state.currentPictureIndex].name}</p>
								<p>{this.state.pictures[this.state.currentPictureIndex].info}</p>
							</div>
						</div>
						<div className='Project__logo'> 
							<p>Maryna Herasymenko Art</p>
						</div>
						<div className='Project__picture' >
							{/*<Picture  url={this.state.pictures[0].url} info={this.state.pictures[0].info} pos={0} click={this.fullSizeImg}/>*/}
							{images}
						</div>
						<div className='Project__controls'> 
							<div className='Project__controls--prev' onClick={this.showPrev}><SvgArrowLeft/><p>prev</p></div>
							<div className='Project__controls--counter'><p>{this.state.currentPictureIndex + 1}/{this.state.pictures.length}</p></div>
							<div className='Project__controls--next' onClick={this.showNext}><p>next</p><SvgArrowRight/></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function SvgArrowLeft() {
	return(
		<svg aria-hidden="true" viewBox="0 0 256 512">
			<path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 
			9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 
			409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path>
		</svg>
	)
}

function SvgArrowRight() {
	return(
		<svg aria-hidden="true" data-prefix="fas" viewBox="0 0 256 512">
			<path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 
			0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 
			0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
			</svg>
	)
}