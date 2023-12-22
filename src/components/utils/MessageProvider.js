import { useState, useEffect, useCallback } from 'react';
import MessageContext from './message-context';

const buildDefaultMessage = user => [
  {
    id: 'm1',
    isUser: false,
    messageText: `Heyy, I'm ${
      user === 'kathy' ? 'Kathy' : 'Tom'
    }. Wassup dear? 😊 `,
  },
];

const getLocalStorage = user => {
  const storedMessages = JSON.parse(localStorage.getItem(`${user}`));
  if (!storedMessages) return;
  // Delete last entry if it is by the user to avoid triggering multiple requests
  if (storedMessages.at(-1).isUser) storedMessages.pop();
  return storedMessages;
};

const MessageProvider = props => {
  const [user, setUser] = useState('kathy');
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  const [messages, setMessages] = useState(
    getLocalStorage(user) ?? buildDefaultMessage(user)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `${process.env.REACT_APP_BACKEND_URL}${user}`;

  const fetchMessage = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        messages,
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
  }, [messages, url]);

  useEffect(() => {
    getLocalStorage(user);
    localStorage.setItem(`${user}`, JSON.stringify(messages));
    if (messages[messages.length - 1].isUser) {
      setIsLoading(true);
      fetchMessage()
        .catch(err => {
          setError(err.message);
          addMessageHandler({
            id: Date.now(),
            isUser: false,
            messageText:
              "Sorry, something came up and I'll be back in seconds 🥵",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [user, messages, fetchMessage]);

  useEffect(() => {
    if (error) console.error('An error occured', error);
  }, [error]);

  const addMessageHandler = message => {
    if (!message.messageText) message.messageText = '🤔';
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const setUserHandler = user => {
    setUser(user);
    setMessages(getLocalStorage(user) ?? buildDefaultMessage(user));
    setIsUserAvailable(true);
  };
  const setIsUserAvailableHandler = isAvailable =>
    setIsUserAvailable(isAvailable);

  const setIsLoadingHandler = isLoading => setIsLoading(isLoading);

  const clearMessages = () => setMessages(buildDefaultMessage(user));

  const messageContext = {
    user,
    isUserAvailable,
    messages,
    isLoading,
    error,
    clearMessages,
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
