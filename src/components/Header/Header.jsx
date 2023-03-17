import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useAuth } from '../../helpers/auth';

const Header: React.FC<HeaderProps> = (props) => {
	const [token, setToken] = useState('');
	const [user, setUser] = useAuth();

	const navigate = useNavigate();

	const handleLogut = async () => {
		const token = localStorage.getItem('token');
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});

		const result = await response.status;

		if (result === 200 || result === 401) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			setUser(null);
			navigate('/login');
		}
	};

	return (
		<nav className='navbar navbar-light bg-light'>
			<div className='navbar-brand'>
				<Logo width='100' height='50'></Logo>
			</div>
			{user ? (
				<>
					<nav className='nav navbar-nav ml-auto my-md-0 mr-md-4'>
						<div className='nav-item'>{user?.name}</div>
					</nav>

					<Button
						label='Logout'
						className='btn btn-outline-primary'
						onClick={handleLogut}
					/>
				</>
			) : null}
		</nav>
	);
};

export default Header;
