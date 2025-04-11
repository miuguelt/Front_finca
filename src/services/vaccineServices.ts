import axios from "axios";

const API_URL = "http://localhost:8080/vaccines";

export const getVaccines = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createVaccine = async (vaccineData: any) => {
  try {
    const response = await axios.post(API_URL, vaccineData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateVaccine = async (id: number, vaccineData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, vaccineData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

