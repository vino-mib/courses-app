import logo from '../../../../assets/img/logo.png';

interface LogoProps {
	width: string;
	height: string;
}

const Logo: React.FC<LogoProps> = (props) => {
	return (
		<img
			src={logo}
			width={props.width}
			height={props.height}
			className='d-inline-block align-top'
			alt='courses'
		></img>
	);
};

export default Logo;
