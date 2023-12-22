import classes from './ProfileButton.module.css';

function ProfileButton(props) {
  return (
    <button className={classes.button} onClick={props.clickHandler}>
      <img src={props.icon} alt={props.text} />
      <p>{props.text}</p>
    </button>
  );
}
export default ProfileButton;
