import { Publication } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'PUT':
      return getUpdatePublicationById(req, res);

    default:
      res.status(401).json({ message: 'Bad request' });
  }
}

const getUpdatePublicationById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { idPublication = '' } = req.query;
  const { imagePublication } = req.body;

  try {
    const publication = await Publication.findById(idPublication);

    if (!publication) {
      return res.status(400).json({ message: 'Publicación no encontrada' });
    }

    const newPublication = {
      ...req.body,
      images: imagePublication,
    };

    await Publication.findByIdAndUpdate(idPublication, newPublication, { new: true });
    res.status(200).json({ message: 'Publicación actualizada' });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
