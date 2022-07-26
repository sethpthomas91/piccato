import styles from '../styles/header.module.css';
import Router from 'next/router';
import Image from 'next/image';
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
      <a onClick={() => Router.push('/create/')}>
        <Image src='/create_icon.jpg' height='80px' width='80px'/>
      </a>
    </nav>
  );
}

export default Header
