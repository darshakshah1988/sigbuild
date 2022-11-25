import React, { SetStateAction, useContext, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Chat, { ChatAvatar, ChatGroup, ChatListItem } from '../../../components/Chat';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import USERS, { IUserProps } from '../../../common/data/userDummyData';
import Icon from '../../../components/icon/Icon';
import ThemeContext from '../../../contexts/themeContext';
import { demoPages } from '../../../menu';
import CHATS, { IMessages } from '../../../common/data/chatDummyData';
import CommonChatStatus from '../../_common/CommonChatStatus';

const WithListChatPage = () => {
	const navigate = useNavigate();

	const TABS: { [key: string]: IUserProps } = {
		CHLOE: USERS.JOHN,
		GRACE: USERS.JOHN,
		JANE: USERS.JOHN,
		RYAN: USERS.JOHN,
		ELLA: USERS.JOHN,
		SAM: USERS.JOHN,
	};
	const [activeTab, setActiveTab] = useState<IUserProps | SetStateAction<null>>(TABS.CHLOE);

	function getMessages(ACTIVE_TAB: IUserProps): IMessages[] | null {
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.CHLOE_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.GRACE_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.JANE_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.RYAN_VS_JOHN;
		}

		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.ELLA_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.SAM_VS_JOHN;
		}
		return null;
	}

	const { mobileDesign } = useContext(ThemeContext);
	const [listShow, setListShow] = useState<boolean>(true);

	const getListShow = (TAB_NAME: IUserProps | SetStateAction<null>) => {
		setActiveTab(TAB_NAME);
		if (mobileDesign) {
			setListShow(false);
		}
	};

	return (
		<PageWrapper title={demoPages.chat.subMenu.withListChat.text}>
			<SubHeader>
				<SubHeaderLeft>
					<span>
						<Icon icon='Info' className='me-2' size='2x' color='danger' />
						<span className='text-muted'>
							You have <Icon icon='Chat5' color='danger' className='mx-1' size='lg' />{' '}
							14 unread messages.
						</span>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonChatStatus />
					{!listShow && (
						<Button
							color='info'
							isLight
							icon='ChevronLeft'
							onClick={() => {
								setListShow(true);
							}}>
							Back to List
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					{(listShow || !mobileDesign) && (
						<div className='col-lg-4 col-md-6'>
							<Card stretch className='overflow-hidden'>
								<CardBody isScrollable className='p-0'>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='success'>
												<CardTitle>Online</CardTitle>
												<CardSubTitle>3 users</CardSubTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='border-bottom border-light'>
											<div className='row'>
												<ChatListItem
													onClick={() => getListShow(TABS.CHLOE)}
													isActive={activeTab === TABS.CHLOE}
													src={USERS.JOHN.src}
													srcSet={USERS.JOHN.srcSet}
													name={USERS.JOHN.name}
													surname={USERS.JOHN.surname}
													isOnline={USERS.JOHN.isOnline}
													color={USERS.JOHN.color}
													lastSeenTime={moment()
														.add(-1, 'week')
														.fromNow()}
													latestMessage={
														"I think it's really starting to shine."
													}
												/>
												<ChatListItem
													onClick={() => getListShow(TABS.GRACE)}
													isActive={activeTab === TABS.GRACE}
													src={USERS.JOHN.src}
													srcSet={USERS.JOHN.srcSet}
													name={USERS.JOHN.name}
													surname={USERS.JOHN.surname}
													isOnline={USERS.JOHN.isOnline}
													color={USERS.JOHN.color}
													unreadMessage={13}
													lastSeenTime={moment()
														.add(-1, 'hour')
														.fromNow()}
													latestMessage='Curabitur ornare mattis urna euismod molestie.'
												/>
												<ChatListItem
													onClick={() => getListShow(TABS.JANE)}
													isActive={activeTab === TABS.JANE}
													src={USERS.JOHN.src}
													srcSet={USERS.JOHN.srcSet}
													name={USERS.JOHN.name}
													surname={USERS.JOHN.surname}
													isOnline={USERS.JOHN.isOnline}
													color={USERS.JOHN.color}
													unreadMessage={1}
													lastSeenTime={moment()
														.add(-3, 'hour')
														.fromNow()}
													latestMessage='Nulla sollicitudin consectetur arcu, sit amet rutrum felis tincidunt non.'
												/>
											</div>
										</CardBody>
									</Card>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='danger'>
												<CardTitle>Offline</CardTitle>
												<CardSubTitle>3 users</CardSubTitle>
											</CardLabel>
										</CardHeader>
										<CardBody>
											<div className='row'>
												<ChatListItem
													onClick={() => getListShow(TABS.RYAN)}
													isActive={activeTab === TABS.RYAN}
													src={USERS.JOHN.src}
													srcSet={USERS.JOHN.srcSet}
													name={USERS.JOHN.name}
													surname={USERS.JOHN.surname}
													isOnline={USERS.JOHN.isOnline}
													color={USERS.JOHN.color}
													lastSeenTime={moment().add(-3, 'day').fromNow()}
													latestMessage='Vivamus fermentum dui sit amet orci interdum pulvinar.'
												/>
												<ChatListItem
													onClick={() => getListShow(TABS.ELLA)}
													isActive={activeTab === TABS.ELLA}
													src={USERS.JOHN.src}
													srcSet={USERS.JOHN.srcSet}
													name={USERS.JOHN.name}
													surname={USERS.JOHN.surname}
													isOnline={USERS.JOHN.isOnline}
													color={USERS.JOHN.color}
													lastSeenTime={moment().fromNow()}
													latestMessage='Eleifend sagittis!'
												/>
												<ChatListItem
													onClick={() => getListShow(TABS.SAM)}
													isActive={activeTab === TABS.SAM}
													src={USERS.JOHN.src}
													srcSet={USERS.JOHN.srcSet}
													name={USERS.JOHN.name}
													surname={USERS.JOHN.surname}
													isOnline={USERS.JOHN.isOnline}
													color={USERS.JOHN.color}
													lastSeenTime={moment()
														.add(-5, 'week')
														.fromNow()}
													latestMessage='Pellentesque a massa at magna laoreet luctus sed dignissim erat.'
												/>
											</div>
										</CardBody>
									</Card>
								</CardBody>
								<CardFooter>
									<CardFooterLeft className='w-100'>
										<Button
											icon='Logout'
											color='danger'
											isLight
											className='w-100 p-3'
											onClick={() => navigate(`../${demoPages.login.path}`)}>
											Logout
										</Button>
									</CardFooterLeft>
								</CardFooter>
							</Card>
						</div>
					)}
					{(!listShow || !mobileDesign) && (
						<div className='col-lg-8 col-md-6'>
							<Card stretch>
								<CardHeader>
									<CardActions>
										<div className='d-flex align-items-center'>
											<ChatAvatar
												// eslint-disable-next-line react/jsx-props-no-spreading
												{...activeTab}
												className='me-3'
											/>
											<div className='fw-bold'>
												{activeTab
													? `${'name' in activeTab && activeTab.name} ${
															'surname' in activeTab &&
															activeTab.surname
													  }`
													: ''}
											</div>
										</div>
									</CardActions>
								</CardHeader>
								<CardBody isScrollable>
									<Chat>
										{activeTab &&
											// @ts-ignore
											getMessages(activeTab).map((msg) => (
												<ChatGroup
													key={String(msg.messages)}
													messages={msg.messages}
													user={msg.user}
													isReply={msg.isReply}
												/>
											))}
									</Chat>
								</CardBody>
								<CardFooter className='d-block'>
									<InputGroup>
										<Textarea />
										<Button color='info' icon='Send'>
											SEND
										</Button>
									</InputGroup>
								</CardFooter>
							</Card>
						</div>
					)}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default WithListChatPage;
