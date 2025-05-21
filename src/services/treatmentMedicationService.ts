import api from "./api";

const API_URL = "treatmentMedications";

export const getTreatmentMedications = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTreatmentMedication = async (getTreatmentMedicationData: any) => {
  try {
    const response = await api.post(API_URL, getTreatmentMedicationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTreatmentMedication = async (id: number, treatmentMedicationData: any) => {
  try {
      const response = await api.put(`${API_URL}/${id}`, treatmentMedicationData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

