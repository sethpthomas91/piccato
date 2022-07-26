import styles from '../styles/header.module.css';
import Router from 'next/router';
import Head from 'next/head'

const Header = () => {
  return (
    <nav className={styles.header}>
      <Head>
        <title>Pic-Cat-O</title>
        <meta name="description" content="where people go to get catified" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title} 
        data-testid="titlePresser"
        onClick={() => Router.push('/')}>
          PIC-CAT-TO
      </h1>
      <a data-testid="createPresser" onClick={() => Router.push('/create/').then(()=>{Router.reload()})}>
        <img className={styles.icon} src='/create_icon.jpg'/>
      </a>
    </nav>
  );
}

export default Header
