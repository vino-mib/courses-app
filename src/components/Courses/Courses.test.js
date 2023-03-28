import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Courses from './Courses';
import * as redux from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import * as router from 'react-router';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
	useDispatch: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

const mockedCourses = [
	{
		title: 'Javascript',
		description:
			"In this course, you'll learn JavaScript fundamentals that will be helpful as you dive deeper into more advanced topics.",
		duration: 120,
		authors: [
			'6043a4a7-8221-4ede-bf52-c9deb8c9cf5d',
			'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
		],
		creationDate: '24/03/2023',
		id: '8fcdfcde-acd0-4f74-9a28-cae12384b7a5',
	},
	{
		title: 'Python',
		description:
			"Learn the basics of the world's fastest growing and most popular programming ... In this course, learn about the syntax of the Python programming language!",
		duration: 260,
		authors: ['6043a4a7-8221-4ede-bf52-c9deb8c9cf5d'],
		creationDate: '24/03/2023',
		id: '1b78d51d-0f7a-4340-b766-005a3e3411d4',
	},
];

const mockedAuthors = [
	{
		name: 'author',
		id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
	},
	{
		name: 'Hrish',
		id: '6043a4a7-8221-4ede-bf52-c9deb8c9cf5d',
	},
];

const mockedUser = {
	isAuth: true,
	name: 'Vinoth',
	email: 'vino.mib@gmail.com',
	token: 'token',
	role: 'admin',
};

describe('Courses', () => {
	beforeEach(() => {
		jest.spyOn(redux, 'useSelector').mockReturnValueOnce({
			courses: mockedCourses,
			authors: mockedAuthors,
			user: mockedUser,
		});
	});

	it('should render correctly', () => {
		render(<Courses />);
		//screen.debug();
	});

	it('should display amount of Coursecard equal to the course count', async () => {
		const component = await render(<Courses />);
		const courseCards = component.getAllByTestId('course-card');
		expect(courseCards.length).toEqual(mockedCourses.length);
	});

	it('should display course form after a click on button "Add new course"', async () => {
		const component = await render(<Courses />);
		const addCourseButton = component.getByText('Add new course', {
			selector: 'button',
		});
		expect(addCourseButton).toBeDefined();
		await userEvent.click(addCourseButton);
		expect(mockedUsedNavigate).toHaveBeenCalledWith('/courses/add');
	});
});
