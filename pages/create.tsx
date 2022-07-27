import React, {Suspense} from 'react'
import dynamic from 'next/dynamic'

const Ml5 = dynamic(() => import('../components/Ml5'), {ssr: false,})

const Create: React.FC = () => {
  return (
      <Ml5/>
  );
}
  
export default Create;
  