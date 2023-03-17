import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setUserInfo(user);
		}
	}, []);
	return (
		<AuthContext.Provider value={[userInfo, setUserInfo]}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => React.useContext(AuthContext);
