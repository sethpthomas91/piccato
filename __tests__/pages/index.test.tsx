import '@testing-library/jest-dom';
import { generateImageArr, getServerSideProps } from '../../pages/index';
import Home from '../../pages/index';
import renderer from 'react-test-renderer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

describe ('generateImageArr', () => {
  const mockImageData = {
    data: [
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 1
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 2
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 3
      }
    ]
  };

  it('returns an array of 3 images', () => {
    const imageArr = generateImageArr(mockImageData);
    expect(imageArr).toHaveLength(3)
  });
})

describe ('Home', () => {
  const mockImageData = {
    data: [
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 1
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 2
      },
      {
        name: "This does not matter",
        url: "some website",
        createdAt: "Some time",
        id: 3
      }
    ]
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<Home data={mockImageData.data}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

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

  it('makes an http call when getServerSideProps is called', async () => {
    const fakeData = { data: "Test"}
    global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

    function mockRequestResponse(method: RequestMethod = 'GET') {
      const {
        req,
        res,
      }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
      req.headers = {
        'Content-Type': 'application/json',
      };
      req.query = {id: "5"}
      return { req, res };
    }
    
    const { req, res } = mockRequestResponse();
    const query = {};
    const resolvedUrl = "Does not matter"

    const response = await getServerSideProps({req, res, query, resolvedUrl});
    expect(global.fetch).toHaveBeenCalled();
  })
})
