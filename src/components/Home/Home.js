import React, { Component } from 'react';

import Header from './Header/Header.js';
import HomeGallery from './Home__Gallery/Home__Gallery.js';
import EventsPre from './EventsPre/EventsPre.js';
import AboutPre from './AboutPre/AboutPre.js';
import FooterPre from './FooterPre/FooterPre.js';
import Arrow from './Arrow/Arrow.js';

//Functions
import scrollAnimations from '../../functions/scrollAnimations.js';


import './Home.css';


class Home extends Component {

	componentDidMount() {
		scrollAnimations();
	}

	render() {
		return (
			<div className='Home' id='Home'>
				<Header />
				<HomeGallery />
				<EventsPre />
				<AboutPre />
				<FooterPre />
				<Arrow dirrection='arrowUp' />
				<Arrow dirrection='arrowDown' />
			</div>
		);
	}
}

export default Home;
