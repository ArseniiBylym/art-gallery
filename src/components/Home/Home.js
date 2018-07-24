import React from 'react';
import './Home.css';
import FullscreenButton from './FullscreenButton/FullscreenButton';

export default function Home (props) {


	function navClick(e) {
		let path = e.target.dataset.path;
		if(path === props.location.pathname) return;

		let container = document.querySelector('.Home__container');

		container.classList.add('on-exit');
		setTimeout(() => {
			props.history.push(path)
		}, 400)

	}
	function fullscreenToggleIn(e) {
		document.documentElement.webkitRequestFullscreen();
	}
	function fullscreenToggleOut(e) {
		document.webkitExitFullscreen();
	}

		return(
			<div className='Home__MainWrapper' > 
				<div className='Home__container' >
					<FullscreenButton />
					<div className='Title-box'>
						<div className='Title-box__name'>
							<p>MARYNA</p>
						</div>
						<div className='Title-box__surname'>
							<p>HERASYMENKO</p>
						</div>
						<div className='Title-box__art'>
							<p>ART</p>
						</div>
					</div>
					<div className='Nav-box'>
						<div><span data-path='/Home' onClick={navClick}>HOME</span><div className='linkBlindBox'/></div>
						<div><span data-path='/Projects' onClick={navClick}>PROJECTS</span><div className='linkBlindBox'/></div>
						<div><span data-path='/Events' onClick={navClick}>EVENTS</span><div className='linkBlindBox'/></div>
						<div><span data-path='/About__Contacts/about' onClick={navClick}>ABOUT</span><div className='linkBlindBox'/></div>
						<div><span data-path='/About__Contacts/contact' onClick={navClick}>CONTACT</span><div className='linkBlindBox'/></div>
					</div>
				</div>
			</div>

		)
	
}
