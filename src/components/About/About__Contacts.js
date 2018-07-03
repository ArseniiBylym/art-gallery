import React, {Component} from 'react';
import './About__Contacts.css';
import MenuButton from '../MenuButton/MenuButton.js';

export default class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: true,
			toggle: true
		};
	}

	moveInfoText = (event) => {
		if (!this.state.timer) return;
		this.setState(prevState => {
			return {timer: false};
		})
		setTimeout(() => {
			this.setState(prevState => {
				return {timer: true};
			})
		}, 700)

		let elem = document.getElementById('artist__info');
		let top = parseInt(window.getComputedStyle(elem).top);
		let bottom = parseInt(window.getComputedStyle(elem).bottom);
		let parentBottom = parseInt(window.getComputedStyle(elem.parentNode).bottom);

		if (event.deltaY > 0) {
			if (bottom >= parentBottom) return;
			let moveIndex = top - Math.abs(event.deltaY/1);
			moveIndex = moveIndex > 0 ? 0 : moveIndex; 
			elem.style.top = moveIndex + 'px';
		}
		if (event.deltaY < 0  ) {
			let moveIndex = top + Math.abs(event.deltaY/1);
			moveIndex = moveIndex > 0 ? 0 : moveIndex; 
			elem.style.top = moveIndex + 'px';
		}
	}

	toggleToContacts = (e) => {
		console.log(this.state.toggle);
		if(!this.state.toggle) return;
		document.querySelector('.Contacts').classList.toggle('contactsShow');
		document.querySelector('.About').classList.toggle('aboutHide');
		e.target.classList.toggle('activeButton');
		e.target.previousElementSibling.classList.toggle('activeButton');
 		this.setState(prevState => {
 			return {toggle: false};
 		})  				
	}
	toggleToAbout = (e) => {
		console.log(this.state.toggle);
		if(this.state.toggle) return;
		document.querySelector('.Contacts').classList.toggle('contactsShow');
		document.querySelector('.About').classList.toggle('aboutHide');
		e.target.classList.toggle('activeButton');
		e.target.nextElementSibling.classList.toggle('activeButton');
		this.setState(prevState => {
			return {toggle: true};
		})		
	}


	render() {
		return(
		<React.Fragment>
			<MenuButton color='white'/>
			<div className='zoomWrapper'>
			<div className='About__Contacts'>
				<div className='header'>
					<div className='button activeButton' onClick={this.toggleToAbout}>About</div>	
					<div className='button' onClick={this.toggleToContacts}>Contact</div>
				</div>
				<div className='About'>
					<div className='About__container'>
						<div className='About__container--logo'>
							<p>Maryna Herasymenko</p>
						</div>
						<div className='About__container--info' onWheel={this.moveInfoText}>
							<div id='artist__info' className='text' >
								<p> Herasymenko Maryna<br/>
								born on May 20, 1990<br/>
								Ukraine, town of Poltava</p><br/><br/>
								<p> Education<br/>
								Poltava National Technical University named after Yuri Kondratuik, architecture faculty, Master's degree in "Pictorial art".<br/>
								(2011-2013).</p><br/><br/>
								<p> Work experience:<br/>
								Personal exhibition Grid Project,<br/>
								Pavlovka Art Gallery  - November 2017 , city of Kyiv.<br/>
								Abstract Art Festival 2017, Pavlovka Art Gallery - June, city of Kyiv.<br/>
								Ukrainian Art Week 2017- participant, May 2017, city of Kyiv.<br/>
								LandArtFest - participant, April  2017, town of Poltava.<br/>
								Art Parter - participant, April 2016, town of Poltava.<br/>
								Socio-art project "Kadetarium 2.0" — participnt, May 2015, town of Poltava.<br/>
								Socio-art project "Kadetarium 2.0"- organizer, participnt, May 2014, town of Poltava.</p><br/><br/>
								<p> Assistant of the Chair of the figurative arts of Poltava National Technical University named after Yuri Kondratuik, September 2013- December 2014.</p><br/><br/>
								<p> Member of National Union of Artists of Ukraine since 2015</p>
							</div>
						</div>
					</div>
				</div>
				<div className='Contacts'> 
					<div className='contacts__header'>
						<p>CONTACTS</p>
					</div>
					<div className='aside'>
						<p>From:</p>
						<div className='developer-contacts'>
							<p>Created by <span>Arsenii Bylym</span> <a href='mailto:my_adress'>arseniibylym@gmail.com</a></p>
						</div>
					</div>
					<div className='main-container'>
						<div className='from-container'>
							<div className='from-container--name'>
								<p>Name:</p><input></input>
							</div>
							<div className='from-container--email'>
								<p>Email:</p><input></input>
							</div>
							<div className='from-container--message'>
								<p>Message:</p><textarea rows='5'></textarea>
							</div>
						</div>
						<div className='sent-button'>
							<button>Sent</button>
						</div>
						<div className='to-container'> 
							<div className='to-container--reciever'>
								<div className='to-container--reciever-title'>
									<p>To:</p>
								</div>
								<div className='to-container--reciever-info'>
									<h3>Maryna Herasymenko</h3>
									<p>21 Sobornosty Street,</p>
									<h3>Poltava, Ukraine</h3>
								</div>
							</div>
							<div className='to-container--phone'>
								<div className='to-container--phone-icon'>
									<i className="fas fa-phone-square fa-lg"></i>
								</div>
								<div className='to-container--phone-number'>
									<p>+38 097 1234567</p>
								</div>
							</div>
							<div className='to-container--email'>
								<div className='to-container--email-icon'>
									<i className="far fa-envelope fa-lg"></i>
								</div>
								<div className='to-container--email-adres'>
									<a href='mailto:some_adres'>some_adres@gmail.com</a>
								</div>
							</div>
						</div>
						
					</div>
					<div className='icons-container'> 
						<div><i className="fab fa-facebook-square fa-3x"></i></div>
						<div><i className="fab fa-twitter-square fa-3x"></i></div>
						<div><i className="fab fa-linkedin fa-3x"></i></div>
						<div><i className="fab fa-instagram fa-3x"></i></div>
					</div>
				</div>
			</div>
			</div>
		</React.Fragment>
		)
	}
}