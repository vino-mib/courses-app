import {
	SAVE_AUTHOR,
	RETRIEVE_AUTHORS,
	UPDATE_AUTHOR,
	DELETE_AUTHOR,
} from './types.js';

export const authorsInitialState = [];

// Use the initialState as a default value
export const authorsReducer = (state = authorsInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SAVE_AUTHOR:
			return [...state, payload];

		case RETRIEVE_AUTHORS:
			return payload;

		case UPDATE_AUTHOR:
			return state.map((author) => {
				if (author.id === payload.id) {
					return {
						...author,
						...payload,
					};
				} else {
					return author;
				}
			});

		case DELETE_AUTHOR:
			return state.filter(({ id }) => id !== payload.id);

		default:
			return state;
	}
};
