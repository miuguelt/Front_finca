import api from "./authService";
import { Control } from "@/types/controlTypes";

const API_URL = "/control";

export const getControls = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createControl = async (controlData: Control) => {
  try {
    const response = await api.post(API_URL, controlData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateControl = async (id: number, controlData: Control): Promise<Control> => {
  try {
    const response = await api.put(`${API_URL}/${id}`, controlData);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || "Error al actualizar el control");
  }
};
