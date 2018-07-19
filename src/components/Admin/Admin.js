import React, { Component } from 'react';
import './Admin.css';
import {firebaseAuth} from '../../functions/firebase';
import AdminConsole from './AdminConsole/AdminConsole';


export default class Admin extends Component {

	state = {
		isAuth: false
	}

	adminLogIn = (e) => {
		e.preventDefault();
		let email = document.querySelector('input[name="email"]').value;
		let password = document.querySelector('input[name="password"]').value;
		console.log(email, password);
		firebaseAuth.signInWithEmailAndPassword(email, password)
		.then(() => {this.setState({isAuth: true})})
		.catch((error) => {
			alert("Sorry, you don't have admin rights for enter");
			this.props.history.goBack();
		})
	}

	adminLogOut = (e) => {
		firebaseAuth.signOut()
		.then(() => {
			this.setState({isAuth: false})
		})
		.catch((e) => {
			console.log(e)
		})
	}

	// goBack = () => {
	// 	this.props.history.goBack();
	// }

	render() {
		console.log(this.props)
		let elem = null;
		if(this.state.isAuth) {
			elem = <AdminConsole click={this.adminLogOut}/>
		} else {
			elem = <AdminForm clickIn={this.adminLogIn} clickOut={() => (this.props.history.goBack())}/>
		}

		return(
			<React.Fragment>
				{elem}
			</React.Fragment>
		)
	}
}

function AdminForm(props) {
	return(
		<div className='AdminForm__container'>
			<div className='AdminForm__box'>
				<h1>Email</h1>
				<input type='email' name='email' placeholder='Enter your email'/>
				<h1>Password</h1>
				<input type='password' name='password' placeholder='Enter your password' />
				<div>
					<button type='submit' onClick={props.clickIn}>Log in</button>
					<button type='submit' onClick={props.clickOut}>Go back</button>
				</div>
				<p>*access allowed only for users with admin rights</p>
			</div>
		</div>
		)
}
