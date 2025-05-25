import api from "./authService";

const API_URL = "/animalDiseases";

export const getAnimalDiseases = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createAnimalDisease = async (animalDiseaseData: any) => {
  try {
    const response = await api.post(API_URL, animalDiseaseData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAnimalDisease = async (id: number, animalDiseaseData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, animalDiseaseData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};
