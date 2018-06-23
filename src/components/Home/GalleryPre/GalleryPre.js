import React from 'react';
import './GalleryPre.css';

function galleryPre(props) {
	return (
		<div className='GalleryPre'>
			<div><h1>Gallery</h1></div>
			<div className='GalleryPre__immage-container'>
				<div className='img1'>
						<p>Horizon<br/>100x110<br/>acrylic on canvas<br/>2018</p>
					<div className='inner'>
					</div>
				</div>
				<div className='img2'>
						<p>Northern Lights<br/>100x110<br/>acrylic on canvas<br/>2018</p>
					<div className='inner'>
					</div>
				</div>
				<div className='img3'>
						<p>Hole<br/>60x80<br/>acrylic on canvas<br/>2017</p>
					<div className='inner'>
					</div>
				</div>
				<div className='img4'>
						<p>Frame<br/>60x80<br/>acrylic on canvas<br/>2017</p>
					<div className='inner'>
					</div>
				</div>
				<h2 className='more'>See more</h2>
			</div>
		</div>
	)
}

export default galleryPre;