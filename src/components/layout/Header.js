import { ReactComponent as Logo } from '../../images/logo.svg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Logo className={classes.logo} />
    </header>
  );
};

export default Header;
