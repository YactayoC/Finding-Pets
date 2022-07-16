import { Publication } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TPublication } from 'types';

type Data = { message: string } | { publications: TPublication[] };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getPublications(req, res);

    default:
      res.status(401).json({ message: 'Bad request' });
  }
}

const getPublications = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const publications = await Publication.find()
    .populate('user', ['profile', 'fullname'])
    .populate("comments.user", ["fullname", "profile"])
    .sort({ $natural: -1 });
  res.status(200).json({ publications });
};
