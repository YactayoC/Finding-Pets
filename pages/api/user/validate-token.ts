import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'database/db';
import { User } from 'models';
import { signToken, isValidToken } from 'utils/jwt';
import { TUser } from 'types';

type Data = { message: string } | { token: string; user: TUser };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const validateToken = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.query;
  let userId = '';

  try {
    userId = await isValidToken(String(token));
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }

  await dbConnect();
  const user = await User.findById(userId).lean();

  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  const { _id, email, role, fullname, phone, profile, confirmed } = user;
  return res.status(200).json({
    token: signToken(_id, email),
    user: {
      _id,
      email,
      role,
      fullname,
      phone,
      profile,
      confirmed,
    },
  });
};
