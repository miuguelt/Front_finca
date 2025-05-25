import axios from "axios";

const API_URL = "http://localhost:8080/treatmentMedications";

export const getTreatmentMedications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTreatmentMedication = async (getTreatmentMedicationData: any) => {
  try {
    const response = await axios.post(API_URL, getTreatmentMedicationData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTreatmentMedication = async (id: number, treatmentMedicationData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, treatmentMedicationData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

