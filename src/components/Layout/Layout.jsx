import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
	return (
		<React.Fragment>
			<Header />
			<div className='container-fluid'>
				<Outlet />
			</div>
		</React.Fragment>
	);
};

export default Layout;
