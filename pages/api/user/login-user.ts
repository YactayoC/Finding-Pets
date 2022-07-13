import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import dbConnect from 'database/db';
import { signToken } from 'utils/jwt';
import { User } from 'models';
import type { TUser } from 'types';

type Data = { message: string } | { token: string | null; user: TUser };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;

  await dbConnect();
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Email y/o contraseña incorrectos' });
  }

  if (!user.confirmed) {
    return res.status(400).json({ message: 'La cuenta no ha sido confirmada, revise su bandeja' });
  }

  const { _id, role, fullname, phone, profile, confirmed } = user;
  const token = signToken(_id, email);
  return res.status(200).json({
    token,
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
