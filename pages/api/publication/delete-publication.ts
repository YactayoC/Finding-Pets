import dbConnect from 'database/db';
import { Publication } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'DELETE':
      return deletePublication(req, res);

    default:
      res.status(200).json({ message: 'Bad Request' });
  }
}

const deletePublication = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await dbConnect();
  const publication = await Publication.findById(id);

  try {
    await publication?.delete();
    return res.status(201).json({ message: 'Publicación eliminada' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
