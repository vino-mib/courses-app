import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import SearchBar from './components/Courses/components/SearchBar/SearchBar.jsx';
import Button from './common/Button/Button.jsx';
import { mockedCoursesList } from './mock';
import getAuthorNames from './helpers/getAuthorNames';
import './App.css';

const App = () => {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [showCourses, setShowCourses] = useState(true);

	const onSearch = (keyword) => {
		const result = mockedCoursesList.filter((course) => {
			course = { ...course, authors: getAuthorNames(course.authors) };
			return Object.values(course).some((val) =>
				val.toString().toLowerCase().includes(keyword.toLowerCase())
			);
		});
		setCourses(result);
	};

	const createNewCourse = () => {
		console.log(showCourses);
		setShowCourses(!showCourses);
	};

	const addCourse = (course) => {
		console.log(course);
		courses.unshift(course);
		setShowCourses(courses);
		console.log(courses);
		setShowCourses(!showCourses);
	};

	return (
		<React.Fragment>
			<Header></Header>
			<div className='container-fluid'>
			{
				showCourses ? 
				<React.Fragment>
					<div className='row mt-md-3 mb-md-3'>
						<div className='col-md-8'>
							<SearchBar onSearch={onSearch} />
						</div>
						<div className='col-md-4'>
							<Button
								class='btn btn-outline-primary float-right'
								label='Add new course'
								onClick={createNewCourse}
							/>
						</div>
					</div>
					<Courses list={courses} />
				</React.Fragment>
				:
				<CreateCourse addCourse={addCourse} />
			}
			</div>
		</React.Fragment>
	);
};

export default App;
