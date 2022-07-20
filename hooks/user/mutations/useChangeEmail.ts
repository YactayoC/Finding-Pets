import { useSetAtom } from "jotai";
import { updateEmailAtom } from "store/stateUser";

import updateUserService from "services/user/update";
/* 
export const useChangeEmail = () => {
  const updateEmail = useSetAtom(updateEmailAtom);

  const changeEmail = async (email: string) => {
    const { email: emailUpdated } = await updateUserService.email(email);
    updateEmail(emailUpdated);
  };

  return { changeEmail };
}; */
