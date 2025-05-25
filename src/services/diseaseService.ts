import axios from "axios";

const API_URL = "http://localhost:8080/diseases";

export const getDiseases = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDisease = async (diseaseData: any) => {
  try {
    const response = await axios.post(API_URL, diseaseData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDisease = async (id: number, DiseaseData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, DiseaseData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

