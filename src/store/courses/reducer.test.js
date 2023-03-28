import { coursesReducer } from './reducer';
import {
	SAVE_COURSE,
	FETCH_COURSES,
	UPDATE_COURSE,
	DELETE_COURSE,
} from './types.js';

const coursesInitialState = [];

const newCourse = {
	title: 'Javascript',
	description:
		"In this course, you'll learn JavaScript fundamentals that will be helpful as you dive deeper into more advanced topics.",
	duration: 120,
	authors: [
		'6043a4a7-8221-4ede-bf52-c9deb8c9cf5d',
		'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
	],
	creationDate: '24/03/2023',
	id: '8fcdfcde-acd0-4f74-9a28-cae12384b7a5',
};

describe('courses reducer', () => {
	it('should return the initial state', () => {
		const initialState = coursesReducer(undefined, { type: '' });
		expect(initialState).toEqual(coursesInitialState);
	});

	it('should handle SAVE_COURSE and return a new state', () => {
		const newState = coursesReducer(undefined, { type: 'SAVE_COURSE', payload: newCourse });
		expect(newState).toEqual([newCourse]);
	});
});
