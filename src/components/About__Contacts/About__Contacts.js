import React, {Component} from 'react';
import './About__Contacts.css';
import MenuButton from '../MenuButton/MenuButton.js';
import About from './About/About';
import Contact from './Contact/Contact';

export default class About__Contacts extends Component {

	state = {
		side: this.props.match.params.side,
	}
	touchMoveStartY = 0;
	deltaMoveY = 0;



	componentDidMount = () => {
			document.body.addEventListener('keydown', this.scrollOnClick)
	}
	componentWillUnmount = () => {
		document.body.removeEventListener('keydown', this.scrollOnClick)
	}

	startTouchWatch = (e) => {
		this.touchMoveStartY =  +e.touches[0].clientY.toFixed(0);
	}

	continueTouchWatch = (e) => {
		this.deltaMoveY = +e.touches[0].clientY.toFixed(0);
	}

	stopTouchWatch = (e) => {
		let diff = Math.abs(this.deltaMoveY - this.touchMoveStartY);

		if (this.deltaMoveY !== 0 && diff > 50) {
			let event = new MouseEvent("click", {bubbles: true});

			this.deltaMoveY < this.touchMoveStartY ? 
			document.getElementById('contactButton').dispatchEvent(event) : 
			document.getElementById('aboutButton').dispatchEvent(event)
		}
		this.deltaMoveY = 0;
	}

	scrollOnClick = (e) => {
		let event = new MouseEvent("click", {bubbles: true});
		if(e.key === 'ArrowDown') document.getElementById('contactButton').dispatchEvent(event);
		if(e.key === 'ArrowUp') document.getElementById('aboutButton').dispatchEvent(event);
	}

	toggleSides = (e) => {
		if (e.target.classList.contains('activeButton')) {
			return};

		this.setState((prevState) => {
			let currentState = prevState.side === 'about' ? 'contact' : 'about'
			return {side: currentState}
		})
	}

	wheelClick = (e) => {
		let event = new MouseEvent("click", {bubbles: true});
		
		if(e.deltaY > 0) {
			if (this.state.side === 'contact') return;
			document.getElementById('contactButton').dispatchEvent(event);
		} else {
			if (this.state.side === 'about') return;
			document.getElementById('aboutButton').dispatchEvent(event);
		} 

	}

	forceRoute = (side) => {
		this.setState({side: side});
	}

	goToLoginForm = () => {
		this.props.history.push('/Admin');
	}

	render() {
		return(
			<div className='About__Contacts--wrapper MainWrapper on-enter' onWheel={this.wheelClick}>
				<MenuButton color='black' 
					side={this.state.side}
					stateStyles={{time: 0}}
					forceRoute={this.forceRoute}/>
				<div className='zoomWrapper'>
				<div id='About__Contacts' className='About__Contacts'
					onTouchStart={this.startTouchWatch} 
					onTouchEnd={this.stopTouchWatch}
					onTouchMove={this.continueTouchWatch}>
					<Header side={this.state.side} click={this.toggleSides} />
					<LogInButton click={this.goToLoginForm} />
					<About side={this.state.side}/>
					<Contact side={this.state.side} modal={this.toggleModale}/>
				</div>
				</div>
			</div>
		)
	}
}

function Header(props) {
	return(
		<div className='header'>
			<div id="aboutButton" className={props.side === 'about' ? 'button activeButton' : 'button'}  onClick={props.click}>About</div>	
			<div id="contactButton" className={props.side === 'contact' ? 'button activeButton' : 'button'} onClick={props.click}>Contact</div>
		</div>
	)
}

function LogInButton(props) {
	return(
		<div className='LogInButton' onClick={props.click}> Log in </div>
		)
}
