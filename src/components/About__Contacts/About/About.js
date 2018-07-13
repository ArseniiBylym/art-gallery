import React from 'react';
import './About.css';

export default function About (props) {

	let classList = props.side === 'about' ? 'About show' : 'About';
	
	return(
		<div className={classList}>
			<div className='About__container'>
				<div className='About__container--logo'>
					<p>Maryna</p><p>Herasymenko</p>
				</div>
				<div className='About__container--photo'>
					<div className='tempLayout'/>
				</div>
				<div className='About__container--info' >
					<div className='tempLayout'/>
					<div id='artist__info' className='text' >
						<p>Artist</p><br/>
						<p> Education<br/>
						Poltava National Technical University named after Yuri Kondratuik, architecture faculty, Master's degree in "Pictorial art".<br/>
						(2011-2013).</p><br/><br/>
						<p> Assistant of the Chair of the figurative arts of Poltava National Technical University named after Yuri Kondratuik, September 2013- December 2014.</p><br/><br/>
						<p> Member of National Union of Artists of Ukraine since 2015</p>
					</div>
				</div>
			</div>
		</div>
	)
}