import handle from '../../../../pages/api/images/[id]'
import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';

describe ('/api/images API endpoint', () => {

  it('Returns a 200 response if the method is GET', async () => {
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
    await handle(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toEqual('OK')
  })

  it('Returns a 405 response if the method is not GET', async () => {
    function mockRequestResponse(method: RequestMethod = 'POST') {
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
    await handle(req, res);

    expect(res.statusCode).toBe(405);
  })

  it('Returns a 400 response if the query id is not a number', async () => {
    function mockRequestResponse(method: RequestMethod = 'GET') {
      const {
        req,
        res,
      }: { req: NextApiRequest; res: NextApiResponse } = createMocks({ method });
      req.headers = {
        'Content-Type': 'application/json',
      };
      req.query = {id: "This is not a number, but should be."}
      return { req, res };
    }

    const { req, res } = mockRequestResponse();
    await handle(req, res);

    expect(res.statusCode).toBe(400);
  })
  
})