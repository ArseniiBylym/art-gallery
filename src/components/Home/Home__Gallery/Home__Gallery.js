import React from 'react';
import './Home__Gallery.css';
import Picture from './Picture/Picture.js';

function home__gallery(props) {

	return (
		<div className='Home__Gallery' id='Home__Gallery'>
			<div className='Home__Gallery__title'>
				<h1>Gallery</h1>
			</div>
			<div className='Home__Gallery__immage-container'>
				<Picture src='./img/Home/gallery/rsz_img1.jpg' >
					<p>Horizon<br/>100x110<br/>acrylic on canvas<br/>2018</p>
				</Picture>
				<Picture src='./img/Home/gallery/rsz_img2.jpg' >
					<p>Northern Lights<br/>100x110<br/>acrylic on canvas<br/>2018</p>
				</Picture>
				<Picture src='./img/Home/gallery/rsz_img3.jpg' >
					<p>Hole<br/>60x80<br/>acrylic on canvas<br/>2017</p>
				</Picture>
				<Picture src='./img/Home/gallery/rsz_img4.jpg' >
					<p>Frame<br/>60x80<br/>acrylic on canvas<br/>2017</p>
				</Picture>
				<h2 className='see-more'>See more</h2>
			</div>
			
		</div>

		)

	// return (
	// 	<div className='Home__Gallery' id='Home__Gallery'>
	// 		<div className='Home__Gallery__title'>
	// 			<h1>Gallery</h1>
	// 		</div>
	// 		<div className='Home__Gallery__immage-container'>
	// 			<div className='img1'>
	// 					<p>Horizon<br/>100x110<br/>acrylic on canvas<br/>2018</p>
	// 				<div className='picture'>
	// 				</div>
	// 			</div>
	// 			<div className='img2'>
	// 					<p>Northern Lights<br/>100x110<br/>acrylic on canvas<br/>2018</p>
	// 				<div className='picture'>
	// 				</div>
	// 			</div>
	// 			<div className='img3'>
	// 					<p>Hole<br/>60x80<br/>acrylic on canvas<br/>2017</p>
	// 				<div className='picture'>
	// 				</div>
	// 			</div>
	// 			<div className='img4'>
	// 					<p>Frame<br/>60x80<br/>acrylic on canvas<br/>2017</p>
	// 				<div className='picture'>
	// 				</div>
	// 			</div>
	// 			<h2 className='more'>See more</h2>
	// 		</div>
	// 	</div>
	// )
}

export default home__gallery;