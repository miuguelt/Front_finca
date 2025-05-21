import api from "./api";

const API_URL = "vaccinations";

export const getVaccinations = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createVaccination = async (vaccionationData: any) => {
  try {
    const response = await api.post(API_URL, vaccionationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateVaccination = async (id: number, vaccinationData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, vaccinationData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

