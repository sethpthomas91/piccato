import styles from '../styles/gallery.module.css'
import { GetServerSideProps } from 'next'
import GalleryImage, { GalleryImageProps } from '../components/GalleryImage'

type Props = {
  data: GalleryImageProps[];
}

export const generateImageArr = (props:Props) => {
  return (props.data.map(image => (
    <GalleryImage key={image.id} image={image}/>
  )))
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/images/');
  const data = await response.json();
  return { 
    props: { data },
  };
}

const Home: React.FC<Props> = (props) => {
  return (
    <>
      <main className={styles.gallery}>
        {generateImageArr(props)}
      </main>
    </>
  )
}

export default Home
