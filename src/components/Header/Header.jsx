import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header: React.FC<HeaderProps> = (props) => {
	return (
		<nav className='navbar navbar-light bg-light'>
			<div className='navbar-brand'>
				<Logo width='100' height='50'></Logo>
			</div>
			<nav className='nav navbar-nav ml-auto my-md-0 mr-md-4'>
				<div className='nav-item'>Vinoth</div>
			</nav>
			<Button label='Logout' class='btn btn-outline-primary'></Button>
		</nav>
	);
};

export default Header;
