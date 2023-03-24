import Button from '../../../../common/Button/Button';
import React from 'react';

interface Author {
	id: string;
	name: string;
}

interface AuthorItemProps {
	key: number;
	author: Author;
	onClick: () => {};
	label: string;
}

const AuthorItem: React.FC<AuthorItemProps> = (props) => {
	const handleClick = () => {
		props.onClick(props.author);
	};

	return (
		<div className='row mt-md-2 mb-md-2'>
			<div className='col-md-6'>
				<label>{props.author.name}</label>
			</div>
			<div className='col-md-6'>
				<Button
					onClick={handleClick}
					label={props.label}
					className='btn btn-outline-primary'
				/>
			</div>
		</div>
	);
};

export default AuthorItem;
