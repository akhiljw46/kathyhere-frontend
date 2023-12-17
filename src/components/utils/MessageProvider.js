import { useState } from 'react';
import MessageContext from './message-context';

const DummyMessages = [
  {
    id: 'm1',
    isUser: false,
    messageText: "Heyy, I'm Kathy. Wassup dear? 😊 ",
  },
];

const MessageProvider = props => {
  const [user, setUser] = useState('kathy');
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  const [messages, setMessages] = useState(DummyMessages);

  const addMessageHandler = message => {
    if (!message.messageText) return;
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const setUserHandler = user => {
    setUser(user);
    setMessages([
      {
        id: 'm1',
        isUser: false,
        messageText: `Heyy, I'm ${
          user === 'kathy' ? 'Kathy' : 'Tom'
        }. Wassup dear? 😊 `,
      },
    ]);
    setIsUserAvailable(true);
  };
  const setIsUserAvailableHandler = isAvailable =>
    setIsUserAvailable(isAvailable);

  const messageContext = {
    user,
    isUserAvailable,
    messages,
    addMessage: addMessageHandler,
    setUser: setUserHandler,
    setIsUserAvailable: setIsUserAvailableHandler,
  };

  return (
    <MessageContext.Provider value={messageContext}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
