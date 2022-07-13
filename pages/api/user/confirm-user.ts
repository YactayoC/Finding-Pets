import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from 'database/db';
import { User } from 'models';

type Data = { message: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return confirmUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const confirmUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token } = req.query;

  await dbConnect();
  const user = await User.findOne({ token });

  if (!user) {
    return res.status(500).json({ message: 'Hubo algun problema o la cuenta ya ha sido confirmada' });
  }

  try {
    user.token = null;
    user.confirmed = true;
    await user.save();
    return res.status(201).json({ message: 'Cuenta confirmada' });
  } catch (error) {
    return res.status(500).json({ message: 'Hubo algun error en la cuenta' });
  }
};
