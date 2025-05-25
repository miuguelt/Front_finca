import axios from "axios";

const API_URL = "http://localhost:8080/control";

export const getControls = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createControl = async (controlData: any) => {
  try {
    const response = await axios.post(API_URL, controlData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateControl = async (id: number, controlData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, controlData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

