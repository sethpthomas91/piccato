import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ err: 'Method not allowed' });
    return;
  }

  if (isNaN(req.query.id)) {
    res.status(400).json({ err: "Malformed request"});
    return;
  }

  const imageID = req.query.id;

  const image = await prisma.image.findUnique({
    where: {id: Number(imageID)}
  })

  res.json(image)
}