import axios from "axios";

import { CloudinaryResponse } from "types/cloudinaryResponse";

export const uploadImage = async (
  file: File
): Promise<CloudinaryResponse | null> => {
  const cloudUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("upload_preset", "finding-pets");
  formData.append("file", file);

  try {
    const {data} = await axios.post<CloudinaryResponse>(cloudUrl!, formData);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
