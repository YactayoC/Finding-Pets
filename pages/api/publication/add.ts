import dbConnect from 'database/db';
import { Publication } from 'models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return addPublication(req, res);

    default:
      res.status(200).json({ message: 'Bad Request' });
  }
}

const addPublication = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { user, secure_url} = req.body;
  
  await dbConnect();
  const publication = new Publication(req.body);

  if (!publication) {
    return res.status(500).json({ message: "" });
  }

  try {
    publication.user = user;
    publication.images![0] = secure_url;
    await publication.save({ validateBeforeSave: true });
    return res.status(201).json({ message: 'Publicación realizada' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
