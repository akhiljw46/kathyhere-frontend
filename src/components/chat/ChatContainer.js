import { useContext, useEffect, useRef, useState } from 'react';
import MessageContext from '../utils/message-context';
import ChatBubble from './ChatBubble';
import classes from './ChatContainer.module.css';
import ChatMessages from './ChatMessages';
import SelectUser from './SelectUser';

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
      {innerContent}
    </section>
  );
};

export default ChatContainer;
