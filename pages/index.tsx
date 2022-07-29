import styles from '../styles/gallery.module.css';
import { GetServerSideProps } from 'next';
import GalleryImage, { GalleryImageProps } from '../components/GalleryImage'
import { getAllNFTs, nftResponseToImgData } from '../handlers/NFTPortHandlers';

type Props = {
  nftDataArr: GalleryImageProps[];
}

export const generateImageArr = (props: Props) => {
  return (props.nftDataArr.map((nft, index) => (
    <GalleryImage key={index} mint_date={nft.mint_date} uri={nft.uri} metadata_id={nft.metadata_id}/>
  )))
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nftResponse = await getAllNFTs();
  const nftDataArr = nftResponseToImgData(nftResponse.data);
  return { 
    props: { nftDataArr },
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

export default Home;
