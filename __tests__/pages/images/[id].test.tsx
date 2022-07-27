import ImageDetail, { getServerSideProps } from "../../../pages/images/[id]";
import renderer from 'react-test-renderer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

describe ('ImageDetail', () => {
  const mockImageProps = {
      name: "This does not matter",
      url: "some website",
      createdAt: "Some time",
      id: 3
    };

  it('renders correctly', () => {
    const tree = renderer
      .create(<ImageDetail {...mockImageProps}/>)
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
    const params = { 
      id: 1,
      createdAt: "Does not matter",
      name: 'photo name does not matter',
      url: "www.doesnotmatter.com"
    }

    const response = await getServerSideProps({req, res, query, resolvedUrl, params});
    expect(global.fetch).toHaveBeenCalled();
  })
})