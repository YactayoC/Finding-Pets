import type { ImageProps } from "next/image";

export type AvatarSize = "small" | "normal" | "medium" | "large";
export type AvatarProps = {
  rounded?: boolean;
  size?: AvatarSize;
  src?: string;
  editable?: boolean;
  alt?: string;
  email: string;
  onConfirmUpload?: (image: File) => Promise<void>;
} & ImageProps;
