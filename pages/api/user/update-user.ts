import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import dbConnect from 'database/db';
import { User } from 'models';
import { TUser } from 'types';

type Data = { message: string } | { message: string; user: TUser };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'PUT':
      return updateUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '' } = req.query;
  const { password, passwordNew, imgUrl } = req.body;
  await dbConnect();

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    if (!bcrypt.compareSync(password, user.password!)) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    const newDataUpdate = {
      ...req.body,
      profile: imgUrl,
      password: bcrypt.hashSync(passwordNew),
    };

    const userUpdated = await User.findByIdAndUpdate(userId, newDataUpdate, { new: true });
    return res.status(201).json({ message: 'Datos actualizados correctamente', user: userUpdated! });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};
