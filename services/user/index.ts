import findingPetsApi from "api/findingPetsApi";
import { PersistUserResponse } from "./type";

export const registerUserDB = async (
  fullname: string,
  phone: string,
  email: string,
  password: string
) => {
  const { data } = await findingPetsApi.post("/user/register-user", {
    fullname,
    phone,
    email,
    password,
  });
  return data;
};

export const loginUserDB = async (email: string, password: string) => {
  const { data } = await findingPetsApi.post("/user/login-user", {
    email,
    password,
  });
  return data;
};

export const getUserDB = async (id: string) => {
  const { data } = await findingPetsApi.get(`/user/get-user?userId=${id}`);
  return data;
};

export const updateUserDB = async (
  id: string,
  imgUrl: string,
  fullname: string,
  phone: string,
  password: string,
  passwordNew: string
) => {
  const { data } = await findingPetsApi.put(`/user/update-user?userId=${id}`, {
    imgUrl,
    fullname,
    phone,
    password,
    passwordNew,
  });
  return data;
};

export const confirmUserDB = async (token: string) => {
  const { data } = await findingPetsApi.get(
    `/user/confirm-user?token=${token}`
  );
  return data;
};

export const persistUserDB = async () => {
  const tokenOld = localStorage.getItem("token") || "";
  if (tokenOld.length === 0) return;

  const { data } = await findingPetsApi.get<PersistUserResponse>(
    `/user/validate-token?token=${tokenOld}`
  );
  localStorage.setItem("token", data.token);
  return data;
};
