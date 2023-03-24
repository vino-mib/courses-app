import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formatCreationDate from '../../helpers/formatCreationDate';
import useFetch from '../../helpers/useFetch';
import getAuthorNames from '../../helpers/getAuthorNames';
import { retrieveCourses, deleteCourse } from '../../store/courses/actions';
import { retrieveAuthors } from '../../store/authors/actions';
import Button from '../../common/Button/Button.jsx';

const Courses: React.FC<> = (props) => {
	let { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Selects the state value from the store.
	const courses = useSelector((state) => state?.courses);
	const authors = useSelector((state) => state?.authors);
	const user = useSelector((state) => state?.user);
	const isAdmin = user?.role === 'admin' ? true : false;

	let course = null;
	if (courses && courses.length) {
		course = courses.find((course) => course.id === courseId);
	}

	useEffect(() => {
		if (!user.isAuth) {
			navigate('/login');
		}
		if (!courses.length) {
			dispatch(retrieveCourses());
		}
		if (!authors.length) {
			dispatch(retrieveAuthors());
		}
	}, []);

	const handleCourseUpdate = () => {
		console.log('edit course');
		navigate(`/courses/update/${course.id}`);
	};

	const handleCourseDelete = () => {
		console.log('delete course', course.id);
		dispatch(deleteCourse(course.id));
		navigate('/courses');
	};

	return (
		<React.Fragment>
			<div className='row mt-md-3 mb-md-3'>
				<div className='col-md-6'>
					<Link to='/courses'>Back to courses</Link>
				</div>
				{course && isAdmin ? (
					<div className='col-md-6'>
						<div className='float-right'>
							<Button
								className='btn btn-outline-primary mr-3'
								label='Edit course'
								onClick={handleCourseUpdate}
							/>
							<Button
								className='btn btn-outline-primary mr-2'
								label='Delete course'
								onClick={handleCourseDelete}
							/>
						</div>
					</div>
				) : null}
			</div>
			{course ? (
				<>
					<div className='row mt-md-3 mb-md-3'>
						<div className='col-md-12 text-center'>
							<h1>{course?.title}</h1>
						</div>
					</div>

					<div className='row mt-md-3 mb-md-3'>
						<div className='col-md-8'>{course?.description}</div>
						<div className='col-md-4'>
							<div className='eclipsis-text'>
								<b>ID:</b> {course?.id}
							</div>
							<div>
								<b>Duration:</b> {course?.duration}
							</div>
							<div>
								<b>Created:</b> {formatCreationDate(course?.creationDate)}
							</div>
							<div className='eclipsis-text'>
								<b>Authors:</b> <br />
								{course?.authors
									? getAuthorNames(course?.authors, authors)
									: null}
							</div>
						</div>
					</div>
				</>
			) : null}
		</React.Fragment>
	);
};

export default Courses;
