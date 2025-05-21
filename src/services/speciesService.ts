import api from "./api";

const API_URL = "species";

export const getSpecies = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSpecie = async (specieData: any) => {
  try {
    const response = await api.post(API_URL, specieData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSpecie = async (id: number, specieData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, specieData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

