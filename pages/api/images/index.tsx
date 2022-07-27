import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ err: 'Method not allowed' });
    return;
  }
  
  const allImages = await prisma.image.findMany({});
  res.json(allImages); 
}
