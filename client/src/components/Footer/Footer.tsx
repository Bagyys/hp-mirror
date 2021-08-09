import TopFooter from './TopFooter/TopFooter';
import BottomFooter from './BottomFooter/BottomFooter';
import classes from './Footer.module.scss';
const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <TopFooter />
      <BottomFooter />
    </footer>
  );
};
export default Footer;
