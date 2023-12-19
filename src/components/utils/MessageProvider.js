import { useState, useEffect, useCallback } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const url = `https://kathyhere.onrender.com/v1/message/${user}`;
  const url = `http://localhost:1234/v1/message/${user}`;

  const fetchMessage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          messages: messages,
          // messages: [{ messageText: message, isUser: true }],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const reqestTimeoutTimer = setTimeout(() => {
        setIsLoading(false);
        throw new Error('Request Timeout');
      }, 1000 * 60 * 2);

      const data = await response.json();

      clearTimeout(reqestTimeoutTimer);
      addMessageHandler({
        id: Date.now(),
        isUser: false,
        messageText: data.message,
      });
    } catch (err) {
      setError(err.message);
      console.log('Something went Wrong!', error);
      addMessageHandler({
        id: Date.now(),
        isUser: false,
        messageText: "Sorry, I'm too busy to talk now 🥵",
      });
    }
  }, [error, messages, url]);

  useEffect(() => {
    if (messages[messages.length - 1].isUser && !error) {
      setIsLoading(true);
      fetchMessage().then(() => setIsLoading(false));
    }
  }, [messages, error, fetchMessage]);

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

  const setIsLoadingHandler = isLoading => setIsLoading(isLoading);

  const messageContext = {
    user,
    isUserAvailable,
    messages,
    isLoading,
    error,
    fetchMessage,
    addMessage: addMessageHandler,
    setUser: setUserHandler,
    setIsUserAvailable: setIsUserAvailableHandler,
    setIsLoading: setIsLoadingHandler,
  };

  return (
    <MessageContext.Provider value={messageContext}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
