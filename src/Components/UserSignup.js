//Imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { logIn, setUserInfo } from '../Actions/index';


//Form State
const initialSignUpCredentials = {
	username: '',
	password: '',
	email: ''
};


//Signup Form
function Signup(props) {
    const [signUpCredentials, setSignUpCredentials] = useState(initialSignUpCredentials);
	const history = useHistory();
	const { dispatch } = props;

	const handleChange = e => {
		setSignUpCredentials({
			...signUpCredentials,
			[e.target.name]: e.target.value
		});
	};

	const handleSignUp = e => {
		e.preventDefault();
		const newUser = {
			username: signUpCredentials.username.trim(),
			password: signUpCredentials.password.trim(),
			email: signUpCredentials.email.trim()
		};
		axios
			.post('https://markets-backend.herokuapp.com/api/auth/register', newUser)
			.then(res => {
				axios
					.post('https://markets-backend.herokuapp.com/api/auth/login', {
						username: newUser.username,
						password: newUser.password
					})
					.then(res => {
						localStorage.setItem('token', res.data.token);
						setSignUpCredentials(initialSignUpCredentials);
						dispatch(logIn(res.data.user_id));
						dispatch(setUserInfo(JSON.parse(res.config.data)));
						history.push('/dashboard');
					})
					.catch(err => {
						console.log('ERROR: ', err.message);
					});
			})
			.catch(err => {
				console.log('ERROR: ', err.message);
			});
	};

	return (
		<form id="signup" onSubmit={handleSignUp} className="sbox">
			<h1>Sign Up</h1>

			<label>
				{' '}
				Name
				<input
					type="text"
					name="username"
					id="name-input"
					value={signUpCredentials.username}
					onChange={handleChange}
					placeholder="Username"
				/>
			</label>
			<br />
			<label>
				{' '}
				Password
				<input
					type="password"
					name="password"
					id="password-input"
					minLength="5"
					value={signUpCredentials.password}
					onChange={handleChange}
					placeholder="Password"
				/>
			</label>

			<br />
			<label>
				{' '}
				Email
				<input
					type="email"
					name="email"
					id="email"
					// maxLength="10"
					value={signUpCredentials.email}
					onChange={handleChange}
					placeholder="Email"
				/>
			</label>
			<br />

			<button id="signup-btn">Create Account</button>
		</form>
	);
};


//Pass State
const mapStateToProps = state => {
	return {
		...state,
		isLoggedIn: state.isLoggedIn
	};
};


//Exports
export default connect(mapStateToProps)(Signup);