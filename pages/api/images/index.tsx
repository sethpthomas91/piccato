import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const allImages = await prisma.image.findMany({
  });
  res.json(allImages);
}