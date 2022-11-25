// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IUserProps } from '../common/data/userDummyData';

export interface IAuthContextProps {
	user: string;
	setUser:(value: string) => void;
	setUserData: (value: Partial<IUserProps>) => void;
	userData: Partial<IUserProps>;
	isAuthenticated : boolean;
	setIsAuthenticated : (value: boolean)=> void;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>(localStorage.getItem('facit_authUsername') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

	useEffect(() => {
		console.log("EEEEEEEEECOntext",{user, userData});
		localStorage.setItem('facit_authUsername', user);
	}, [user, userData]);

	// useEffect(() => {
	// 	if (user !== '') {
	// 		setUserData(getUserDataWithUsername(user));
	// 	} else {
	// 		setUserData({});
	// 	}
	// }, [user]);

	const value = useMemo(
		() => ({
			user,
			setUser,
			setUserData,
			userData,
			isAuthenticated,
			setIsAuthenticated
		}),
		[user, userData, isAuthenticated],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
