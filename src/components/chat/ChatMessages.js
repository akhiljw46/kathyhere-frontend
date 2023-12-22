import classes from './ChatMessages.module.css';

const ChatMessages = props => {
  return (
    <div className={classes.container}>
      <ul>{props.children}</ul>
    </div>
  );
};

export default ChatMessages;
