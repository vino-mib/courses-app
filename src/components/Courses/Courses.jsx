import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import Button from '../../common/Button/Button.jsx';
import getAuthorNames from '../../helpers/getAuthorNames';
import useFetch from '../../helpers/useFetch';
import { useNavigate } from 'react-router-dom';
import { retrieveAuthors } from '../../store/authors/actions';
import { filterCourses, fetchCourses } from '../../store/courses/actions';

const Courses: React.FC<> = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//Selects the state value from the store.
	const { courses, authors, user } = useSelector((state) => state);
	const isAdmin = user?.role === 'admin' ? true : false;

	useEffect(() => {
		if (!user.isAuth) {
			navigate('/login');
		}
	}, []);

	const handleSearch = (keyword) => {
		keyword.trim()
			? dispatch(filterCourses(keyword))
			: dispatch(fetchCourses());
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
					{isAdmin ? (
						<Button
							className='btn btn-outline-primary float-right'
							label='Add new course'
							onClick={createNewCourse}
						/>
					) : null}
				</div>
			</div>
			{courses && courses.length ? (
				courses.map((course, index) => (
					<div data-testid='course-card' key={index}>
						<CourseCard
							id={course.id}
							title={course.title}
							description={course.description}
							creationDate={course.creationDate}
							duration={course.duration}
							authors={
								authors && authors.length
									? getAuthorNames(course.authors, authors)
									: 'Loading...'
							}
						/>
					</div>
				))
			) : (
				<label>No Courses</label>
			)}
		</React.Fragment>
	);
};

export default Courses;
