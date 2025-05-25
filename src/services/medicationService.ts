import api from "./authService";

const API_URL = "/medications";

export const getMedications = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createMedication = async (medicationData: any) => {
  try {
    const response = await api.post(API_URL, medicationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMedication = async (id: number, medicationData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, medicationData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

