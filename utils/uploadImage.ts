import axios from 'axios';

export const uploadImage = async (file: File) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/sebas-2001-yac/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'finding-pets');
  formData.append('file', file);

  try {
    const resp = await axios.post(cloudUrl, formData);

    const cloudResp = await resp.data;
    return cloudResp;
  } catch (error) {
    console.log(error);
  }
};
