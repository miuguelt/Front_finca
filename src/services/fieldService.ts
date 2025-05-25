import axios from "axios";

const API_URL = "http://localhost:8080/fields";

export const getFields = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createField = async (fieldData: any) => {
  try {
    const response = await axios.post(API_URL, fieldData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateField = async (id: number, fieldData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, fieldData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

