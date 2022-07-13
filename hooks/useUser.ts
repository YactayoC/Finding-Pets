import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';


import { infoUser } from 'store/stateUser';
import { TUser } from 'types';
import { uploadImage } from 'utils/uploadImage';
import { confirmUserDB, getUserDB, loginUserDB, persistUserDB, registerUserDB, updateUserDB } from 'services/user';

type ResponseData = {
  hasError: boolean;
  data?: TUser;
  message?: string;
  token?: string;
};

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useUpdateAtom(infoUser);
  const user = useAtomValue(infoUser);

  useEffect(() => {
    setIsLoading(true);
    persist();
  }, [setUser]);

  const persist = async () => {
    try {
      const data = await persistUserDB();
      setUser(data?.user || null);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const confirmAccount = async (token: string) => {
    try {
      const data = await confirmUserDB(token);
      return { hasError: false, message: data.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  }

  const login = async (email: string, password: string): Promise<ResponseData> => {
    try {
      const data = await loginUserDB(email, password);
      return { hasError: false, data: data.user, message: data.message, token: data.token };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  const register = async (fullname: string, phone: string, email: string, password: string): Promise<ResponseData> => {
    try {
      const data = await registerUserDB(fullname, phone, email, password);
      return { hasError: false, message: data.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  const getUserById = async (id: string): Promise<ResponseData> => {
    try {
      const data = await getUserDB(id);
      return { hasError: false, data: data.user };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  const updateProfile = async ( id: string, imageProfile: any, fullname: string, phone: string, password: string, passwordNew: string): Promise<ResponseData> => {
    try {
      let secure_url;
      if (imageProfile.length === 0) {
        secure_url = user?.profile;
      } else {
        const resp = await uploadImage(imageProfile[0]);
        secure_url = resp.secure_url;
      }
      const data = await updateUserDB(id, secure_url, fullname, phone, password, passwordNew);
      return { hasError: false, data: data.user, message: data.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return {
    user,
    isLoading,
    logout,
    login,
    register,
    getUserById,
    updateProfile,
    confirmAccount
  };
};
