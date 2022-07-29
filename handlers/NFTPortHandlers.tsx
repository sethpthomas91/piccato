import localConfig from '../.env.local.js';

export const getAllFiles = async () => {
  const url = 'https://api.nftport.xyz/v0/me/storage?type=file'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: localConfig.NFTPORT_KEY,
    }
  });
  const data = await res.json();
  return { 
    data
  };
}

export const getNftMintDate = (nftObject) => {
  return nftObject.mint_date;
}

export const getMetaDataUri = (nftObject) => {
  return nftObject.metadata_uri;
}

export const filterMetadataUri = (metadataUri: string) => {
  return metadataUri.slice(7, (metadataUri.length + 1));
}

export const createActualUri = (filteredMetadataUri: string) => {
  return "https://ipfs.io/ipfs/" + filteredMetadataUri;
}

export const getNFTObjects = (nftResponse) => {
  return nftResponse.minted_nfts
}

export const nftResponseToImgData = (nftResponse) => {
  const nftObjectArr = getNFTObjects(nftResponse);
  const newArr = nftObjectArr.map((nftData) => {
    return {
      mint_date: nftData.mint_date,
      uri: createActualUri(filterMetadataUri(getMetaDataUri(nftData))),
      metadata_id: filterMetadataUri(getMetaDataUri(nftData))
    }
  }) 
  return newArr
}

export const mergeData = (nftObject, ifpsResponse) => {
  return {
    name: ifpsResponse.name,
    description: ifpsResponse.description,
    src: ifpsResponse.image,
    minted_date: nftObject.mint_date
  }
}

export const getAllNFTs = async () => {
  const url = 'https://api.nftport.xyz/v0/me/mints'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: localConfig.NFTPORT_KEY,
    }
  });
  const data = await res.json();
  return { 
    data
  };
}

export const getIFPSImageData = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET'
  });
  const data = await res.json();
  return { 
    data
  };
}

export const mintNFT = async (name: string, description: string, file: File) => {
  const url = `https://api.nftport.xyz/v0/mints/easy/files?chain=polygon&name=${name}&description=${description}&mint_to_address=${localConfig.WALLET_ADDRESS}`;
  const FormData = require('form-data');
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(url, {
    method: 'POST',
    body: form,
    headers: {
      "Authorization": `${localConfig.NFTPORT_KEY}`,
    }
  });
  const data = await res.json();
  return { 
    data
  };
}
