import { createContext } from 'react';

const MessageContext = createContext({
  user: 'kathy',
  isUserAvailable: false,
  messages: [],
  addMessage: message => {},
  setUserHandler: user => {},
  setIsUserAvailableHandler: isAvailable => {},
});

export default MessageContext;
