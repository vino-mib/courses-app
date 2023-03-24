import {
	SAVE_COURSE,
	RETRIEVE_COURSES,
	UPDATE_COURSE,
	DELETE_COURSE,
} from './types.js';

export const coursesInitialState = [];

// Use the initialState as a default value
export const coursesReducer = (state = coursesInitialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SAVE_COURSE:
			return [...state, payload];

		case RETRIEVE_COURSES:
			return payload;

		case UPDATE_COURSE:
			return state.map((course) => {
				if (course.id === payload.id) {
					return {
						...course,
						...payload,
					};
				} else {
					return course;
				}
			});

		case DELETE_COURSE:
			return state.filter(({ id }) => id !== payload.id);

		default:
			return state;
	}
};
