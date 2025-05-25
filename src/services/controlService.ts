import api from "./authService";

const API_URL = "/control";

export const getControls = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createControl = async (controlData: any) => {
  try {
    const response = await api.post(API_URL, controlData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateControl = async (id: number, controlData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, controlData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

