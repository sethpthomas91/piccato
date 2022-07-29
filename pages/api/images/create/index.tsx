import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../db'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, url } = req.body
  const result = await prisma.image.create({
    data: {
        name: name,
        url: url,
    },
  })
  res.json(result)
}
