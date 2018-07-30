import React, { Component } from 'react';
import './AdminConsole.css';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../../functions/firebase';

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
		let event = {};

		let file = document.querySelector('.addEvent--poster input').files[0];
		let uploadFile = firebaseStorage.ref('/images/events').child(file.name).put(file);

		uploadFile.on('state_changed', null, null, function(){
			uploadFile.snapshot.ref.getDownloadURL()
			.then(function(downloadURL) {
				console.log('File loaded at: ', downloadURL);
				event = {
					name: document.querySelector('.addEvent--name input').value,
					date: +new Date(document.querySelector('.addEvent--date input').value),
					place: document.querySelector('.addEvent--place input').value,
					description: document.querySelector('.addEvent--description textarea').value,
					poster: downloadURL
				};
				return event
			})
			.then((event) => {
				firebaseDB.ref('/commonData/events/').push({
					name: event.name,
					date: event.date,
					place: event.place,
					description: event.description,
					poster: `url(${event.poster})`
				}).then(()=>{
					alert('New event was saved');
				}).catch((e) => {
					alert(e.message);
				})
			})
		})
	}

	addNewProject = (e) => {
		e.preventDefault();
		let projectList = {}
		let folderName = document.querySelector('.addProject--name input').value;
		let imagesArrFull = [...document.querySelector('.addProject--previews--full input').files];
		let imagesArrRsz = [...document.querySelector('.addProject--previews--rsz input').files];
		let filesPathsFull = [];
		let filesPathsRsz = [];
		let promiseArr = [];

		imagesArrFull.forEach((img, i) => {
			promiseArr.push(
				new Promise((resolve) => {
					let file = firebaseStorage.ref('/images/projectList/' + folderName).child(img.name).put(img)
					
					file.on('state_changed', null, null, function(){
						file.snapshot.ref.getDownloadURL()
							.then(function(downloadURL) {
								filesPathsFull.push(downloadURL);
								resolve()
							})
					})
				})
			)
		})

		imagesArrRsz.forEach((img, i) => {
			promiseArr.push(
				new Promise((resolve) => {
					let file = firebaseStorage.ref('/images/projectList/' + folderName).child(img.name).put(img)
					
					file.on('state_changed', null, null, function(){
						file.snapshot.ref.getDownloadURL()
							.then(function(downloadURL) {
								filesPathsRsz.push(downloadURL);
								resolve()
							})
					})
				})
			)
		})

		Promise.all(promiseArr).then(() => {
			projectList = {
				name: folderName,
				description: document.querySelector('.addProject--description textarea').value,
				imagesFull: filesPathsFull,
				imagesRsz: filesPathsRsz
			}

			firebaseDB.ref('/commonData/projectsList/').push({
				name: projectList.name,
				href: `/${projectList.name}`,
				description: projectList.description,
				urls: {
					img1: projectList.imagesFull[0],
					img2: projectList.imagesFull[1],
					img3: projectList.imagesFull[2]
				},
				rsz_urls: {
					img1: projectList.imagesRsz[0],
					img2: projectList.imagesRsz[1],
					img3: projectList.imagesRsz[2]
				}
			}).then(() => {
				alert('New project was added');
			}).catch((e) => {
				alert(e.message);
			})

		})
	}

	addNewPictureToProject = (e) => {
		e.preventDefault();
		let newPicture = {};
		let pictureFull = document.querySelector('.addPictureToExistedProject--picture--full input').files[0];
		let pictureRsz = document.querySelector('.addPictureToExistedProject--picture--rsz input').files[0];
		let projectName = document.querySelector('.addPictureToExistedProject--projectName input').value;
		let fullImgPath = null;
		let smallImgPath = null;
		let promiseArr = [];

		promiseArr.push(
			new Promise((resolve)=>{
				let file = firebaseStorage.ref('/images/projects/' + projectName + '/fullsize').child(pictureFull.name).put(pictureFull)
					
				file.on('state_changed', null, null, function(){
					file.snapshot.ref.getDownloadURL()
						.then(function(downloadURL) {
							fullImgPath = downloadURL;
							resolve()
						})
				})
			})
		)

		promiseArr.push(
			new Promise((resolve)=>{
				let file = firebaseStorage.ref('/images/projects/' + projectName + '/smallsize').child(pictureRsz.name).put(pictureRsz)
					
				file.on('state_changed', null, null, function(){
					file.snapshot.ref.getDownloadURL()
						.then(function(downloadURL) {
							smallImgPath = downloadURL;
							resolve()
						})
				})
			})
		)

		Promise.all(promiseArr).then((resolve)=>{
			newPicture = {
					projectName: projectName,
					name: document.querySelector('.addPictureToExistedProject--pictureName input').value,
					info: document.querySelector('.addPictureToExistedProject--pictureInfo input').value,
					url: fullImgPath,
					rsz_url: smallImgPath
				};
				return newPicture
		})
		.then((newPicture) => {
			firebaseDB.ref('/commonData/projects/' + newPicture.projectName + '/').push({
				name: newPicture.name,
				info: newPicture.info,
				url: newPicture.url,
				rsz_url: newPicture.rsz_url
			}).then(() => {
				alert('New picture was added')
			}).catch((e) => {
				alert(e.message);
			})
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
					<div className='addEvent--poster'>Poster<input type='file' accept='.jpg, .jpeg, .png, .gif'></input></div>
					<button onClick={this.addNewEvent}>Add event</button>
				</div>
				<div className='AdminConsole__addProject'>
					<h3>Add new project</h3>
					<div className='addProject--name'>Project name<input type='text'></input></div>
					<div className='addProject--description'>Project description<textarea rows='5' cols='50' /></div>
					<div className='addProject--previews--full'>Previews (3 full size images)<input type='file' accept='.jpg, .jpeg, .png, .gif' multiple/></div>
					<div className='addProject--previews--rsz'>Previews (3 small size images)<input type='file' accept='.jpg, .jpeg, .png, .gif' multiple/></div>
					<button onClick={this.addNewProject}>Add Project</button>
				</div>
				<div className='AdminConsole__addPictureToExistedProject'>
					<h3>Add picture to existed project</h3>
					<div className='addPictureToExistedProject--projectName'>Project name<input type='text' /></div>
					<div className='addPictureToExistedProject--pictureName'>Picture name<input type='text' /></div>
					<div className='addPictureToExistedProject--pictureInfo'>Picture info<input type='text' /></div>
					<div className='addPictureToExistedProject--picture--full'>Picture full size<input type='file' accept='.jpg, .jpeg, .png, .gif'/></div>
					<div className='addPictureToExistedProject--picture--rsz'>Picture small size<input type='file' accept='.jpg, .jpeg, .png, .gif'/></div>
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