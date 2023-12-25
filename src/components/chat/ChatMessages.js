import classes from './ChatMessages.module.css';
import { useEffect, useRef, useContext } from 'react';
import MessageContext from '../utils/message-context';

const ChatMessages = props => {
  const containerRef = useRef(null);
  const messagesCtx = useContext(MessageContext);

  useEffect(() => {
    containerRef.current.scroll({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messagesCtx.messages, props.isLoading]);
  return (
    <div ref={containerRef} className={classes.container}>
      <ul>{props.children}</ul>
    </div>
  );
};

export default ChatMessages;
