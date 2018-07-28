import React, {Component} from 'react';
import './Project.css';
import Picture from './Picture/Picture.js';
import MenuButton from '../../MenuButton/MenuButton.js';

export default class Project extends Component {

	state = {
		pictures: window.GLOBAL_DATA.PROJECTS[this.props.match.params.projectName],
		currentPictureIndex: 0,
		isFullSize: false
	}
	touchMoveStartX = 0;
	deltaMoveX = 0;
	isFullImgSize = (window.screen.width <= 768 && window.screen.height <=768) ? false : true;


	componentDidUpdate = (prevProps, prevState) => {
		if(this.props.match.params.projectName !== prevProps.match.params.projectName){
			this.setState({pictures: window.GLOBAL_DATA.PROJECTS[this.props.match.params.projectName]})
			setTimeout(this.imagesLazyLoad,0)
		}
	}

	componentDidMount = () => {
			document.body.addEventListener('keydown', this.scrollOnClick);
			this.imagesLazyLoad();
	}

	componentWillUnmount = () => {
		document.body.removeEventListener('keydown', this.scrollOnClick);
	}

	imagesLazyLoad = () => {
		let currentImage = document.querySelector(`[data-position="${this.state.currentPictureIndex}"]`);
		console.log(currentImage);
		let img = document.createElement('img');

		img.onload = function(){
			console.log('image loaded')
			let allImages = [...document.querySelectorAll('[data-url]')];
			console.log(allImages);
			let len = allImages.length;
			for(let i=0; i<len; i++) {
				allImages[i].style.backgroundImage = `url(${allImages[i].dataset.url})`;
				allImages[i].removeAttribute('data-url');
			}
		}
		img.src = currentImage.dataset.url;

		currentImage.style.backgroundImage = `url(${currentImage.dataset.url})`;
		currentImage.removeAttribute('data-url');
	}

	scrollOnClick = (e) => {
		if(e.key === 'ArrowRight') this.showNext();
		if(e.key === 'ArrowLeft') this.showPrev();
	}
	

	showNext = () => {
		if(this.state.currentPictureIndex >= this.state.pictures.length - 1) return;

		this.setState((prevState) => {
			return {currentPictureIndex: prevState.currentPictureIndex + 1}
		})
	}

	showPrev = () => {
		if(this.state.currentPictureIndex <= 0) return;

		this.setState((prevState) => {
			return {currentPictureIndex: prevState.currentPictureIndex - 1}
		})
	}

	scrollImages = (e) => {
		if (e.deltaY > 0) {
			this.showNext();
		} else this.showPrev();
	}

	fullSizeImg = () => {
		document.getElementById('Project').classList.toggle('Project--zoomed');
		document.getElementById('MenuOpenButton').classList.toggle('hide-menuButton');
	}

	startTouchWatch = (e) => {
		this.touchMoveStartX =  +e.touches[0].clientX.toFixed(0);
	}

	continueTouchWatch = (e) => {
		this.deltaMoveX = +e.touches[0].clientX.toFixed(0);
	}

	stopTouchWatch = (e) => {
		let diff = Math.abs(this.deltaMoveX - this.touchMoveStartX);
		if (this.deltaMoveX !== 0 && diff > 50) {
			this.deltaMoveX < this.touchMoveStartX ? this.showNext() : this.showPrev()
		}
		this.deltaMoveX = 0;
	}

	render() {
		let images = null;
		if (this.state.pictures) {
			images = this.state.pictures.map((img, i) => {
				let imgUrl = this.isFullImgSize ? img.url : img.rsz_url;

				return (
					<Picture key={img.url} 
							 dataUrl={imgUrl}
							 url={imgUrl}
							 info={img.info}
							 pos={i}
							 currentIndex={this.state.currentPictureIndex}
							 click={this.fullSizeImg}
					 />	
				)
			})
		}
		if (this.state.pictures) {
		return(
			<div className='Project__MainWrapper Project__on-enter'> 
				<MenuButton color='black'/>
				<div className='zoomWrapper'>
					<div id="Project" className='Project' 
					onWheel={this.scrollImages}
					onTouchStart={this.startTouchWatch} 
					onTouchEnd={this.stopTouchWatch}
					onTouchMove={this.continueTouchWatch} >
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
						<div className='Project__picture'>
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
	} else return null
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