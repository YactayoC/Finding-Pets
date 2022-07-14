import dbConnect from 'database/db';
import { Publication } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return addComment(req, res);

    default:
      res.status(200).json({ message: 'Bad Request' });
  }
}

const addComment = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { idPublication } = req.query;
  const { idUser, comment } = req.body;

  await dbConnect();
  const publication = await Publication.findById(idPublication);

  if (!publication) {
    return res.status(500).json({ message: 'Hubo algun problema en la publicación' });
  }

  try {
    publication.comments?.push(comment);
    await publication.save({ validateBeforeSave: true });
    return res.status(201).json({ message: 'Publicación realizada' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
