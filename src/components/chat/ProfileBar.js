import classes from './ProfileBar.module.css';
import MessageContext from '../utils/message-context';
import { useContext } from 'react';
import kathy from '../../images/Kathy-dp.png';
import tom from '../../images/tom-dp.png';
import unknown from '../../images/unknown-dp.jpg';

function ProfileBar() {
  const messagesCtx = useContext(MessageContext);

  return (
    <div
      className={`${classes.users} ${
        messagesCtx.isUserAvailable ? '' : classes.hidden
      }`}
    >
      <span className={classes.profile}>
        {messagesCtx.user === 'kathy' ? (
          <>
            <p>Kathy</p>
            <img src={kathy} alt="kathy" />
          </>
        ) : (
          <>
            <p>Tom</p>
            <img src={tom} alt="tom" />
          </>
        )}
      </span>
      <span className={classes.profile}>
        <img src={unknown} alt="you" />

        <p>You</p>
      </span>
    </div>
  );
}
export default ProfileBar;
