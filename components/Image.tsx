import Router from 'next/router';
import React from 'react';

export type ImageProps = {
    id: number;
    createdAt: string;
    name: string;
    url: string;
}

const Image: React.FC<{image: ImageProps}> = ({ image }) => {
    return (
      <div onClick={() => Router.push('/images/[id]', `/images/${image.id}`)}>
          <h1>{image.name}</h1>
          <h2>{image.url}</h2>
          <h2>{image.createdAt}</h2>
          <img src={image.url}></img>
      </div>
    )
  }
  
  export default Image;