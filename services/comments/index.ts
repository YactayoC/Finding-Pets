import findingPetsApi from 'axios/findingPetsApi';

export const addCommentDB = async (idPublication: string, comment: string) => {
  const { data } = await findingPetsApi.post(`/comment/add-comments?idPublication=${idPublication}`, { comment });
  return data;
};

// export const getPublicationDB = async (id: string) => {
//   const { data } = await findingPetsApi.get(`/publication/get-by?id=${id}`);
//   return data;
// }

// export const updatePublicationDB = async (id: string, description: string, state: string, imagePublication: string ) => {
//   const { data } = await findingPetsApi.put(`/publication/update?idPublication=${id}`, {description, imagePublication, state});
//   return data;
// }

// export const deletePublicationDB = async (id: string) => {
//   const { data } = await findingPetsApi.delete(`/publication/delete?id=${id}`);
//   return data;
// };
