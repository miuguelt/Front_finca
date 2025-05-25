import axios from "axios";

const API_URL = "http://localhost:8080/species";

export const getSpecies = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createSpecie = async (specieData: any) => {
  try {
    const response = await axios.post(API_URL, specieData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSpecie = async (id: number, specieData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, specieData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

