import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.text}>
        Made with &#9829; by{' '}
        <a
          className={classes.link}
          href="https://linktr.ee/akhilaugustin"
          target="_blank"
          rel="noreferrer"
        >
          Akhil Augustin
        </a>
      </p>
    </footer>
  );
};

export default Footer;
