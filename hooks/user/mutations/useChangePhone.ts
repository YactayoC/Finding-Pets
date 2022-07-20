import { useSetAtom } from "jotai";
import { updatePhoneAtom } from "store/stateUser";

import updateUserService from "services/user/update";

export const useChangePhone = () => {
  const updatePhone = useSetAtom(updatePhoneAtom);

  const changePhone = async (phone: string) => {
    const { phone: phoneUpdated } = await updateUserService.phone(phone);
    updatePhone(phoneUpdated);
  };

  return { changePhone };
};
