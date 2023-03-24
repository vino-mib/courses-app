import { RETRIEVE_AUTHORS, SAVE_AUTHOR } from './types.js';
import authorService from '../../authorService.js';

// This function includes some async logic,
// hence we can dispatch action manually
export const retrieveAuthors = () => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await authorService.fetchAll();
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			dispatch({
				type: RETRIEVE_AUTHORS,
				payload: result.result,
			});
		}
	};
};

export const saveAuthor = (author) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await authorService.create(author);
		console.log('saveAuthor ', result);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			console.log('adding author payload ', result.result);
			dispatch({
				type: SAVE_AUTHOR,
				payload: result.result,
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};
