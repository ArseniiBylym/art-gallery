import React, {Component} from 'react';
import './Gallery.css';
import Project from './Project/Project.js';
import {Route, Link} from 'react-router-dom';

export default class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			proj: [
				{
					name: 'Grid',
					href: '/Grid-project',
					description: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque reprehenderit architecto, laborum quam tempore expedita temporibus. Distinctio laboriosam, at pariatur excepturi maxime totam cum, cumque mollitia quidem officiis, consectetur possimus.',
					urls: {
						img1: './img/Gallery/GridProject/img1.jpg',
						img2: './img/Gallery/GridProject/img2.jpg',
						img3: './img/Gallery/GridProject/img3.jpg',
					}
				},
				{
					name: 'Connection',
					href: '/Connection',
					description: '2 Obcaecati quis quo alias placeat incidunt aspernatur possimus ducimus officiis, numquam quam? Quam, totam repellat ad autem delectus minus veniam iste laudantium nisi exercitationem harum, tempore voluptas reprehenderit debitis quidem earum itaque natus facere!',
					urls: {
						img1: './img/Gallery/GridProject/img3.jpg',
						img2: './img/Gallery/GridProject/img1.jpg',
						img3: './img/Gallery/GridProject/img2.jpg',
					}
				},
				{
					name: 'Oil',
					href: '/Home',
					description: '3 Nemo eaque placeat pariatur repellat veritatis quia aliquid totam assumenda reprehenderit accusamus! Iste ut, sint quidem deleniti ipsa temporibus blanditiis nisi accusantium unde eligendi ullam soluta sunt mollitia voluptatibus voluptatum aliquam quos obcaecati.',
					urls: {
						img1: './img/Gallery/GridProject/img4.jpg',
						img2: './img/Gallery/GridProject/img2.jpg',
						img3: './img/Gallery/GridProject/img1.jpg',
					}
				}
			],
			index: 1,
			timerStop: false,
			moving: null
		};
	}

	
	scrollProjectsItems = (e) => {
		if (this.state.timerStop) return;

		this.setState(() => {
			return {timerStop: true};
		})

		let timer = setTimeout(() => {
			this.setState(() => {
				return {timerStop: false};
				})
			}, 600);
		
		let projects = [...document.getElementsByClassName('Gallery__projects--item')];

		if (e.deltaY < 0) {
			if(this.state.index == 0) return;
			console.log('up');

			scrollToTop(projects, this.state.index);
			this.moveImgUp();
			this.showDescription('prev');

			this.setState((prevState) => {
				return {index: prevState.index - 1};
			})
		}

		if (e.deltaY > 0) {
			if(this.state.index == projects.length - 1) return;
			scrollToBottom(projects, this.state.index);
			this.moveImgDown();
			this.showDescription('next');

			this.setState((prevState) => {
				return {index: prevState.index + 1};
			})
		}
	}

	showDescription = (which) => {
		let text = [...document.querySelectorAll('.Gallery__projects--description div')];
		document.querySelector('.Gallery__projects--description div.showDescription').classList.remove('showDescription');
		
		switch(which) {
			case 'next': {
				text[this.state.index + 1].classList.add('showDescription');
				return
			}
			case 'prev': {
				text[this.state.index - 1].classList.add('showDescription');
				return
			}
			default: return;
		}
		
	}

	moveImgDown = (e) => {
		console.log('up');
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

	moveImgUp =(e) => {
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
		return (
			<div className='Gallery'>
				<div className='Gallery__title'>
					<h1>All projects</h1>
				</div>
				<div className='Gallery__wrapper' onWheel={this.scrollProjectsItems}>
					<div className='Gallery__projects'>
						<div className='Gallery__projects--wrapper'>
							<div className='Gallery__projects--item top'><Link to={this.state.proj[0].href}>{this.state.proj[0].name}</Link></div>
							<div className='Gallery__projects--item center'><Link to={this.state.proj[1].href}>{this.state.proj[1].name}</Link></div>
							<div className='Gallery__projects--item bottom'><Link to={this.state.proj[2].href}>{this.state.proj[2].name}</Link></div>
						</div>
						<div className='Gallery__projects--description'>
						 	<div><p>{this.state.proj[0].description}</p></div>
							<div className='showDescription'><p>{this.state.proj[1].description}</p></div>
							<div><p>{this.state.proj[2].description}</p></div>
						</div>
					</div>

					<div className='Gallery__posters '> 
						<img className='img1 hide-top' src={this.state.proj[0].urls.img1} alt='img'/>
						<img className='img2 hide-top' src={this.state.proj[0].urls.img2} alt='img'/>
						<img className='img3 hide-top' src={this.state.proj[0].urls.img3} alt='img'/>
						<img className='img1' src={this.state.proj[1].urls.img1} alt='img'/>
						<img className='img2' src={this.state.proj[1].urls.img2} alt='img'/>
						<img className='img3' src={this.state.proj[1].urls.img3} alt='img'/>
						<img className='img1 hide-bottom' src={this.state.proj[2].urls.img1} alt='img'/>
						<img className='img2 hide-bottom' src={this.state.proj[2].urls.img2} alt='img'/>
						<img className='img3 hide-bottom' src={this.state.proj[2].urls.img3} alt='img'/>
					</div>
				</div>
			</div>
		)
	}
}


function scrollToTop(projects, index) {
	if (projects[index - 2]) {
		projects[index - 2].classList.add('top');
	}

	projects[index - 1].classList.remove('top');
	projects[index - 1].classList.add('center');

	projects[index].classList.remove('center');
	projects[index].classList.add('bottom');

	if(projects[index + 1]) {
		projects[index + 1].classList.remove('bottom');
		projects[index + 1].classList.add('under');
	}
};

function scrollToBottom(projects, index) {
	if (projects[index - 1]){
		projects[index - 1].classList.remove('top');
	}

	projects[index].classList.remove('center');
	projects[index].classList.add('top');

	projects[index + 1].classList.remove('bottom');
	projects[index + 1].classList.add('center');
	
	if (projects[index + 2]){
		projects[index + 2].classList.remove('under');
		projects[index + 2].classList.add('bottom');			
	}
}
