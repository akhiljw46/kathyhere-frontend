import { useContext, useEffect, useRef, useState } from 'react';
import MessageContext from '../utils/message-context';
import ChatBubble from './ChatBubble';
import classes from './ChatContainer.module.css';
import ChatMessages from './ChatMessages';
import SelectUser from './SelectUser';

import kathy from '../../images/Kathy-dp.png';
import tom from '../../images/tom-dp.png';
import unknown from '../../images/unknown-dp.jpg';

const ChatContainer = () => {
  const containerRef = useRef(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  // containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const messagesCtx = useContext(MessageContext);

  const messages = messagesCtx.messages.map(message => (
    <ChatBubble
      type="text"
      key={message.id}
      text={message.messageText}
      isUser={message.isUser}
    />
  ));

  useEffect(() => {
    containerRef.current.scroll({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
    if (!messagesCtx.messages[messagesCtx.messages.length - 1].isUser)
      setIsMessageLoading(false);
    else setIsMessageLoading(true);
  }, [messagesCtx.messages, isMessageLoading]);

  const innerContent = messagesCtx.isUserAvailable ? (
    <ChatMessages>
      {messages}
      {isMessageLoading && (
        <ChatBubble key={Date.now()} type="loading" isUser={false} />
      )}
    </ChatMessages>
  ) : (
    <SelectUser />
  );

  return (
    <section ref={containerRef} className={classes.container}>
      <div className={classes.users}>
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
      {innerContent}
    </section>
  );
};

export default ChatContainer;
