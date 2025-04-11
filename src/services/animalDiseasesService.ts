import axios from "axios";

const API_URL = "http://localhost:8080/animalDiseases";

export const getAnimalDiseases = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createAnimalDisease = async (animalDiseaseData: any) => {
  try {
    const response = await axios.post(API_URL, animalDiseaseData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAnimalDisease = async (id: number, animalDiseaseData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, animalDiseaseData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};
