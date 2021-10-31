//Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { axiosWithAuth } from '../Utils/axiosWithAuth';


//User Account
function Account(props) {
	const [personToEdit, setPersonToEdit] = useState({});
	const [message, setMessage] = useState('');

	useEffect(() => {
		setMessage('');
		axiosWithAuth()
			.get(`https://markets-backend.herokuapp.com/api/auth/${props.userId}`)
			.then(res => {
				console.log('user info: ', res);
				setPersonToEdit({
					username: props.userInfo.username,
					password: props.userInfo.password,
					email: res.data.email
				});
			})
			.catch(err => {
				console.log(err);
			});
		// eslint-disable-next-line
	}, []);

	const handleChange = e => {
		setPersonToEdit({
			...personToEdit,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.put(`https://markets-backend.herokuapp.com/api/auth/${props.userId}`, personToEdit)
			.then(res => {
				console.log(res);
				setMessage('Change Accepted!');
			})
			.catch(err => {
				console.log(err);
				setMessage('Change Rejected!');
			});
	};

	return (
		<>
			<form id="accountCardInfo" className="abox">
				<h1>Update Account</h1>
				<label>
					{' '}
					Password
					<input
						type="password"
						name="password"
						id="password"
						value={personToEdit.password}
						onChange={handleChange}
						placeholder="Password"
					/>
				</label>
				<label>
					{' '}
					Email
					<input
						type="email"
						name="email"
						id="email"
						value={personToEdit.email}
						onChange={handleChange}
						placeholder="Email"
					/>
				</label>
				<h3>{message}</h3>
				<button onClick={handleSubmit}>Update Account</button>
			</form>
		</>
	);
}


//Pass State
const mapStateToProps = state => {
	return {
		...state,
		userId: state.userId,
		userInfo: state.userInfo
	};
};


//Exports
export default connect(mapStateToProps)(Account);
