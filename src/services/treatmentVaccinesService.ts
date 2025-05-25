import axios from "axios";

const API_URL = "http://localhost:8080/treatmentVaccines";

export const getTreatmentVaccines = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTreatmentVaccine = async (treatmentVaccineData: any) => {
  try {
    const response = await axios.post(API_URL, treatmentVaccineData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTreatmentVaccine = async (id: number, treatmentVaccinesData: any) => {
  try {
      const response = await axios.put(`${API_URL}/${id}`, treatmentVaccinesData);
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

