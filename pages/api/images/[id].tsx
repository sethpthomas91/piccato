import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const imageID = req.query.id;

  const image = await prisma.image.findUnique({
    where: {id: Number(imageID)}
  })

  res.json(image)
}
