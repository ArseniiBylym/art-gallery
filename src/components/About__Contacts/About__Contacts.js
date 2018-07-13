import React, {Component} from 'react';
import './About__Contacts.css';
import MenuButton from '../MenuButton/MenuButton.js';
import About from './About/About';
import Contact from './Contact/Contact';

export default class About__Contacts extends Component {

	state = {
		side: this.props.match.params.side
	}


	toggleSides = (e) => {
		console.log('clicked')
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

	render() {
		return(
			<div className='About__Contacts__MainWrapper' onWheel={this.wheelClick}>
				<MenuButton color='black' 
					side={this.state.side}
					stateStyles={{time: 0}}
					forceRoute={this.forceRoute}/>
				<div className='zoomWrapper'>
				<div className='About__Contacts'>
					<Header side={this.state.side} click={this.toggleSides} />
					<About side={this.state.side}/>
					<Contact side={this.state.side}/>
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
