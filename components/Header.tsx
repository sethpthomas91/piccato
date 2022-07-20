import styles from '../styles/Home.module.css'
import Router from 'next/router';

const Header = () => {
  return (
    <nav className={styles.footer}>
      <li onClick={() => Router.push('/')}> PIC-CAT-TO</li>
      <li onClick={() => Router.push('/create/')}>+</li>
    </nav>
  );
}

export default Header