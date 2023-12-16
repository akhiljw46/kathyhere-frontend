import { useContext, useEffect, useRef, useState } from 'react';
import MessageContext from '../utils/message-context';
import ChatBubble from './ChatBubble';
import classes from './ChatContainer.module.css';
import ChatMessages from './ChatMessages';

const ChatContainer = () => {
  const containerRef = useRef(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  // containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const messagesCtx = useContext(MessageContext);

  const messages = messagesCtx.messages.map((message) => (
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

  return (
    <section ref={containerRef} className={classes.container}>
      <ChatMessages>
        {messages}
        {isMessageLoading && (
          <ChatBubble key={Date.now()} type="loading" isUser={false} />
        )}
      </ChatMessages>
    </section>
  );
};

export default ChatContainer;
