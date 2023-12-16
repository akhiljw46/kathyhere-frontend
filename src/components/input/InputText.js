import classes from './InputText.module.css';
import { forwardRef } from 'react';

const InputText = forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={classes.input}
      type="text"
      placeholder="Type here..."
    />
  );
});

export default InputText;
