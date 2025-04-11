import axios from "axios";

const API_URL = "http://localhost:8080/animals";

export const getAnimals = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAnimalStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/status`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const createAnimal = async (animalData: any) => {
  try {
    const response = await axios.post(API_URL, animalData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAnimal = async (id: number, animalData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, animalData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

