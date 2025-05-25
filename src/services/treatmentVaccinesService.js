import api from "./api";
const API_URL = "treatmentVaccines";
export const getTreatmentVaccines = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const createTreatmentVaccine = async (treatmentVaccineData) => {
    try {
        const response = await api.post(API_URL, treatmentVaccineData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
export const updateTreatmentVaccine = async (id, treatmentVaccinesData) => {
    try {
        const response = await api.put(`${API_URL}/${id}`, treatmentVaccinesData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};
