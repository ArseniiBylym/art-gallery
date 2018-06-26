import React, { Component } from 'react';

import Header from './Header/Header.js';
import HomeGallery from './Home__Gallery/Home__Gallery.js';
import EventsPre from './EventsPre/EventsPre.js';
import AboutPre from './AboutPre/AboutPre.js';
import FooterPre from './FooterPre/FooterPre.js';

import './Home.css';


class Home extends Component {


	render() {
		return (
			<div className='Home' id='Home'>
				<Header />
				<HomeGallery />
				<EventsPre />
				<AboutPre />
				<FooterPre />
				<div className='arrow arrowUp'></div>
				<div className='arrow arrowDown'></div>
			</div>
		);
	}
}

export default Home;
