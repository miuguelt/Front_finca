import api from "./api";

const API_URL = "vaccines";

export const getVaccines = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createVaccine = async (vaccineData: any) => {
  try {
    const response = await api.post(API_URL, vaccineData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateVaccine = async (id: number, vaccineData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, vaccineData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

