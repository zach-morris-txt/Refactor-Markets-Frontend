//Imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { logIn, setUserInfo } from '../Actions/index';


//Form State
const initialCredentials = {
	username: '',
	password: ''
};


//Login Form
function Login(props) {
    const [credentials, setCredentials] = useState(initialCredentials);
	const history = useHistory();
	const { dispatch } = props;

	const handleChange = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
	};

	const submitLogin = e => {
		e.preventDefault();
		axios
            .post('https://markets-backend.herokuapp.com/api/auth/login', credentials)
			.then(res => {
				dispatch(logIn(res.data.user_id));
				dispatch(setUserInfo(JSON.parse(res.config.data)));
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('isLoggedIn', true);
				setCredentials(initialCredentials);
				history.push('/dashboard');
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<form onSubmit={submitLogin} id="login" className="box">
			<h1>Login Here</h1>

			<label>
				{' '}
				Name
				<input
					type="text"
					name="username"
					id="name-input"
					value={credentials.username}
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
					value={credentials.password}
					onChange={handleChange}
					placeholder="Password"
				/>
			</label>
			<br />

			<button id="login-btn">Login</button>
		</form>
	);
};


//Pass State
const mapStateToProps = state => {
	return {
		...state,
		isLoggedIn: state.isLoggedIn,
		userInfo: state.userInfo
	};
};


//Exports
export default connect(mapStateToProps)(Login);