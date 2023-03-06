interface ButtonProps {
	label: string;
	className: string;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.label}
		</button>
	);
};

export default Button;
