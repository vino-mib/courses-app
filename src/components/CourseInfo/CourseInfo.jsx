import React from 'react';
import { Link, useParams } from 'react-router-dom';
import formatCreationDate from '../../helpers/formatCreationDate';
import useFetch from '../../helpers/useFetch';
import getAuthorNames from '../../helpers/getAuthorNames';

const Courses: React.FC<> = (props) => {
	let { courseId } = useParams();
	const {
		data: course,
		isLoading,
		error,
	} = useFetch(`http://localhost:4000/courses/${courseId}`);

	const {
		data: authors,
		isAuthorsLoading,
		authorError,
	} = useFetch('http://localhost:4000/authors/all');

	console.log(course);

	return (
		<React.Fragment>
			<div className='row mt-md-3 mb-md-3'>
				<div className='col-md-12'>
					<Link to='/courses'>Back to courses</Link>
				</div>
			</div>
			{error && !isLoading ? <div>{error}</div> : null}
			{isLoading ? <div>Loading...</div> : null}
			{course && !isLoading ? (
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
