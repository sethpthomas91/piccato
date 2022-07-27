import React from 'react'
import { GetServerSideProps } from 'next'
import { GalleryImageProps } from '../../components/GalleryImage'
import styles from '../../styles/detail.module.css'

const ImageDetail: React.FC<GalleryImageProps> = props => {
    const { name, url} = props
    return (
    <div className={styles.container}>
      <div>
        <img height='256' width='256' src={url}></img>
      </div>
      <div className={styles.detailContainer}>
        <h2>Name: {name}</h2>
        <h2>Location: {url}</h2>
      </div>
    </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/images/${context.params.id}`)
  const data = await res.json()
  return { props: { ...data } }
}
  
export default ImageDetail;
  