import { atom } from "jotai";
import { TUser } from "types";

export const infoUser = atom<TUser | null>(null);

export const updateAvatarAtom = atom(null, async (get, set, avatar: string) => {
  const user = get(infoUser);
  if (!user) return;
  set(infoUser, { ...user, profile: avatar });
});

export const updateNameAtom = atom(null, async (get, set, name: string) => {
  const user = get(infoUser);
  if (!user) return;
  set(infoUser, { ...user, fullname: name });
});

export const updateEmailAtom = atom(null, async (get, set, email: string) => {
  const user = get(infoUser);
  if (!user) return;
  set(infoUser, { ...user, email });
});

export const updatePhoneAtom = atom(null, async (get, set, phone: string) => {
  const user = get(infoUser);
  if (!user) return;
  set(infoUser, { ...user, phone });
});
