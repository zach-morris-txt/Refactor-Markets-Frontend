import {
	LOG_IN,
	LOG_OUT,
	START_EDITING,
	CANCEL_UPDATE,
	SET_USER_INFO
} from '../Actions';

const initialState = {
	plantData: [{}],
	isFetching: false,
	error: '',
	isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' ? true : false,
	isEditing: false,
	userId: '',
	userInfo: {
		username: '',
		phone_number: '',
		password: ''
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
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
					phone_number: state.userInfo.phone_number,
					password: action.payload.password
				}
			};
		case LOG_OUT:
			return {
				...state,
				userId: '',
				userInfo: {
					username: '',
					phone_number: '',
					password: ''
				},
				isLoggedIn: false
			};
		default:
			return state;
	}
};

export default reducer;
