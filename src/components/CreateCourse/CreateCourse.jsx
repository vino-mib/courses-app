import React, { useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { mockedAuthorsList } from '../../mock';
import AuthorItem from './components/AuthorItem/AuthorItem';
import formatDuration from '../../helpers/getCourseDuration';

interface CreateCourseProps {
	addCourse: () => {};
}

const CreateCourse: React.FC<CreateCourseProps> = (props) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [duration, setDuration] = useState(0);
	const [durationInHour, setDurationInHour] = useState('');

	const [id, setId] = useState(0);
	const [courseId, setCourseId] = useState(0);

	const createCourse = () => {
		console.log('create course');

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
			setCourseId(courseId + 1);
			const newCourse = {
				id: courseId,
				title: title,
				description: description,
				creationDate: day + '.' + month + '.' + year,
				duration: duration,
				authors: courseAuthors.map((author) => author.id),
			};
			console.log(newCourse);
			props.addCourse(newCourse);
		} else {
			alert('Please fill the require details');
		}
	};

	const onTitleChange = (event) => {
		console.log('on title change');
		setTitle(event.target.value);
	};

	const onDescriptionChange = (event) => {
		console.log('on description change');
		setDescription(event.target.value);
	};

	const onAuthorNameChange = (event) => {
		console.log('on author name change');
		setAuthorName(event.target.value);
	};

	const createAuthor = () => {
		console.log('create author');
		const newId = id + 1;
		setId(newId);
		console.log(id);
		const newAuthor = { id: newId, name: authorName };
		authors.unshift(newAuthor);
		setAuthors(authors);
	};

	const onDurationChange = (event) => {
		console.log('on duration change');
		setDurationInHour(formatDuration(event.target.value));
		setDuration(event.target.value);
	};

	const onAddAuthor = (selectedAuthor) => {
		console.log('on add author');
		console.log(selectedAuthor);
		setAuthors(authors.filter((author) => author.id !== selectedAuthor.id));
		courseAuthors.unshift(selectedAuthor);
		setCourseAuthors(courseAuthors);
	};

	const onRemoveCourseAuthor = (selectedAuthor) => {
		console.log('on remove course author');
		console.log(selectedAuthor);
		setCourseAuthors(
			courseAuthors.filter((author) => author.id !== selectedAuthor.id)
		);
		authors.unshift(selectedAuthor);
		setAuthors(authors);
	};

	return (
		<div>
			<div className='row mt-md-3 mb-md-3'>
				<div className='col-md-6'>
					<div className='form-group'>
						<label for='Title'>Title</label>
						<Input
							onChange={onTitleChange}
							placeholder={'Enter title'}
							class='form-control'
						/>
					</div>
				</div>
				<div className='col-md-6'>
					<Button
						class='btn btn-outline-primary float-right'
						label='Create course'
						onClick={createCourse}
					></Button>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-12'>
					<div className='form-group'>
						<label for='Description'>Description</label>
						<textarea
							className='form-control'
							onChange={onDescriptionChange}
							placeholder='Enter description'
							rows='3'
						></textarea>
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
								<label for='Author name'>Author name</label>
								<Input
									onChange={onAuthorNameChange}
									placeholder={'Enter author name'}
									class='form-control'
								/>
							</div>

							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<Button
									class='btn btn-outline-primary float-right'
									label='Create author'
									onClick={createAuthor}
								></Button>
							</div>

							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Duration</h4>
							</div>

							<div className='form-group'>
								<label for='Author name'>Duration</label>
								<Input
									onChange={onDurationChange}
									placeholder={'Enter duration'}
									class='form-control'
									type={'number'}
									min={0}
								/>
							</div>

							<div>Duration: {durationInHour} hours</div>
						</div>

						<div className='col-md-4 col-sm-6'>
							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Authors</h4>
							</div>

							{authors.length ? (
								authors.map((author, index) => (
									<AuthorItem
										key={index}
										handleClick={onAddAuthor}
										author={author}
										label={'Add author'}
									/>
								))
							) : (
								<label>No Authors</label>
							)}

							<div className='mt-md-3 d-flex justify-content-center flex-nowrap'>
								<h4>Course authors</h4>
							</div>

							{courseAuthors.length ? (
								courseAuthors.map((author, index) => (
									<AuthorItem
										key={index}
										handleClick={onRemoveCourseAuthor}
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

export default CreateCourse;
