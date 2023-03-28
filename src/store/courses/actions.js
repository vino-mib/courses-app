import {
	FETCH_COURSES,
	DELETE_COURSE,
	SAVE_COURSE,
	UPDATE_COURSE,
} from './types.js';
import courseService from '../../courseService.js';

// This function includes some async logic,
// hence we can dispatch action manually
export const fetchCourses = () => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await courseService.fetchAll();
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			dispatch({
				type: FETCH_COURSES,
				payload: result.result,
			});
		}
	};
};

// This function includes some async logic,
// hence we can dispatch action manually
export const retrieveCourseById = (courseId) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await courseService.fetchById(courseId);
		// Dispatching the action when async
		// action has completed.
	};
};

export const deleteCourse = (courseId) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await courseService.delete(courseId);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			dispatch({
				type: DELETE_COURSE,
				payload: { id: courseId },
			});
		}
	};
};

export const saveCourse = (course) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await courseService.create(course);
		console.log('saveCourse ', result);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			console.log('adding author payload ', result.result);
			dispatch({
				type: SAVE_COURSE,
				payload: result.result,
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};

export const updateCourse = (course, courseId) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await courseService.update(course, courseId);
		console.log('updateCourse ', result);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			console.log('adding author payload ', result.result);
			dispatch({
				type: UPDATE_COURSE,
				payload: result.result,
			});
			return Promise.resolve();
		}
		return Promise.reject(result);
	};
};

export const filterCourses = (keyword) => {
	// Thunk Function
	return async (dispatch, getState) => {
		// Fetching results from an API : asynchronous action
		const result = await courseService.filterCourses(keyword);
		// Dispatching the action when async
		// action has completed.
		if (result && result.successful) {
			dispatch({
				type: FETCH_COURSES,
				payload: result.result,
			});
		}
	};
};
