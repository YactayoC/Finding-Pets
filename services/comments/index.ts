import findingPetsApi from 'axios/findingPetsApi';

export const addCommentDB = async (idPublication: string, idUser: string, comment: string) => {
  const { data } = await findingPetsApi.post(`/comment/add-comment?idPublication=${idPublication}`, { idUser, comment });
  return data;
};

export const deleteCommentDB = async (idComment: string, idPublication: string) => {
  const { data } = await findingPetsApi.delete(`/comment/delete-comment?idComment=${idComment}&idPublication=${idPublication}`);
  return data;
}
