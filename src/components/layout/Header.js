import Logo from '../../images/kathy.png';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <img src={Logo} alt="logo" className={classes.logo} />
    </header>
  );
};

export default Header;
