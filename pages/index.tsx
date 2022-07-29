import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next'
import Image, { ImageProps } from '../components/Image'

type Props = {
  data: ImageProps[];
}

export const generateImageArr = (props:Props) => {
  return (props.data.map(image => (
    <div 
          key={image.id}
          className="image">
            <Image image={image}/>
          </div>
  )))
}

const Home: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pic-Cat-O</title>
        <meta name="description" content="home page for pic-cat-o" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Pic-Cat-O
        </h1>
        {generateImageArr(props)}
      </main>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/images/")
  const data = await res.json()
  return { 
    props: { data },
  }
}

export default Home