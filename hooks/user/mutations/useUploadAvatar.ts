import { useSetAtom } from "jotai";
import { updateAvatarAtom } from "store/stateUser";

import { uploadImage } from "utils/uploadImage";

import updateUserService from "services/user/update";

export const useUploadAvatar = () => {
  const updateAvatar = useSetAtom(updateAvatarAtom);

  const uploadAvatar = async (avatar: File) => {
    const data = await uploadImage(avatar);
    if (!data) return;
    const { secure_url } = data;
    const { profile } = await updateUserService.avatar(secure_url);
    updateAvatar(profile);
  };

  return { uploadAvatar };
};
