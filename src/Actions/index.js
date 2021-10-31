//Imports
import { axiosWithAuth } from '../Utils/axiosWithAuth';


//Actions
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const CANCEL_UPDATE = 'CANCEL_UPDATE';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const START_EDITING = 'START_EDITING';
export const SET_USER_INFO = 'SET_USER_PASSWORD';


//Fetching
export const fetchItems = () => {
	return dispatch => {
		dispatch(fetchStart());

		axiosWithAuth()
			.get('https://markets-backend.herokuapp.com/api/items')
			.then(res => {
				dispatch(fetchSuccess(res.data));
			})
			.catch(err => {
				dispatch(fetchFail(err));
			});
	};
};
export const fetchStart = () => {
	return { type: FETCH_START };
};
export const fetchSuccess = plants => {
	return { type: FETCH_SUCCESS, payload: plants };
};
export const fetchFail = error => {
	return { type: FETCH_FAIL, payload: error };
};


//Items
export const addItem = newItem => {
	return { type: ADD_ITEM, payload: newItem };
};
export const deleteItem = newItemList => {
	return { type: DELETE_ITEM, payload: newItemList };
};
export const updateItem = newItemList => {
	return { type: UPDATE_ITEM, payload: newItemList };
};
export const cancelUpdate = () => {
	return { type: CANCEL_UPDATE };
};


//User
export const logIn = userId => {
	return { type: LOG_IN, payload: userId };
};
export const logOut = () => {
	localStorage.removeItem('token');
	localStorage.setItem('isLoggedIn', false);
	window.location.href = '/';
	return { type: LOG_OUT };
};
export const startEditing = () => {
	return { type: START_EDITING };
};
export const setUserInfo = userInfo => {
	return { type: SET_USER_INFO, payload: userInfo };
};




