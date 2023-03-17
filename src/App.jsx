import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { AuthProvider } from './helpers/auth';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Registration />} />
						<Route path='courses' element={<Courses />} />
						<Route path='courses/:courseId' element={<CourseInfo />} />
						<Route path='courses/add' element={<CreateCourse />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
