interface ButtonProps {
	label: string;
	class: string;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button className={props.class} onClick={props.onClick}>
			{props.label}
		</button>
	);
};

export default Button;
