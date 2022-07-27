import Header from './Header';
import Footer from './Footer';
import styles from '../styles/layout.module.css'

const Layout = ({children}:{children: React.ReactNode}) => {
    return (
    <div className={styles.container}>
      <Header/>
      {children}
      <Footer/>
    </div>
    );
}

export default Layout;
