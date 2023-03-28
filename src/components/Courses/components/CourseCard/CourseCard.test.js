import React from 'react';
import { screen, render } from '@testing-library/react';
import CourseCard from './CourseCard';
import * as redux from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

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

const mockProps = {
	key: 1,
	id: '66cc289e-6de9-49b2-9ca7-8b4f',
	title: 'Javascript',
	description: 'description',
	creationDate: '9/3/2021',
	duration: 60,
	authors: 'author',
};

describe('CourseCard', () => {
	beforeEach(() => {
		jest.spyOn(redux, 'useSelector').mockReturnValue({
			isAuth: true,
			name: 'admin',
			email: 'admin@email.com',
			role: 'admin',
			token: '85aa767d-73c0-4e23-9a02-27902d418b37',
		});
	});

	it('should render correctly', () => {
		render(<CourseCard {...mockProps} />);
	});

	it('should display title', async () => {
		render(<CourseCard {...mockProps} />);

		const title = await screen.findByText('Javascript');
		expect(title).toBeTruthy();
	});

	it('should display description', () => {
		render(<CourseCard {...mockProps} />);
		expect(screen.getByText('description')).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		render(<CourseCard {...mockProps} />);
		expect(screen.getByText('01:00')).toBeInTheDocument();
	});

	it('should display authors list', () => {
		render(<CourseCard {...mockProps} />);
		expect(screen.getByText('author')).toBeInTheDocument();
	});

	it('should display created date in the correct format', () => {
		render(<CourseCard {...mockProps} />);
		expect(screen.getByText('9.3.2021')).toBeInTheDocument();
	});
});
