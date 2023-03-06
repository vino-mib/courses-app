import React from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import CoursesProp from './Courses.model';
import getAuthorNames from '../../helpers/getAuthorNames';

const Courses: React.FC<CoursesProp> = (props) => {
	const courseList = props.list;
	return (
		<React.Fragment>
			{courseList.length  ? (
				courseList.map((course, index) => (
				<CourseCard
					key={index}
					title={course.title}
					description={course.description}
					creationDate={course.creationDate}
					duration={course.duration}
					authors={getAuthorNames(course.authors)}
				></CourseCard>
			))) : (
				<label>No Courses</label>
			)}
		</React.Fragment>
	);
};

export default Courses;
