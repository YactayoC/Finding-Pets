import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import dbConnect from "database/db";
import { User } from "models";
import type { TUser } from "types";

import { isValidPhone } from "utils/validations/phone";
import { isValidFullname } from "utils/validations/fullname";

export const avatar = async (id: string, avatar: string) => {
  await dbConnect();
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const userUpdated = await User.findByIdAndUpdate(
    id,
    { profile: avatar },
    { new: true }
  );
  return userUpdated;
};

export const backgroundImage = async (id: string, background: string) => {
  /* TODO: add this field to DB */
};

export const password = async (
  id: string,
  password: string,
  newPassword: string
) => {
  await dbConnect();
  const user = await User.findById(id);

  if (!user || !user.password) {
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Password is incorrect");
  }

  const hash = await bcrypt.hash(newPassword, 10);
  const userUpdated = await User.findByIdAndUpdate(
    id,
    { password: hash },
    { new: true }
  );
  return userUpdated;
};

// const email = async () => {};

export const phone = async (id: string, phone: string) => {
  await dbConnect();
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = isValidPhone(phone);
  if (!isValid) {
    throw new Error("Phone is invalid");
  }

  const userUpdated = await User.findByIdAndUpdate(
    id,
    { phone },
    { new: true }
  );
  return userUpdated;
};

export const fullName = async (id: string, fullName: string) => {
  await dbConnect();
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = isValidFullname(fullName);
  if (!isValid) {
    throw new Error("Full name is invalid");
  }

  const userUpdated = await User.findByIdAndUpdate(
    id,
    { fullname: fullName },
    { new: true }
  );
  return userUpdated;
};

const updateOptions = { avatar, backgroundImage, password, phone, fullName };

export default updateOptions;
