import api from "./authService";

const API_URL = "/animalFields";

export const getAnimalFields = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createAnimalField = async (animalFieldData: any) => {
  try {
    const response = await api.post(API_URL, animalFieldData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAnimalField = async (id: number, animalFieldData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, animalFieldData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

