import React from 'react';
import USERS from '../../../common/data/userDummyData';
import { demoPages } from '../../../menu';
import UserContact from '../../../components/UserContact';
import { useNavigate } from 'react-router-dom';

const CommonDashboardUserCard = () => {
	const navigate = useNavigate();

	return (
		<UserContact
			name={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
			position='Team Lead'
			mail={`${USERS.JOHN.username}@site.com`}
			phone='1234567'
			onChat={() => navigate(`../${demoPages.chat.subMenu.withListChat.path}`)}
			src={USERS.JOHN.src}
			srcSet={USERS.JOHN.srcSet}
			color={USERS.JOHN.color}
		/>
	);
};

export default CommonDashboardUserCard;
