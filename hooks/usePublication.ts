import useSWR from 'swr';

import { addPublicationDB, deletePublicationDB, updatePublicationDB } from 'services/publications';
import { uploadImage } from 'utils/uploadImage';
import { TPublication } from 'types';

type ResponseData = {
  hasError: boolean;
  data?: any;
  message?: string;
};

export const usePublications = (url: string) => {
  const { data, error, mutate: mutatePublications } = useSWR<TPublication[] | any>(`/api/${url}`);

  const addPublication = async (description: string, image: any, user: string): Promise<ResponseData> => {
    try {
      const data = await uploadImage(image[0]);
      const secure_url = data?.secure_url!;
      const resp = await addPublicationDB( description, secure_url, user );
      mutatePublications();
      return { hasError: false, message: resp.message};
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  const updatePublication = async(id: string, description: string, state: string, imagePublication: any): Promise<ResponseData> => {
    try {
      let imgUpdate;
      if (typeof imagePublication === 'object') {
        const data = await uploadImage(imagePublication[0]);
        const secure_url = data?.secure_url!;
        imgUpdate = secure_url;
      } else {
        imgUpdate = imagePublication;
      }

      const resp = await updatePublicationDB(id, description, state, imgUpdate );
      mutatePublications();
      return { hasError: false, message: resp.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  }

  const deletePublication = async (id: string): Promise<ResponseData> => {
    try {
      const resp = await deletePublicationDB(id);
      mutatePublications();
      return { hasError: false, message: resp.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  return {
    publications: data || [],
    isLoading: !error && !data,
    addPublication,
    deletePublication,
    updatePublication,
    mutatePublications
  };
};
