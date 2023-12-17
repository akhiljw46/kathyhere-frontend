import { useState } from 'react';
import MessageContext from './message-context';

const DummyMessages = [
  {
    id: 'm1',
    isUser: false,
    messageText: "Heyy, I'm Tom. Wassup dear? 😊 ",
  },
  // {
  //   id: 'm2',
  //   isUser: false,
  //   messageText: 'Yes, how can I help you?',
  // },
  // {
  //   id: 'm3',
  //   isUser: true,
  //   messageText: 'Can you tell me who is Akhil?',
  // },
  // {
  //   id: 'm4',
  //   isUser: false,
  //   messageText: 'Akhil is a boy who lives in his own world!',
  // },
];

const MessageProvider = props => {
  const [user, setUser] = useState('kathy');
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  const [messages, setMessages] = useState(DummyMessages);

  const addMessageHandler = message => {
    if (!message.messageText) return;
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const setUserHandler = user => setUser(user);
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
