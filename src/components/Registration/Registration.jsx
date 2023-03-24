import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useAuth } from '../../helpers/auth';
import { register } from '../../store/user/actions';

const Login: React.FC<> = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state?.user);
	console.log(user);

	useEffect(() => {
		if (user?.isAuth) {
			navigate('/courses');
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (name && email && password) {
			const newUser = {
				name,
				email,
				password,
			};

			dispatch(register(newUser))
				.then((result) => {
					setName('');
					setEmail('');
					setPassword('');
					navigate('/login');
					// window.location.reload();
				})
				.catch((result) => {
					console.log(result);
					setError(result.errors[0]);
				});

			/*const response = await fetch('http://localhost:4000/register', {
				method: 'POST',
				body: JSON.stringify(newUser),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			console.log(result);

			if (result && result.successful) {
				navigate('/login');
			} else {
				setError(result.errors[0]);
			}*/
		}
	};

	return (
		<React.Fragment>
			{error ? (
				<div className='row'>
					<div className='col-md-12'>
						<div className='alert alert-danger alert-dismissible text-center'>
							{error}
						</div>
					</div>
				</div>
			) : null}
			<div className='global-container'>
				<div className='row mt-100 mb-100'>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='name'>Name</label>
							<Input
								placeholder={'Enter Name'}
								className='form-control form-control-sm'
								onChange={(e) => setName(e.target.value)}
								focus='true'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='email'>Email</label>
							<Input
								placeholder={'Enter email'}
								className='form-control form-control-sm'
								type='email'
								onChange={(e) => setEmail(e.target.value)}
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
						<Button
							className='btn btn-primary btn-block'
							label='Registration'
						/>
						<div className='sign-up mt-md-3'>
							Do you have an account? <Link to='/login'>Login</Link>
						</div>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Login;
