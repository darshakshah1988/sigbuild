import React, { FC, memo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Avatar, { AvatarGroup } from '../../components/Avatar';
import USERS from '../data/userDummyData';

interface ICommonAvatarTeamProps {
	children: ReactNode;
	isAlignmentEnd?: boolean;
}
const CommonAvatarTeam: FC<ICommonAvatarTeamProps> = ({ children, isAlignmentEnd }) => {
	return (
		<>
			{children && !isAlignmentEnd && <span className='me-3'>{children}</span>}
			<AvatarGroup>
				<Avatar
					src={USERS.JOHN.src}
					srcSet={USERS.JOHN.srcSet}
					// @ts-ignore
					color={USERS.JOHN.color}
					userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
				/>
				<Avatar
					src={USERS.JOHN.src}
					srcSet={USERS.JOHN.srcSet}
					// @ts-ignore
					color={USERS.JOHN.color}
					userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
				/>
				<Avatar
					src={USERS.JOHN.src}
					srcSet={USERS.JOHN.srcSet}
					// @ts-ignore
					color={USERS.JOHN.color}
					userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
				/>
				<Avatar
					src={USERS.JOHN.src}
					srcSet={USERS.JOHN.srcSet}
					// @ts-ignore
					color={USERS.JOHN.color}
					userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
				/>
				<Avatar
					src={USERS.JOHN.src}
					srcSet={USERS.JOHN.srcSet}
					// @ts-ignore
					color={USERS.JOHN.color}
					userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
				/>
				<Avatar
					src={USERS.JOHN.src}
					srcSet={USERS.JOHN.srcSet}
					// @ts-ignore
					color={USERS.JOHN.color}
					userName={`${USERS.JOHN.name} ${USERS.JOHN.surname}`}
				/>
			</AvatarGroup>
			{children && isAlignmentEnd && <span>{children}</span>}
		</>
	);
};
CommonAvatarTeam.propTypes = {
	children: PropTypes.node,
	isAlignmentEnd: PropTypes.bool,
};
CommonAvatarTeam.defaultProps = {
	children: undefined,
	isAlignmentEnd: false,
};

export default memo(CommonAvatarTeam);
