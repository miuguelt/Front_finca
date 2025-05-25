import api from "./authService";

const API_URL = "/treatmentVaccines";

export const getTreatmentVaccines = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTreatmentVaccine = async (treatmentVaccineData: any) => {
  try {
    const response = await api.post(API_URL, treatmentVaccineData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTreatmentVaccine = async (id: number, treatmentVaccinesData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, treatmentVaccinesData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

