import { LOGIN, REGISTER, LOGOUT, UPDATE_ROLE } from './types.js';
import userService from '../../userService.js';

// This function includes some async logic,
// hence we can dispatch action manually
export const login = (user) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await userService.login(user);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			const payload = {
				isAuth: true,
				name: result.user.name,
				email: result.user.email,
				token: result.result,
			};
			// store the token
			localStorage.setItem('token', result.result);
			dispatch({
				type: LOGIN,
				payload: payload,
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};

export const register = (user) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await userService.register(user);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			dispatch({
				type: REGISTER,
				payload: {
					isAuth: false,
					name: '',
					email: '',
					token: '',
				},
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};

export const logout = () => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await userService.logout();
		// Dispatching the action when async
		// action has completed.
		if (result === 200 || result === 401) {
			localStorage.removeItem('token');
			dispatch({
				type: LOGOUT,
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};

export const updateRole = () => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await userService.getRole();

		console.log(result);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			dispatch({
				type: UPDATE_ROLE,
				payload: {
					role: result.result.role,
					isAuth: true,
					name: result.result.name,
					email: result.result.email,
					token: localStorage.getItem('token'),
				},
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};

export const syncStorageWithStore = () => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await userService.getRole();
		console.log(result);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			delete result.result.password;
			dispatch({
				type: UPDATE_ROLE,
				payload: result.result,
			});
		}
	};
};
