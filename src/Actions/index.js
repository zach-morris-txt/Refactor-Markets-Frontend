//
import { axiosWithAuth } from '../Utils/axiosWithAuth';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const START_EDITING = 'START_EDITING';
export const CANCEL_UPDATE = 'CANCEL_UPDATE';
export const SET_USER_INFO = 'SET_USER_PASSWORD';




export const logIn = userId => {
	return { type: LOG_IN, payload: userId };
};

export const setUserInfo = userInfo => {
	return { type: SET_USER_INFO, payload: userInfo };
};

export const startEditing = () => {
	return { type: START_EDITING };
};

export const cancelUpdate = () => {
	return { type: CANCEL_UPDATE };
};

export const logOut = () => {
	localStorage.removeItem('token');
	localStorage.setItem('isLoggedIn', false);
	window.location.href = '/';
	return { type: LOG_OUT };
};