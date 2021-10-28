//Imports
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './Components/HomePage';
import Login  from './Components/LoginPage';
import Signup from './Components/RegisterPage';
import Account from './Components/OwnerPage';

// import { GlobalStyle } from './Styled/Global';
// import { Container } from './Styled/Container';
// import { Nav, NavHeader, NavItem, NavItems, NavItemButton } from './Styled/Navbar';
// import UnderConstruction from './Components/UnderConstruction';

import { logOut } from './Actions/index';
import PrivateRoute from './Components/PrivateRoute';


//
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


    // return (
    //     <Container>
    //         <GlobalStyle />
    //         <Nav>
    //             <NavHeader>Marketplace</NavHeader>
    //             <NavItems>
    //                 {/* Link to Home Page available always */}
    //                 <NavItem to="/">Home</NavItem>

    //                 {/* Link to User Profile Page available for logged in user */}
    //                 {username && <NavItem to="/owner">Business Owner</NavItem>}

    //                 {/* When user is logged in user "Logout" link display; otherwise "Login" link display */}
    //                 {
    //                     username
    //                         ? <NavItemButton to="/" onClick={() => setLoggedUser('')}>Logout</NavItemButton>
    //                         : <NavItemButton to="/login">Login</NavItemButton>
    //                 }
    //             </NavItems>
    //         </Nav>

    //         <div>
    //             {redirectTo && <Redirect to={redirectTo} />}

    //             <Switch>
    //                 <Route exact path="/">
    //                     <HomePage />
    //                 </Route>

    //                 <Route path="/owner">
    //                     <OwnerPage username={username} />
    //                 </Route>

    //                 <Route path="/login" >
    //                     <LoginPage setLoggedUser={setLoggedUser} />
    //                 </Route>

    //                 <Route path="/register" >
    //                     <RegisterPage setLoggedUser={setLoggedUser} />
    //                 </Route>

    //                 <Route path="/logout">
    //                     <Redirect to="/" />
    //                 </Route>
    //             </Switch>
    //         </div>
    //     </Container>
    // );
}


//
const mapStateToProps = state => {
	return {
		...state,
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};


//Export
export default connect(mapStateToProps)(App);