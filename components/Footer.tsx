import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Created with{' '}
      <span className={styles.logo}>
        <Image src="/github-mark.png" alt="Github Logo" width={50} height={50} />
      </span>
    </a>
  </footer>
  );
}

export default Footer