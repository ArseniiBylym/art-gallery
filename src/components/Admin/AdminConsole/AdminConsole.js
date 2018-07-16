import React, { Component } from 'react';
import './AdminConsole.css';
import {firebaseDB, firebaseAuth} from '../../../functions/firebase';

export default class AdminConsole extends Component {

	state = {
		messages: null
	}

	componentWillMount = () => {
		firebaseDB.ref('messages/').once('value')
		.then((snapshot) => {
			let messages = [];
				snapshot.forEach((item, i) => {
					messages.push({
						id: item.key,
						...item.val()
					})
				})
			this.setState({messages: messages})
		})
	}

	changeCurrentPassword = (e) => {
		e.preventDefault();
		let password_v1 = document.getElementById('newPassword-1');
		let password_v2 = document.getElementById('newPassword-2');
		// console.log(password_v1, password_v2);
		// console.log(password_v1 === password_v2);
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
			date: document.querySelector('.addEvent--date input').value,
			place: document.querySelector('.addEvent--place input').value,
			description: document.querySelector('.addEvent--description textarea').value,
			poster: document.querySelector('.addEvent--poster input').value
		}
		console.log(event);

		firebaseDB.ref('Events/').push({
			name: event.name,
			date: event.date,
			place: event.place,
			description: event.description,
			poster: `url(./img/Events/${event.poster}.jpg)`
		}).then(()=>{
			console.log('New event was saved');
		}).catch((e) => {
			console.log(e.message);
		})
	}

	addNewProject = (e) => {
		e.preventDefault();
		let projectList = {
			name: document.querySelector('.addProject--name input').value,
			description: document.querySelector('.addProject--description textarea').value,
			images: document.querySelector('.addProject--previews input').value.split('/')
		}
		console.log(projectList)
		firebaseDB.ref('projectList/').push({
			name: projectList.name,
			href: `/${projectList.name}`,
			description: projectList.description,
			urls: {
				img1: `./img/Gallery/${projectList.name}/Previews/${projectList.images[0]}.jpg`,
				img2: `./img/Gallery/${projectList.name}/Previews/${projectList.images[1]}.jpg`,
				img3:`./img/Gallery/${projectList.name}/Previews/${projectList.images[2]}.jpg`
			}
		}).then(() => {
			console.log('New project was added');
			document.querySelector('.addProject--name input').value = null;
			document.querySelector('.addProject--description textarea').value = null;
			document.querySelector('.addProject--previews input').value = null;

		}).catch((e) => {
			console.log(e.message);
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
		firebaseDB.ref('projects/' + newPicture.projectName + '/').push({
			name: newPicture.name,
			info: newPicture.info,
			url: `/img/Gallery/${newPicture.projectName}/${newPicture.url}.jpg`
		}).then(() => {
			console.log('New picture was added')
		}).catch((e) => {
			console.log(e.message);
		})

	}
	

	render() {
		let user = firebaseAuth.currentUser;
		console.log(user);
		let messagesArr = null;
		if (this.state.messages) {
			messagesArr = this.state.messages.map((item, i) => {
			return (
				<div key={item.id} className='userMessageItem'>
					<div className='userMessageItem--name'>{item.username}</div>
					<div className='userMessageItem--email'>{item.email}</div>
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
						<div className='userMessageItem--name'>User name</div>
						<div className='userMessageItem--email'>Email</div>
						<div className='userMessageItem--message'>Message</div>
					</div>
					{messagesArr}
				</div>
				<div className='AdminConsole__addEvent'>
					<h3>Add new event</h3>
					<div className='addEvent--name'>Name<input type='text'></input></div>
					<div className='addEvent--date'>Date/time<input type='datetime-local'></input></div>
					<div className='addEvent--place'>Place<input type='text'></input></div>
					<div className='addEvent--description'>Description<textarea rows='5' cols='50' maxLength='300'></textarea></div>
					<div className='addEvent--poster'>Poster name<input type='text'></input></div>
					<button onClick={this.addNewEvent}>Add event</button>
				</div>
				<div className='AdminConsole__addProject'>
					<h3>Add new project</h3>
					<div className='addProject--name'>Project name<input type='text'></input></div>
					<div className='addProject--description'>Project description<textarea rows='5' cols='50' maxLength='300'/></div>
					<div className='addProject--previews'>Previews for this project<input type='text' placeholder='img1/img2/img3'/></div>
					<button onClick={this.addNewProject}>Add Project</button>
				</div>
				<div className='AdminConsole__addPictureToExistedProject'>
					<h3>Add picture to existed project</h3>
					<div className='addPictureToExistedProject--projectName'>Project name<input type='text' /></div>
					<div className='addPictureToExistedProject--pictureName'>Picture name<input type='text' /></div>
					<div className='addPictureToExistedProject--pictureInfo'>Picture info<input type='text' /></div>
					<div className='addPictureToExistedProject--picture'>Picture<input type='text' /></div>
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