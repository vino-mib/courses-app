interface ButtonProps {
	label: string;
	className: string;
	icon: string;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button className={props.className} onClick={props.onClick}>
			{props.icon ? <i className={'fa fa-' + props.icon} /> : null}
			{props.label}
		</button>
	);
};

export default Button;
