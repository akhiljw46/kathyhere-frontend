import { useContext, useEffect, useRef, useState } from 'react';

import MessageContext from '../utils/message-context';
import InputText from './InputText';
import SubmitButton from './SubmitButton';

import classes from './InputContainer.module.css';

const InputContainer = () => {
  const inputRef = useRef(null);
  const messageCtx = useContext(MessageContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // console.log(messageCtx.messages);

    const fetchMessage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          // 'https://kathyhere.onrender.com/v1/message/',
          'http://127.0.0.1:3000/v1/message/kathy',
          {
            method: 'POST',
            body: JSON.stringify({
              messages: messageCtx.messages,
              // messages: [{ messageText: message, isUser: true }],
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const reqestTimeoutTimer = setTimeout(() => {
          setIsLoading(false);
          throw new Error('Request Timeout');
        }, 1000 * 60 * 2);

        const data = await response.json();

        clearTimeout(reqestTimeoutTimer);
        messageCtx.addMessage({
          id: Date.now(),
          isUser: false,
          messageText: data.message,
        });
      } catch (err) {
        setError(err.message);
        console.log('Something went Wrong!', error);
        messageCtx.addMessage({
          id: Date.now(),
          isUser: false,
          messageText: "Sorry, I'm too busy to talk now 🥵",
        });
      }
    };
    if (messageCtx.messages[messageCtx.messages.length - 1].isUser && !error) {
      setIsLoading(true);
      fetchMessage().then(() => setIsLoading(false));
    }
  }, [messageCtx, error]);

  const submitHandler = async event => {
    event.preventDefault();
    const messageText = inputRef.current.value;
    if (isLoading || messageText.trim() === '') return;

    messageCtx.addMessage({
      id: Date.now(),
      isUser: true,
      messageText,
    });
    inputRef.current.value = '';
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`${classes.container} ${
        messageCtx.isUserAvailable ? '' : classes.hidden
      }`}
    >
      <InputText ref={inputRef} />
      <SubmitButton />
    </form>
  );
};

export default InputContainer;
