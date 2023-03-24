import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/reducer.js';
import { userReducer } from './user/reducer.js';
import { coursesReducer } from './courses/reducer.js'; // reducer that we already have

export const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	user: userReducer,
	//could be extended by another slice of reducer that respond for other part of your app
});

export const store = configureStore({ reducer: rootReducer });
