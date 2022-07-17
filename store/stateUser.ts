import { atom } from "jotai";
import { TUser } from "types";

export const infoUser = atom<TUser | null>(null);

export const updateAvatarAtom = atom(null, async (get, set, avatar: string) => {
  const user = get(infoUser);
  if (!user) return;
  set(infoUser, { ...user, profile: avatar });
});
