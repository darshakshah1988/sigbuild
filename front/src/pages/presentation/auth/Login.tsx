// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prettier/prettier */
import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import AuthContext from '../../../contexts/authContext';
// import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
// import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import { loginUser, resgisterUser } from '../../../components/Services/UserService';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser, setUserData, setIsAuthenticated } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	// const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [signupError, setSignupError] = useState<string>('');
	const [loginError, setLoginError] = useState<string>('');

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	// const usernameCheck = (username: string) => {
	// 	return !!getUserDataWithUsername(username);
	// };

	// const passwordCheck = (username: string, password: string) => {
	// 	return getUserDataWithUsername(username).password === password;
	// };

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
			signupName: '',
			signupEmail: '',
			signupPassword: '',
		},
		validate: (values) => {
			const errors: {
				loginUsername?: string;
				loginPassword?: string;
				signupName?: string;
				signupEmail?: string;
				signupPassword?: string;
			} = {};

			if (singUpStatus) {
				if (!values.signupName) {
					errors.signupName = 'Required';
				}

				if (!values.signupEmail) {
					errors.signupEmail = 'Required';
				}

				if (!values.signupPassword) {
					errors.signupPassword = 'Required';
				}
			} else {
				if (!values.loginUsername) {
					errors.loginUsername = 'Required';
				}

				if (!values.loginPassword) {
					errors.loginPassword = 'Required';
				}
			}

			console.log('QQQQQQQQVALUES', errors);
			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values) => {
			let loginPayload = {
				email: values.loginUsername,
				password: values.loginPassword,
			};
			let signupPayload = {
				name: values.signupName,
				email: values.signupEmail,
				password: values.signupPassword,
			};
			console.log('RRRRRRRRRRRRRR');
			//Implemented the Login API hit here
			let response = singUpStatus
				? await resgisterUser(signupPayload)
				: await loginUser(loginPayload);
			if (response && response.user) {
				setIsAuthenticated(true);
				if (setUser) {
					setUserData(response.user);
					setUser(response.user.name);
				}
				handleOnClick();
			} else {
				setIsAuthenticated(false);
				console.log('<<<<<<<response', response);
				if (singUpStatus) {
					if (typeof response === 'string') {
						setSignupError(response);
						// formik.setFieldError('signup-password', response);
					} else {
						formik.setFieldError('loginPassword', 'Username and password do not match');
					}
				} else {
					if (typeof response === 'string') {
						setLoginError(response);
					} else {
						formik.setFieldError('loginPassword', 'Username and password do not match');
					}
				}
			}
			// if (usernameCheck(values.loginUsername)) {
			// 	if (passwordCheck(values.loginUsername, values.loginPassword)) {
			// 		if (setUser) {
			// 			setUser(values.loginUsername);
			// 		}

			// 		handleOnClick();
			// 	} else {
			// 		formik.setFieldError('loginPassword', 'Username and password do not match.');
			// 	}
			// }
		},
	});

	// const [isLoading, setIsLoading] = useState<boolean>(false);
	// const handleContinue = () => {
	// 	setIsLoading(true);
	// 	setTimeout(() => {
	// 		// if (
	// 		// 	!Object.keys(USERS).find(
	// 		// 		(f) => USERS[f].username.toString() === formik.values.loginUsername,
	// 		// 	)
	// 		// ) {
	// 		// 	formik.setFieldError('loginUsername', 'No such user found in the system.');
	// 		// } else {
	// 		setSignInPassword(true);
	// 		// }
	// 		setIsLoading(false);
	// 	}, 1000);
	// };

	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !singUpStatus, 'bg-info': singUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													// setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													// setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								{loginError ? (
									<Alert isLight icon='Lock'>
										<div className='row'>
											<div className='col-12'>
												<strong>{loginError}</strong>
											</div>
											{/* <div className='col-12'>
											<strong>Password:</strong> {USERS.JOHN.password}
										</div> */}
										</div>
									</Alert>
								) : signupError ? (
									<Alert isLight icon='Lock'>
										<div className='row'>
											<div className='col-12'>
												<strong>{signupError}</strong>
											</div>
											{/* <div className='col-12'>
											<strong>Password:</strong> {USERS.JOHN.password}
										</div> */}
										</div>
									</Alert>
								) : null}
								<form className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signupName'
													isFloating
													label='Your Full Name'
													className={classNames({
														// 'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formik.values.signupName}
														isTouched={formik.touched.signupName}
														invalidFeedback={formik.errors.signupName}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signupEmail'
													isFloating
													label='Your email'
													className={classNames({
														// 'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formik.values.signupEmail}
														isTouched={formik.touched.signupEmail}
														invalidFeedback={formik.errors.signupEmail}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>

											{/* <div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your surname'>
													<Input autoComplete='family-name' />
												</FormGroup>
											</div> */}
											<div className='col-12'>
												<FormGroup
													id='signupPassword'
													isFloating
													label='Password'
													className={classNames({
														// 'd-none': signInPassword,
													})}>
													<Input
														autoComplete='current-password'
														type='password'
														value={formik.values.signupPassword}
														isTouched={formik.touched.signupPassword}
														invalidFeedback={
															formik.errors.signupPassword
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={formik.handleSubmit}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													isFloating
													label='Your email'
													className={classNames({
														// 'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														value={formik.values.loginUsername}
														isTouched={formik.touched.loginUsername}
														invalidFeedback={
															formik.errors.loginUsername
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
												{/* {signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formik.values.loginUsername}.
													</div>
												)} */}
											</div>
											<div className='col-12'>
												<FormGroup
													id='loginPassword'
													isFloating
													label='Password'
													className={classNames({
														// 'd-none': !signInPassword,
													})}>
													<Input
														autoComplete='current-password'
														type='password'
														value={formik.values.loginPassword}
														isTouched={formik.touched.loginPassword}
														invalidFeedback={
															formik.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{/* {!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.loginUsername}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														onClick={formik.handleSubmit}>
														Login
													</Button>
												)} */}
												<Button
													color='warning'
													className='w-100 py-3'
													onClick={formik.handleSubmit}>
													Login
												</Button>
											</div>
										</>
									)}

									{/* BEGIN :: Social Login */}
									{/* {!signInPassword && (
										<>
											<div className='col-12 mt-3 text-center text-muted'>
												OR
											</div>
											<div className='col-12 mt-3'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomApple'
													onClick={handleOnClick}>
													Sign in with Apple
												</Button>
											</div>
											<div className='col-12'>
												<Button
													isOutline
													color={darkModeStatus ? 'light' : 'dark'}
													className={classNames('w-100 py-3', {
														'border-light': !darkModeStatus,
														'border-dark': darkModeStatus,
													})}
													icon='CustomGoogle'
													onClick={handleOnClick}>
													Continue with Google
												</Button>
											</div>
										</>
									)} */}
									{/* END :: Social Login */}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
