import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import dbConnect from 'database/db';
import { User } from 'models';
import { isValidEmail, isValidFullname, isValidPhone } from 'utils/validations';
import { sendEmail } from 'utils/sendEmail';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { fullname, phone, email, password } = req.body;

  await dbConnect();
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  if (!isValidEmail(email) && !isValidFullname(fullname) && !isValidPhone(phone)) {
    return res.status(400).json({ message: 'Hubo algun error en los datos ingresados' });
  }

  const newUser = new User({
    ...req.body,
    password: bcrypt.hashSync(password),
  });

  try {
    const userRegistered = await newUser.save({ validateBeforeSave: true });
    await sendEmail(email, fullname, userRegistered.token!);
    return res.status(201).json({ message: 'Registro exitoso, porfavor revisa tu bandeja de email' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
