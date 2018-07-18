import React, {Component} from 'react';
import './Projects.css';
import { Link } from 'react-router-dom';
import MenuButton from '../MenuButton/MenuButton.js';
import { firebaseDB } from '../../functions/firebase';



export default class Projects extends Component {
	
	state = {
		proj: window.GLOBAL_DATA.PROJECT_LIST,
		index: 0,
		moving: null,
		wheelRotation: 0
	}

	// componentWillMount = () => {
	// 	firebaseDB.ref('projectList/').once('value')
	// 	.then((snapshot) => {
	// 		let arr = [];
	// 		snapshot.forEach((item,i) => {
	// 			arr.push(item.val())
	// 		})
	// 		this.setState({proj: arr})

	// 	})
	// }

	componentDidMount = () => {
		console.log('Projects did mount')
			document.body.addEventListener('keydown', this.scrollOnClick)
	}
	componentWillUnmount = () => {
		console.log('Projects will unmount');
		document.body.removeEventListener('keydown', this.scrollOnClick);
		// firebaseDB.ref('projectList/').off();
	}

	scrollOnClick = (e) => {
		console.log('key press')
		if(e.key === 'ArrowUp') this.moveToTop();
		if(e.key === 'ArrowDown') this.moveToDown();
	}

	scrollProjectsItems = (e) => {
				
		if (e.deltaY < 0) {
			this.moveToTop();
		}

		if (e.deltaY > 0) {
			this.moveToDown();
		}
	}

	moveToTop = () => {
		if(this.state.index === 0) return;
		this.moveImgUp();
		this.turnSvgWheel('down');

		this.setState((prevState) => {
			return {
				index: prevState.index - 1,
				wheelRotation: prevState.wheelRotation - 30 
			};
		})
	}

	moveToDown = () => {
		let projects = [...document.getElementsByClassName('Gallery__projects--item')];
		if(this.state.index === projects.length - 1) return;
		this.moveImgDown();
		this.turnSvgWheel('up');
		
		this.setState((prevState) => {
			return {
				index: prevState.index + 1,
				wheelRotation: prevState.wheelRotation + 30 
			};
		})
	}

	turnSvgWheel = (deg) => {
		switch(deg) {
			case 'up': {
				
				let wheel = document.getElementById('Capa_1');
				wheel.style.transform = `rotate(${this.state.wheelRotation + 30}deg)`;
				break;
			}
			case 'down': {
				
				let wheel = document.getElementById('Capa_1');
				wheel.style.transform = `rotate(${this.state.wheelRotation - 30}deg)`;
				break;
			}
			default: break;
		}
	}

	moveImgDown = (e) => {
		let images = [...document.querySelectorAll('.Gallery__posters img')];
		let imagesTop = [...document.querySelectorAll('.Gallery__posters .hide-top')];

		images.forEach((img) => {
			if(!img.classList.contains('hide-top') && !img.classList.contains('hide-bottom')) {
				img.classList.add('hide-bottom');
			}
		})

		if(imagesTop) {
			for (let i=0; i<imagesTop.length; i++) {
				if (i>imagesTop.length - 4) {
					imagesTop[i].classList.remove('hide-top');
				}
			}
		}
	}

	moveImgUp = (e) => {
		let images = [...document.querySelectorAll('.Gallery__posters img')];
		let imagesBottom = [...document.querySelectorAll('.Gallery__posters .hide-bottom')]
		images.forEach((img) => {
			if(!img.classList.contains('hide-top') && !img.classList.contains('hide-bottom')) {
				img.classList.add('hide-top');
			} 
		})
		if(imagesBottom) {
			for(let i=0; i<imagesBottom.length; i++) {
				if(i<3) {
					imagesBottom[i].classList.remove('hide-bottom');
				}
			}
		}
	}	

	

