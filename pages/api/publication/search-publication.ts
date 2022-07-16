import { Publication, User } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TPublication } from 'types';

type Data = { message: string } | { publications: TPublication[]};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getSearchPublications(req, res);

    default:
      res.status(401).json({ message: 'Bad request' });
  }
}

const getSearchPublications = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { search = '' } = req.query;
  try {
    const publications = await Publication.find({ description: {$regex: search} })
    .populate('user', ["-password"])
    .populate("comments.user", ["fullname", "profile"])
    .sort({ $natural: -1 });

    res.status(200).json({
      publications,
    });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
