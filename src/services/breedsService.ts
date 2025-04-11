import axios from "axios";

const API_URL = "http://localhost:8080/breeds";

export const getBreeds = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createBreed = async (breedData: any) => {
  try {
    const response = await axios.post(API_URL, breedData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBreed = async (id: number, breedData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, breedData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

