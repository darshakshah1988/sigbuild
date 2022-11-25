import React, { SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Chat, { ChatGroup, ChatHeader, ChatListItem } from '../../../components/Chat';
import USERS, { IUserProps } from '../../../common/data/userDummyData';
import OffCanvas, { OffCanvasBody, OffCanvasHeader } from '../../../components/bootstrap/OffCanvas';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import { demoPages } from '../../../menu';
import CHATS, { IMessages } from '../../../common/data/chatDummyData';
import CommonChatStatus from '../../_common/CommonChatStatus';

const OnlyListChatPage = () => {
	const navigate = useNavigate();
	const [canvasStatus, setCanvasStatus] = useState<boolean>(false);

	const TABS: { [key: string]: IUserProps } = {
		CHLOE: USERS.JOHN,
		GRACE: USERS.JOHN,
		JANE: USERS.JOHN,
		RYAN: USERS.JOHN,
		ELLA: USERS.JOHN,
		SAM: USERS.JOHN,
	};
	const [activeTab, setActiveTab] = useState<IUserProps | SetStateAction<null>>(null);

	function getMessages(ACTIVE_TAB: IUserProps): IMessages[] | null {
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.ELLA_VS_JOHN;
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
			return CHATS.CHLOE_VS_JOHN;
		}
		if (ACTIVE_TAB === USERS.JOHN) {
			return CHATS.SAM_VS_JOHN;
		}
		return null;
	}

	const getListShow = (TAB_NAME: IUserProps | SetStateAction<null>) => {
		setActiveTab(TAB_NAME);
		setCanvasStatus(true);
	};

	useEffect(() => {
		if (!canvasStatus) {
			setActiveTab(null);
		}
		return () => {};
	}, [canvasStatus]);

	return (
		<PageWrapper title={demoPages.chat.subMenu.onlyListChat.text}>
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
					<SubheaderSeparator />
					<Button
						icon='Logout'
						color='danger'
						isLight
						onClick={() => navigate(`../${demoPages.login.path}`)}>
						Logout
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='AccountCircle' iconColor='success'>
									<CardTitle>Online</CardTitle>
									<CardSubTitle>3 users</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
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
										lastSeenTime={moment().add(-1, 'week').fromNow()}
										latestMessage={"I think it's really starting to shine."}
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
										lastSeenTime={moment().add(-1, 'hour').fromNow()}
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
										lastSeenTime={moment().add(-3, 'hour').fromNow()}
										latestMessage='Nulla sollicitudin consectetur arcu, sit amet rutrum felis tincidunt non.'
									/>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-md-6'>
						<Card stretch>
							<CardHeader>
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
										lastSeenTime={moment().add(-5, 'week').fromNow()}
										latestMessage='Pellentesque a massa at magna laoreet luctus sed dignissim erat.'
									/>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>

				<OffCanvas
					id='chat'
					isOpen={canvasStatus}
					setOpen={setCanvasStatus}
					placement='end'
					isModalStyle
					isBackdrop={false}
					isBodyScroll>
					<OffCanvasHeader setOpen={setCanvasStatus} className='fs-5'>
						<ChatHeader
							to={
								activeTab
									? `${'name' in activeTab && activeTab.name} ${
											'surname' in activeTab && activeTab.surname
									  }`
									: ''
							}
						/>
					</OffCanvasHeader>
					<OffCanvasBody>
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
					</OffCanvasBody>
					<div className='chat-send-message p-3'>
						<InputGroup>
							<Textarea />
							<Button color='info' icon='Send'>
								SEND
							</Button>
						</InputGroup>
					</div>
				</OffCanvas>
			</Page>
		</PageWrapper>
	);
};

export default OnlyListChatPage;
