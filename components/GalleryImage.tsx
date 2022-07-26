import Router from 'next/router';
import React from 'react';
import styles from '../styles/image.module.css'

export type GalleryImageProps = {
    id: number;
    createdAt: string;
    name: string;
    url: string;
}

const GalleryImage: React.FC<{image: GalleryImageProps}> = ({ image }) => {
    return (
      <div className={styles.container} onClick={() => Router.push('/images/[id]', `/images/${image.id}`)}>
        <img className={styles.galleryImg} src={image.url}></img>
      </div>
    )
  }
  
  export default GalleryImage;
  