	render() {
		if (this.state.proj) {
		return (
			
			<div className='MainWrapper on-enter' onKeyDown={this.keyProjectsItems}>
				
				<MenuButton color='black'/>
				<div className='zoomWrapper'>
					<div className='Gallery' onWheel={this.scrollProjectsItems} >
						<div className='Gallery__logo'>
							<p>Maryna Herasymenko Art</p>
						</div>
						<div className='Gallery__title'>
							<p>ALL PROJECTS</p>
						</div>
						<div className='Gallery__projects--wrapper'>
							<div className='Gallery__projects--wrapperForItems'>
								<SvgElem />
								<ProjectsName mainClass='Gallery__projects--item' projects={this.state.proj} index={this.state.index} />
							</div>
						</div>
						<EventInfoAngleUp  />
						<EventInfoAngleDown />
						<div className='Gallery__projects--description'>
							<Description desc={this.state.proj[this.state.index].description} />

						</div>
						<div className='Gallery__posters '> 
							<Posters imgArr={this.state.proj} index={this.state.index}/>

						</div>
						<div className='toTheGallery'>
							<Link to={`/Projects${this.state.proj[this.state.index].href}`}><p>TO THE GALLERY</p><SvgArrowRight/></Link>
						</div>
					
					</div>
				</div>
			</div>
			
		)
	} else return null

	}
}



function ProjectsName(props) {
	let length = props.projects.length;

	let projects = props.projects.map((item, i) => {
		let currentClass = props.mainClass;

		if (props.index > 0 && i === props.index - 1) currentClass += ' top';
		if (i === props.index) currentClass += ' center';
		if (length > props.index && i === props.index + 1) currentClass += ' bottom';
		if (length > props.index + 1 && i === props.index + 2) currentClass += ' under';

			return(
				<div key={item.name} className={currentClass} >{item.name}</div>
			)
		})
		
	return projects;
}

function Description(props) {
	return(
		<div className='showDescription'><p>{props.desc}</p></div>
		)
}

