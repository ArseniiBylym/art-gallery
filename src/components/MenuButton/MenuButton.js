import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './MenuButton.css';

class MenuButton extends Component {
	
	state = {
		isClicked: false
	}

	showMenu = () => {
		zoomeLayoutIn();
		document.getElementById('MenuOpenButton').classList.add('hide-menuButton');

		this.setState({isClicked: true})
	}

	hideMenu = () => {
		zoomeLayoutOut();
		document.getElementById('MenuOpenButton').classList.remove('hide-menuButton');
		document.getElementById('MenuContainer').classList.add('hide__menu');

		setTimeout(() => {
			this.setState({isClicked: false})	
		}, 350)
	}

	goToEvents = (e) => {

		let path = e.target.dataset.path;

		if((this.props.match.url === '/About__Contacts/about' 
			|| this.props.match.url === '/About__Contacts/contact') && 
			(path === '/About__Contacts/about' || path === '/About__Contacts/contact')) {

			this.hideMenu();
			if (path === '/About__Contacts/about'){
				setTimeout(() => {
					this.props.forceRoute('about')
				}, 500)
			}
			if (path === '/About__Contacts/contact'){
				setTimeout(() => {
					this.props.forceRoute('contact')
				}, 500)
			}
			return;
		}

		if(path === this.props.match.url) {
			this.hideMenu();
			return;
		}

		if(this.props.stateStyles) {
			//if custom main and on-exit styles are defined
			//in component define the object named stateStyles with props queryID, onExitClass and time
			if(this.props.stateStyles.time === 0) {
				// console.log('I am here')
				//if define only time property, transition will be immediately 
				this.props.history.push(path);
				return;
			} else {
				let wrapElem = document.querySelector(this.props.stateStyles.queryID);
				setTimeout(() => {
					this.props.history.push(path);
				}, this.props.stateStyles.time)

				wrapElem.classList.add(`${this.props.stateStyles.onExitClass}`);
				return;
			}
		} else  {
			this.props.history.push(path);	
		}
	}

	render () {
		let menu = null;
		if(this.state.isClicked){
			menu = (<div>
				<div id='MenuOpenLayout' className='MenuOpenLayout' onClick={this.hideMenu}>
				</div>
				<div id='MenuContainer' className='MenuOpenLayout__container'>
					<div><span data-path='/Home' onClick={this.goToEvents}>HOME</span></div> 
					<div><span data-path='/Projects' onClick={this.goToEvents}>PROJECTS</span></div> 
					<div><span data-path='/Events' onClick={this.goToEvents}>EVENTS</span></div> 
					<div><span data-path='/About__Contacts/about' onClick={this.goToEvents}>ABOUT</span></div> 
					<div><span data-path='/About__Contacts/contact' onClick={this.goToEvents}>CONTACT</span></div> 
				</div>
				</div>
			);
		}

		return(
			<div id='NavMenuButton'>
				<div id='MenuOpenButton' className='MenuOpenButton' onClick={this.showMenu}>
					<div style={{background: this.props.color}}></div>
					<div style={{background: this.props.color}}></div>
					<div style={{background: this.props.color}}></div>
				</div>
				{menu}
			</div>
		)
	}
} 

function zoomeLayoutIn() {
	let layout = document.querySelector('.zoomWrapper').firstElementChild;
	layout.classList.add('zoomedLayout'); 
}

function zoomeLayoutOut() {
	let layout = document.querySelector('.zoomWrapper').firstElementChild;
	layout.classList.remove('zoomedLayout');
}

export default withRouter(MenuButton);