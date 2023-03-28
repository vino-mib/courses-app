import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { logout } from '../../store/user/actions';

const Header: React.FC<> = () => {
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state?.user);

	const handleLogut = async () => {
		dispatch(logout())
			.then(() => {
				navigate('/login');
				// window.location.reload();
			})
			.catch((result) => {
				console.log(result);
				setError(result.result);
			});
	};

	return (
		<nav className='navbar navbar-light bg-light'>
			<div className='navbar-brand'>
				<Logo width='100' height='50'></Logo>
			</div>
			{user?.isAuth ? (
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
