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
			alert("Sorry, you don't have admin rights to enter");
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

	render() {
		console.log(this.props)
		let elem = null;
		if(this.state.isAuth) {
			elem = <AdminConsole click={this.adminLogOut}/>
		} else {
			elem = <AdminForm click={this.adminLogIn}/>
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
				<h1>Your email</h1>
				<input type='email' name='email' placeholder='Enter your email'/>
				<h1>Your password</h1>
				<input type='password' name='password' placeholder='Enter your password' />
				<button type='submit' onClick={props.click}>Log in</button>
				<p>*access allowed only for users with admin rights</p>
			</div>
		</div>
		)
}
