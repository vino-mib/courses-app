/*const store = {
	user: {
		isAuth: boolean, // default value - false. After success login - true
		name: string, // default value - empty string. After success login - name of user
		email: string, // default value - empty string. After success login - email of user
		token: string, // default value - empty string or token value from localStorage. After success login - value from API /login response. See Swagger.
	},
	courses: [], // list of courses. Default value - empty array. After success getting courses - value from API /courses/all response. See Swagger.
	authors: [], //  list of authors. Default value - empty array. After success getting authors - value from API /authors/all response. See Swagger.
};*/

import { composeWithDevTools } from 'redux-devtools-extension'; // import DevTools
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import { coursesInitialState } from './courses/reducer.js';
import { authorsInitialState } from './authors/reducer.js';
import { userInitialState } from './user/reducer.js';

const appInitialState = {
	courses: coursesInitialState,
	authors: authorsInitialState,
	user: userInitialState,
};

const store = createStore(
	rootReducer,
	appInitialState,
	composeWithDevTools(applyMiddleware(thunk)) //apply React DevTools enhancer
);

export default store;
