import React from 'react';

interface InputProps {
	label: string;
	className: string;
	value: string;
	onChange: () => void;
	placeholder: string;
}

const Input: React.FC<InputProps> = (props) => {
	return (
		<React.Fragment>
			<input
				value={props.value}
				onChange={props.onChange}
				className={props.className}
				placeholder={props.placeholder}
				type={props.type ?? 'text'}
			/>
		</React.Fragment>
	);
};

export default Input;
