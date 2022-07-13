import findingPetsApi from 'axios/findingPetsApi';

export const addPublicationDB = async (description: string, secure_url: string, user: string) => {
  const { data } = await findingPetsApi.post('/publication/add', { description, secure_url, user });
  return data;
};

export const getPublicationDB = async (id: string) => {
  const { data } = await findingPetsApi.get(`/publication/get-by?id=${id}`);
  return data;
}

export const updatePublicationDB = async (id: string, description: string, state: string, imagePublication: string ) => {
  const { data } = await findingPetsApi.put(`/publication/update?idPublication=${id}`, {description, imagePublication, state});
  return data;
}

export const deletePublicationDB = async (id: string) => {
  const { data } = await findingPetsApi.delete(`/publication/delete?id=${id}`);
  return data;
};
