import React from 'react';
import './Home.css';

export default function Home (props) {
	
	function navClick(e) {
		let path = e.target.dataset.path;
		if(path === props.location.pathname) return;

		let container = document.querySelector('.Home__container');
		let left = document.querySelector('.Home__blind-left');
		let right = document.querySelector('.Home__blind-right');

		setTimeout(() => {
			props.history.push(path)
		}, 900)
		left.classList.add('Home__blind-left--close');
		right.classList.add('Home__blind-right--close');
		container.classList.add('on-exit')

	}

		return(
			<div className='Home__MainWrapper' > 
				<div className='Home__blind-left Home__blind-left--open' />
				<div className='Home__blind-right Home__blind-right--open' />
				<div className='Home__container' >
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
