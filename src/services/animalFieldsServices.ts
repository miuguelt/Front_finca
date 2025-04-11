import axios from "axios";

const API_URL = "http://localhost:8080/animalFields";

export const getAnimalFields = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createAnimalField = async (animalFieldData: any) => {
  try {
    const response = await axios.post(API_URL, animalFieldData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAnimalField = async (id: number, animalFieldData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, animalFieldData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

