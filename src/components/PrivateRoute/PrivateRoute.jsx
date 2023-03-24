import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<> = ({ children }) => {
	const dispatch = useDispatch();
	//Selects the state value from the store.
	const user = useSelector((state) => state?.user);

	const isAdmin = user.role === 'admin' ? true : false; // add logic to determine the value for the condition
	return isAdmin ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
