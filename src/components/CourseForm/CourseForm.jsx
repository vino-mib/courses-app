import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import formatDuration from '../../helpers/getCourseDuration';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { saveAuthor } from '../../store/authors/actions';
import { saveCourse, updateCourse } from '../../store/courses/actions';
import courseService from '../../courseService.js';

interface CourseFormProps {
	addCourse: () => {};
}

const CourseForm: React.FC<CourseFormProps> = (props) => {
	const { courseId } = useParams();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [course, setCourse] = useState(null);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [duration, setDuration] = useState(0);
	const [durationInHour, setDurationInHour] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authors = useSelector((state) => state?.authors);
	const user = useSelector((state) => state?.user);
	const courses = useSelector((state) => state?.courses);

	const isAdmin = user?.role === 'admin' ? true : false;

	useEffect(() => {
		const fetchCourse = async () => {
			if (courseId) {
				const result = await courseService.fetchById(courseId);
				console.log('course result ', result);
				if (result && result.successful) {
					const courseDetails = result.result;
					setTitle(courseDetails.title);
					setDescription(courseDetails.description);
					setDuration(courseDetails.duration);
					if (authors && authors.length) {
						const courseAuthorsIds = courseDetails.authors;
						console.log('courseAuthorsIds ', courseAuthorsIds);
						const courseAuthorsList = authors.filter((authors) =>
							courseAuthorsIds.includes(authors.id)
						);
						console.log('courseAuthorsList ', courseAuthorsList);
						setCourseAuthors(courseAuthorsList);
					}
				}
			}
		};
		fetchCourse();
	}, []);

	const handleCourseForm = async () => {
		let objectDate = new Date();
		let day = objectDate.getDate();
		let month = objectDate.getMonth();
		let year = objectDate.getFullYear();
		if (day < 10) {
			day = '0' + day;
		}

		if (month < 10) {
			month = `0${month + 1}`;
		} else {
			month++;
		}

		if (title && description && duration && courseAuthors.length) {
			const newCourse = {
				title: title,
				description: description,
				duration: parseInt(duration),
				authors: courseAuthors.map((author) => author.id),
			};

			if (courseId) {
				dispatch(updateCourse(newCourse, courseId))
					.then(() => {
						navigate('/courses');
					})
					.catch((result) => {
						// console.log(result.result);
					});
			} else {
				dispatch(saveCourse(newCourse))
					.then(() => {
						navigate('/courses');
					})
					.catch((result) => {
						// console.log(result.result);
					});
			}
		} else {
			alert('Please fill the require details');
		}
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleAuthorNameChange = (event) => {
		setAuthorName(event.target.value);
	};

	const createAuthor = () => {
		if (authorName) {
			const newAuthor = { name: authorName };
			dispatch(saveAuthor(newAuthor))
				.then(() => {
					console.log(' added author ', authorName);
					setAuthorName('');
				})
				.catch((result) => {
					// console.log(result.result);
				});
		} else {
			alert('Please enter author name');
		}
	};

	const handleDurationChange = (event) => {
		setDurationInHour(formatDuration(event.target.value));
		setDuration(event.target.value);
	};

	const addAuthor = (selectedAuthor) => {
		setCourseAuthors([selectedAuthor, ...courseAuthors]);
	};

	const handleDeleteCourseAuthor = (selectedAuthor) => {
		setCourseAuthors(
			courseAuthors.filter((author) => author.id !== selectedAuthor.id)
		);
	};

	const isAuthorExistInCourseAuthors = (author) => {
		return (
			courseAuthors.findIndex(
				(courseAuthor) => author.id === courseAuthor.id
			) !== -1
		);
	};

	return (
		<div>
			<div className='row mt-md-3 mb-md-3'>
				<div className='col-md-12'>
					<Link to='/courses'>Back to courses</Link>
				</div>
			</div>
			<div className='row mt-md-3 mb-md-3'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label htmlFor='Title'>Title</label>
						<Input
							onChange={handleTitleChange}
							placeholder={'Enter title'}
							className='form-control'
							value={title}
						/>
					</div>
				</div>
				<div className='col-md-6'>
					<Button
						className='btn btn-outline-primary float-right'
						label={courseId ? 'Update course' : 'Create course'}
						onClick={handleCourseForm}
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-12'>
					<div className='form-group'>
						<label htmlFor='Description'>Description</label>
						<textarea
							className='form-control'
							onChange={handleDescriptionChange}
							placeholder='Enter description'
							rows='3'
							value={description}
						/>
					</div>
				</div>
			</div>

			<div className='card mb-md-3'>
				<div className='card-body'>
					<div className='row'>
						<div className='col-sm-8 col-sm-6'>
							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Add Author</h4>
							</div>

							<div className='form-group'>
								<label htmlFor='Author name'>Author name</label>
								<Input
									onChange={handleAuthorNameChange}
									placeholder={'Enter author name'}
									className='form-control'
									value={authorName}
								/>
							</div>

							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<Button
									className='btn btn-outline-primary float-right'
									label='Create author'
									onClick={createAuthor}
								/>
							</div>

							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Duration</h4>
							</div>

							<div className='form-group'>
								<label htmlFor='Author name'>Duration</label>
								<Input
									onChange={handleDurationChange}
									placeholder={'Enter duration'}
									className='form-control'
									type={'number'}
									min={0}
									value={duration}
								/>
							</div>

							<div>Duration: {durationInHour} hours</div>
						</div>

						<div className='col-md-4 col-sm-6'>
							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Authors</h4>
							</div>

							{authors && authors.length ? (
								authors.map((author, index) =>
									!isAuthorExistInCourseAuthors(author) ? (
										<AuthorItem
											key={index}
											onClick={addAuthor}
											author={author}
											label={'Add author'}
										/>
									) : null
								)
							) : (
								<label>No Authors</label>
							)}

							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Course authors</h4>
							</div>

							{courseAuthors && courseAuthors.length ? (
								courseAuthors.map((author, index) => (
									<AuthorItem
										key={index}
										onClick={handleDeleteCourseAuthor}
										author={author}
										label={'Delete author'}
									/>
								))
							) : (
								<label>No Authors</label>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseForm;
