import { Publication } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TPublication } from 'types';

type Data = { message: string } | { publication: TPublication };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getMyPublicationById(req, res);

    default:
      res.status(401).json({ message: 'Bad request' });
  }
}

const getMyPublicationById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id = '' } = req.query;

  try {
    const publication = await Publication.findById(id);

    if (!publication) {
      res.status(200).json({ message: "Hubo algun error en la publicación" });
    }
    res.status(200).json({ publication: publication! });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
