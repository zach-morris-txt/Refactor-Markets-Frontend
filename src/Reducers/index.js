//Imports
import {
	FETCH_START,
	FETCH_SUCCESS,
	FETCH_FAIL,
	ADD_ITEM,
	LOG_IN,
	LOG_OUT,
	DELETE_ITEM,
	START_EDITING,
	UPDATE_ITEM,
	CANCEL_UPDATE,
	SET_USER_INFO
} from '../actions';

const initialState = {
	itemData: [{}],
	isFetching: false,
	error: '',
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
	isEditing: false,
	userId: '',
	userInfo: {
		username: '',
		password: '',
		email: '',

	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_START:
			return {
				...state,
				isFetching: true
			};
		case FETCH_SUCCESS:
			return {
				...state,
				itemData: action.payload,
				isFetching: false,
				error: ''
			};
		case FETCH_FAIL:
			return {
				...state,
				isFetching: false,
				error: action.payload
			};
		case ADD_ITEM:
			return {
				...state,
				itemData: [...state.itemData, action.payload]
			};
		case START_EDITING:
			return {
				...state,
				isEditing: true
			};
		case CANCEL_UPDATE:
			return {
				...state,
				isEditing: false
			};
		case UPDATE_ITEM:
			return {
				...state,
				itemData: state.itemData.map(item =>
					item.item_id === action.payload.item_id ? action.payload : item
				),
				isEditing: false
			};
		case DELETE_ITEM:
			return {
				...state,
				itemData: [...action.payload]
			};
		case LOG_IN:
			return {
				...state,
				userId: action.payload,
				isLoggedIn: true
			};
		case SET_USER_INFO:
			return {
				...state,
				userInfo: {
					username: action.payload.username,
					password: action.payload.password,
					email: state.userInfo.email,
				}
			};
		case LOG_OUT:
			return {
				...state,
				userId: '',
				userInfo: {
					username: '',
					password: '',
					email: '',
				},
				isLoggedIn: false
			};
		default:
			return state;
	}
};


//Exports
export default reducer;
