import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import formatCreationDate from '../../../../helpers/formatCreationDate';
import formatDuration from '../../../../helpers/getCourseDuration';
import CourseProp from '../../Courses.model';
import './CourseCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse } from '../../../../store/courses/actions';

const CourseCard: React.FC<CourseProp> = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.user);
	const isAdmin = user.role === 'admin' ? true : false;
	console.log(user);

	const handleClick = () => {
		navigate(`/courses/${props.id}`);
	};

	const handleCourseUpdate = () => {
		navigate(`/courses/update/${props.id}`);
	};

	const handleCourseDelete = () => {
		dispatch(deleteCourse(props.id));
	};
	return (
		<div className='card mb-md-3'>
			<div className='card-body'>
				<div className='row'>
					<div className='col-sm-8 col-sm-6'>
						<h4>{props.title}</h4>
						<p>{props.description}</p>
					</div>
					<div className='col-md-4 col-sm-6'>
						<div className='eclipsis-text'>
							<b>Authors:</b> {props.authors}
						</div>
						<div>
							<b>Duration:</b> {formatDuration(props.duration)}
						</div>
						<div>
							<b>Created:</b> {formatCreationDate(props.creationDate)}
						</div>
						<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
							<Button
								label='Show course'
								className='btn btn-outline-primary mr-2'
								onClick={handleClick}
							/>
							{isAdmin ? (
								<>
									<Button
										icon='edit'
										className='btn btn-outline-primary mr-2'
										onClick={handleCourseUpdate}
									/>

									<Button
										icon='trash'
										className='btn btn-outline-primary mr-2'
										onClick={handleCourseDelete}
									/>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
