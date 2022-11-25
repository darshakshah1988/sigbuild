import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getUserDataWithId } from '../../../common/data/userDummyData';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Modal, { ModalBody, ModalHeader } from '../../../components/bootstrap/Modal';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import { demoPages } from '../../../menu';
import Badge from '../../../components/bootstrap/Badge';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Chart, { IChartOptions } from '../../../components/extras/Chart';
import dummyEventsData from '../../../common/data/dummyEventsData';
import { priceFormat } from '../../../helpers/helpers';
import EVENT_STATUS from '../../../common/data/enumEventStatus';
import Alert from '../../../components/bootstrap/Alert';
import CommonAvatarTeam from '../../../common/other/CommonAvatarTeam';
import COLORS from '../../../common/data/enumColors';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';
import AuthContext from '../../../contexts/authContext';
import moment from 'moment';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { updateProfile } from '../../../components/Services/UserService';
// import { updateProfile } from '../../../components/Services/UserService';

const EmployeePage = () => {
	useTourStep(19);
	const { darkModeStatus } = useDarkMode();
	const { userData: data } = useContext(AuthContext);
	const [updateProfileStatus, setUpdateProfileStatus] = useState<boolean>(false);
	const [updatedAvatar, setUpdatedAvatar] = useState<any>("");
	console.log("DATA", data)

	const { id } = useParams();
	// const data = getUserDataWithId(id);

	const getDate = (date: any) => {
		const formattedDate = moment(date).format('DD/MM/YY');
		return formattedDate;
	}

	const [dayHours] = useState<IChartOptions>({
		series: [
			{
				data: [8, 12, 15, 20, 15, 22, 9],
			},
		],
		options: {
			colors: [process.env.REACT_APP_SUCCESS_COLOR],
			chart: {
				type: 'radar',
				width: 200,
				height: 200,
				sparkline: {
					enabled: true,
				},
			},
			xaxis: {
				categories: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
				// convertedCatToNumeric: false,
			},
			tooltip: {
				theme: 'dark',
				fixed: {
					enabled: false,
				},
				x: {
					show: true,
				},
				y: {
					title: {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						formatter(seriesName) {
							return 'Hours';
						},
					},
				},
			},
			stroke: {
				curve: 'smooth',
				width: 2,
			},
			plotOptions: {
				radar: {
					polygons: {
						strokeColors: `${COLORS.SUCCESS.code}50`,
						strokeWidth: '1',
						connectorColors: `${COLORS.SUCCESS.code}50`,
					},
				},
			},
		},
	});

	const userTasks = dummyEventsData.filter((f) => f.assigned.username === data.username);

	const updateProfileDataChange = (e: any) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				// if (typeof reader === 'string') {
				setUpdatedAvatar(reader.result);
				// }
				// setAvatarPreview(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	const handleUpdateProfile = async () => {
		let payload = {
			name: 'Vishaal Sehgal',
			email: 'tesingupdate@gmail.com',
		}

		const myForm = new FormData();

		myForm.set("name", payload.name);
		myForm.set("email", payload.email);
		myForm.set("avatar", updatedAvatar);
		let result = await updateProfile(myForm);
		console.log("<<<<<<<<<<>>>>>>>>>>result", result);
	}

	return (
		<>
			<PageWrapper title={`${data.name}`}>
				{/* <SubHeader>
					<SubHeaderLeft>
						<Button
							color='info'
							isLink
							icon='ArrowBack'
							tag='a'
							to={`../${demoPages.appointment.subMenu.employeeList.path}`}>
							Back to List
						</Button>
						<SubheaderSeparator />
						<CommonAvatarTeam isAlignmentEnd>
							<strong>Sports</strong> Team
						</CommonAvatarTeam>
					</SubHeaderLeft>
					<SubHeaderRight>
						<span className='text-muted fst-italic me-2'>Last update:</span>
						<span className='fw-bold'>13 hours ago</span>
					</SubHeaderRight>
				</SubHeader> */}
				<Page>
					<div className='pt-3 pb-5 d-flex align-items-center'>
						<span className='display-4 fw-bold me-3'>{`${data.name}`}</span>
					</div>
					<div className='row'>
						<div className='col'>
							<Card className='shadow-3d-info'>
								<CardBody>
									<div className='row g-5'>
										<div className='col-12 d-flex justify-content-center'>
											<Avatar
												src={
													data.avatar.url ? data.avatar.url : UserImageWebp
												}
												// src='data.avatar.url'
												srcSet={data.srcSet}
												color={data.color} />
										</div>
										<div className='col-12'>
											<div className='row g-2 align-items-center flex-column'>
												{/* Name  */}
												<div className='col-md-auto mt-3 mb-1'>
													<div className='d-flex align-items-center justify-content-center'>
														<div className='flex-shrink-0'>
															<Icon icon='Tag' size='3x' color='info' />
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																{`${data.name}`}
															</div>
															<div className='text-muted'>
																Social name
															</div>
														</div>
													</div>
												</div>
												{/* Email Address  */}
												<div className='col-md-auto mt-3 mb-1'>
													<div className='d-flex align-items-center justify-content-center'>
														<div className='flex-shrink-0'>
															<Icon icon='Mail' size='3x' color='info' />
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																{`${data.email}`}
															</div>
															<div className='text-muted'>
																Email Address
															</div>
														</div>
													</div>
												</div>
												{/* Created At   */}
												<div className='col-md-auto mt-3 mb-1'>
													<div className='d-flex align-items-center justify-content-center'>
														<div className='flex-shrink-0'>
															<Icon icon='Tag' size='3x' color='info' />
														</div>
														<div className='flex-grow-1 ms-3'>
															<div className='fw-bold fs-5 mb-0'>
																{getDate(data.createdAt)}
															</div>
															<div className='text-muted'>
																Date Joined
															</div>
														</div>
													</div>
												</div>
												{/* Update Profile Button  */}
												<div className='col-md-auto m-5'>
													<Button
														color='warning'
														className='w-100 py-3'
														// isLight={singUpStatus}
														size='lg'
														onClick={() => {
															// setSignInPassword(false);
															setUpdateProfileStatus(true);
														}}>
														Update Profile
													</Button>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
						{/* <div className='col-lg-8'> */}
						{/* </div> */}
					</div>
				</Page>
			</PageWrapper>
			<Modal
				setIsOpen={setUpdateProfileStatus}
				isOpen={updateProfileStatus}
				isStaticBackdrop
				isScrollable
			>
				<ModalHeader setIsOpen={setUpdateProfileStatus}>

				</ModalHeader>
				<ModalBody>
					<div className='d-flex flex-column align-items-center  justify-content-around' style={{ "height": "80vh" }}>
						<div className='display-4 text-center' style={{ "border": '2px solid red' }}>
							Update Profile
						</div>
						<div className='d-flex flex-column justify-content-around' style={{ "border": '2px solid red', 'height': '30vh' }}>
							{/* Profile Photo Section */}
							<div style={{ "border": '2px solid red' }}>
								<FormGroup
									id='updateName'
									isFloating
									label='Name'
									className={classNames({
										// 'd-none': !signInPassword,
									})}>
									<input
										className="mx-2 w-60"
										type="file"
										name="avatar"
										accept="image/*"
										onChange={updateProfileDataChange}
									/>
								</FormGroup>
							</div>
							<div>
								<FormGroup
									id='updateName'
									isFloating
									label='Name'
									className=""
									style={{ "border": '2px solid green' }}
									>
									<Input
										type='text'
										style={{ "border": '2px solid blue' }}
									value={data.name}
									// isTouched={formik.touched.loginPassword}
									// invalidFeedback={
									// 	formik.errors.loginPassword
									// }
									// validFeedback='Looks good!'
									// isValid={formik.isValid}
									// onChange={(e: any)=> setUpdateEmail(e.target.value)}
									// onBlur={formik.handleBlur}
									/>
								</FormGroup>
							</div>
							<div style={{ "border": '2px solid red' }}>
								<FormGroup
									id='updateName'
									isFloating
									label='Email Address'
									className={classNames({
										// 'd-none': !signInPassword,
									})}>
									<Input
										type='text'
									value={data.email}
									// isTouched={formik.touched.loginPassword}
									// invalidFeedback={
									// 	formik.errors.loginPassword
									// }
									// validFeedback='Looks good!'
									// isValid={formik.isValid}
									// onChange={(e: any)=> setUpdateEmail(e.target.value)}
									// onBlur={formik.handleBlur}
									/>
								</FormGroup>
							</div>

						</div>
						<div className='col-md-auto m-5' style={{ "border": '2px solid red' }}>
							<Button
								color='warning'
								className='w-100 py-3'
								size='lg'
								onClick={() => {
									handleUpdateProfile();
								}}>
								Update
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</>
	);
};

export default EmployeePage;
