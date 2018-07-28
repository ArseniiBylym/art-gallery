import React, { Component } from 'react';
import './AdminConsole.css';
import {firebaseDB, firebaseAuth} from '../../../functions/firebase';

export default class AdminConsole extends Component {

	state = {
		messages: null
	}

	componentDidMount = () => {
		firebaseDB.ref('/messages/').orderByChild('date').once('value')
		.then((snapshot) => {
			let messages = [];
				snapshot.forEach((item, i) => {
					messages.push({
						id: item.key,
						...item.val()
					})
				})
			this.setState({messages: messages.reverse()})
		})
	}

	changeCurrentPassword = (e) => {
		e.preventDefault();
		let password_v1 = document.getElementById('newPassword-1');
		let password_v2 = document.getElementById('newPassword-2');
		if (password_v1.value === password_v2.value) {
			firebaseAuth.currentUser.updatePassword(password_v2.value)
			.then(()=>{
				alert('New password has saved');
				password_v1.value = password_v2.value = null;
			})
			.catch((e) => {
				alert(e.message);
				password_v1.value = password_v2.value = null;
			})
		}
	}

	addNewEvent = (e) => {
		e.preventDefault();
		let event = {
			name: document.querySelector('.addEvent--name input').value,
			date: +new Date(document.querySelector('.addEvent--date input').value),
			place: document.querySelector('.addEvent--place input').value,
			description: document.querySelector('.addEvent--description textarea').value,
			poster: document.querySelector('.addEvent--poster input').value
		}

		firebaseDB.ref('/commonData/events/').push({
			name: event.name,
			date: event.date,
			place: event.place,
			description: event.description,
			poster: `url(./img/Events/${event.poster})`
		}).then(()=>{
			alert('New event was saved');
		}).catch((e) => {
			alert(e.message);
		})
	}

	addNewProject = (e) => {
		e.preventDefault();
		let projectList = {
			name: document.querySelector('.addProject--name input').value,
			description: document.querySelector('.addProject--description textarea').value,
			images: document.querySelector('.addProject--previews input').value.split('/')
		}

		firebaseDB.ref('/commonData/projectsList/').push({
			name: projectList.name,
			href: `/${projectList.name}`,
			description: projectList.description,
			urls: {
				img1: `./img/Gallery/${projectList.name}/Previews/${projectList.images[0]}`,
				img2: `./img/Gallery/${projectList.name}/Previews/${projectList.images[1]}`,
				img3:`./img/Gallery/${projectList.name}/Previews/${projectList.images[2]}`
			}
		}).then(() => {
			alert('New project was added');
			document.querySelector('.addProject--name input').value = null;
			document.querySelector('.addProject--description textarea').value = null;
			document.querySelector('.addProject--previews input').value = null;

		}).catch((e) => {
			alert(e.message);
		})
	}

	addNewPictureToProject = (e) => {
		e.preventDefault();
		let newPicture = {
			projectName: document.querySelector('.addPictureToExistedProject--projectName input').value,
			name: document.querySelector('.addPictureToExistedProject--pictureName input').value,
			info: document.querySelector('.addPictureToExistedProject--pictureInfo input').value,
			url: document.querySelector('.addPictureToExistedProject--picture input').value,
		}
		console.log(newPicture);
		firebaseDB.ref('/commonData/projects/' + newPicture.projectName + '/').push({
			name: newPicture.name,
			info: newPicture.info,
			url: `/img/Gallery/${newPicture.projectName}/${newPicture.url}`
		}).then(() => {
			alert('New picture was added')
		}).catch((e) => {
			alert(e.message);
		})

	}
	

	render() {
		let messagesArr = null;
		if (this.state.messages) {
			messagesArr = this.state.messages.map((item, i) => {
			return (
				<div key={item.id} className='userMessageItem'>
					<div className='userMessageItem--name'>{item.username}</div>
					<div className='userMessageItem--email'>{item.email}</div>
					<div className='userMessageItem--date'>{new Date(item.date).toDateString()}</div>
					<div className='userMessageItem--message'>{item.text}</div>
				</div>
			)
		})
		}
		return(
			<div className='AdminConsole__container'>
				<div className='AdminConsole__header'>
					<h1> Hi, admin! </h1>
				</div>
				<div className='AdminConsole__messages'>
					<h3> Your messages </h3>
					<div className='messages--header'>
						<div className='userMessageItem--name'>Name</div>
						<div className='userMessageItem--email'>Email</div>
						<div className='userMessageItem--date'>Date</div>
						<div className='userMessageItem--message'>Message</div>
					</div>
					{messagesArr}
				</div>
				<div className='AdminConsole__addEvent'>
					<h3>Add new event</h3>
					<div className='addEvent--name'>Name<input type='text'></input></div>
					<div className='addEvent--date'>Date/time<input type='datetime-local'></input></div>
					<div className='addEvent--place'>Place<input type='text'></input></div>
					<div className='addEvent--description'>Description<textarea rows='5' cols='50' ></textarea></div>
					<div className='addEvent--poster'>Poster name<input type='text' placeholder='img1.jpg'></input></div>
					<button onClick={this.addNewEvent}>Add event</button>
				</div>
				<div className='AdminConsole__addProject'>
					<h3>Add new project</h3>
					<div className='addProject--name'>Project name<input type='text'></input></div>
					<div className='addProject--description'>Project description<textarea rows='5' cols='50' /></div>
					<div className='addProject--previews'>Previews for this project<input type='text' placeholder='img1.jpg/img2.jpg/img3.jpg'/></div>
					<button onClick={this.addNewProject}>Add Project</button>
				</div>
				<div className='AdminConsole__addPictureToExistedProject'>
					<h3>Add picture to existed project</h3>
					<div className='addPictureToExistedProject--projectName'>Project name<input type='text' /></div>
					<div className='addPictureToExistedProject--pictureName'>Picture name<input type='text' /></div>
					<div className='addPictureToExistedProject--pictureInfo'>Picture info<input type='text' /></div>
					<div className='addPictureToExistedProject--picture'>Picture<input type='text' placeholder='img1.jpg'/></div>
					<button onClick={this.addNewPictureToProject}>Add Picture</button>
				</div>
				<div className='AdminConsole__changeAdminPassword'>
					<h3>Change current admin password</h3>
					<div>Enter new password<input id='newPassword-1' type='password' /></div>
					<div>Repeat the new password<input id='newPassword-2' type='password' /></div>
					<button onClick={this.changeCurrentPassword}>Change password</button>	
				</div>
				<div className='AdminConsole__logOutButton'>
					<button onClick={this.props.click}>Log out</button>
				</div>
			</div>
		)
	}
}