import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useAuth } from '../../helpers/auth';

const Login: React.FC<> = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();
	const [user, setUser] = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('user'));
		if (userInfo) {
			setUser(userInfo);
			navigate('/courses');
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (email && password) {
			const user = {
				email,
				password,
			};

			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			console.log(result);

			if (result && result.successful) {
				localStorage.setItem('token', result.result);
				localStorage.setItem('user', JSON.stringify(result.user));
				setUser(result.user);
				navigate('/courses');
			} else {
				setError(result.errors[0]);
			}
		}
	};

	return (
		<div className='global-container'>
			<div className='row mt-100 mb-100'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<Input
							placeholder={'Enter email'}
							className='form-control form-control-sm'
							type='email'
							onChange={(e) => setEmail(e.target.value)}
							focus='true'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<Input
							placeholder={'Enter password'}
							className='form-control form-control-sm'
							type='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button className='btn btn-primary btn-block' label='Sign in' />
					<div className='sign-up mt-md-3'>
						Don't have an account? <Link to='/register'>Register</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
