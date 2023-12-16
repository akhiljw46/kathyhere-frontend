import classes from './SubmitButton.module.css';

const SubmitButton = (props) => {
  return (
    <button className={classes.submit} type="submit">
      &#62;
    </button>
  );
};

export default SubmitButton;
