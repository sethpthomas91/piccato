import React from 'react'
import { GetServerSideProps } from 'next'
import { GalleryImageProps } from '../../components/GalleryImage'
import styles from '../../styles/detail.module.css'
import { createActualUri, getIFPSImageData } from '../../handlers/NFTPortHandlers'

const ImageDetail: React.FC = props => {
    const { name, image, description } = props
    return (
    <div className={styles.container}>
      <div>
        <img height='256' width='256' src={image}></img>
      </div>
      <div className={styles.detailContainer}>
        <h2>Name: {name}</h2>
        <h2>Description: {description}</h2>
        <h2>Location: {image}</h2>
      </div>
    </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nftUri = createActualUri(context.params.id)
  const res = await getIFPSImageData(nftUri)
  const data = res.data
  return { props: { ...data } }
}
  
export default ImageDetail;
  