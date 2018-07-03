import React, {Component} from 'react';
import './Picture.css';

export default class Picture extends Component {
	constructor(props) {
		super(props);
	}

	showOnFullSize = (e) => {
		e.target.classList.toggle('fullSize');
	}

	render() {
		const backgroundUrl = `url(${this.props.url})`;
		let classList = 'Picture';
		if (this.props.pos == 0) {
			classList += ' current';
		}

		return (
			<div className={classList} >
				<div className='Picture__img' 
					style={{backgroundImage: backgroundUrl}} 
					onClick={this.props.click}>
				</div>	
			</div>
		)
	}
}