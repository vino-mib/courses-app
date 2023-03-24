import { LOGIN, REGISTER, LOGOUT, UPDATE_ROLE } from './types.js';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

// Use the initialState as a default value
export const userReducer = (state = userInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case LOGIN:
			return {
				...state,
				...payload,
			};

		case LOGOUT:
			return {
				...state,
				...payload,
			};

		case REGISTER:
			return {
				...state,
				...payload,
			};

		case UPDATE_ROLE:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};
