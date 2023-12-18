import styles from './SelectUser.module.css';
import tom from '../../images/tom-dp.png';
import kathy from '../../images/Kathy-dp.png';
import MessageContext from '../utils/message-context';
import { useContext } from 'react';
import logo from '../../images/logo-dark.png';

function SelectUser() {
  const messageCtx = useContext(MessageContext);
  const clickHandler = name => {
    messageCtx.setUser(name);
  };

  return (
    <div className={styles.dialogue}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <p>Whom do you want to talk with?</p>
      <div>
        <button onClick={e => clickHandler('kathy')}>
          <img src={kathy} alt="kathy" />
        </button>
        <button onClick={e => clickHandler('tom')}>
          <img src={tom} alt="tom" />
        </button>
      </div>
    </div>
  );
}
export default SelectUser;
