import { createContext } from 'react';

const MessageContext = createContext({
  messages: [],
  addMessage: (message) => {},
});

export default MessageContext;
