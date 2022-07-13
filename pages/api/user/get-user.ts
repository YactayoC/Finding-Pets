import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'database/db';
import { User } from 'models';
import type { TUser } from 'types';

type Data = { message: string } | { user: TUser };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '' } = req.query;

  await dbConnect();

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  return res.status(200).json({
    user,
  });
};
