import { useSetAtom } from "jotai";
import { updateNameAtom } from "store/stateUser";

import updateUserService from "services/user/update";

export const useChangeFullName = () => {
  const updateFullName = useSetAtom(updateNameAtom);

  const changeFullName = async (fullName: string) => {
    const { fullname: fullNameUpdated } = await updateUserService.fullName(
      fullName
    );
    updateFullName(fullNameUpdated);
  };

  return { changeFullName };
};