function Posters(props) {

	let posters = props.imgArr.map((item, i) => {
		let addedClass = null;
		if (i > props.index) addedClass = 'hide-top';
		if (i < props.index) addedClass = 'hide-bottom';
		return (
			<React.Fragment key={item.name}>
				<img className={`img1 ${addedClass}`} src={props.imgArr[i].urls.img1} alt='img'/>
				<img className={`img2 ${addedClass}`} src={props.imgArr[i].urls.img2} alt='img'/>
				<img className={`img3 ${addedClass}`} src={props.imgArr[i].urls.img3} alt='img'/>
			</React.Fragment>
			)
	})

	return posters;
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

function EventInfoAngleUp() {
	return(
<svg className='Gallery__arrowUp' role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
		)
}

function EventInfoAngleDown() {
	return(
<svg className='Gallery__arrowDown' role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
		)
}

function SvgElem(props) {
	return(
		<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 478.703 478.703"  >
			<g>
				<g>
					<path d="M454.2,189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8,7.1-27.9-3.2-38.1l-29.8-29.8
						c-5.6-5.6-13-8.7-20.9-8.7c-6.2,0-12.1,1.9-17.1,5.5l-27.8,19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2
						c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5,0-26.8,10.4-29.2,24.7l-5.8,34c-11.2,3.5-22.1,8.1-32.5,13.7l-27.5-19.8
						c-5-3.6-11-5.5-17.2-5.5c-7.9,0-15.4,3.1-20.9,8.7l-29.9,29.8c-10.2,10.2-11.6,26.3-3.2,38.1l20,28.1
						c-5.5,10.5-9.9,21.4-13.3,32.7l-33.2,5.6c-14.3,2.4-24.7,14.7-24.7,29.2v42.1c0,14.5,10.4,26.8,24.7,29.2l34,5.8
						c3.5,11.2,8.1,22.1,13.7,32.5l-19.7,27.4c-8.4,11.8-7.1,27.9,3.2,38.1l29.8,29.8c5.6,5.6,13,8.7,20.9,8.7c6.2,0,12.1-1.9,17.1-5.5
						l28.1-20c10.1,5.3,20.7,9.6,31.6,13l5.6,33.6c2.4,14.3,14.7,24.7,29.2,24.7h42.2c14.5,0,26.8-10.4,29.2-24.7l5.7-33.6
						c11.3-3.5,22.2-8,32.6-13.5l27.7,19.8c5,3.6,11,5.5,17.2,5.5l0,0c7.9,0,15.3-3.1,20.9-8.7l29.8-29.8c10.2-10.2,11.6-26.3,3.2-38.1
						l-19.8-27.8c5.5-10.5,10.1-21.4,13.5-32.6l33.6-5.6c14.3-2.4,24.7-14.7,24.7-29.2v-42.1
						C478.9,203.801,468.5,191.501,454.2,189.101z M451.9,260.401c0,1.3-0.9,2.4-2.2,2.6l-42,7c-5.3,0.9-9.5,4.8-10.8,9.9
						c-3.8,14.7-9.6,28.8-17.4,41.9c-2.7,4.6-2.5,10.3,0.6,14.7l24.7,34.8c0.7,1,0.6,2.5-0.3,3.4l-29.8,29.8c-0.7,0.7-1.4,0.8-1.9,0.8
						c-0.6,0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6c-13.1,7.8-27.2,13.6-41.9,17.4c-5.2,1.3-9.1,5.6-9.9,10.8l-7.1,42
						c-0.2,1.3-1.3,2.2-2.6,2.2h-42.1c-1.3,0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8c-14.3-3.7-28.1-9.4-41-16.8
						c-2.1-1.2-4.5-1.8-6.8-1.8c-2.7,0-5.5,0.8-7.8,2.5l-35,24.9c-0.5,0.3-1,0.5-1.5,0.5c-0.4,0-1.2-0.1-1.9-0.8l-29.8-29.8
						c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4,3.3-10.2,0.6-14.8c-7.8-13-13.8-27.1-17.6-41.8c-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2
						c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3,0.9-2.4,2.2-2.6l41.7-7c5.3-0.9,9.6-4.8,10.9-10c3.7-14.7,9.4-28.9,17.1-42
						c2.7-4.6,2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5,0.3-3.4l29.8-29.8c0.7-0.7,1.4-0.8,1.9-0.8c0.6,0,1.1,0.2,1.5,0.5l34.5,24.6
						c4.4,3.1,10.2,3.3,14.8,0.6c13-7.8,27.1-13.8,41.8-17.6c5.1-1.4,9-5.6,9.9-10.8l7.2-42.3c0.2-1.3,1.3-2.2,2.6-2.2h42.1
						c1.3,0,2.4,0.9,2.6,2.2l7,41.7c0.9,5.3,4.8,9.6,10,10.9c15.1,3.8,29.5,9.7,42.9,17.6c4.6,2.7,10.3,2.5,14.7-0.6l34.5-24.8
						c0.5-0.3,1-0.5,1.5-0.5c0.4,0,1.2,0.1,1.9,0.8l29.8,29.8c0.9,0.9,1,2.3,0.3,3.4l-24.7,34.7c-3.1,4.3-3.3,10.1-0.6,14.7
						c7.8,13.1,13.6,27.2,17.4,41.9c1.3,5.2,5.6,9.1,10.8,9.9l42,7.1c1.3,0.2,2.2,1.3,2.2,2.6v42.1H451.9z"/>
					<path d="M239.4,136.001c-57,0-103.3,46.3-103.3,103.3s46.3,103.3,103.3,103.3s103.3-46.3,103.3-103.3S296.4,136.001,239.4,136.001
						z M239.4,315.601c-42.1,0-76.3-34.2-76.3-76.3s34.2-76.3,76.3-76.3s76.3,34.2,76.3,76.3S281.5,315.601,239.4,315.601z"/>
				</g>
			</g>
		</svg>
	)
}
