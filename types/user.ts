export type TUser = {
  _id: string;
  fullname: string;
  phone: string;
  email: string;
  password?: string;
  profile: string;
  role: string;
  token?: string | null;
  confirmed: boolean;

  createdAt?: string;
};
