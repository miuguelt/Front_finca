import axios from "axios";

const API_URL = "http://localhost:8080/medications";

export const getMedications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createMedication = async (medicationData: any) => {
  try {
    const response = await axios.post(API_URL, medicationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMedication = async (id: number, medicationData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, medicationData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

