import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// import styled from "styled-components";
// import * as yup from 'yup';

// import schema from '../Validation/loginSchema';
// import { LoginContainer } from "../Styled/Container";
// import { InputGroup, InputControl } from '../Styled/Input';
// import { Spinner } from '../Styled/Spinner';
// import { PrimaryButton, LinkButton } from '../Styled/Button';
// import { ErrorSpan } from '../Styled/Span';
// import background from "./Assets/login-background.png";

import { logIn, setUserInfo } from '../Actions/index';


//
const initialCredentials = {
	username: '',
	password: ''
};


//
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
			//.post('https://ft-water-my-plants-3.herokuapp.com/api/users/login', credentials)
            .post('https://markets-backend.herokuapp.com/api/auth/login', credentials)
			.then(res => {
				console.log('logged in:', res);
				// console.log('password: ', JSON.parse(res.config.data).password);
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
    // const [inputs, setInputs] = useState({
    //     username: '',
    //     password: ''
    // });

    // const [errors, setErrors] = useState({
    //     username: '',
    //     password: ''
    // });

    // const [loggingIn, setLoggingIn] = useState(false);
    // const [disabled, setDisabled] = useState(true);

    // const { setLoggedUser } = props;

    // const validate = (name, value) => 
    // {
    //     yup.reach(schema, name)
    //         .validate(value)
    //         .then(() => 
    //         {
    //             setErrors({ ...errors, [name]: '' });
    //         })
    //         .catch(err => 
    //         {
    //             setErrors({ ...errors, [name]: err.errors[0] });
    //         });
    // };

    // function handleChange(e)
    // {
    //     const { name, value } = e.target;
    //     validate(name, value);
    //     setInputs(inputs => ({ ...inputs, [name]: value }));
    // }

    // async function handleSubmit(e)
    // {
    //     e.preventDefault();
    //     setLoggingIn(true);

    //     // Wait for 2 seconds before continue (login simulation)
    //     const delay = (n) => new Promise(r => setTimeout(r, n * 1000));
    //     await delay(2);

    //     setLoggedUser(inputs.username);
    // }

    // useEffect(() =>
    // {
    //     schema.isValid(inputs)
    //         .then(valid => setDisabled(!valid));
    // }, [inputs]);

    // return (
    //     <Body>
    //         <LoginContainer>
    //             <h2>Login</h2>
    //             <form name="form" onSubmit={handleSubmit}>
    //                 <InputGroup>
    //                     <label>Username</label>
    //                     <InputControl
    //                         type="text"
    //                         name="username"
    //                         value={inputs.username}
    //                         onChange={handleChange}
    //                         id="username-input"
    //                     />
    //                     {errors.username && <ErrorSpan>{errors.username}</ErrorSpan>}
    //                 </InputGroup>

    //                 <InputGroup>
    //                     <label>Password</label>
    //                     <InputControl
    //                         type="password"
    //                         name="password"
    //                         value={inputs.password}
    //                         onChange={handleChange}
    //                         id="password-input"
    //                     />
    //                     {errors.password && <ErrorSpan>{errors.password}</ErrorSpan>}
    //                 </InputGroup>

    //                 <InputGroup>
    //                     <PrimaryButton
    //                         disabled={disabled}>
    //                         {loggingIn && <Spinner />}
    //                         Login
    //                     </PrimaryButton>
    //                     <LinkButton to="/register" >Register</LinkButton>
    //                 </InputGroup>
    //             </form>
    //         </LoginContainer>
    //     </Body>
    // );
};

// const Body = styled.body`
//     background-image: url(${background});
//     background-size: cover;
//     justify-content: center;
//     font-family: "Raleway", sans-serif;
//     height: 100%;
//     width: 100%;
// `;


const mapStateToProps = state => {
	return {
		...state,
		isLoggedIn: state.isLoggedIn,
		userInfo: state.userInfo
	};
};

export default connect(mapStateToProps)(Login);