import React, { useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import Button from '../../common/Button/Button.jsx';
import getAuthorNames from '../../helpers/getAuthorNames';
import getAuthors from '../../helpers/getAuthors';
import useFetch from '../../helpers/useFetch';
import { useNavigate } from 'react-router-dom';

const Courses: React.FC<> = (props) => {
	const navigate = useNavigate();
	const {
		data: courses,
		isLoading,
		error,
	} = useFetch('http://localhost:4000/courses/all');

	const {
		data: authors,
		isAuthorsLoading,
		authorError,
	} = useFetch('http://localhost:4000/authors/all');

	console.log(authors);

	const handleSearch = (keyword) => {
		// setCourses(null);
	};

	const createNewCourse = () => {
		navigate('/courses/add');
	};

	return (
		<React.Fragment>
			<div className='row mt-md-3 mb-md-3'>
				<div className='col-md-8'>
					<SearchBar handleSearch={handleSearch} />
				</div>
				<div className='col-md-4'>
					<Button
						className='btn btn-outline-primary float-right'
						label='Add new course'
						onClick={createNewCourse}
					/>
				</div>
			</div>
			{isLoading ? <label>Loading...</label> : null}
			{courses && !isLoading && courses.length ? (
				courses.map((course, index) => (
					<CourseCard
						key={index}
						id={course.id}
						title={course.title}
						description={course.description}
						creationDate={course.creationDate}
						duration={course.duration}
						authors={getAuthorNames(course.authors, authors)}
					/>
				))
			) : (
				<label>No Courses</label>
			)}
		</React.Fragment>
	);
};

export default Courses;
