import React, { useCallback } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import { useNavigate } from 'react-router-dom';
import { demoPages } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';

const CommonDashboardDesignTeam = () => {
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	const handleOnClickToEmployeeListPage = useCallback(
		() => navigate(`../${demoPages.appointment.subMenu.employeeList.path}`),
		[navigate],
	);

	return (
		<Card stretch>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='h4' className='h5'>
						Design Team
					</CardTitle>
					<CardSubTitle tag='h5' className='h6 text-muted'>
						There is a meeting at 15 o'clock.
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Button
						icon='ArrowForwardIos'
						aria-label='Read More'
						hoverShadow='default'
						color={darkModeStatus ? 'dark' : undefined}
						onClick={handleOnClickToEmployeeListPage}
					/>
				</CardActions>
			</CardHeader>
			<CardBody>
				<AvatarGroup>
					<Avatar
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
						color={USERS.JOHN.color}
					/>
					<Avatar
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
						color={USERS.JOHN.color}
					/>
					<Avatar
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
						color={USERS.JOHN.color}
					/>
					<Avatar
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
						color={USERS.JOHN.color}
					/>
				</AvatarGroup>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardDesignTeam;
