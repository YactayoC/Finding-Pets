import { addCommentDB } from 'services/comments';

type ResponseData = {
  hasError: boolean;
  data?: any;
  message?: string;
};

export const useComments = () => {

  const addComment = async (idPublication: string, idUer: string, comment: string): Promise<ResponseData> => {
    try {
      const resp = await addCommentDB( idPublication, idUer, comment );
      return { hasError: false, message: resp.message };
    } catch (error) {
      return { hasError: true, message: error.response.data.message };
    }
  };

  return {
    addComment,
  };
};