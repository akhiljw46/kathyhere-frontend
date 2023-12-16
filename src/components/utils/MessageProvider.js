import { useState } from 'react';
import MessageContext from './message-context';

const DummyMessages = [
  {
    id: 'm1',
    isUser: false,
    messageText: "Heyy, I'm Kathy. Wassup dear? 😊 ",
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
  const [messages, setMessages] = useState(DummyMessages);

  const addMessageHandler = message => {
    if (!message.messageText) return;
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const messageContext = {
    messages,
    addMessage: addMessageHandler,
  };

  return (
    <MessageContext.Provider value={messageContext}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
