import React from 'react';
import { screen, render } from '@testing-library/react';
import Header from './Header';
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

const mockedUser = {
	isAuth: true,
	name: 'admin',
	email: 'admin@email.com',
	role: 'admin',
	token: '85aa767d-73c0-4e23-9a02-27902d418b37',
};

describe('Header', () => {
	beforeEach(() => {
		jest.spyOn(redux, 'useSelector').mockReturnValueOnce(mockedUser);
	});
	it('should render correctly', () => {
		render(<Header />);
	});

	it('should have user name', () => {
		render(<Header />);
		expect(screen.getByText('admin')).toBeInTheDocument();
	});

	it('should have logo', () => {
		const { getByAltText } = render(<Header />);
		const image = getByAltText('courses');
		expect(image.src).toContain('logo.png');
	});
});
