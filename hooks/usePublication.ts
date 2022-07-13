import { addPublicationDB, deletePublicationDB, getPublicationDB, updatePublicationDB } from 'services/publications';
import { uploadImage } from 'utils/uploadImage';

type ResponseData = {
  hasError: boolean;
  data?: any;
  message?: string;
};

export const usePublications = () => {

  const addPublication = async (description: string, image: any, user: string): Promise<ResponseData> => {
    try {
      const { secure_url } = await uploadImage(image[0]);
      const resp = await addPublicationDB( description, secure_url, user );
      return { hasError: false, message: resp.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  const getPublicationById = async(id: string): Promise<ResponseData> => {
    try {
      const resp = await getPublicationDB(id);
      return { hasError: false, data: resp.publication };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  }

  const updatePublication = async(id: string, description: string, state: string, imagePublication: any): Promise<ResponseData> => {
    try {
      let imgUpdate;
      if (typeof imagePublication === 'object') {
        const {secure_url} = await uploadImage(imagePublication[0]);
        imgUpdate = secure_url;
      } else {
        imgUpdate = imagePublication;
      }

      const resp = await updatePublicationDB(id, description, state, imgUpdate );
      return { hasError: false, message: resp.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  }

  const deletePublication = async (id: string): Promise<ResponseData> => {
    try {
      const resp = await deletePublicationDB(id);
      return { hasError: false, message: resp.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  return {
    addPublication,
    deletePublication,
    getPublicationById,
    updatePublication
  };
};
