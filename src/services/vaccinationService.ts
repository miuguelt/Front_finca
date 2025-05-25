import axios from "axios";

const API_URL = "http://localhost:8080/vaccinations";

export const getVaccinations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createVaccination = async (vaccionationData: any) => {
  try {
    const response = await axios.post(API_URL, vaccionationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateVaccination = async (id: number, vaccinationData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, vaccinationData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

