import styles from '../styles/footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <li className={styles.list}>Legal</li>
        <li className={styles.list}>About</li>
        <li className={styles.list}>Etc.</li>
      </nav>
    </footer>
  );
}

export default Footer
