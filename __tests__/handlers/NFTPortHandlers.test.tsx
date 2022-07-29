import { 
  getAllFiles, 
  getNftMintDate,
  getAllNFTs, 
  getMetaDataUri, 
  filterMetadataUri, 
  createActualUri,
  nftResponseToImgData,
  getIFPSImageData,
  mergeData,
} from '../../handlers/NFTPortHandlers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';
import { mintNFT } from '../../handlers/NFTPortHandlers';
import { blob } from 'stream/consumers';


describe ('NFTPortHandler', () => {

  const setupFetchStub = (data) => {
    return function fetchStub(_url) {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              data,
            }),
        })
      })
    }
  }

  it('makes an http call when getAllFiles is called', async () => {
    const fakeData = { data: "Test"}
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
    const response = await getAllFiles();
    expect(global.fetch).toHaveBeenCalled();
  })

  it('makes an http call when getAllNFTs is called', async () => {
    const fakeData = { data: "Test"}
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
    const response = await getAllNFTs();
    expect(global.fetch).toHaveBeenCalled();
  })

  const mockNftObject = {
    "chain": "polygon",
    "transaction_hash": "0x124141or0f10140112381381dd",
    "transaction_external_url": "https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1",
    "contract_name": "My NFTPort contract",
    "contract_address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    "type": "erc721",
    "token_id": "6473",
    "mint_to_address": "0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf",
    "metadata_uri": "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
    "quantity": "1",
    "burned_transferred_amount": "0",
    "metadata_frozen": true,
    "mint_date": "2021-08-23T17:25:03.501703"
  }
    
  it('returns the mint date when getNftMintDate is called', () => {
    expect(getNftMintDate(mockNftObject)).toEqual("2021-08-23T17:25:03.501703")
  });

  it('returns the mint date when getNftMintDate is called', () => {
    expect(getMetaDataUri(mockNftObject)).toEqual("ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie")
  });

  it('returns the ipfs location from the metadata uri when filterMetadataUri is called', () => {
    const mockMetaDataUri = "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie"
    expect(filterMetadataUri(mockMetaDataUri)).toEqual("bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie")
  });

  it('returns the ipfs location from the metadata uri when createActualUri is called', () => {
    const mockMetaDataUri = "bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie"
    expect(createActualUri(mockMetaDataUri)).toEqual("https://ipfs.io/ipfs/bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie")
  });

  it('returns an object list with NFT mint_date and the proper uri', () => {
    const mockNftResponse = {
      "response": "OK",
      "total": 1,
      "minted_nfts": [
        {
          "chain": "polygon",
          "transaction_hash": "0x124141or0f10140112381381dd",
          "transaction_external_url": "https://polygonscan.com/tx/0xcbbe6072d7aa48b9774ed8b15e7f298489c5e965b32aa468ca520b30aba649a1",
          "contract_name": "My NFTPort contract",
          "contract_address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
          "type": "erc721",
          "token_id": "6473",
          "mint_to_address": "0xc155f9bd6b71e9f71d0236b689ad7c2c5d16febf",
          "metadata_uri": "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
          "quantity": "1",
          "burned_transferred_amount": "0",
          "metadata_frozen": true,
          "mint_date": "2021-08-23T17:25:03.501703"
        }
      ]
    };

  expect(nftResponseToImgData(mockNftResponse)[0].mint_date).toBe("2021-08-23T17:25:03.501703");
  expect(nftResponseToImgData(mockNftResponse)[0].uri).toBe("https://ipfs.io/ipfs/bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie");
  })

  it('makes an http call when getIFPSImageData is called', async () => {
    const fakeData = { data: "Test"}
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))
    const response = await getIFPSImageData("Test string");
    expect(global.fetch).toHaveBeenCalled();
  })

  it('returns a complete nft object with name, description, img url, and mint_date when data_merge is called', () => {
    const mockIFPSImageData = {
      name: "testName",
      description: "test desc",
      image: "www.imagelocation.com"
    };
    
    const finalNftObj = mergeData(mockNftObject, mockIFPSImageData);
    expect(finalNftObj.name).toBe("testName");
    expect(finalNftObj.description).toBe("test desc");
    expect(finalNftObj.src).toBe("www.imagelocation.com");
    expect(finalNftObj.minted_date).toBe("2021-08-23T17:25:03.501703");
  });
})
