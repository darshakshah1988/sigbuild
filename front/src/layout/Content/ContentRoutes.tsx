import React, { lazy, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import { demoPages } from '../../menu';
import Login from '../../pages/presentation/auth/Login';
import contents from '../../routes/contentRoutes';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const protectedRoute = [
	//User is not able to go further without authentication
	{
		path: demoPages.page404.path,
		element: <PAGE_404 />,
		exact: true,
	},
	{
		path: demoPages.login.path,
		element: <Login />,
		exact: true,
	},
	{
		path: demoPages.signUp.path,
		element: <Login isSignUp />,
		exact: true,
	},
];
const ContentRoutes = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Routes>
			{isAuthenticated
				? contents.map((page) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<Route key={page.path} {...page} />
				  ))
				: protectedRoute.map((page) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<Route key={page.path} {...page} />
				  ))}
			<Route
				path='*'
				element={isAuthenticated ? <Navigate to='/' /> : <Navigate to='auth-pages/login' />}
			/>
		</Routes>
	);
};

export default ContentRoutes;
