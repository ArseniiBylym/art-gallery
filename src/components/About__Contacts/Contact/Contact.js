import React, { Component } from 'react';
import './Contact.css';
import {firebaseDB} from '../../../functions/firebase';
import ModalMessage from './ModalMessage/ModalMessage';


export default class Contact extends Component {

	state = {
		isSended: false,
		isValid: false,
		name: '',
		email: '',
		message: ''
	}

	inputValue = (e) => {
		let elem = e.target.name;

		this.setState({[elem]: e.target.value})
	}

	isValid = () => {
		if (this.state.name.trim() !== '' && this.state.email.trim() !== '' && this.state.message.trim() !== '') return true;
	 	else return false;
	}

	submitMessage = (e) => {
		if(this.isValid()) {
			let message = {
				name: document.querySelector('.from-container--name input').value,
				email: document.querySelector('.from-container--email input').value,
				text: document.querySelector('.from-container--message textarea').value,
			}
			firebaseDB.ref('messages/').push({
					username: message.name,
					email: message.email,
					text: message.text
			}).then(() => { this.setState({isSended: true, isValid: true}); })
			.catch((e) => {alert('Ups! Something went wrong. Try it agian.')})
		}
		else {
			this.setState({isSended: true})
		}

		e.preventDefault();
	}



	render() {

		let classList = this.props.side === 'contact' ? 'Contact show' : 'Contact';

		let modalLayout = null;
		if (this.state.isSended) {
			if (this.state.isValid){
				modalLayout = <ModalMessage click={(e)=>{this.setState({isSended: false, isValid: false, name: '', email: '', message: ''})}}>
												<p> Thank you for your message! </p>
												<p> I'll get back you soon </p>
											</ModalMessage>
			}
			else {
				modalLayout = <ModalMessage click={(e)=>{this.setState({isSended: false, isValid: false})}}>
												<p> Please, enter the correct values and try again! </p>
											</ModalMessage>
			}
		}
		
		return(
			
			<div className ={classList}> 
				{modalLayout}
				<div className='contacts__header'>
					<p>CONTACT</p>
				</div>
				<div className='cork'/>
				<div className='aside' />
				<div className='aside__from'>
					<p>From:</p>
				</div>
				<div className='main-container'>
					<div className='from-container'>
						<div className='from-container--name'>
							<p>Name:</p><input form='sentEmailForm' name='name'  value={this.state.name} onChange={this.inputValue}></input>
						</div>
						<div className='from-container--email'>
							<p>Email:</p><input form='sentEmailForm' name='email' value={this.state.email} onChange={this.inputValue}></input>
						</div>
						<div className='from-container--message'>
							<p>Message:</p><textarea rows='5' form='sentEmailForm' name='message' value={this.state.message} onChange={this.inputValue}></textarea>
						</div>
					</div>
					<div className='sent-button'>
						<form id='sentEmailForm' onSubmit={this.submitMessage}>
							<button type='submit'>SENT</button>
						</form>
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
								<SvgPhone/>
							</div>
							<div className='to-container--phone-number'>
								<p>+38 097 1234567</p>
							</div>
						</div>
						<div className='to-container--email'>
							<div className='to-container--email-icon'>
								<SvgMail/>
							</div>
							<div className='to-container--email-adres'>
								<a href='mailto:some_adres'>some_adres@gmail.com</a>
							</div>
						</div>
					</div>
					<div id='fb-icon'><SvgFb/></div>
					<div id='tw-icon'><SvgTw/></div>
					<div id='in-icon'><SvgIn/></div>
					<div id='inst-icon'><SvgInst/></div>
					
				</div>
				<div className='copyrights'> 
					<p>{'\u00A9Maryna Herasymenko 2018 All rights reserved'}</p>
				</div>
				<div className='creatorInfo'>
					<p>Created by Arsenii Bylym <a href='mailto:arseniibylym@gmail.com'>arseniibylym@gmail.com</a></p>
				</div>
			</div>
		)
	}
}

function SvgFb() {
	return(
			<svg role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"></path></svg>
	)
}

function SvgTw() {
	return(
<svg role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path></svg>
	)
}

function SvgIn() {
	return(
<svg role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
	)
}

function SvgInst() {
	return(
	<svg role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
	)
}

function SvgPhone() {
	return(
<svg role="img"viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM94 416c-7.033 0-13.057-4.873-14.616-11.627l-14.998-65a15 15 0 0 1 8.707-17.16l69.998-29.999a15 15 0 0 1 17.518 4.289l30.997 37.885c48.944-22.963 88.297-62.858 110.781-110.78l-37.886-30.997a15.001 15.001 0 0 1-4.289-17.518l30-69.998a15 15 0 0 1 17.16-8.707l65 14.998A14.997 14.997 0 0 1 384 126c0 160.292-129.945 290-290 290z"></path></svg>
	)
}

function SvgMail() {
	return(
<svg role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
	)
}