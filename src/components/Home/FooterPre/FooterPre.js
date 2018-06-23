import React from 'react';
import './FooterPre.css';

function footerPre (props) {
	
	return (
		<div className='FooterPre'>
			<div className='FooterPre__form-container'>
				<div className='FooterPre__title'>
					<h1>Connection</h1>
				</div>
				<div className='FooterPre__form'>
					<form action='/' name='message'>
						<div><p>Name</p><input type='text' name='user' placeholder='' /></div>
						<div><p>Email</p><input type='email' name='user' placeholder='' /></div>
						<div><p>Message</p><textarea name='user' rows='3' placeholder='' /></div>
					</form>
				</div>
			</div>
			<div className='FooterPre__info'>
				<div className='FooterPre__info--container'>
					<h3>Follow me</h3>
					<ul>
						<li>Gmail</li>
						<li>Facebook</li>
						<li>Twitter</li>
						<li>Instargram</li>
					</ul>
				</div>
			</div>
		</div>

	)
}

export default footerPre;