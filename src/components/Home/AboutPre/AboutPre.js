import React from 'react';
import './AboutPre.css';

function aboutPre(props) {
	return (
		<div className='AboutPre' id='Home__AboutPre'>
			<div className='AboutPre__info'>
				<div className="AboutPre__info--header">
					<h1>About me</h1>
				</div>
				<div className='AboutPre__info--biography'>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
						Error accusantium, dicta architecto rem, voluptatibus repudiandae totam 
						nostrum, vero aspernatur aut vel dolorum repellendus possimus. Dicta non 
						a similique unde nihil, ratione vitae quisquam natus!</p><hr /> 
					<p>Enim odio mollitia 
						vitae sed, temporibus autem voluptas, nobis in labore pariatur reiciendis, 
						tempora ut est vero. Nostrum ratione impedit, nulla? Saepe nesciunt 
						voluptatibus blanditiis repellendus, adipisci cumque deleniti iste, dolor 
						unde nemo labore natus rem neque officia laudantium consectetur aperiam et 
						esse quasi, laboriosam cum?</p><hr /> 
					<p>Et ullam voluptas, maxime quia odio, voluptatem 
						fuga vel autem soluta dolores suscipit eius saepe nostrum molestiae quod, 
						adipisci aliquid.</p>
				</div>
			</div>
			<div className='AboutPre__photo'>
			</div>
		</div>
	)
}

export default aboutPre;