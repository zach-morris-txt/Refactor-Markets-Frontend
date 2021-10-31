//Imports
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Account from './Components/Account';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import Login  from './Components/UserLogin';
import Signup from './Components/UserSignup';

import { logOut } from './Actions/index';


//ReactApp
function App(props) {
	const { isLoggedIn, dispatch } = props;

	const handleLogout = () => {
		dispatch(logOut());
    };

    return (
		<div className="App">
			<div className="wrapper">
				<div className="container">
					<div className="nav">
						<div className="logo">WMP</div>
						<div className="menu">
							<ul className="navMenu">
								<Link to="/">
									<li>
										<a href="#0">Home</a>
									</li>
								</Link>

								{isLoggedIn ? (
									<>
										<Link to="/dashboard" id="dashboard">
											<li>
												<a href="#0">Dashboard</a>
											</li>
										</Link>
										<Link to="/account" id="account">
											<li>
												<a href="#0">Account</a>
											</li>
										</Link>
										<Link to="/" id="logout" onClick={handleLogout}>
											<li>
												<a href="#0">Logout</a>
											</li>
										</Link>
									</>
								) : (
									<>
										<Link to="/login" id="login">
											<li>
												<a href="#0">Login</a>
											</li>
										</Link>
										<Link to="/signup" id="signup">
											<li>
												<a href="#0">Sign Up</a>
											</li>
										</Link>
									</>
								)}
							</ul>
						</div>
					</div>
					<Switch>
						<Route path="/signup">
							<Signup />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/account" component={Account} />

						<Route
							path="/"
							render={props => {
								return (
									<div className="header">
										<h1>Water My Plants</h1>
										<p>We remember to water your plants, so you don't have to.</p>
										<Link to="/signup">
											<button className="button">Get Started</button>
										</Link>
									</div>
								);
							}}
						/>
					</Switch>
				</div>
			</div>
		</div>
	);
}


//Pass State
const mapStateToProps = state => {
	return {
		...state,
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};


//Export
export default connect(mapStateToProps)(App);