import '@testing-library/jest-dom';
import { generateImageArr, getServerSideProps } from '../../pages/index';
import Home from '../../pages/index';
import renderer from 'react-test-renderer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

describe ('generateImageArr', () => {
  const mockNFTData = {
    nftDataArr: [
      {
        metadata_id: "This does not matter",
        uri: "some website",
        mint_date: "Some time"
      },
      {
        metadata_id: "This does not matter",
        uri: "some website",
        mint_date: "Some time"
      },
      {
        metadata_id: "This does not matter",
        uri: "some website",
        mint_date: "Some time"
      }
    ]
  };

  it('returns an array of 3 images', () => {
    const imageArr = generateImageArr(mockNFTData);
    expect(imageArr).toHaveLength(3)
  });
})

describe ('Home', () => {
  const mockNFTData = {
    nftDataArr: [
      {
        metadata_id: "bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
        uri: "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
        mint_date: "Some time"
      },
      {
        metadata_id: "bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
        uri: "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
        mint_date: "Some time"
      },
      {
        metadata_id: "bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
        uri: "ipfs://bafkreiedsysj5xeyulisdjrjh37tz2y47dlwzwiwfagmqng3melxtigaie",
        mint_date: "Some time"
      }
    ]
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<Home nftDataArr={mockNFTData.nftDataArr}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const setupFetchStub = (data) => {
    return function fetchStub(_url) {
      return new Promise((resolve) => {
        resolve({
          json: () => data,
        })
      })
    }
  }

  it('makes an http call when getServerSideProps is called', async () => {
    const fakeData = {
        response: 'OK',
        total: 5,
        minted_nfts: [
          {
            chain: 'polygon',
            transaction_hash: '0x6858e8b3e91f1b950d271096c85855b27f5ce517b60186850017202159068fca',
            transaction_external_url: 'https://polygonscan.com/tx/0x6858e8b3e91f1b950d271096c85855b27f5ce517b60186850017202159068fca',
            contract_name: 'NFTPort.xyz v3',
            contract_address: '0x1a61dd84d67228b04cf28542c9f492a07cc1a38a',
            type: 'erc721',
            token_id: '5266',
            mint_to_address: '0x770bd34d984a4314cd3046169a885bf7a5cf2a1f',
            metadata_uri: 'ipfs://bafkreiagxxmbeiufwk7ifjhriygswwd42qg2fkjap264osyyuotocg5pim',
            quantity: 1,
            num_burned_or_transferred: 0,
            metadata_frozen: true,
            mint_date: '2022-07-28T01:20:04.324236'
          },
          {
            chain: 'polygon',
            transaction_hash: '0x6012d6c9c15255a362b90b5bca7d4f2d10d4674feb1b3c5fe24d6db43bff2741',
            transaction_external_url: 'https://polygonscan.com/tx/0x6012d6c9c15255a362b90b5bca7d4f2d10d4674feb1b3c5fe24d6db43bff2741',
            contract_name: 'NFTPort.xyz v3',
            contract_address: '0x1a61dd84d67228b04cf28542c9f492a07cc1a38a',
            type: 'erc721',
            token_id: '5274',
            mint_to_address: '0x770bd34d984a4314cd3046169a885bf7a5cf2a1f',
            metadata_uri: 'ipfs://bafkreihnnkxvqnpospogj4slnxmnkuqj33hv543f7mccl3hgaexcvvigzy',
            quantity: 1,
            num_burned_or_transferred: 0,
            metadata_frozen: true,
            mint_date: '2022-07-28T02:54:01.618741'
          }
        ]
      }

    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

    function mockRequestResponse(method: RequestMethod = 'GET') {
      const {
        req,
        res,
      }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
      req.headers = {
        'Content-Type': 'application/json',
      };
      return { req, res };
    }
    
    const { req, res } = mockRequestResponse();
    const query = {};
    const resolvedUrl = "Does not matter"

    const response = await getServerSideProps({req, res, query, resolvedUrl});
    expect(global.fetch).toHaveBeenCalled();
  })
})
