import React, {useState} from 'react';
import Script from 'next/script';
import Image from 'next/image';
import useDownloader from 'react-use-downloader';
import styles from '../styles/create.module.css'

const Ml5: React.FC = () => {
  const [modelReady, setModelReady] = useState(false);
  const [pix2pix, setPix2pix] = useState(undefined);
  const [outputImageUrl, setOutputImageUrl] = useState("/NFT_placeholder.jpeg")
  const [inputImageSrc, setInputImageSrc] = useState("/test_image.jpeg")
  const {download} = useDownloader();


  const modelLoaded = () => {
    setModelReady(true);
  }

  const setup = async () => {
    const model = await ml5.pix2pix('/piccato_Human_to_Cat.pict', modelLoaded);
    setPix2pix(model);
  }
  
  const transfer = () => {
    const canvasEl = document.querySelector('#inputImage');
    pix2pix.transfer(canvasEl, function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result && result.src) {
        const newImageUrl = result.src;
        setOutputImageUrl(newImageUrl);
      }
    });
    setup();
  }

  const modelLoadingDisplay = () => {
    return (
      <div className={styles.container}>
        <h1>
          Gathering resources....
        </h1>
      </div>
    );
  }

  const modelLoadedDisplay = () => {
    return (
      <div className={styles.container}>
        <div className={styles.workContainer}>
          <Image className={styles.image} id="inputImage" width="256px" height="256px" src={inputImageSrc} alt="input image"/>
          <input id="userImage" type="file" accept="image/jpeg" onChange={(e) => {
          let newInputImageSrc = URL.createObjectURL(e.target.files[0])
          setInputImageSrc(newInputImageSrc);
          }}/>
        </div>

        <div className={styles.workContainer}>
          <button className={styles.button}  id="transferBtn" onClick={() => transfer()}>Catify</button>
        </div>
        
        <div className={styles.workContainer}>
          <Image id="outputImage" width="256px" height="256px" src={outputImageUrl} alt="output image"/>
          <button id="downloadButton" onClick={() => {
            download(outputImageUrl, "fileName.jpeg");
          }}>Download</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <ScriptWrapper setup={setup}/>
      {modelReady ? modelLoadedDisplay() : modelLoadingDisplay()}
    </div>
  )
}
  
export default Ml5;

const ScriptWrapper = ({ setup }) => {
  return (
    <Script
      id="ml5-script"
      strategy="afterInteractive"
      src="https://unpkg.com/ml5@latest/dist/ml5.min.js"
      onError={(e) => {
        console.log(e)
      }}
      onLoad={setup}
      />
  )
}