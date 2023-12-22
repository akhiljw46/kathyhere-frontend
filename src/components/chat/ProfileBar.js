import classes from './ProfileBar.module.css';
import MessageContext from '../utils/message-context';
import { useContext } from 'react';
import kathy from '../../images/Kathy-dp.png';
import tom from '../../images/tom-dp.png';
import unknown from '../../images/unknown-dp.jpg';
import ProfileButton from './ProfileButton';

function ProfileBar() {
  const messagesCtx = useContext(MessageContext);

  const clearChatHandler = () => {
    messagesCtx.clearMessages();
  };

  const switchUserHandler = () => {
    messagesCtx.setIsUserAvailable(false);
  };

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
      <ProfileButton text="Switch user" clickHandler={switchUserHandler} />
      <ProfileButton text="Clear Chat" clickHandler={clearChatHandler} />
      <span className={classes.profile}>
        <img src={unknown} alt="you" />

        <p>You</p>
      </span>
    </div>
  );
}
export default ProfileBar;
