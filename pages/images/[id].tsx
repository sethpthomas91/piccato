import React from 'react'
import { GetServerSideProps } from 'next'
import { ImageProps } from '../../components/Image'

const ImageDetail: React.FC<ImageProps> = props => {
    const { name, url} = props
    return (
    <div>
      <h2>{name}</h2>
      <h2>{url}</h2>
    </div>
    )
  }
  
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/images/${context.params.id}`)
  const data = await res.json()
  return { props: { ...data } }
}
  
  export default ImageDetail;