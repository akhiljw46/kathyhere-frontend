import { createContext } from 'react';

const MessageContext = createContext({
  user: 'kathy',
  isUserAvailable: false,
  isLoading: false,
  error: null,
  messages: [],
  addMessage: message => {},
  setUser: user => {},
  setIsUserAvailable: isAvailable => {},
  setIsLoading: isLoading => {},
});

export default MessageContext;
