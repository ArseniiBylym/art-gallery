import React, { Component } from 'react';

import Header from './Header/Header.js';
import GalleryPre from './GalleryPre/GalleryPre.js';
import EventsPre from './EventsPre/EventsPre.js';
import AboutPre from './AboutPre/AboutPre.js';
import FooterPre from './FooterPre/FooterPre.js';

import './Home.css';


class Home extends Component {
	render() {
		return (
			<div className='Home'>
				<Header />
				<GalleryPre />
				<EventsPre />
				<AboutPre />
				<FooterPre />
			</div>
		);
	}
}

export default Home;
