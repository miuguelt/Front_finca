import api from "./api";

const API_URL = "breeds";

export const getBreeds = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createBreed = async (breedData: any) => {
  try {
    const response = await api.post(API_URL, breedData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBreed = async (id: number, breedData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, breedData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

