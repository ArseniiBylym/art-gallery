import React, { Component } from 'react';
import './Events.css';
import MenuButton from '../MenuButton/MenuButton.js';
import EventInfo from './EventInfo/EventInfo.js';

export default class Events extends Component {
	state = {
		events: window.GLOBAL_DATA.EVENTS,
		currentEventIndex: 0,
		prevEventIndex: null,
		timer: false,
		isOpenDescription: false
	}

	componentDidMount = () => {
		document.body.addEventListener('keydown', this.scrollOnClick)
		this.setState((prevState)=>{
			return({events: prevState.events.sort((a, b)=> {
				return b.date - a.date
			})})
		})
	}
	componentWillUnmount = () => {
		document.body.removeEventListener('keydown', this.scrollOnClick);
	}

	scrollOnClick = (e) => {
		if(this.state.timer) return;
		setTimeout(() => {
			this.setState(() => {
				return {timer: false}
			})
		}, 350)
		if(e.key === 'ArrowUp') this.moveToTop();
		if(e.key === 'ArrowDown') this.moveToDown();
	}

	
	toggleToCurrentEvent = (e) => {
		let arr = [...document.getElementsByClassName('EventItem')];
		let elem = e.currentTarget;
		if(!elem) return;
		this.setState((prevState) => {
			return {prevEventIndex: prevState.currentEventIndex,
					currentEventIndex: arr.indexOf(elem)
			}
		})
	}

	wheelToCurrentEvent = (e) => {
		if(this.state.timer) return;
		setTimeout(() => {
			this.setState(() => {
				return {timer: false}
			})
		}, 350)


		if(e.deltaY > 0) this.moveToDown();
		else this.moveToTop();
		
	}

	moveToTop = () => {
		let events = [...document.getElementsByClassName('EventItem')];
		let currentElem = events[this.state.currentEventIndex];

		if(!currentElem) return;

		if(events.indexOf(currentElem) === 0) return;
		this.setState((prevState) => {
			return{prevEventIndex: prevState.currentEventIndex,
				currentEventIndex: prevState.currentEventIndex - 1,
				timer: true
			}
		})
	}

	moveToDown = () => {
		let events = [...document.getElementsByClassName('EventItem')];
		let currentElem = events[this.state.currentEventIndex];

		if(!currentElem) return;

		if(events.indexOf(currentElem) === events.length - 1) return;
		this.setState((prevState) => {
			return{prevEventIndex: prevState.currentEventIndex,
				currentEventIndex: prevState.currentEventIndex + 1,
				timer: true
			}
		})
	}

	isOpenToggle = () => {
		this.setState((prevState) => {
			return {isOpenDescription: !prevState.isOpenDescription}
		})
	}

	render() {

		let eventList = null;
		if(this.state.events) {
			eventList = this.state.events.map((event,index) => {
				let currentClass = 'EventItem';
				let dateColor = null;
				if(index === this.state.currentEventIndex) {
					currentClass += ' currentItem';
				}
				if(event.date > new Date()) {
					dateColor = 'red';
				}
				return (
					<div key={index}
					onClick={this.toggleToCurrentEvent} className={currentClass}>
						<div className='EventItem__name'>{event.name}</div>
						<div className='EventItem__date' style={{color: dateColor}}>{new Date(event.date).toLocaleString('en-Us',{day:'numeric', month:'long', year: 'numeric'})}</div>
					</div>
				)
			})
		}
		let eventImages = null;
		if (this.state.events) {
			eventImages = this.state.events.map ((event, index) => {
				let currentClass = 'Events__viewport--image';
				if(index < this.state.currentEventIndex) {
					currentClass += ' prevPicture';
				}
				if(index === this.state.currentEventIndex) {
					currentClass += ' currentPicture';
				}
				if(index === this.state.prevEventIndex) {
					currentClass += ' addZIndex';
				}
				return (
					<div key={index} 
					className={currentClass} style={{backgroundImage: event.poster}}/>
				)
			})
		}

		let infoTable = null;
		if(this.state.isOpenDescription) {
			infoTable = <div className='eventDescription--wrapper open'>
										<div className='eventDescription'>
											<p>{this.state.events[this.state.currentEventIndex].description}</p>
										</div>
									</div>
		} else {
			infoTable = <div className='eventDescription--wrapper'>
										<div className='eventDescription'>
											<p>{this.state.events[this.state.currentEventIndex].description}</p>
										</div>
									</div>
		}


		if(this.state.events) { 
			return(
			<div id='Events' className='MainWrapper on-enter'>
				
				<MenuButton color='black'/>
				<div className='zoomWrapper'>
					<div className='Events__wrapper'>
						<div id='Events' className='Events' 
						onWheel={this.wheelToCurrentEvent}>
							<div className='Events__logo'>
								<p>Maryna Herasymenko Art</p>
							</div>
							<div className='Events__sidebar'>
								<h2>EV<span>E</span>NTS</h2>
							</div>
							<div className='Events__list' >
								<div className="EvnetItem__wrapper">
									{eventList}
								</div>
							</div>
							<div className='EventScrollPointer'>
								<EventsArrowUp />
								<p>s</p><span>c</span><p>r</p><p>o</p><p>l</p><p>l</p>
								<EventsArrowDown />
							</div>
							<div className='Events__viewport'>
								{eventImages}
							</div>
							{this.state.events ? 
								<div className='Events__infoTable' >
									<EventInfo place={this.state.events[this.state.currentEventIndex].place} 
									date={this.state.events[this.state.currentEventIndex].date} 
									description={this.state.events[this.state.currentEventIndex].description} 
									click={this.isOpenToggle}
									isOpen={this.state.isOpenDescription} />
						    </div> : null
						  }
						 	{infoTable}		
						</div>
					</div>
				</div>
			</div>
		)}
		else return null
	}
}


function EventsArrowUp() {
	return(
			<svg role="img" viewBox="0 0 256 512"><path fill="currentColor" d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z"></path></svg>
		)
}

function EventsArrowDown() {
	return(
<svg  role="img" viewBox="0 0 256 512"><path fill="currentColor" d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"></path></svg>
		)
}

