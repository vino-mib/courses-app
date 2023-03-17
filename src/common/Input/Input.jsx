import React, { useEffect, useRef, useState } from 'react';

interface InputProps {
	label: string;
	className: string;
	value: string;
	onChange: () => void;
	placeholder: string;
	focus: string;
}

const Input: React.FC<InputProps> = (props) => {
	const [focus, setFocus] = useState(true);
	const inputRef = useRef(null);

	useEffect(() => {
		if (props.focus === 'true' && focus) {
			inputRef.current.focus();
			setFocus(false);
		}
	}, [props]);

	return (
		<React.Fragment>
			<input
				value={props.value}
				onChange={props.onChange}
				className={props.className}
				placeholder={props.placeholder}
				type={props.type ?? 'text'}
				focus={props.focus ?? 'false'}
				ref={inputRef}
			/>
		</React.Fragment>
	);
};

export default Input;
