import api from "./authService";

const API_URL = "/diseases";

export const getDiseases = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createDisease = async (diseaseData: any) => {
  try {
    const response = await api.post(API_URL, diseaseData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateDisease = async (id: number, DiseaseData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, DiseaseData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

