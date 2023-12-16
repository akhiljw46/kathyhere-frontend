import classes from './ChatBubble.module.css';
import { ReactComponent as Loading } from '../../images/loading.svg';

const ChatBubble = (props) => {
  let messageContent;

  if (props.type === 'text')
    messageContent = (
      <div className={classes['out-para']}>
        {props.text.split('\n').map((para) => (
          <p key={Math.random()}>{para}</p>
        ))}
      </div>
    );
  if (props.type === 'loading')
    messageContent = (
      <div className={classes['out-para']}>
        <Loading className={classes.loading} />
      </div>
    );

  return (
    <li
      className={`${classes.bubble} ${
        props.isUser ? classes.user : classes.ai
      }`}
    >
      {messageContent}
    </li>
  );
};

export default ChatBubble;
