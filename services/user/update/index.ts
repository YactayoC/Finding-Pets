import api from "api/findingPetsApi";
import { getToken } from "services/user/utils/getToken";

import type { TUser } from "types";

const basePath = "user/update";

const getAuthorizationHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const avatar = async (avatar: string) => {
  const url = `${basePath}/avatar`;

  const { data } = await api.put<TUser>(
    url,
    { avatar },
    getAuthorizationHeader()
  );
  return data;
};

const backgroundImage = async (background: string) => {
  const url = `${basePath}/background`;
  const { data } = await api.put<TUser>(
    url,
    { background },
    getAuthorizationHeader()
  );
  return data;
};

const password = async (password: string, newPassword: string) => {
  const url = `${basePath}/password`;
  const { data } = await api.put<TUser>(
    url,
    { password, newPassword },
    getAuthorizationHeader()
  );
  return data;
};

// const email = async () => {};

const phone = async (phone: string) => {
  const url = `${basePath}/phone`;
  const { data } = await api.put<TUser>(
    url,
    { phone },
    getAuthorizationHeader()
  );
  return data;
};

const fullName = async (fullName: string) => {
  const url = `${basePath}/fullname`;
  const { data } = await api.put<TUser>(
    url,
    { fullName },
    getAuthorizationHeader()
  );
  return data;
};

const updateOptions = { avatar, backgroundImage, password, phone, fullName };

export default updateOptions;
