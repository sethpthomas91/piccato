import Router from 'next/router';
import React from 'react';
import styles from '../styles/image.module.css'
import { useState, useEffect } from 'react';
import { getIFPSImageData } from '../handlers/NFTPortHandlers';
import Image from 'next/image';

export type GalleryImageProps = {
  mint_date: string;
  uri: string;
  metadata_id: string;
};

export type IpfsData = {
  name: string;
  description: string;
  image: string;
};

const GalleryImage: React.FC<GalleryImageProps> = ({ mint_date, uri, metadata_id } ) => {
  const [ipfsData, setIpfsData] = useState<IpfsData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const newIpfsData = await getIFPSImageData(uri);
      setIpfsData(newIpfsData.data);
    };
    fetchData();
  }, []);

  return (
    <div data-testid="imagePresser" className={styles.container} onClick={() => Router.push('/images/[id]', `/images/${metadata_id}`)}>
      {ipfsData && <img className={styles.galleryImg} src={ipfsData.image}></img>}
    </div>
  );
  }
  
export default GalleryImage;
  