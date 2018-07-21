import React, { Component } from 'react';
import './FullscreenButton.css';

export default class FullscreenButton extends Component {
	state = {
		isFullscreen: false
	}

	fullscreenToggle = (e) => {
		console.log('clicked')
		console.log(this.state.isFullscreen)
		this.state.isFullscreen ? document.documentElement.webkitRequestFullscreen()
														: document.webkitExitFullscreen();

		this.setState((prevState) => {
			return ({isFullscreen: !prevState.isFullscreen})
		})
	}

	render() {
		return(
			<div id='FullscreenButton' onClick={this.fullscreenToggle} >
				{this.state.isFullscreen ? (
					<OpenFull/>
					) : (
					<CloseFull/>
					)}
			</div>

		)
	}
}

function OpenFull() {
	return (
		<svg role="img" viewBox="0 0 448 512">
			<path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 
			12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 
			0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 
			12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 
			12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 
			6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 
			468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 
			12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z">
			</path>
		</svg>
	)
}

function CloseFull() {
	return(
		<svg  role="img" viewBox="0 0 448 512">
			<path fill="currentColor" d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 
			5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 
			12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 
			0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 
			300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 
			12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0
			 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0
			  6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z">
		  </path>
	  </svg>
	)
}